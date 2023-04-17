const Path = require('path');
const VConsolePlugin = require('vconsole-webpack-plugin');

const { defineConfig } = require('@vue/cli-service');
const { pages } = require('./src/ava.json');
const isProd = process.env.NODE_ENV === 'production';

module.exports = defineConfig({
  // 将 lint 错误输出为编译警告，不使得编译失败
  lintOnSave: true,

  // 静态资源文件名不使用 hash
  filenameHashing: false,

  // 取消生成环境的 source map
  productionSourceMap: false,

  // 对 node_modules 下的依赖进行转译
  transpileDependencies: true,

  // 多页面应用
  pages: Object.entries(pages).reduce((pages, [key, page]) => {
    if (page.url) {
      pages[key] = {
        // page 的入口
        entry: 'src/' + page.url + '.vue',

        // 页面模板
        template: 'public/page.html',

        // 在 dist/html/ 下输出页面
        filename: page.url.replace('pages', 'html') + '.html',

        // 页面标题
        title: key,
      }
    }
    return pages;
  }, {}),

  configureWebpack: (config) => {
    // 生成的 js 资源目录修改为 script（默认为 js）
    config.output.filename = 'script/[name].js';
    config.output.chunkFilename = 'script/[name].js';

    // 将 vue 页面导出的组件定义给 window
    config.output.library = {
      name: 'PageComponent',
      type: 'window',
      export: 'default'
    };

    // 从 bundle 中排除 vue 依赖，在页面上通过 script 引入
    config.externals = {
      vue: 'Vue'
    };

    // 在 docker 中 watch 编译时需要
    // config.watchOptions = {
    //   poll: true,
    //   ignored: /node_modules/
    // }
  },

  css: {
    loaderOptions: {
      // 禁止 css-loader 将资源转换为 require 模块调用
      css: {
        url: false
      }
    }
  },

  chainWebpack: (config) => {
    // 禁止 vue-loader 将资源转换为 require 模块调用
    config.module.rule('vue').use('vue-loader').tap((args) => {
      args.transformAssetUrls = {
        video: [],
        source: [],
        img: [],
        image: [],
        use: []
      };
      return args;
    });

    // 自动化导入 less 样式
    config.module.rule('less').oneOf('vue').use('style-resource').loader('style-resources-loader').options({
      patterns: [
        Path.resolve(__dirname, 'src/ava.less')
      ]
    });

    // 生成环境下移除 console 和 debugger
    config.optimization.minimizer('terser').tap((args) => {
      if (isProd) {
        args[0].terserOptions.compress.drop_console = true;
        args[0].terserOptions.compress.drop_debugger = true;
      }
      return args;
    });

    // 拷贝 vue 的运行版本到 dist/script/vue 下，为了在页面上用 script 标签引入
    config.plugin('copy').tap((args) => {
      args[0].patterns.push({
        from: Path.resolve(__dirname, `node_modules/vue/dist/vue.runtime.global${isProd ? '.prod' : ''}.js`),
        to: 'script/vue'
      });
      return args;
    });

    // 修改 html-webpack-plugin 的配置
    Object.entries(pages).forEach(([key, page]) => {
      config.plugin(`html-${key}`).tap((args) => {
        args[0].publicPath = Path.posix.relative(`src/${page.url}`, 'src/pages');
        return args;
      });
    });

    // 开发环境下添加 vconsole 调试工具
    config.plugin('vconsole').use(VConsolePlugin).tap((args) => {
      args[0] = { enable: !isProd };
      return args;
    });
  }
});

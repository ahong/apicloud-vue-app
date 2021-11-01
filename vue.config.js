const Fs = require('fs');
const Path = require('path');
const KlawSync = require('klaw-sync');
const CopyWebpackPlugin = require('copy-webpack-plugin');

let pages = {};
let pagesDir = Path.resolve('./src/pages');
KlawSync('./src/pages', {
    traverseAll: true,
    filter: (item) => {
        let st = Fs.statSync(item.path);
        if (st.isFile()) {
            let parseData = Path.parse(item.path);
            return parseData.ext === '.vue' && parseData.name === Path.basename(parseData.dir);
        } else {
            return false;
        }
    }
}).map((file) => file.path).forEach((entry) => {
    let dir = Path.win32.dirname(entry);
    let pagesDirRelativeToEntryDir = Path.win32.relative(pagesDir, dir);
    let pageKey = pagesDirRelativeToEntryDir.replace(new RegExp('\\' + Path.win32.sep, 'g'), '-');

    pages[pageKey] = {
        // 页面入口
        entry,

        // 页面模板
        template: `public/page.ejs`,

        // 输出的页面名
        filename: `html${Path.sep}${pageKey}.html`,

        // 页面需要包含的代码块
        chunks: ['chunk-vendors', 'chunk-common', pageKey],

        title: pageKey
    };
});

module.exports = {
    pages,
    publicPath: '../',
    lintOnSave: 'warning',
    filenameHashing: false,
    productionSourceMap: false,
    configureWebpack: {
        output: {
            filename: 'script/[name].js',
            chunkFilename: 'script/[id].js',
            library: 'PageComponent',
            libraryExport: 'default',
            libraryTarget: 'window'
        },
        plugins: [
            new CopyWebpackPlugin([
                { from: Path.resolve(__dirname, `node_modules/vue/dist/vue.runtime.global${process.env.NODE_ENV === 'production' ? '.prod' : ''}.js`), to: 'script/vue' }
            ])
        ],
        externals: {
            vue: 'Vue'
        }
    },
    css: {
        loaderOptions: {
            css: { url: false }
        }
    }
};

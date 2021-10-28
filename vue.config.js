const fs = require('fs');
const path = require('path');
const klawSync = require('klaw-sync');

let pages = {};
let pagesDir = path.resolve('./src/pages');
klawSync('./src/pages', {
    traverseAll: true,
    filter: (item) => {
        let st = fs.statSync(item.path);
        if (st.isFile()) {
            let parseData = path.parse(item.path);
            return parseData.ext === '.vue' && parseData.name === path.basename(parseData.dir);
        } else {
            return false;
        }
    }
}).map((file) => file.path).forEach((entry) => {
    let dir = path.win32.dirname(entry);
    let pagesDirRelativeToEntryDir = path.win32.relative(pagesDir, dir);
    let pageKey = pagesDirRelativeToEntryDir.replace(new RegExp('\\' + path.win32.sep, 'g'), '-');

    pages[pageKey] = {
        // 页面入口
        entry,

        // 页面模板
        template: `public/page.ejs`,

        // 输出的页面名
        filename: `html${path.sep}${pageKey}.html`,

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

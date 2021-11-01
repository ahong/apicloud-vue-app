import Pages from "@/pages";
export { navigateTo, redirectTo };

/**
 * 保留当前页面，跳转到应用内的某个页面
 * @param name {String} : window名，按页面文件相对 pages 文件夹的路径生成
 * @param params {Object} : 页面配置参数，会与默认配置项合并，详细参数见 api.openWin
 */
function navigateTo(name, params) {
    if (!name) {
        console.error('[navigateTo Warn]: Function requires a name parameter');
        return;
    }
    api.openTabLayout(Object.assign({
        name,
        url: `./${name}.html`,
        scrollToTop: true,
        slidBackType: 'edge',
        overScrollMode: 'scrolls',
        hideHomeIndicator: true
    }, Pages[name], params));
}

/**
 * 关闭当前页面，跳转到应用内的某个页面
 * @param name {String} : window名，默认按页面文件相对 pages 文件夹的路径生成
 * @param params {Object} : 页面配置参数，会与默认配置项合并，详细参数见 api.openWin
 * Tip：占用了页面的 viewdisappear 事件
 */
function redirectTo(name, params) {
    if (!name) {
        console.error('[redirectTo Warn]: Function requires a name parameter');
        return;
    }
    api.addEventListener({ name: 'viewdisappear' }, () => {
        api.closeWin();
    });
    navigateTo(name, params);
}

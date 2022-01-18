import Pages from "@/pages";

/**
 * 保留当前页面，跳转到应用内的某个页面
 * @param name {String} window名，按页面文件相对 pages 文件夹的路径生成
 * @param params {Object} 页面配置参数，会与默认配置项合并，详细参数见 api.openWin
 */
export function navigateTo(name, params) {
    if (!name) {
        console.error('[navigateTo Warn]: Function requires a name parameter');
        return;
    }
    api.openTabLayout(Object.assign({
        name,
        url: `./${name}.html`,
        scrollToTop: true,
        slidBackType: 'edge',
        reload: true,
        overScrollMode: 'scrolls',
        hideHomeIndicator: true
    }, Pages[name], params));
}

/**
 * 关闭当前页面，跳转到应用内的某个页面
 * @param name {String} window名，默认按页面文件相对 pages 文件夹的路径生成
 * @param params {Object} 页面配置参数，会与默认配置项合并，详细参数见 api.openWin
 * Tip：占用了页面的 viewdisappear 事件
 */
export function redirectTo(name, params) {
    if (!name) {
        console.error('[redirectTo Warn]: Function requires a name parameter');
        return;
    }
    api.addEventListener({ name: 'viewdisappear' }, () => {
        api.closeWin();
    });
    navigateTo(name, params);
}

/**
 * 关闭所有页面，打开到应用内的某个页面
 * @param name {String} window名，默认按页面文件相对 pages 文件夹的路径生成
 * @param params {Object} 页面配置参数，会与默认配置项合并，详细参数见 api.openWin
 * Tip：
 *  1.占用了页面的 viewdisappear 事件
 *  2.关闭所有页面即关闭首页（默认为 root）以外的页面
 */
export function reLaunch(name, params) {
    if (!name) {
        console.error('[redirectTo Warn]: Function requires a name parameter');
        return;
    }
    api.addEventListener({ name: 'viewdisappear' }, () => {
        let windowStack = api.windows();
        for (let i = 1; i < windowStack.length - 1; i++) {
            api.closeWin({
                name: windowStack[i].name
            });
        }
    });
    navigateTo(name, params);
}

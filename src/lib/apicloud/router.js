/**
 * APICloud页面与路由方法的封装：https://docs.apicloud.com/Client-API/api#33
 * Tip：页面跳转使用的是 openTabLayout，关于 openFrame、openFrameGroup 需自行实现
 */
import ava from "@/ava.json";
import { isObject } from "@/lib/utils/validate";

/**
 * 保留当前页面，跳转到应用内的某个页面
 * @param name {String} ava.json 中配置的页面名
 * @param options {Object} 页面的配置参数，详细参数见 api.openWin
 */
export function navigateTo(name, options) {
    let page = Object.assign({}, ava.pages[name]);
    page.url = `widget://${page.url.replace('pages', 'html')}.html`;
    api.openTabLayout(Object.assign({}, ava.window, page, options));
}

/**
 * 关闭当前页面，跳转到应用内的某个页面
 * @param name {String} ava.json 中配置的页面名
 * @param options {Object} 页面的配置参数，详细参数见 api.openWin
 * Tip：占用了页面的 viewdisappear 事件
 */
export function redirectTo(name, options) {
    api.addEventListener({ name: 'viewdisappear' }, () => {
        api.closeWin();
    });
    navigateTo(name, options);
}

/**
 * 关闭所有页面，打开到应用内的某个页面
 * @param name {String} ava.json 中配置的页面名
 * @param options {Object} 页面的配置参数，详细参数见 api.openWin
 * Tip：占用了页面的 viewdisappear 事件
 */
export function reLaunch(name, options) {
    api.addEventListener({ name: 'viewdisappear' }, () => {
        let windowStack = api.windows();
        let rootWindowName = 'root';
        let rootWindowIndex = windowStack.findIndex((window) => window.name === rootWindowName);
        for (let i = rootWindowIndex + 1; i < windowStack.length - 1; i++) {
            api.closeWin({ name: windowStack[i].name });
        }
    });
    navigateTo(name, options);
}

/**
 * 关闭当前页面，返回上一页面或多级页面
 * @param options {Object} 关闭页面的参数，详细参数见 api.closeToWin
 * Eg：
 *  navigateBack() 关闭当前页面
 *  navigateBack({ name: 'home' }) 关闭到 home 页面
 */
export function navigateBack(options) {
    if (isObject(options) && options.name) {
        api.closeToWin(options);
    } else {
        api.closeWin(options);
    }
}

// 获取客户端的屏幕大小
export function getScreenSize() {
    return {
        width: window.screen.width,
        height: window.screen.height
    };
}

// 获取客户端的可用屏幕大小（去除系统任务栏后的屏幕大小）
export function getScreenAvailSize() {
    return {
        width: window.screen.availWidth,
        height: window.screen.availHeight
    };
}

/**
 * 获取浏览器大小
 * 说明：大部分客户端的浏览器窗口可通过缩放调整大小
 */
export function getBrowserSize() {
    return {
        width: window.outerWidth,
        height: window.outerHeight
    };
}

// 获取文档的视口大小
export function getDocumentViewSize() {
    return {
        width: window.innerWidth,
        height: window.innerHeight
    };
}

// 获取文档的可用视口大小（文档视口 - 滚动条）
export function getDocumentViewAvailSize() {
    return {
        width: window.document.documentElement.clientWidth,
        height: window.document.documentElement.clientHeight
    };
}

// 获取文档大小
export function getDocumentSize() {
    return {
        width: window.document.documentElement.scrollWidth,
        height: window.document.documentElement.scrollHeight
    };
}

/**
 * 获取文档在垂直方向的滚动距离
 */
export function getRootScrollTop() {
    return window.scrollY || window.document.body.scrollTop || 0;
}

/**
 * 获取文档在水平方向的滚动距离
 */
export function getRootScrollLeft() {
    return window.scrollX || window.document.body.scrollLeft || 0;
}

/**
 * 获取垂直方向的滚动距离
 * @param el，元素|window，无参时返回文档在垂直方向的滚动距离
 */
export function getScrollTop(el) {
    if (!el) {
        return getRootScrollTop();
    }
    return 'scrollTop' in el ? el.scrollTop : el.scrollY;
}

/**
 * 获取水平方向的滚动距离
 * @param el，元素|window，无参时返回文档在水平方向的滚动距离
 */
export function getScrollLeft(el) {
    if (!el) {
        return getRootScrollLeft();
    }
    return 'scrollLeft' in el ? el.scrollLeft : el.scrollX;
}

/**
 * 设置垂直滚动距离
 * @param el，元素|window
 * @param value，滚动距离像素值
 */
export function setScrollTop(el, value) {
    if ('scrollTop' in el) {
        // element
        el.scrollTop = value;
    } else {
        // window
        el.scrollTo(el.scrollX, value);
    }
}

/**
 * 设置水平滚动距离
 * @param el，元素|window
 * @param value，滚动距离像素值
 */
export function setScrollLeft(el, value) {
    if ('scrollLeft' in el) {
        // element
        el.scrollLeft = value;
    } else {
        // window
        el.scrollTo(value, el.scrollY);
    }
}

/**
 * 获取元素所在的滚动容器（如果指定元素是滚动容器则返回指定元素；如果查找不到滚动容器则返回 root）
 * @param el：指定元素，不指定时直接返回 root
 * @param root：查找滚动容器的终点，默认 window 即窗口滚动条
 * @param direction：查找的滚动方向，默认 vertical，可选值有 vertical垂直方向、horizontal水平方向、auto垂直方向或水平方向
 */
const overflowScrollReg = /scroll|auto/i;
export function getScroller(el, root = window, direction = 'vertical') {
    let overflowAttr;
    switch (direction) {
        case 'auto':
            overflowAttr = 'overflow';
            break;
        case 'vertical':
            overflowAttr = 'overflowY';
            break;
        case 'horizontal':
            overflowAttr = 'overflowX';
            break;
        default:
            // direction 为错误值时使用垂直方向
            overflowAttr = 'overflowY';
    }

    let node = el;
    while (node && node.nodeType === 1 && node.tagName !== 'BODY' && node.tagName !== 'HTML' && node !== root) {
        let nodeStyle = window.getComputedStyle(el);
        if (overflowScrollReg.test(nodeStyle[overflowAttr])) {
            return node;
        }
        node = node.parentNode;
    }
    return root;
}

// 获取元素大小及其相对于文档左上角的位置
export function getBoundingDocumentRect(el) {
    let clientRect = el.getBoundingClientRect();
    return new DOMRect(clientRect.left + getRootScrollLeft(), clientRect.top + getRootScrollTop(), clientRect.width, clientRect.height);
}

/**
 * 获取元素大小及其相对于目标元素左上角的位置
 * @param el：指定元素
 * @param target：目标元素，默认相对于文档左上角（相当于 getBoundingDocumentRect）
 */
export function getBoundingTargetRect(el, target = document.documentElement) {
    let elClientRect = el.getBoundingClientRect();
    let targetClientRect = target.getBoundingClientRect();
    return new DOMRect(
        elClientRect.left - targetClientRect.left,
        elClientRect.top - targetClientRect.top,
        elClientRect.width,
        elClientRect.height,
    );
}

/**
 * 获取元素大小及其与视口的距离（视口大小不计算滚动条）
 * 说明：与 getBoundingClientRect 的区别是，right 与 bottom 值不是相对于视口左上角，而是相对于视口右下角
 */
export function getBoundingClientDistance(el) {
    let clientRect = el.getBoundingClientRect();
    let viewAvailSize = getDocumentViewAvailSize();
    return {
        width: clientRect.width,
        height: clientRect.height,
        top: clientRect.top,
        left: clientRect.left,
        right: viewAvailSize.width - clientRect.right,
        bottom: viewAvailSize.height - clientRect.bottom,
    };
}

/**
 * 获取元素大小及其与文档的距离
 * 说明：与 getBoundingDocumentRect 的区别是，right 与 bottom 值不是相对于文档左上角，而是相对于文档右下角
 */
export function getBoundingDocumentDistance(el) {
    let documentRect = getBoundingDocumentRect(el);
    let documentSize = getDocumentSize();
    return {
        width: documentRect.width,
        height: documentRect.height,
        top: documentRect.top,
        left: documentRect.left,
        right: documentSize.width - documentRect.right,
        bottom: documentSize.height - documentRect.bottom,
    };
}

export const Scroll = {
    getScreenSize,              // 获取客户端的屏幕大小
    getScreenAvailSize,         // 获取客户端的可用屏幕大小
    getBrowserSize,             // 获取浏览器大小
    getDocumentViewSize,        // 获取文档的视口大小
    getDocumentViewAvailSize,   // 获取文档的可用视口大小
    getDocumentSize,            // 获取文档大小

    getRootScrollTop,           // 获取文档在垂直方向的滚动距离
    getRootScrollLeft,          // 获取文档在水平方向的滚动距离
    getScrollTop,               // 获取垂直方向的滚动距离
    getScrollLeft,              // 获取水平方向的滚动距离

    setScrollTop,               // 设置垂直方向的滚动距离
    setScrollLeft,              // 设置水平方向的滚动距离

    getScroller,                // 获取元素所在的滚动容器

    getBoundingDocumentRect,    // 获取元素大小及其相对于文档左上角的位置
    getBoundingTargetRect,      // 获取元素大小及其相对于目标元素左上角的位置

    getBoundingClientDistance,  // 获取元素大小及其与视口的距离
    getBoundingDocumentDistance,// 获取元素大小及其与文档的距离
};

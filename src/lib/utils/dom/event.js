// 是否支持 touch 触摸事件
const SUPPORT_TOUCH = (window.navigator.maxTouchPoints > 0) || 'ontouchstart' in window;

// 是否支持事件监听器参数 passive
// 提升移动端性能、告诉浏览器不想阻止事件的默认行为（listener 永远不会调用 preventDefault 方法）
const SUPPORT_TOUCH_PASSIVE_LISTENER = (function () {
    let support = false;
    try {
        let options = Object.defineProperty({}, 'passive', {
            get() {
                support = true;
            }
        });
        window.addEventListener('test', null, options);
        window.removeEventListener('test', null, options);
    } catch (e) {
        /* no support：不支持 Object.defineProperty 或 addEventListener、removeEventListener */
    }
    return support;
}());

// 需要 passive 的 touch 事件
const TOUCH_PASSIVE_EVENTS = ['touchstart', 'touchmove'];

// 处理多个事件
function handleMultipleEvent(fn, target, types, listener, options) {
    types.forEach(function (type) {
        fn(target, type, listener, options);
    });
}

/**
 * 添加事件监听器
 * @param {Element|Object} target 文档上的 Element、Document、Window，也可以是任何支持事件的对象（如 XMLHttpRequest）
 * @param {String|String[]} type 事件类型
 * @param {Function} listener 事件处理函数
 * @param {Boolean|Object} options 与事件处理函数相关的可选参数对象
 */
export function on(target, type, listener, options) {
    if (Array.isArray(type)) {
        return handleMultipleEvent(on, target, type, listener, options);
    }
    if (options === void 0) {
        // 默认使用冒泡事件监听器、支持 passive 将其设为 true
        if (SUPPORT_TOUCH_PASSIVE_LISTENER && TOUCH_PASSIVE_EVENTS.indexOf(type) > -1) {
            options = {
                passive: true,
                capture: false,
            };
        } else {
            options = false;
        }
    }
    target.addEventListener(type, listener, options)
}

/**
 * 移除事件监听器
 * @param {Element|Object} target 文档上的 Element、Document、Window，也可以是任何支持事件的对象（如 XMLHttpRequest）
 * @param {String|String[]} type 事件类型
 * @param {Function} listener 事件处理函数
 * @param {Boolean} options 与事件处理函数相关的可选参数对象
 */
export function off(target, type, listener, options) {
    if (Array.isArray(type)) {
        return handleMultipleEvent(off, target, type, listener, options);
    }
    if (options === void 0) {
        // 默认移除冒泡事件监听器
        options = false;
    }
    target.removeEventListener(type, listener, options);
}

/**
 * 添加一次性事件监听器
 * @param {Element|Object} target 文档上的 Element、Document、Window，也可以是任何支持事件的对象（如 XMLHttpRequest）
 * @param {String|String[]} type 事件类型
 * @param {Function} listener 事件处理函数
 * @param {Boolean|Object} options 与事件处理函数相关的可选参数对象
 */
export function one(target, type, listener, options) {
    if (Array.isArray(type)) {
        return handleMultipleEvent(one, target, type, listener, options);
    }
    on(target, type, function () {
        off(target, type, listener, options);
        listener.apply(this, arguments);
    }, options);
}

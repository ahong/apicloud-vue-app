import { isObject } from "@/lib/utils/validate/data-type/is-object";
const DEFAULT_CONFIRM_TEXT = '确定';
const DEFAULT_CANCEL_TEXT = '取消';

/**
 * 显示延迟关闭的消息提示框
 * 底层：api.toast
 * @param options {String|Object} 提示的内容 或 配置项
 * 配置项：
 *  content: 提示的内容
 *  duration：提示的持续时长，单位毫秒，默认值 2000
 *  location：提示的弹出位置，可选值有 top、middle、bottom，默认值 middle
 *  global：是否为全局提示，默认值 false
 * 备注：
 *  【底层 Android Bug】global 为 true 时，Android 的 duration 会失效，一直表现为 2000 左右
 */
export function showToast(options) {
    if (!isObject(options)) {
        options = { content: options };
    }
    options = Object.assign({
        location: 'middle',
    }, options);
    api.toast({
        msg: options.content,
        duration: options.duration,
        location: options.location,
        global: options.global,
    });
}

/**
 * 显示加载提示框
 * 底层：api.showProgress
 * @param options {String|Object} 提示框的内容 或 配置项
 * 配置项：
 *  title: 提示框的标题
 *  content: 提示框的内容
 *  animation: 提示框的显示动画，默认值 fade，可选值有 fade（渐显渐隐）、zoom（缩放）
 *  modal: 提示框是否模态，模态时整个页面不可交互，默认值 true
 *  global: 【非底层实现，仅iOS支持】是否全局显示提示框，默认值 false
 * 备注：
 *  【表现】标题、内容所能显示的字数有限，只能在提示框的宽度内显示一行，超过时会显示省略号
 *  【表现】animation 为 zoom 时，iOS 是放大显示，Android 是缩小显示
 *  【特性】global 为 true 时，所有页面都会显示加载提示框（基于页面模板 public/page.html 中的 showProgress 事件实现）
 *  【底层】Android 仅支持在当前页面（最上层 window）调用 api.showProgress，在隐藏页面调用接口无效，这是 global 仅 iOS 支持的原因
 *  【底层】加载提示框是依附于 window 的，在 window 与 frame 调用都能显示，但显示的是同一个
 */
export function showProgress(options) {
    if (!isObject(options)) {
        options = { content: options || '' };
    }
    options = Object.assign({
        title: '',
        content: '',
    }, options);
    if (options.global && api.systemType === 'ios') {
        api.sendEvent({
            name: 'showProgress',
            extra: options
        });
    } else {
        api.showProgress({
            title: options.title,
            text: options.content,
            modal: options.modal,
            animationType: options.animation,
        });
    }
}

/**
 * 隐藏加载提示框
 * 底层：api.hideProgress
 * @param options {String|Object} 提示框的内容 或 配置项
 * 配置项：
 *  global: 【非底层实现，仅iOS支持】是否全局隐藏提示框，默认值 false
 * 备注：
 *  【表现】会使用与 showProgress 对应的 animation 动画进行隐藏，当 animation 为 zoom 时，Android 会缩小隐藏，但 iOS 表现得与 fade 相同
 *  【特性】global 为 true 时，所有页面都会隐藏加载提示框（基于页面模板 public/page.html 中的 hideProgress 事件实现）
 */
export function hideProgress(options) {
    if (options.global && api.systemType === 'ios') {
        api.sendEvent({ name: 'hideProgress' });
    } else {
        api.hideProgress();
    }
}

/**
 * 显示带一个按钮的对话框
 * 底层：api.alert
 * @param options {Object} 配置项
 * 配置项：
 *  title: 对话框标题
 *  content: 对话框内容
 *  confirmText：确定按钮的文字，默认值 '确定'
 * @returns {Promise} Promise.then：点击对话框按钮后触发
 * 备注：
 *  【表现】点击按钮后对话框会自动关闭，无法阻止
 */
export function showAlert(options) {
    options = Object.assign({
        title: '',
        confirmText: DEFAULT_CONFIRM_TEXT
    }, options);
    return new Promise((resolve) => {
        api.alert({
            title: options.title,
            msg: options.content,
            buttons: [options.confirmText]
        }, (res) => {
            if (res.buttonIndex === 1) {
                resolve();
            }
        });
    });
}

/**
 * 显示带两个或三个按钮的对话框
 * 底层：api.confirm
 * @param options {Object} 配置项
 * 配置项：
 *  title: 对话框标题
 *  content: 对话框内容
 *  confirmText：确定按钮的文字，无法置空，默认值 '确定'
 *  secondaryText：次确定按钮的文字，为空时不显示此按钮，默认值空
 *  cancelText：取消按钮的文字，无法置空，默认值 '取消'
 * @returns {Promise} Promise.then：点击对话框按钮后触发
 *  回调参数 res.event：confirm 点击了确定、secondary 点击了次确定、cancel 点击了取消
 * 备注：
 *  【表现】点击按钮后对话框会自动关闭，无法阻止
 *  【底层】api.confirm 最终需要显示两个按钮、或三个按钮，但 iOS 与 Android 的按钮交互位置不统一，此方法做了修复，使其更符合用户交互
 *      详情一：无按钮时，api.confirm 会提供 取消、确定 按钮，iOS 是左取消右确定，Android 是左确定右取消
 *      详情二：一个按钮时，api.confirm 会补一个取消按钮在右边，但此时 Android 会一直使用 '确定' 作为第一个按钮的文字，无法修改
 *      详情三：两个按钮时，iOS 与 Android 按钮的交互位置是反的
 *      详情四：三个按钮时，iOS 与 Android 按钮的交互位置不统一，难以描述
 */
export function showConfirm(options) {
    options = Object.assign({
        title: '',
    }, options);
    if (!options.confirmText) {
        options.confirmText = DEFAULT_CONFIRM_TEXT;
    }
    if (!options.cancelText) {
        options.cancelText = DEFAULT_CANCEL_TEXT;
    }
    let buttons;
    let isIOS = api.systemType === 'ios';
    if (options.secondaryText) {
        // 存在次确定按钮
        if (isIOS) {
            buttons = [
                { key: 'confirm', text: options.confirmText },
                { key: 'secondary', text: options.secondaryText },
                { key: 'cancel', text: options.cancelText },
            ];
        } else {
            buttons = [
                { key: 'secondary', text: options.secondaryText },
                { key: 'cancel', text: options.cancelText },
                { key: 'confirm', text: options.confirmText },
            ];
        }
    } else {
        if (isIOS) {
            buttons = [
                { key: 'cancel', text: options.cancelText },
                { key: 'confirm', text: options.confirmText },
            ];
        } else {
            buttons = [
                { key: 'confirm', text: options.confirmText },
                { key: 'cancel', text: options.cancelText },
            ];
        }
    }
    return new Promise((resolve) => {
        api.confirm({
            title: options.title,
            msg: options.content,
            buttons: buttons.map((item) => item.text)
        }, (res) => {
            resolve({ event: buttons[res.buttonIndex - 1].key });
        });
    });
}

/**
 * 显示带 两个或三个按钮 和 输入框 的对话框
 * 底层：api.prompt
 * @param options {Object} 配置项
 * 配置项：
 *  type：输入类型，不同输入类型会弹出不同的键盘，默认值 text，可选值有：
 *      text：文本类型
 *      password：密码类型，输入的内容在显示时会转为小黑点进行隐藏
 *      number：数字类型，弹出数字键盘
 *      email：邮箱地址类型
 *      url：链接类型
 *  value：输入框的初始内容
 *  title: 对话框标题
 *  content: 对话框内容
 *  confirmText：确定按钮的文字，无法置空，默认值 '确定'
 *  secondaryText：次确定按钮的文字，为空时不显示此按钮，默认值空
 *  cancelText：取消按钮的文字，无法置空，默认值 '取消'
 * @returns {Promise} Promise.then：点击对话框按钮后触发
 *  回调参数 res.value：输入的内容
 *  回调参数 res.event：confirm 点击了确定、secondary 点击了次确定、cancel 点击了取消
 * 备注：见 showConfirm 的备注
 */
export function showPrompt(options) {
    options = Object.assign({
        title: '',
    }, options);
    if (!options.confirmText) {
        options.confirmText = DEFAULT_CONFIRM_TEXT;
    }
    if (!options.cancelText) {
        options.cancelText = DEFAULT_CANCEL_TEXT;
    }
    let buttons;
    let isIOS = api.systemType === 'ios';
    if (options.secondaryText) {
        // 存在次确定按钮
        if (isIOS) {
            buttons = [
                { key: 'confirm', text: options.confirmText },
                { key: 'secondary', text: options.secondaryText },
                { key: 'cancel', text: options.cancelText },
            ];
        } else {
            buttons = [
                { key: 'secondary', text: options.secondaryText },
                { key: 'cancel', text: options.cancelText },
                { key: 'confirm', text: options.confirmText },
            ];
        }
    } else {
        if (isIOS) {
            buttons = [
                { key: 'cancel', text: options.cancelText },
                { key: 'confirm', text: options.confirmText },
            ];
        } else {
            buttons = [
                { key: 'confirm', text: options.confirmText },
                { key: 'cancel', text: options.cancelText },
            ];
        }
    }
    return new Promise((resolve) => {
        api.prompt({
            type: options.type,
            text: options.value,
            title: options.title,
            msg: options.content,
            buttons: buttons.map((item) => item.text)
        }, (res) => {
            resolve({
                value: res.text,
                event: buttons[res.buttonIndex - 1].key
            });
        });
    });
}

/**
 * 显示底部弹出的操作菜单
 * 底层：api.actionSheet
 * @param options {Object} 配置项
 * 配置项：
 *  title: 操作面板标题
 *  actions：{[String]}操作按钮数组，无数量限制，过多时会有滚动条
 *  dangerText：危险按钮的文字，为空时不显示，默认值空
 *  cancelText：取消按钮的文字，无法置空，默认值 '取消'
 * @returns {Promise} Promise.then：点击操作菜单按钮后触发
 *  回调参数 res.event：action 点击了操作项、danger 点击了危险按钮、cancel 点击了取消按钮或遮罩层
 *  回调参数 res.actionIndex：当 res.event 为 action 时有值，操作项序号，从 0 开始
 * 备注：
 *  【表现】点击按钮后操作面板会自动关闭，无法阻止
 *  【表现】点击遮罩层操作面板会自动关闭，无法设置为不关闭，相当于点击了取消按钮
 *  【底层】api.actionSheet 回调函数返回的 buttonIndex 是根据操作面板的按钮顺序计算的，包括操作按钮、危险按钮、取消按钮（遮罩层）都计算在内，对开发逻辑不友好，此方法做了优化
 *  【底层】取消按钮的文字为空时，取消按钮依然会显示，但 iOS 会有 '取消' 文字，Android 无文字，且不计入 buttonIndex，buttonIndex 的值是理论值减一
 */
export function showActionSheet(options) {
    if (!isObject(options)) {
        options = {};
    }
    if (!options.cancelText) {
        options.cancelText = DEFAULT_CANCEL_TEXT;
    }
    return new Promise((resolve) => {
        api.actionSheet({
            title: options.title,
            cancelTitle: options.cancelText,
            destructiveTitle: options.dangerText,
            buttons: options.actions,
        }, (res) => {
            // 根据按钮显示顺序排序返回值
            let events = new Array(options.actions.length || 0).fill('action');
            if (options.dangerText) {
                events.unshift('danger');
            }

            let resData = {
                event: events[res.buttonIndex - 1]
            };
            if (resData.event === 'action') {
                resData.actionIndex = res.buttonIndex - (options.dangerText ? 2 : 1)
            }
            resolve(resData);
        });
    });
}

/**
 * 显示日期时间选择器
 * 底层：api.openPicker
 * @param options {Object} 配置项
 * 配置项：
 *  title：【仅iOS支持】选择器标题（Android 没有标题的显示位置）
 *  type：选择器类型，默认值 date，可选值有：
 *      date：日期选择（年月日）
 *      time：时间选择（小时、分钟）
 *      date_time：【仅iOS支持】日期时间选择（年月日、小时、分钟），Android 表现为 date 类型
 *  date：选择器的默认日期时间，默认值当前时间，格式如下
 *      当 type 为 date 时，格式为 YYYY-MM-DD
 *      当 type 为 time 时，格式为 HH:mm
 *      当 type 为 date_time 时，格式为 YYYY-MM-DD HH:mm
 *  minDate：【仅iOS支持】可选的最小时间，格式见 date 配置项
 *  maxDate：【仅iOS支持】可选的最大时间，格式见 date 配置项
 *  arrowRect：【仅iPad支持】在 iPad 中显示时，箭头指向的位置，Object 类型
 *  arrowDirection：【仅iPad支持】在 iPad 中显示时，箭头指向的方向，Object 类型
 * @returns {Promise} Promise.then：确定选择后触发
 *  回调参数 res 的字段：year（年）、month（月）、day（日）、hour（小时）、minute（分钟）
 * 备注：
 *  【表现】点击取消按钮时 Android 无回调，iOS 会返回一个 err
 *  【表现】点击遮罩层时 Android 会关闭选择器，无回调，无法设置不关闭，iOS 不会关闭
 *  【表现】iOS 设置 minDate、maxDate 时，仍可滚动选择超出此范围的日期时间，但滚动停止后选择器会相应的回到 minDate 或 maxDate
 *  【底层】关于 date 配置项，iOS 需严格按照 type 类型更改格式，Android 无需更改
 *  【底层】当 type 为 date 时，选择器依然返回小时、分钟，它们的值是打开选择器的时间
 *  【底层】当 type 为 time 时，选择器依然返回年月日，它们的值是打开选择器的日期
 *  【底层】当 type 为 date_time 时，iOS 会将今天的日期改为 '今天' 文案
 */
export function showDatetimePicker(options) {
    options = Object.assign({
        type: 'date',
    }, options);
    return new Promise((resolve) => {
        api.openPicker({
            title: options.title,
            type: options.type,
            date: options.date,
            minDate: options.minDate,
            maxDate: options.maxDate,
            arrowRect: options.arrowRect,
            arrowDirection: options.arrowDirection,
        }, (res) => {
            if (res) {
                resolve(res);
            }
        });
    });
}

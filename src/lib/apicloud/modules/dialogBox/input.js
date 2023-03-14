const defaultOptions = {
    width: 300,
    radius: 8,
    background: '#fff',

    title: '',
    cancelText: '取消',
    cancelColor: '#1890ff',
    cancelBackground: '#f2f3f5',
    confirmText: '确定',
    confirmColor: '#fff',
    confirmBackground: '#1890ff',
    beforeClose: null,      // 对话框关闭前的回调函数，可通过回调参数 close 关闭对话框（拦截了 Promise 状态的改变）

    value: '',              // 输入框的初始内容
    placeholder: '',        // 输入框的提示文案
    keyboard: 'default',    // 输入框的键盘类型：default（默认键盘）、number（数字键盘）、search（搜索键盘）、secure（密码键盘）、forbid（禁用中文）

    closeOnClickMask: false,// 是否在点击遮罩层后关闭对话框：关闭时无回调
};
export default function (options) {
    const close = this.close.bind(this, { dialogName: 'inputbox' });
    const o = Object.assign({}, defaultOptions, options);
    const isIOS = api.systemType === 'ios';

    // 按钮公共样式
    let buttonStyle = {
        // marginB 无效
        w: 120,
        h: 40,
        size: 16,
        corner: 20
    };
    let buttonSpace = (o.width - buttonStyle.w * 2) / 3;

    // 输入框样式
    let inputStyle = {
        h: 48,
        marginT: 16,
        marginLeft: buttonSpace,
        marginRight: buttonSpace,
        textSize: 14,
        textColor: '#323233',
        alignment: 'left',
        verticalCenter: true,
        borderWidth: 1,
        borderColor: '#ebedf0'
    };

    // 高度 = (标题高 + 标题上距离) + (输入框高 + 输入框上距离) + (按钮高 + 按钮下距离) + 输入框与按钮距离
    let height = (24 + 24) + (48 + 16) + (36 + 10) + 24;

    // 按钮的 marginB 字段无效，但安卓按钮默认有 10 的下边距，ios 没有，所以根据系统设定不同的样式
    if (isIOS) {
        buttonStyle.w = o.width / 2;
        buttonStyle.h = 46;
        buttonStyle.corner = 0;
        buttonSpace = 0;
        inputStyle.marginLeft = inputStyle.marginRight = 16;
    }

    return new Promise((resolve, reject) => {
        this.inputbox({
            texts: {
                title: o.title,
                leftBtnTitle: o.cancelText,
                rightBtnTitle: o.confirmText,
                default: o.value,
                placeholder: o.placeholder
            },
            styles: {
                // maskBg 不能传，存在闪烁的 Bug
                w: o.width,
                h: height,
                bg: o.background,
                corner: o.radius,
                title: {
                    h: 24,
                    marginT: 24,
                    size: 18,
                    color: '#323233',
                    alignment: 'center'
                },
                input: inputStyle,
                dividingLine: {
                    width: 0,
                    color: '#fff'
                },
                left: Object.assign({}, buttonStyle, {
                    marginL: buttonSpace,       // 对金珠手机有效
                    leftMargin: buttonSpace,    // 对我的手机有效
                    color: o.cancelColor,
                    bg: o.cancelBackground
                }),
                right: Object.assign({}, buttonStyle, {
                    marginR: buttonSpace,       // 对金珠手机有效
                    rightMargin: buttonSpace,   // 对我的手机有效
                    color: o.confirmColor,
                    bg: o.confirmBackground,
                }),
                horizontalLine:{
                    height: 0,
                    color: '#fff'
                },
                verticalLine:{
                    width: 0,
                    color: '#fff'
                }
            },
            keyboardType: o.keyboard,
            tapClose: o.closeOnClickMask,
            animation: false
        }, (res) => {
            if (o.beforeClose) {
                let value = res.text,
                    action = res.eventType === 'right' ? 'confirm' : 'cancel';
                o.beforeClose(value, action, close);
            } else {
                close();
                if (res.eventType === 'right') {
                    resolve(res.text);
                } else {
                    reject(res.text);
                }
            }
        })
    });
}

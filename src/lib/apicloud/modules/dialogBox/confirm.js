const defaultOptions = {
    width: 300,
    radius: 8,
    background: '#fff',

    icon: '',               // 显示在标题前面的图标路径，支持 widget://、fs://
    iconSize: 36,
    title: '',
    content: '',            // 支持通过 \n 换行；文本水平居中，无法修改
    cancelText: '取消',
    cancelColor: '#1890ff',
    cancelBackground: '#f2f3f5',
    confirmText: '确定',
    confirmColor: '#fff',
    confirmBackground: '#1890ff',

    closeOnClickMask: false,// 是否在点击遮罩层后关闭对话框：关闭时无回调
}

export default function (options) {
    const o = Object.assign({}, defaultOptions, options);
    const renderTitle = !!(o.title || o.icon);  // 是否渲染标题
    const renderContent = !!o.content;          // 是否渲染内容
    const buttonWidth = 120;                    // 按钮宽度

    // 标题样式、内容样式
    // 共四种情况：标题内容都没有、只有标题、只有内容、标题内容都有
    let titleStyle = {
        marginT: 0,
        titleSize: 0,
        titleColor: '#323233',
        icon: o.icon,
        iconSize: o.iconSize
    };
    let contentStyle = {
        marginT: 24,
        marginB: 0,
        size: 0,
        color: '#323233'
    };
    if (renderTitle) {
        titleStyle.marginT = 24;
        titleStyle.titleSize = 18;
    }
    if (renderContent) {
        contentStyle.marginB = 24;
        contentStyle.size = 16;
    }
    if (renderTitle && renderContent) {
        contentStyle.marginT = 16;
        contentStyle.color = '#646566';
    }

    return new Promise((resolve, reject) => {
        this.alert({
            texts: {
                title: o.title,
                content: o.content,
                leftBtnTitle: o.cancelText,
                rightBtnTitle: o.confirmText
            },
            styles: {
                // maskBg 不能传，存在闪烁的 Bug
                w: o.width,
                bg: o.background,
                corner: o.radius,
                title: titleStyle,
                content: contentStyle,
                left: {
                    w: buttonWidth,
                    h: 40,
                    marginL: (o.width - buttonWidth * 2) / 3,
                    marginB: 24,
                    size: 16,
                    color: o.cancelColor,
                    bg: o.cancelBackground,
                    corner: 20
                },
                right: {
                    w: buttonWidth,
                    h: 40,
                    marginL: (o.width - buttonWidth * 2) / 3,
                    marginB: 24,
                    size: 16,
                    color: o.confirmColor,
                    bg: o.confirmBackground,
                    corner: 20
                },
                horizontalLine:{
                    height: 0,
                    color: '#fff'
                },
                verticalLine:{
                    width: 0,
                    color: '#fff'
                }
            },
            tapClose: o.closeOnClickMask,
            animation: false
        }, (res) => {
            this.close({ dialogName: 'alert' });
            if (res.eventType === 'right') {
                resolve();
            } else {
                reject();
            }
        });
    });
}
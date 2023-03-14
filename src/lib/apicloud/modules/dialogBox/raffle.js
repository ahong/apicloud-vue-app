const defaultOptions = {
    width: 300,
    radius: 8,
    background: '#fff',

    title: '',
    content: '',        // 支持通过 \n 换行；文本水平居中，无法修改
    image: '',          // 支持 widget://、fs://
    imageWidth: 80,
    imageHeight: 80,
    cancelText: '',
    cancelColor: '#1890ff',
    cancelBackground: '#f2f3f5',
    confirmText: '确定',
    confirmColor: '#fff',
    confirmBackground: '#1890ff',

    closeOnClickMask: false,// 是否在点击遮罩层后关闭对话框：关闭时无回调
}
export default function (options) {
    const o = Object.assign({}, defaultOptions, options);
    const isIOS = api.systemType === 'ios';
    const buttonWidth = 120;

    // 标题样式
    let titleStyle = {
        marginT: 0,
        size: 18,
        color: '#323233'
    };
    if (o.title) {
        titleStyle.marginT = 24;
    }

    // 内容样式
    let contentStyle = {
        marginT: 0,
        size: 16,
        color: '#646566',
    };
    if (o.content) {
        contentStyle.marginT = isIOS ? 20 : 12;
    }

    // 图片样式
    let imageStyle = {
        w: 0,
        h: 0,
        marginT: 0,
        iconPath: ''
    };
    if (o.image) {
        if (isIOS) {
            imageStyle.marginT = o.title ? 40 : 44;
        } else {
            imageStyle.marginT = o.title ? 20 : 24;
        }
        imageStyle.w = o.imageWidth;
        imageStyle.h = o.imageHeight;
        imageStyle.iconPath = o.image;
    }

    // 按钮样式
    let leftButtonStyle = {
        w: 0,
        h: 0,
        marginL: 0,
        marginB: isIOS ? 24 : 12,
        size: 16,
        color: o.cancelColor,
        bg: o.cancelBackground,
        corner: 20
    };
    let rightButtonStyle = {
        w: buttonWidth,
        h: 40,
        marginL: (o.width - buttonWidth) / 2,
        marginB: isIOS ? 24 : 12,
        size: 16,
        color: o.confirmColor,
        bg: o.confirmBackground,
        corner: 20
    };
    if (o.cancelText) {
        leftButtonStyle.w = buttonWidth;
        leftButtonStyle.h = 40;
        leftButtonStyle.marginL = (o.width - buttonWidth * 2) / 3;
        rightButtonStyle.marginL = (o.width - buttonWidth * 2) / 3;
    }

    return new Promise((resolve, reject) => {
        this.raffle({
            texts: {
                title: o.title,
                mainText: o.content,
                leftTitle: o.cancelText,
                rightTitle: o.confirmText
            },
            styles: {
                // maskBg: '', // 无效
                w: o.width,
                bg: o.background,
                corner: o.radius,
                title: titleStyle,
                icon: imageStyle,
                main: contentStyle,
                sub: {
                    marginT: isIOS ? 20 : 12,
                    size: 0,
                    color: '#fff',
                },
                left: leftButtonStyle,
                right: rightButtonStyle
            },
            tapClose: o.closeOnClickMask,
            animation: false
        }, (res) => {
            this.close({ dialogName: 'raffle' });
            if (res.eventType === 'right') {
                resolve();
            } else {
                reject();
            }
        });
    });
}

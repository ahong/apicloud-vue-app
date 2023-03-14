const defaultOptions = {
    width: 200,
    height: 300,
    background: 'rgba(0, 0, 0, 0)', // 背景色，仅 iOS 有效
    radius: 8,

    image: '',              // 支持 widget://、fs://
    cancelIcon: '',         // 取消按钮的图标，优先级高于 cancelText
    cancelText: '',         // 取消按钮的文字，使用文字时 Android 按钮有灰色的背景，无法设置
    cancelWidth: 48,
    cancelHeight: 48,

    closeOnClickMask: false,// 是否在点击遮罩层后关闭对话框：关闭时无回调
};
export default function (options) {
    let o = Object.assign({}, defaultOptions, options);
    let safeArea = api.safeArea;
    let windowWidth = api.winWidth,
        windowHeight = api.winHeight;
    let sideSpace = 16;
    let containerWidth = windowWidth - sideSpace * 2,
        containerHeight = windowHeight - safeArea.top - safeArea.bottom - o.cancelHeight - sideSpace * 3;
    let containerRatio = containerWidth / containerHeight;
    let imageRatio = o.width / o.height;

    let renderWidth,
        renderHeight;
    if (imageRatio > containerRatio) {
        renderWidth = Math.min(o.width, containerWidth);
        renderHeight = renderWidth / imageRatio;
    } else {
        renderHeight = Math.min(o.height, containerHeight);
        renderWidth = renderHeight * imageRatio;
    }

    let cancelDistanceBottom = (windowHeight - renderHeight - o.cancelHeight - sideSpace) / 2;
    let imageDistanceBottom = cancelDistanceBottom + o.cancelHeight + sideSpace;

    return new Promise((resolve, reject) => {
        this.discount({
            rect: {
                w: renderWidth,
                h: renderHeight
            },
            texts: {
                cancel: o.cancelText
            },
            styles: {
                maskBg: 'rgba(0, 0, 0, 0.7)',
                bg: o.background,
                corner: o.radius,
                image: {
                    path: o.image,
                    marginB: imageDistanceBottom
                },
                cancel: {
                    icon: o.cancelIcon || o.cancelText,
                    w: o.cancelWidth,
                    h: o.cancelHeight,
                    marginB: cancelDistanceBottom,
                    textSize: 18,
                    textColor: '#fff'
                }
            },
            tapClose: o.closeOnClickMask,
            animation: false
        }, (res) => {
            this.close({ dialogName: 'discount' });
            if (res.eventType === 'image') {
                resolve();
            } else {
                reject();
            }
        });
    });
}

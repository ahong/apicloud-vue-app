const defaultOptions = {
    width: 300,

    title: '',
    content: '',            // 支持通过 \n 换行；文本水平居中，无法修改
    buttons: [],            // 按钮列表，每个按钮可配置：text、width、color、backgroundColor

    closeOnClickMask: false,// 是否在点击遮罩层后关闭对话框：关闭时无回调
};
const defaultButtonStyle = {
    color: '#1890ff',
    backgroundColor: '#fff'
};
export default function (options) {
    const o = Object.assign({}, defaultOptions, options);
    const renderTitle = !!o.title;      // 是否渲染标题
    const renderContent = !!o.content;  // 是否渲染内容

    // 标题样式、内容样式
    // 共四种情况：标题内容都没有、只有标题、只有内容、标题内容都有
    let titleStyle = {
        marginT: 0,
        size: 0,
        color: '#323233',
        bold: true
    };
    let contentStyle = {
        marginT: 0,
        marginB: 12,
        marginHorizental: 16,
        size: 0,
        color: '#646566'
    };
    if (renderTitle) {
        titleStyle.marginT = 24;
        titleStyle.size = 18;
    }
    if (renderContent) {
        contentStyle.marginT = 24;
        contentStyle.size = 16;
    }
    if (renderTitle && renderContent) {
        contentStyle.marginT = 16;
    }

    // 按钮组
    let buttons = o.buttons.map((button) => {
        button = Object.assign({}, defaultButtonStyle, button);
        return {
            text: button.text || '',
            w: button.width || o.width,
            h: 40,
            marginL: 0,
            marginB: 12,
            size: 16,
            color: button.color,
            bg: button.backgroundColor
        }
    });

    return new Promise(resolve => {
        this.evaluation({
            styles: {
                // maskBg 不能传，存在闪烁的 Bug
                w: o.width,
                bg: '#fff',
                corner: 0,
                title: titleStyle,
                content: contentStyle,
                buttons
            },
            texts: {
                title: o.title,
                content: o.content,
                buttons
            },
            tapClose: o.closeOnClickMask,
            animation: false
        }, (action) => {
            this.close({ dialogName: 'evaluation' });
            resolve(action);
        });
    });
}

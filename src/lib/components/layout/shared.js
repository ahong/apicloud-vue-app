/**
 * 组件共享的 Props：
 *  AvaSafeHeader、AvaSafeFooter、AvaSafeNavBar
 */
export const SharedProps = {
    border: Boolean,
    sticky: {
        type: Boolean,
        default: true
    },
    stickyType: {
        validator(value) {
            return ['fixed', 'sticky'].includes(value);
        },
        default: 'sticky'
    },
    zIndex: [Number, String],
    background: String
};

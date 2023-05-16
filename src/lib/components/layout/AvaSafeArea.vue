<!--
    适配顶部状态栏、底部安全区
    Props
        position：安全区的位置，可选值有 top、bottom
    Slots
        default：内容
    Tips
        占用了根元素的 paddingTop 或 paddingBottom，使用组件时不要对根元素设置此样式
-->
<script>
    export default {
        name: "AvaSafeArea",
        props: {
            position: String
        },
        computed: {
            rootStyle() {
                if (this.position === 'top') {
                    return {
                        paddingTop: `${api.safeArea.top}px`
                    };
                } else if (this.position === 'bottom') {
                    return {
                        paddingBottom: `${api.safeArea.bottom}px`
                    };
                }
                return null;
            }
        },
        render(h) {
            return h('div', {
                style: this.rootStyle
            }, this.$slots.default);
        }
    }
</script>
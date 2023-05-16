<!--
    适配顶部状态栏的头部
    Props
        border：是否显示下边框
        sticky：是否固定在顶部
        stickyType：使用 fixed 或 sticky 固定在顶部，默认使用 sticky
        zIndex：定位层级，默认为 1
        background：背景，默认为白色背景
    Slots
        default：内容
    Events
        mounted：组件挂载时触发，返回组件的高度
-->
<script>
    import { isDef } from "@/lib/utils/validate";
    import { safeAreaSharedProps } from "./shared";
    export default {
        name: "AvaSafeHeader",
        props: Object.assign({}, safeAreaSharedProps),
        computed: {
            rootCls() {
                const namespace = 'ava-safe-header';
                return {
                    [namespace]: true,
                    [`${namespace}--hairline`]: this.border,
                    [`${namespace}--${this.stickyType}`]: this.sticky
                };
            },
            rootStyle() {
                const style = {
                    paddingTop: api.safeArea.top + 'px',
                    background: this.background
                };
                if (isDef(this.zIndex)) {
                    style.zIndex = +this.zIndex;
                }
                return style;
            }
        },
        mounted() {
            this.$emit('mounted', this.$refs.rootRef.offsetHeight);
        },
        render(h) {
            return h('div', {
                ref: 'rootRef',
                class: this.rootCls,
                style: this.rootStyle
            }, this.$slots.default);
        }
    }
</script>

<style lang="less">
    .ava-safe-header {
        background-color: #fff;

        &--hairline {
            position: relative;
            z-index: 1;
            .hairline-bottom();
        }
        &--fixed {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            z-index: 1;
        }
        &--sticky {
            position: sticky;
            top: 0;
            z-index: 1;
        }
    }
</style>
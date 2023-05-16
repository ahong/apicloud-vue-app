<!--
    适配底部安全区的底部
    Props
        border：是否显示上边框
        sticky：是否固定在底部
        stickyType：使用 fixed 或 sticky 固定在底部，默认使用 sticky
        zIndex：定位层级，默认为 1
        background：背景，默认为白色背景
        placeholder：是否在标签位置生成一个等高的占位元素，这在 fixed 定位时可能有用
    Slots
        default：内容
    Events
        mounted：组件挂载时触发，返回组件的高度
-->
<script>
    import { isDef } from "@/lib/utils/validate";
    import { safeAreaSharedProps } from "./shared";
    export default {
        name: "AvaSafeFooter",
        props: Object.assign({}, safeAreaSharedProps, {
            placeholder: Boolean
        }),
        data() {
            return {
                rootHeight: 0
            };
        },
        computed: {
            rootCls() {
                const namespace = 'ava-safe-footer';
                return {
                    [namespace]: true,
                    [`${namespace}--hairline`]: this.border,
                    [`${namespace}--${this.stickyType}`]: this.sticky
                };
            },
            rootStyle() {
                const style = {
                    paddingBottom: api.safeArea.bottom + 'px',
                    background: this.background
                };
                if (isDef(this.zIndex)) {
                    style.zIndex = +this.zIndex;
                }
                return style;
            }
        },
        mounted() {
            this.rootHeight = this.$refs.rootRef.offsetHeight;
            this.$emit('mounted', this.rootHeight);
        },
        render(h) {
            const rootVNode = h('div', {
                ref: 'rootRef',
                class: this.rootCls,
                style: this.rootStyle,
            }, this.$slots.default);

            if (this.placeholder) {
                return h('div', {
                    style: {
                        height: `${this.rootHeight}px`
                    }
                }, [rootVNode]);
            }
            return rootVNode;
        }
    }
</script>

<style lang="less">
    .ava-safe-footer {
        background-color: #fff;

        &--hairline {
            position: relative;
            z-index: 1;
            .hairline-top();
        }
        &--fixed {
            position: fixed;
            left: 0;
            right: 0;
            bottom: 0;
            z-index: 1;
        }
        &--sticky {
            position: sticky;
            bottom: 0;
            z-index: 1;
        }
    }
</style>
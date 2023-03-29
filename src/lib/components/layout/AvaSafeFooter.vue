<!--
    适配底部安全区的底部
    Props
        border：是否显示上边框
        sticky：是否固定在底部
        stickyType：使用 fixed 或 sticky 固定在底部，默认使用 sticky
        zIndex：定位层级，默认为 1
        background：背景，默认为白色背景
        placeholder：使用 fixed 固定在底部时，是否在标签位置生成一个等高的占位元素
    Slots
        default：内容
    Events
        mounted：组件挂载时触发，返回组件的高度
-->
<script>
    import { h } from "vue";
    import { isDef } from "@/lib/utils/vue/props";
    export default {
        name: "AvaSafeBottom",
        emits: ['mounted'],
        props: {
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
            background: String,
            placeholder: Boolean
        },
        data() {
            return {
                rootHeight: 0
            };
        },
        computed: {
            rootCls() {
                let namespace = 'ava-safe-footer';
                return {
                    [namespace]: true,
                    [`${namespace}--hairline`]: this.border,
                    [`${namespace}--${this.stickyType}`]: this.sticky
                };
            },
            rootStyle() {
                let style = {
                    paddingBottom: api.safeArea.bottom + 'px'
                };
                if (isDef(this.zIndex)) {
                    style.zIndex = +this.zIndex;
                }
                if (isDef(this.background)) {
                    style.background = this.background;
                }
                return style;
            },
        },
        mounted() {
            this.rootHeight = this.$refs.rootRef.offsetHeight;
            this.$emit('mounted', this.rootHeight);
        },
        render() {
            let rootVnode = h('div', {
                ref: 'rootRef',
                class: this.rootCls,
                style: this.rootStyle,
            }, this.$slots);

            if (this.sticky && this.stickyType === 'fixed' && this.placeholder) {
                return h('div', {
                    style: { height: `${this.rootHeight}px` }
                }, [rootVnode]);
            } else {
                return rootVnode;
            }
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
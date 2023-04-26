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
    import { ref, computed, onMounted, h } from "vue";
    import { isDef } from "@/lib/utils/validate";
    import { sharedProps } from "./shared";
    export default {
        name: "AvaSafeFooter",
        emits: ['mounted'],
        props: Object.assign({}, sharedProps, {
            placeholder: Boolean
        }),
        setup(props, { emit, slots }) {
            const rootRef = ref();
            const rootHeight = ref(0);
            const rootCls = computed(() => {
                const namespace = 'ava-safe-footer';
                return {
                    [namespace]: true,
                    [`${namespace}--hairline`]: props.border,
                    [`${namespace}--${props.stickyType}`]: props.sticky
                };
            });
            const rootStyle = computed(() => {
                const style = {
                    paddingBottom: api.safeArea.bottom + 'px',
                    background: props.background
                };
                if (isDef(props.zIndex)) {
                    style.zIndex = +props.zIndex;
                }
                return style;
            });
            const renderRoot = () => h('div', {
                ref: rootRef,
                class: rootCls.value,
                style: rootStyle.value,
            }, slots.default && slots.default());

            onMounted(() => {
                rootHeight.value = rootRef.value.offsetHeight;
                emit('mounted', rootHeight.value);
            });

            return () => {
                if (props.placeholder) {
                    return h('div', {
                        style: {
                            height: `${rootHeight.value}px`
                        }
                    }, renderRoot());
                }
                return renderRoot();
            };
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
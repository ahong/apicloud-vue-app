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
    import { ref, computed, onMounted, h } from "vue";
    import { isDef } from "@/lib/utils/vue/props";
    import { SharedProps } from "./shared";
    export default {
        name: "AvaSafeHeader",
        emits: ['mounted'],
        props: Object.assign({}, SharedProps),
        setup(props, { slots, emit }) {
            const rootRef = ref();
            const rootCls = computed(() => {
                const namespace = 'ava-safe-header';
                return {
                    [namespace]: true,
                    [`${namespace}--hairline`]: props.border,
                    [`${namespace}--${props.stickyType}`]: props.sticky
                };
            });
            const rootStyle = computed(() => {
                const style = {
                    paddingTop: api.safeArea.top + 'px',
                    background: props.background
                };
                if (isDef(props.zIndex)) {
                    style.zIndex = +props.zIndex;
                }
                return style;
            });
            onMounted(() => {
                emit('mounted', rootRef.value.offsetHeight);
            });
            return () => h('div', {
                ref: rootRef,
                class: rootCls.value,
                style: rootStyle.value
            }, slots.default && slots.default());
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
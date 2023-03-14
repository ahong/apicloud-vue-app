<!--
    适配状态栏的安全头部
    Slots
        default：头部内容
    Events
        mounted：头部挂载时触发，返回头部的高度
-->
<template>
    <div :class="rootCls" :style="rootStyle">
        <slot></slot>
    </div>
</template>

<script>
    import { isDef } from "@/lib/utils/vue/props";
    export default {
        name: "AvaSafeHeader",
        props: {
            border: Boolean,            // 是否显示下边框
            sticky: {                   // 是否固定在顶部
                type: Boolean,
                default: true
            },
            stickyType: {               // 使用 fixed 或 sticky 固定在顶部，默认使用 sticky
                validator(value) {
                    return ['fixed', 'sticky'].includes(value);
                },
                default: 'sticky'
            },
            zIndex: [Number, String],   // 定位层级，默认为 1
            background: String,         // 背景，默认为白色背景
        },
        computed: {
            rootCls() {
                let namespace = 'ava-safe-header';
                return {
                    [namespace]: true,
                    [`${namespace}--hairline`]: this.border,
                    [`${namespace}--${this.stickyType}`]: this.sticky
                };
            },
            rootStyle() {
                let style = {
                    paddingTop: api.safeArea.top + 'px'
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
            this.$nextTick(() => {
                this.$emit('mounted', this.$el.offsetHeight);
            });
        },
    }
</script>

<style lang="less">
    .ava-safe-header {
        background-color: #fff;

        &--hairline {
            border-bottom: 0.5px solid @gray-3;
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
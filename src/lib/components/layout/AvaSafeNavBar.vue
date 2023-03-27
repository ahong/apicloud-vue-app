<!--
    适配状态栏的安全导航栏
    Slots
        left：自定义导航栏左侧内容
        right：自定义导航栏右侧内容
        title：自定义标题内容
        default：显示在导航栏下面的内容
    Events
        click-left：点击左侧区域时触发
        click-right：点击右侧区域时触发
-->
<template>
    <div :class="rootCls" :style="rootStyle">
        <div class="nav-bar">
            <div class="nav-bar-left">
                <slot name="left">

                </slot>
            </div>
            <div class="nav-bar-title">
                <slot name="title">

                </slot>
            </div>
            <div class="nav-bar-right">
                <slot name="right">

                </slot>
            </div>
        </div>
        <slot></slot>
    </div>
</template>

<script>
    import { isDef } from "@/lib/utils/vue/props";
    export default {
        name: 'AvaSafeNavBar',
        props: {
            border: Boolean,            // 是否显示下边框
            sticky: {                   // 是否固定在顶部
                type: Boolean,
                default: true
            },
            stickyType: {               // 使用 fixed 或 sticky 固定在顶部，默认使用 sticky
                validator(val) {
                    return ['fixed', 'sticky'].includes(val);
                },
                default: 'sticky'
            },
            zIndex: [Number, String],   // 定位层级，默认为 1
            background: String,         // 背景，默认为白色背景

            // NavBar
            title: String,  // 导航栏标题
            color: String,  // 导航栏字体、图标颜色，默认为 323233
            leftArrow: {    // 是否显示导航栏默认的左侧箭头
                type: Boolean,
                default: true
            }
        },
        computed: {
            rootCls() {
                let namespace = 'ava-safe-nav-bar';
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

<style scoped lang="less">
    .ava-safe-nav-bar {
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
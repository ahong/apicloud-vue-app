<!--
    适配状态栏的安全导航栏
    Slots
        left：自定义导航栏左侧内容
        right：自定义导航栏右侧内容
        title：自定义标题内容
        default：显示在导航栏下面的内容
    Events
        mounted：组件挂载时触发，返回组件的高度
        navigate-back：点击导航栏左侧箭头时触发
-->
<template>
    <div :class="rootCls" :style="rootStyle">
        <div class="ava-nav-bar" :style="navBarStyle">
            <div class="ava-nav-bar-left">
                <slot name="left">
                    <i v-if="leftArrow" class="ava-icon ava-icon-arrow-left" @click="onClickLeftArrow"></i>
                </slot>
            </div>
            <div class="ava-ellipsis ava-nav-bar-title">
                <slot name="title">{{ title }}</slot>
            </div>
            <div class="ava-nav-bar-right">
                <slot name="right"></slot>
            </div>
        </div>
        <slot></slot>
    </div>
</template>

<script>
    import { navigateBack } from "@/lib/apicloud/route";
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
            navBarStyle() {
                return isDef(this.color) ? { color: this.color } : null;
            }
        },
        mounted() {
            this.$emit('mounted', this.$el.offsetHeight);
        },
        methods: {
            onClickLeftArrow() {
                let { onNavigateBack } = this.$attrs;
                if (onNavigateBack) {
                    onNavigateBack();
                } else {
                    navigateBack();
                }
            }
        }
    }
</script>

<style lang="less">
    .ava-safe-nav-bar {
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

        .ava-nav-bar {
            position: relative;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 46px;
            color: @gray-8;
            user-select: none;

            &-left,
            &-right {
                position: absolute;
                top: 0;
                bottom: 0;
                display: flex;
                align-items: center;
                padding: 0 @padding-md;
                font-size: @font-size-md;

                .ava-icon {
                    font-size: 20px;
                }
            }
            &-left {
                left: 0;
            }
            &-right {
                right: 0;
            }

            &-title {
                max-width: 70%;
                font-size: @font-size-lg;
                font-weight: 600;
            }
        }
    }
</style>
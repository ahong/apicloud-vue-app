<!--
    适配顶部状态栏、底部安全区
    Slots
        default：内容
    Tips
        占用了根元素的 paddingTop 或 paddingBottom，使用组件时不要对根元素设置此样式
-->
<template>
    <div :style="rootStyle"><slot></slot></div>
</template>

<script>
    export default {
        name: "AvaSafeArea",
        props: {
            position: String    // 安全区的位置，可选值有 top、bottom
        },
        computed: {
            rootStyle() {
                let style = {};
                if (this.position === 'top') {
                    style.paddingTop = api.safeArea.top + 'px';
                } else if (this.position === 'bottom') {
                    style.paddingBottom = api.safeArea.bottom + 'px';
                }
                return style;
            }
        }
    }
</script>
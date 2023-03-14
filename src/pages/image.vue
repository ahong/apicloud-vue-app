<template>
    <img :src="`${publicPath}/image/logo.png`" alt="">
    <img :src="logoURL" alt="">
    <div class="logo"></div>
</template>

<script>
    export default {
        name: "image",
        computed: {
            logoURL() {
                return `${this.publicPath}/image/logo.png`;
            },
            logoBackground() {
                return `url('${this.publicPath}/image/logo.png')`;
            }
        }
    }
</script>

<style scoped lang="less">
    .logo {
        width: 100px;
        height: 100px;
        background: v-bind(logoBackground);
    }
</style>
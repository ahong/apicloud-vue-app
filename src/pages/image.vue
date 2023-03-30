<template>
    <AvaSafeNavBar title="图片资源页"></AvaSafeNavBar>
    <div>123</div>
    <AvaImage :src="logoURL" width="100" height="100" cache @click="onClickAvaImage"></AvaImage>
    <br>
    <img :src="logoURL" alt="">
    <br>
    <div class="logo"></div>
</template>

<script>
    import AvaImage from "@/lib/components/AvaImage";
    import AvaSafeNavBar from "@/lib/components/layout/AvaSafeNavBar";
    export default {
        name: "image",
        components: { AvaImage, AvaSafeNavBar },
        computed: {
            logoURL() {
                return `${this.publicPath}/image/logo.png`;
            },
            logoBackground() {
                return `url('${this.publicPath}/image/logo.png')`;
            }
        },
        methods: {
            onClickAvaImage() {
                console.log('onClickAvaImage');
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
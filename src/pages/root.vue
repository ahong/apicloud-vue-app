<template>
    <AvaSafeHeader border sticky-type="fixed" @mounted="onSafeHeaderMounted">
        <div>AvaSafeHeader</div>
    </AvaSafeHeader>
    <div style="height: 25vh; background-color: #fff"></div>
    <div style="height: 25vh; background-color: #f00"></div>
    <div style="height: 25vh; background-color: #0f0"></div>
    <div style="height: 25vh; background-color: #00f"></div>
    <div @click="navigateToLogin">登录测试页</div>
    <div @click="navigateToImage">静态资源测试页</div>
    <AvaSafeFooter border sticky-type="fixed" @mounted="onSafeFooterMounted">
        AvaSafeFooter
    </AvaSafeFooter>
</template>

<script>
    import AvaSafeHeader from "@/lib/components/layout/AvaSafeHeader";
    import AvaSafeFooter from "@/lib/components/layout/AvaSafeFooter";
    import { navigateTo } from "@/lib/apicloud/route";
    export default {
        name: 'root',
        components: { AvaSafeHeader, AvaSafeFooter },
        data() {
            return {
                message: 'message',
            };
        },
        computed: {
            logoURL() {
                return `${this.publicPath}/image/logo.png`;
            },
            logoBackground() {
                return `url('${this.publicPath}/image/logo.png')`;
            }
        },
        methods: {
            onSafeHeaderMounted(height) {
                console.log('header height：', height);
            },
            onSafeFooterMounted(height) {
                console.log('footer height：', height);
            },
            navigateToLogin() {
                navigateTo('login', {
                    pageParam: {
                        // message: '从 root 页面来'
                    }
                });
            },
            navigateToImage() {
                navigateTo('image');
            },
        }
    };
</script>

<style scoped lang="less">
    .bgi {
        width: 100px;
        height: 100px;
    }
</style>
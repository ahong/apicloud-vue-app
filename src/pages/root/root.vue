<!-- App首页 -->
<template>
    <div class="root">
        <h1 class="root-title">App首页</h1>
        <div class="root-link" @click="navigateToLogin">点我去登录页</div>
        <div class="root-link" @click="navigateToGithub">点我去网页</div>
    </div>
</template>

<script>
    import Config from "@/config";
    import { navigateTo } from "@/app-modules/app/router";
    export default {
        name: "root",
        beforeCreate() {
            api.setStatusBarStyle({
                style: 'dark',
                color: 'rgba(255, 255, 255, 0)'
            });
        },
        methods: {
            navigateToLogin() {
                navigateTo('default-login');
            },
            navigateToGithub() {
                navigateTo('webview', {
                    url: Config.homepage
                });
            }
        }
    }
</script>

<style scoped lang="scss">
    @import "@/style/var";
    .root {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 100vh;

        &-title {
            color: $primary-color;
            text-align: center;
        }
        &-link {
            margin-top: $padding-xs;
            font-size: $font-size-xl;
            color: $gray-6;
        }
    }
</style>
<template>
    <div>
        <AvaSafeHeader @mounted="safeHeaderHeight = $event">height：{{ safeHeaderHeight }}</AvaSafeHeader>
        <div style="height: 25vh; background-color: #fff">123</div>
        <div @click="navigateToLogin">登录测试页</div>
        <AvaNavigator name="image">静态资源测试页</AvaNavigator>
        <AvaSafeFooter :sticky-type="footerStickyType" :placeholder="placeholder" @mounted="onSafeFooterMounted">
            AvaSafeFooter
        </AvaSafeFooter>
    </div>
</template>

<script>
    import AvaSafeHeader from "@/lib/components/layout/AvaSafeHeader";
    import AvaSafeFooter from "@/lib/components/layout/AvaSafeFooter";
    import AvaNavigator from "@/lib/components/route/AvaNavigator";
    import { navigateTo } from "@/lib/apicloud/route";
    export default {
        name: 'root',
        components: { AvaNavigator, AvaSafeHeader, AvaSafeFooter },
        data() {
            return {
                position: '',
                safeHeaderHeight: 0,
                footerStickyType: 'sticky',
                placeholder: false,
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
        created() {
            console.log(123);
            setTimeout(() => {
                this.footerStickyType = 'fixed';
                setTimeout(() => {
                    this.placeholder = true;
                }, 10000);
            }, 5000);

            Promise.allSettled([
                Promise.resolve(),
                Promise.reject()
            ]).then(() => {
                this.a = 'testResolve';
            }).catch(() => {
                this.b = 'testReject';
            });
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
                        message: '从 root 页面来'
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
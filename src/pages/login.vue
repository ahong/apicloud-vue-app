<template>
    <AvaSafeNavBar title="登录页" @navigate-back="onNavigateBack"></AvaSafeNavBar>
    <div class="root">{{ message }}</div>
    <div>{{ pageParam.message }}</div>
</template>

<script>
    import AvaSafeNavBar from "@/lib/components/layout/AvaSafeNavBar";
    import { usePageParam } from "@/lib/composables/use-page-param";
    export default {
        name: 'root',
        components: { AvaSafeNavBar },
        setup() {
            console.log('setup');
            const pageParam = usePageParam({
                message: '这里是默认参数'
            });
            return {
                pageParam
            };
        },
        data() {
            console.log('data');
            console.log(this.pageParam.message);
            return {
                message: 'message'
            };
        },
        beforeCreate() {
            console.log('beforeCreate');
        },
        methods: {
            onNavigateBack() {
                console.log('login onNavigateBack');
            }
        },
    };
</script>

<style scoped lang="less">
    .root {
        width: 100px;
        height: 100px;
    }
</style>
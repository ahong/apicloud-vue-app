<template>
    <div>
        <AvaSafeNavBar title="登录页" @navigate-back="onNavigateBack"></AvaSafeNavBar>
        <div class="root">{{ message }}</div>
        <div>{{ pageParam.message }}</div>
    </div>
</template>

<script>
    import AvaSafeNavBar from "@/lib/components/layout/AvaSafeNavBar";
    import { PageParamMixin } from "@/lib/mixins/page-param";
    export default {
        name: 'root',
        mixins: [PageParamMixin],
        components: { AvaSafeNavBar },
        data() {
            return {
                pageParam: {
                    message: '这里是默认参数'
                },
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
<!-- App首页 -->
<template>
    <h1>App首页</h1>
</template>

<script>
    export default {
        name: "root",
        beforeCreate() {
            api.setStatusBarStyle({
                style: 'dark',
                color: 'rgba(255, 255, 255, 0)'
            });
        }
    }
</script>

<style scoped lang="scss">
    @import "@/style/var";
    h1 {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        color: $primary-color;
        text-align: center;
    }
</style>
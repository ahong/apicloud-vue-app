<!--
    页面跳转组件：对应 lib/apicloud/route.js 的功能
    Props
        tag：根节点的 HTML 标签
        type：页面跳转方式，默认为 navigateTo
        name：路由方法需要的 name 参数，具体见 route.js
        options：路由方法需要的 options 参数，具体见 route.js
-->
<script>
    import { h } from "vue";
    import * as Route from "@/lib/apicloud/route";
    export default {
        name: "AvaNavigator",
        props: {
            tag: {
                type: String,
                default: 'div'
            },
            type: {
                type: String,
                default: 'navigateTo',
                validate(value) {
                    return ['navigateTo', 'redirectTo', 'reLaunch', 'navigateBack'].includes(value);
                }
            },
            name: String,
            options: Object
        },
        setup(props, { slots }) {
            let children = slots.default && slots.default();
            function onClick() {
                if (props.type === 'navigateBack') {
                    Route.navigateBack(props.options);
                } else {
                    Route[props.type](props.name, props.options);
                }
            }
            return () => h(this.tag, { onClick }, children);
        }
    }
</script>
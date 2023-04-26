<!--
    矢量图标
    Props
        tag：根节点的 HTML 标签名，默认为 i
        name：图标名称
        classPrefix：类名前缀，用于使用自定义图标，默认为 ava-icon
        size：图标大小，默认单位 px
        color，图标颜色
-->
<script>
    import { computed, h } from "vue";
    import { addUnit } from "@/lib/utils/web-api/style";
    export default {
        name: "AvaIcon",
        props: {
            tag: {
                type: String,
                default: 'i'
            },
            name: String,
            classPrefix: {
                type: String,
                default: 'ava-icon'
            },
            size: [Number, String],
            color: String
        },
        setup(props) {
            const rootCls = computed(() => {
                return [props.classPrefix, `${props.classPrefix}-${props.name}`];
            });
            const rootStyle = computed(() => {
                return {
                    fontSize: addUnit(props.size),
                    color: props.color
                };
            });
            return () => h(props.tag, {
                class: rootCls.value,
                style: rootStyle.value
            });
        }
    }
</script>

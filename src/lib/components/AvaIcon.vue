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
        computed: {
            rootCls() {
                return [this.classPrefix, `${this.classPrefix}-${this.name}`];
            },
            rootStyle() {
                return {
                    fontSize: addUnit(this.size),
                    color: this.color
                };
            }
        },
        render(h) {
            return h(this.tag, {
                class: this.rootCls,
                style: this.rootStyle
            });
        }
    }
</script>

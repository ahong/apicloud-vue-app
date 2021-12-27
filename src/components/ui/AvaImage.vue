<!--
    增强版的 img 标签：
        1.多种图片填充模式、圆角、圆形图
        2.加载中提示、失败中提示
        3.小红点、徽标内容
        4.APICloud 的图片缓存功能

    图片填充模式：
        fill：拉伸图片，使图片填满元素
        cover：保持宽高比缩放图片，使图片的短边能完全显示出来，裁剪长边
        contain：保持宽高比缩放图片，使图片的长边能完全显示出来
        none：保持图片原有尺寸
        scale-down：取 none 或 contain 中较小的一个
-->
<template>
    <div class="ava-image" :style="rootStyle" @click="onClick">
        <img :src="renderSrc" :alt="alt" width="100%" height="100%" :style="imageStyle" @load="onLoad" @error="onError" class="ava-image-img">
        <div v-if="showLoading && isLoading" class="ava-image-status">
            <slot name="loading">
                <Icon :name="loadingIcon" :class-prefix="loadingIconPrefix" class="ava-image-status-icon"/>
            </slot>
        </div>
        <div v-if="showError && isError" class="ava-image-status">
            <slot name="error">
                <Icon :name="errorIcon" :class-prefix="errorIconPrefix" class="ava-image-status-icon"/>
            </slot>
        </div>
        <template>
            <div v-if="showBadge" class="ava-image-badge">{{ badge }}</div>
            <div v-else-if="dot" class="ava-image-dot"></div>
        </template>
    </div>
</template>

<script>
    import { Icon } from "vant";
    import { isDef } from "@/assets/utils/vue";
    import { addUnit } from "@/assets/utils/dom/style";
    export default {
        name: "AvaImage",
        components: { Icon },
        props: {
            src: String,    // 图片链接
            alt: String,    // 替代文本
            fit: String,    // 图片填充模式，默认 fill
            width: [Number, String],    // 宽度，默认单位为 px
            height: [Number, String],   // 高度，默认单位为 px
            radius: [Number, String],   // 圆角大小，默认单位为 px
            round: Boolean,             // 是否显示为圆形，优先级高于 radius
            dot: Boolean,               // 是否显示图片右上角小红点
            badge: [Number, String],    // 图片右上角徽标的内容，优先级高于 dot
            showLoading: {              // 是否展示图片加载中提示
                type: Boolean,
                default: true
            },
            loadingIcon: {              // 加载中提示的图标名称或图片链接
                type: String,
                default: 'photo'
            },
            loadingIconPrefix: String,  // 加载中提示的图标类名前缀
            showError: {                // 是否展示图片加载失败提示
                type: Boolean,
                default: true
            },
            errorIcon: {                // 加载失败提示的图标名称或图片链接
                type: String,
                default: 'photo-fail'
            },
            errorIconPrefix: String,    // 加载失败提示的图标类名前缀
            cache: Boolean              // 是否本地缓存图片
        },
        data() {
            return {
                renderSrc: void 0,
                isLoading: true,
                isError: false
            };
        },
        computed: {
            rootStyle() {
                let style = {};
                let { width, height, radius, round } = this;
                if (isDef(width)) {
                    style.width = addUnit(width);
                }
                if (isDef(height)) {
                    style.height = addUnit(height);
                }
                if (isDef(radius)) {
                    style.borderRadius = addUnit(radius);
                }
                if (round) {
                    style.borderRadius = '50%';
                }
                return style;
            },
            imageStyle() {
                return isDef(this.fit) ? { objectFit: this.fit } : null;
            },
            showBadge() {
                return isDef(this.badge);
            }
        },
        watch: {
            src: {
                handler: 'setRenderSrc',
                immediate: true
            },
            cache: 'setRenderSrc',
            renderSrc() {
                this.isLoading = true;
                this.isError = false;
            }
        },
        methods: {
            setRenderSrc() {
                let { src, cache } = this;
                if (cache && isDef(src)) {
                    api.imageCache({
                        url: src,
                        policy: 'cache_only',
                        thumbnail: false
                    }, (res) => {
                        if (res.status) {
                            this.renderSrc = res.url;
                        } else {
                            this.renderSrc = src;
                        }
                    });
                } else {
                    this.renderSrc = src;
                }
            },
            onLoad(event) {
                this.isLoading = false;
                this.$emit('load', event);
            },
            onError(event) {
                this.isLoading = false;
                this.isError = true;
                this.$emit('error', event);
            },
            onClick(event) {
                this.$emit('click', event);
            }
        }
    }
</script>

<style scoped lang="scss">
    @import "../../style/var";
    .ava-image {
        position: relative;
        display: inline-block;
        vertical-align: middle;

        &-img,
        &-status {
            border-radius: inherit;
        }
        &-status {
            position: absolute;
            top: 0;
            left: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
            height: 100%;
            font-size: $font-size-md;
            color: $gray-6;
            background-color: $gray-1;

            &-icon {
                font-size: 32px;
                color: $gray-4;
            }
        }

        &-dot,
        &-badge {
            position: absolute;
            top: 0;
            right: 0;
            box-sizing: border-box;
            background-color: #ee0a24;
            border: 1px solid $white;
            transform: translate(50%, -50%);
        }
        &-dot {
            width: 10px;
            height: 10px;
            border-radius: 50%;
        }
        &-badge {
            min-width: 16px;
            padding: 0 3px;
            font-size: $font-size-sm;
            font-weight: 500;
            line-height: 1.2;
            color: $white;
            text-align: center;
            border-radius: 16px;
        }
    }
</style>
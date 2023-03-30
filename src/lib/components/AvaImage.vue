<!--
    增强版的 img 标签：
        1. 提供多种图片填充模式、圆角、圆形图
        2. 加载中提示、加载失败提示
        3. 小红点、徽标内容
        4. 图片懒加载
        5. APICloud 图片缓存功能
    Props
        src：图片链接
        alt：替代文本
        fit：图片填充模式，默认 fill
        width：宽度，默认单位为 px
        height：高度，默认单位为 px
        radius：圆角大小，默认单位为 px
        round：是否显示为圆形，优先级高于 radius
        dot：是否显示右上角小红点
        badge：右上角徽标的内容，优先级高于 dot
        showLoading：是否展示图片加载中提示
        showError：是否展示图片加载失败提示
        cache：是否本地缓存图片
    图片填充模式：
        fill：拉伸图片，使图片填满元素
        cover：保持宽高比缩放图片，使图片的短边能完全显示出来，裁剪长边
        contain：保持宽高比缩放图片，使图片的长边能完全显示出来
        none：保持图片原有尺寸
        scale-down：取 none 或 contain 中较小的一个

        2. ava-icon
-->
<template>
    <div class="ava-image" :style="rootStyle">
        <img v-if="_src && !(showError && isError)" :src="_src" :alt="alt" :style="imgStyle" @load="onLoad" @error="onError" class="ava-image-img">

        <div v-if="showLoading && isLoading" class="ava-image-status">
            <slot name="loading">
                <i class="ava-icon ava-icon-arrow-right ava-image-status-icon"></i>
            </slot>
        </div>
        <div v-if="showError && isError" class="ava-image-status">
            <slot name="error">
                <i class="ava-icon ava-icon-arrow-left ava-image-status-icon"></i>
            </slot>
        </div>

        <div v-if="showBadge" class="ava-image-badge">{{ badge }}</div>
        <div v-else-if="dot" class="ava-image-dot"></div>
    </div>
</template>

<script>
    import { addUnit } from "@/lib/utils/dom/style";
    import { isDef } from "@/lib/utils/vue/props";
    export default {
        name: "AvaImage",
        props: {
            src: String,
            alt: String,
            fit: String,
            width: [Number, String],
            height: [Number, String],
            radius: [Number, String],
            round: Boolean,
            dot: Boolean,
            badge: [Number, String],
            showLoading: {
                type: Boolean,
                default: true
            },
            showError: {
                type: Boolean,
                default: true
            },
            cache: Boolean
        },
        data() {
            return {
                _src: '',
                isLoading: true,
                isError: false,
            };
        },
        computed: {
            rootStyle() {
                let style = {};
                if (isDef(this.width)) {
                    style.width = addUnit(this.width);
                }
                if (isDef(this.height)) {
                    style.height = addUnit(this.height);
                }
                if (this.round) {
                    style.borderRadius = '50%';
                } else if (isDef(this.radius)) {
                    style.borderRadius = addUnit(this.radius);
                }
                return style;
            },
            imgStyle() {
                return isDef(this.fit) ? { objectFit: this.fit } : null;
            },
            showBadge() {
                return isDef(this.badge) && this.badge !== '';
            }
        },
        watch: {
            src: {
                handler: 'setSrc',
                immediate: true
            },
            cache: 'setSrc',
            _src() {
                this.isLoading = true;
                this.isError = false;
            }
        },
        methods: {
            setSrc() {
                let a = new Date();
                if (this.src && this.cache) {
                    if (!this.src.startsWith('http')) {
                        // 非远程地址直接使用原地址
                        this._src = this.src;
                        return;
                    }
                    api.imageCache({
                        url: this.src,
                        policy: 'cache_else_network',
                        thumbnail: false
                    }, (res) => {
                        if (res.status) {
                            this._src = res.url;
                        } else {
                            this._src = this.src;
                        }
                    });
                } else {
                    this._src = this.src;
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
        }
    }
</script>

<style lang="less">
    .ava-image {
        position: relative;
        display: inline-block;
        vertical-align: middle;

        &-img {
            display: block;
            width: 100%;
            height: 100%;
            border-radius: inherit;
            object-fit: fill;
        }
        &-status {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: @font-size-md;
            color: @gray-6;
            background-color: @gray-1;
            border-radius: inherit;

            &-icon {
                font-size: 32px;
                color: @gray-4;
            }
        }

        &-dot,
        &-badge {
            position: absolute;
            top: 0;
            right: 0;
            box-sizing: border-box;
            background-color: #ee0a24;
            border: 1px solid #fff;
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
            font-size: @font-size-sm;
            font-weight: 600;
            line-height: 1.2;
            color: #fff;
            text-align: center;
            border-radius: @border-radius-max;
        }
    }
</style>
# apicloud-vue-app

> For Vue3：主分支
>
> For Vue2：见 2.x-vue2 分支

> Vue Cli 版本：5.0.8
>
> Node 版本：18.13.0
>

> 技术栈文档
>
> [Vue3](https://cn.vuejs.org/) / [Vue Cli](https://cli.vuejs.org/)
>
> [APICloud 开发者文档](https://docs.apicloud.com/) / [config.xml 配置文档](https://docs.apicloud.com/Dev-Guide/app-config-manual) / [api 接口文档](https://docs.apicloud.com/Client-API/api)



## 介绍

​	apicloud-vue-app 是基于 Vue 开发 APICloud App 的解决方案，在使用 Vue MVVM 模型开发页面的同时，充分保留了访问 APICloud 底层接口的能力。

​	项目遵从 APICloud 多页面渲染方式，使用 Vue Cli 脚手架是为了弥补 APICloud 本身不具备的模块化能力，提高开发效率，跟随大前端的发展。



## 起步

1. 在 `public/config.xml` 中填写 AppId

```xml
<widget id="APICloud 平台提供的 AppId" version="0.0.1"></widget>
```

2. 使用 npm 安装依赖、打包、调试

```bash
npm install		# 安装项目依赖
npm run dev		# 开发模式打包，带有文件监听
npm run build	# 生产模式打包
```



## 框架

### 目录结构

```
┌─public		原样拷贝到输出目录
└─src
   ├─lib		框架提供的一些模块、组件、方法
   ├─pages		页面目录
   ├─components	可复用的 vue 组件目录
   ├─ava.less	全局 less 文件
   └─ava.json	配置页面路由、导航条、选项卡等页面类信息
```



### 页面和路由

#### 页面配置

`src/ava.json` 用于配置页面文件的路径、窗口样式等。

``` json
{
    // 页面配置
    // url：参见示例
    // 其它配置：见 APICloud openWin 的配置项，优先级高于 window 中的配置
    "pages": [
        {
            "root": { "url": "pages/root" },
            "login": {
                "url": "pages/login",
                "bgColor": "#f7f8fa"
            }
        }
    ],
    
    // 全局的默认窗口表现
    "window": { /* 见 APICloud openWin 的配置项 */ }
}
```

- 应用入口页默认为 root，必要时到 `public/config.xml` 中进行修改；
- 应用中新增、减少页面，都需要对 pages 数组进行修改；
- 文件名不需要写后缀，框架会寻找路径下的 vue 文件；
- 每个页面都需要唯一的键名，主要目的是为了简化路由方法中的参数（见 lib/apicloud/route）。



#### 路由方法

`src/lib/apicloud/route` 提供了四个路由方法，它们的 name 参数是 `src/app.json -> pages` 每个页面的 key。

```javascript
export {
    navigateBack,   // 关闭当前页面，返回上一页面或多级页面
    navigateTo,     // 保留当前页面，跳转到应用内的某个页面
    redirectTo,     // 关闭当前页面，跳转到应用内的某个页面
    reLaunch,       // 关闭所有页面，打开到应用内的某个页面
}
```



#### 页面窗口表现的优先级

`lib/apicloud/route` 方法的 params 参数 > `app.json` 的 pages 配置 > `app.json` 的 window 配置



### 全局样式

> 参考了 Antd 与 Vant 移动端组件库的样式表，可根据需求自行修改。

#### ava.less

在 less 代码中无需 import `ava.less` 文件即可使用这里定义的样式变量、混合等。

#### public/css/common.css

页面的全局样式表，内置了一些常用样式。

- 浏览器默认样式的重置
- 文字省略

```html
<!-- 最多显示一行 -->
<div class="ava-ellipsis"></div>

<!-- 最多显示两行 -->
<div class="ava-ellipsis--l2"></div>

<!-- 最多显示三行 -->
<div class="ava-ellipsis--l3"></div>
```

- 矢量图标

```html
<!-- 上下左右箭头 -->
<i class="ava-icon ava-icon-arrow-up"></i>
<i class="ava-icon ava-icon-arrow-down"></i>
<i class="ava-icon ava-icon-arrow-left"></i>
<i class="ava-icon ava-icon-arrow-right"></i>
```



### 静态资源

静态资源如图片、视频、音频等统一放置在 public 目录下，它们将会直接被拷贝到输出目录 dist 中。

#### 绝对路径

- APICloud API：支持绝对路径如 `widget://` 引用静态资源。
- HTML标签、CSS样式表：iOS支持、Android不支持使用 `widget://` 绝对路径引用静态资源，推荐使用相对路径的方式。

#### 相对路径：publicPath

> 框架提供了 publicPath 变量，它是当前页面访问 public 文件夹的相对路径
>
> 方式一：vue 组件通过 this.$publicPath 访问
>
> 方式二：通过 window.publicPath 访问

```vue
<template>
	<!-- 在模板中使用 -->
	<img :src="`${$publicPath}/image/logo.png`" alt="">
</template>

<script>
	export default {
        computed: {
            logoURL() {
                // 在实例 API 中使用
                return `${this.$publicPath}/image/logo.png`;
            },
            logoBackground() {
                return `url('${this.$publicPath}/image/logo.png')`;
            }
        }
    }
</script>

<style lang="less">
    /* 在样式中使用 */
    .logo {
        background: v-bind(logoBackground);
    }
</style>
```

#### 相对路径：明确相对层级

> 1. 在 vue 页面中，可根据 vue 文件相对 src 目录的层级明确使用相对路径。
> 2. 在非 vue 页面中（vue 组件、js 文件等可能会被多个页面同时引用的文件），推荐使用 publicPath 变量

```vue
<template>
	<!-- 在模板中使用 -->
	<img src="../image/logo.png" alt="">
</template>

<script>
	export default {
        computed: {
            logoURL() {
                // 在实例 API 中使用
                return '../image/logo.png';
            }
        }
    }
</script>

<style lang="less">
    /* 在样式中使用 */
    .logo {
        background: url('../image/logo.png');
    }
</style>
```



### lib 库

在 `src/lib` 中提供了一些封装模块，可以在业务代码中引入使用，代码文件有详细的使用说明。

```
lib
  ├─apicloud	基于 APICloud 接口进行封装的模块
  │  └─modules	基于 APICloud 的 modules 进行封装
  ├─components	内置的 vue 组件
  ├─composables	内置的 vue 组合式 API
  └─utils       工具函数
```

#### apicloud

- 界面 / 交互反馈：`@/lib/apicloud/ui`
- 数据存储：`@/lib/apicloud/storage`
- 页面路由：`@/lib/apicloud/route`
- 设备权限：`@/lib/apicloud/permission`
- 网络请求：`@/lib/apicloud/network`
- 第三方模块
  - dialogBox：`@/lib/apicloud/modules/dialogBox`
  - WXPhotoPicker：`@/lib/apicloud/modules/WXPhotoPicker`

#### components

- AvaIcon：图标
- AvaImage：图片
- route/AvaNavigator：页面导航
- layout/AvaSafeArea：适配顶部状态栏、底部安全区
- layout/AvaSafeHeader：适配顶部状态栏的头部
- layout/AvaSafeFooter：适配底部安全区的底部
- layout/AvaSafeNavBar：适配顶部状态栏的导航栏

#### composables

- usePageParam：页面参数

```javascript
import { usePageParam } from "@/lib/composables/use-page-param";
export default {
    setup() {
        const pageParam = usePageParam({
            message: '这里是默认参数'
        });
        return {
            pageParam
        };
    }
}
```

#### utils

- validate.js：提供了一些验证函数
- web-api/event：事件相关
- web-api/scroll：各种尺寸与滚动条
- web-api/style：CSS 样式相关



### 兼容性处理

> 相关链接：[Browserlist](https://github.com/browserslist/browserslist)、[Can I use](https://caniuse.com/)

项目中有一个单独的 `.browserslistrc` 文件指定了目标浏览器的范围，这个值会被用来确定需要转译的 JavaScript 特性和需要添加的 CSS 浏览器前缀。

```
Android > 4.4
ios_saf > 12
```

说明：

- `Android > 4.4` 指定的是安卓 WebView 的 Chromium 内核
- `ios_saf > 12` 指定的是 iOS 系统版本大于 12
- 可以在项目目录中使用 `npx browserslist` 命令查看所写规则具体指定的目标浏览器及版本号



## APICloud 坑记录

1. [WKWebView使用介绍](https://community.yonyou.com/thread-151904-1-1.html)
   1. 跨域问题：云编译启用全局加密后，默认会限制跨域访问
      1. 解决方式一：【推荐】打卡页面时将 allowAccessFromFile 参数设为 true
      2. 解决方式二：禁用全局加密
2. 调用 api.download 方法时，如果 Android 没有 storage 权限会提示 “没有插入 SD 卡”。
3. 关于权限，需要在 APICloud 云编译中选择平台对应的隐私权限，如果在没有选择的情况下调用 api.requestPermission：
   1. iOS 会闪退
   2. Android 在授权页没有对应的权限项让用户操作
4. config.xml 中 smartUpdate 设为 false 时，APICloud 平台的闪屏广告功能无法正常使用



## VueCli 多版本并存

### 使用 nvm

nvm 是 nodejs 版本管理工具，可在同个服务器上切换不同的 Node.js 版本，npm 版本也会对应切换，且每个 npm 版本下的全局包（node_modules）是独立的，利用这点可以实现在一台服务器上并存多个 VueCli 版本，只需使用 nvm 切换 Node.js 版本即可。

- 下载 nvm

macOS：brew install nvm

Windows：https://github.com/coreybutler/nvm-windows，下载后默认安装即可

- nvm 常用命令

```bash
nvm list			# 查看当前所有的 Node.js 版本
nvm install 18.13.0	# 安装指定的 Node.js 版本
nvm use 18.13.0		# 切换指定的 Node.js 版本
```

- 备注：如果在安装 nvm 之前，已经使用 npm 全局下载了 VueCli，需要在安装 nvm 之前先执行 `npm uninstall @vue/cli -g` 进行卸载，或到全局 `node_modules` 文件夹下手动删除 VueCli 依赖。



### 使用 Docker

```bash
# 下载 node:18.13.0 镜像
docker pull node:18.13.0

# 运行 node:18.13.0 镜像，并将主机的项目目录挂载到容器中的 /app 目录下
docker run -it -v E:/apicloud-vue3-app:/app --name apicloud-vue-app node:18.13.0 /bin/bash

# 进入容器命令行后，安装 vue-cli
npm i @vue/cli -g
```

```javascript
// 在 vue.config.js 下添加配置
module.exports = {
  configureWebpack: {
  	watchOptions: {
  	  poll: true,
  	  ignored: /node_modules/
  	}
  }
}
```



## 框架持续优化中

> 设计参考：[uni-app](https://uniapp.dcloud.net.cn/)、[微信小程序](https://developers.weixin.qq.com/miniprogram/dev/framework/app-service/api.html)

### Vue Cli 创建选项

1. Vue version：3.x
2. Babel
4. CSS Pre-processors
   - Less
5. Linter / Formatter
   - ESLint with error prevention only
   - Lint on save
6. Where do you prefer placing config for Babel, ESLint, etx.?
   - In dedicated config files

### 优化点

1. 考虑要不要直接使用 webpack 构建，不使用 vue-cli
2. 考虑能不能集成 apicloud-cli，实现 watch 监听编译并同步
3. 困惑：browserslist 中配置的浏览器是支持箭头函数的，为什么打包后要把箭头函数进行编译

# apicloud-vue-app

> Vue3：https://v3.cn.vuejs.org/
>
> Vant3：https://youzan.github.io/vant/v3/#/zh-CN
>
> 兼容性：支持现代浏览器以及 Chrome >= 51、iOS >= 10.0（与 Vue3 一致）

> APICloud：
>
> - config.xml 配置文档：https://docs.apicloud.com/Dev-Guide/app-config-manual
> - api 对象文档：https://docs.apicloud.com/Client-API/api



## 项目介绍

​	apicloud-vue-app 是基于 Vue3 开发 APICloud App 的解决方案，在使用 Vue MVVM 模型开发页面的同时，充分保留了访问 APICloud 底层接口的能力。

​	此项目遵从 APICloud 多页面渲染方式，使用 Vue Cli 脚手架是为了弥补 APICloud 本身不具有的模块化能力，提高开发效率，跟随大前端的发展。



## 快速上手

1. 在 `public/config.xml` 中填写 APICloud 平台提供的 AppId

```xml
<widget id="" version="0.0.1"></widget>
```

2. 安装 npm 依赖

```bash
npm i
```

3. 使用 npm 命令打包

```bash
npm run build
```

4. 使用 APICloud Studio3 或在其它编辑器使用代码同步插件，同步 `dist` 文件夹中的代码到设备上即可

   注：项目中未安装 APICloud 开源的 `apicloud-cli` 工具，此工具允许开发者使用命令行的方式开启 WIFI 同步等核心功能，若需要可自行安装。



## 目录结构

```
┌─dist              Vue Cli 打包后的代码，用于上传到 APICloud 平台云编译 App
|-public            原样输出到 dist 的文件，如 APICloud 平台需要的配置文件
│  ├─css
│  │  └─common.css  页面公共样式，内置了 Reset Css
│  ├─image			图片资源
│  ├─res            APICloud 需要的配置文件存放目录
│  ├─config.xml     APICloud 应用配置
│  └─page.ejs       编译页面的页面模块，谨慎修改
├─src               项目源代码，除了 pages 目录外，其它属于作者开发时推荐的目录结构
│  ├─api            后端接口
│  ├─app-modules    封装 APICloud 平台或模块的方法，使它们提供的接口更加合理化
|  ├─assets         js、css 等资源文件
|  ├─components     Vue 组件
|  ├─composables    Vue 组合式 API
|  ├─mixins         Vue 混入
│  ├─pages          页面文件存放的目录，此文件夹不可缺失
│  │  └─root
│  │    └─root.vue  默认的 App 首页
│  ├─style          主题色、样式资源
│  ├─pages.js       页面配置文件
└─ └─config.js      自定义的 App 配置项
```



## 命令

- 安装依赖

```bash
npm install
```

- Lint 代码检查

```bash
npm run lint
```

- 打包项目：云编译正式包 App 时推荐此命令

```bash
npm run build
```

- 调试项目：本地调试代码时推荐此命令，可监听文件变化，带有 VConsole 调试工具

```bash
npm run buildwatch
```



## 开发细节

### 

### 页面文件

​	pages 文件夹下，与文件夹同名的 `vue` 文件会被输出为对应的 `html` 文件即页面，页面的文件名是此 `vue` 文件相对 pages 文件夹的相对路径。

​	注：由于 Vue Cli 的限制，所有输出的 html 文件都在 dist 中的 html 目录下



### 访问 public 中的图片资源

​	在代码中的任何地方，都只需要使用 `../image` 相对路径即可访问到 `public/image` 中的图片资源。



## 扩展功能

### 页面跳转 与 使用 page.js

#### 页面跳转

```javascript
import { navigateTo, redirectTo } from "@/app-modules/app/router";

/**
 * 保留当前页面，跳转到应用内的某个页面
 * @param name {String} : window名，按页面文件相对 pages 文件夹的路径生成
 * @param params {Object} : 页面配置参数，会与默认配置项合并，详细参数见 api.openWin
 */
navigateTo('default-login');

/**
 * 关闭当前页面，跳转到应用内的某个页面
 * @param name {String} : window名，默认按页面文件相对 pages 文件夹的路径生成
 * @param params {Object} : 页面配置参数，会与默认配置项合并，详细参数见 api.openWin
 * Tip：占用了页面的 viewdisappear 事件
 */
redirectTo('default-login');
```

Tip：

1. 页面跳转的方法中预设了打开页面的全局配置，第二个参数的配置项会与这些全局配置合并
2. 若某个页面的打开配置需要特定修改，可在 `pages.js` 中调整



#### 使用 `pages.js`

```javascript
export default {
    'default-login': {
        scrollToTop: false
    }
};
```



### Vant 组件库

​	从 1.1.0 版本开始，内置了 Vant 组件库，它是有赞前端团队开源的移动端组件库，是业界主流的移动端组件库之一。



### VConsole 调试工具

​	当 Vue Cli 打包代码的环境不是 `production` 时，页面的右下角会有一个绿色的 `VConsole` 按钮，它是一个移动网页的前端开发调试工具。

​	需要注意的是，由于它是 H5 的产物，因此 APICloud 原生能力的缓存、网络请求等并不会显示在 VConsole 的调试面板中。



## 其它

### Vue Cli 配置选项

> 版本：4.5.15

1. Vue version：3.x
2. Babel
3. Css Pre-processors：Sass/SCSS（with dart-sass）
4. Linter / Formatter
   - ESLint with error prevention only
   - Lint on save
5. Where do you prefer placing config for Babel, ESLint, etx.?
   - In dedicated config files



### WebStorm 编辑器支持

​	希望 WebStorm 编辑器识别 Vue 项目中 `@` 表示的绝对路径（Ctrl + 左键单击路径可打开对应文件），需要对编辑器做下设置：

​	在 `Setting -> Languages & Frameworks -> JavaScript -> Webpack` 中指定 Webpack 配置文件为 `node_modules\@vue\cli-service\webpack.config.js`
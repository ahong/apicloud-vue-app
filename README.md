# apicloud-vue-app

> Vue3：https://v3.cn.vuejs.org/
>
> 兼容性：支持现代浏览器以及 Chrome >= 51、iOS >= 10.0（与 Vue3 一致）

> APICloud：
>
> - api 对象文档：https://docs.apicloud.com/Client-API/api
> - config.xml 配置文档：https://docs.apicloud.com/Dev-Guide/app-config-manual



## 介绍

基于 Vue3 开发 APICloud App 的解决方案。



## 快速上手

1. 在 `public/config.xml` 中填写 appId

```xml
<widget id="APICloud 平台提供的 appId" version="0.0.1"></widget>
```

2. 使用 npm 命令打包

```bash
npm run build
```

3. 使用 APICloud Studio3 或在其它编辑器使用代码同步插件，同步 `dist` 文件夹中的代码到设备上即可



## 命令

- 安装依赖

```bash
npm install
```

- Lint 代码检查

```bash
npm run lint
```

- 打包项目

```bash
npm run build
```

- 调试项目（带有 VConsole 调试工具）

```bash
npm run buildwatch
```



## 目录结构

```
┌─dist             Vue Cli 打包后的代码，用于上传到 APICloud 平台云编译 App
|-public           原样输出到 dist 的文件，如 APICloud 平台需要的配置文件
│  ├─css
│  │  └─common.css 	页面公共样式，内置了 Reset Css
│  ├─res			APICloud 需要的配置文件存放目录
│  ├─config.xml		APICloud 应用配置
│  └─page.ejs		编译页面的页面模块，谨慎修改
├─src               项目源代码，除了 pages 目录外，其它属于作者开发时推荐的目录结构
│  ├─api			后端接口
│  ├─app-modules	封装 APICloud 平台或模块的方法，使它们提供的接口更加合理化
|  ├─assets			js、css 等资源文件
|  ├─components		vue 组件
|  ├─composables	Vue 组合式 API
|  ├─mixins			Vue 混入
│  ├─pages			页面文件存放的目录，此文件夹不可缺失
│    └─root
│       └─root.vue  默认的 App 首页
│  ├─style			主题色、样式资源
│  ├─pages.js		页面配置文件
└─ └─config.js		自定义的 App 配置项
```



### 页面文件、页面跳转 与 使用 page.js

### 页面文件

​	在 `pages` 文件夹下，与文件夹同名的 `vue` 文件会被输出为对应的 `html` 文件即页面，页面的文件名是此 `vue` 文件相对 `pages` 文件夹的相对路径。



### 页面跳转

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



### 使用 `pages.js`

```javascript
export default {
    'default-login': {
        scrollToTop: false
    }
};
```





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



### 支持 VConsole 调试

在 `development` 模式下，支持 VConsole 调试工具。



### WebStorm 编辑器支持

​	希望 WebStorm 编辑器识别 Vue 项目中 `@` 表示的绝对路径（Ctrl + 左键单击路径可打开对应文件），需要对编辑器做下设置：

​	在 `Setting -> Languages & Frameworks -> JavaScript -> Webpack` 中指定 Webpack 配置文件为 `node_modules\@vue\cli-service\webpack.config.js`
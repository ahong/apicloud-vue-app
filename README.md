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



## Vue Cli 配置选项

> 版本：4.5.15

1. Vue version：3.x
2. Babel
3. Css Pre-processors：Sass/SCSS（with dart-sass）
4. Linter / Formatter
   - ESLint with error prevention only
   - Lint on save
5. Where do you prefer placing config for Babel, ESLint, etx.?
   - In dedicated config files



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



## VConsole 调试

在 `development` 模式下，支持 VConsole 调试工具。



## 目录结构

```
public : 完全复制到 dist 中的文件
src : 项目代码
    api : 后端接口
    app-modules : APICloud 模块
    assets : 资源文件
    components : Vue 组件
    composables : Vue 组合式 API
    mixins : Vue 混入
    pages : 页面
    style : 主题色、样式资源
    pages.js : 页面配置文件
    config.js : 自定义 App 配置项
```

Tip：与所属文件夹同名的 Vue 文件会被编译为对应的 html 页面，html 文件名和文件路径对应。



### 页面跳转 与 使用 page.js

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



## WebStorm 编辑器支持

​	希望 WebStorm 编辑器识别 Vue 项目中 `@` 表示的绝对路径（Ctrl + 左键单击路径可打开对应文件），需要对编辑器做下设置：

​	在 `Setting -> Languages & Frameworks -> JavaScript -> Webpack` 中指定 Webpack 配置文件为 `node_modules\@vue\cli-service\webpack.config.js`
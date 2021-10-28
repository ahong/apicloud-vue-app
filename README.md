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
    page.js : 页面配置文件
    config.js : 自定义 App 配置项
```

Tip：与所属文件夹同名的 Vue 文件会被编译为对应的 html 页面，html 文件名和文件路径有关。


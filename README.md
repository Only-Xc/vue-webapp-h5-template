# 移动端开发记录

因为接下来有个 H5 的页面要开发，虽说是 H5，但整体比较偏向 WebApp 形式。为了方便接下来的开发工作，于是就花了 3 - 4 天简单的封装了一套适用于项目的架子，并且将过程记录了下来，希望能与大家一起进步。

## 移动端适配

在进行移动端页面开发时，屏幕适配是首要问题。

移动端的界面开发并不像 PC 端那样简单，举个例子：在 PC 端开发时，我们可能给某个区域设置一个固定的安全宽度，这个宽度可能是 `1200px` 也可能是 `1100px` ，这样设计对于网站的展示内容并没有很大的影响。由于移动端尺寸繁多，我们如果在开发移动端界面时也给一个固定宽度，那么在小屏手机中就会出现横向滚动条，在大屏手机中就会有多余的留白，可以想象一下用户体验有多糟糕。

这时可能有人就会说：可以用响应式布局呀！虽然这个方法可以解决上述问题，但是新的问题又出现了，由于在所有屏幕尺寸下字体尺寸都不会发生改变，所以在某些小尺寸下可能会出现元素错位的问题。这时候我们可以通过 `@media` 媒体查询进行调整，但是会增加额外工作量。

更别说在移动端还有普通屏和视网膜屏之分了，所以在前辈的不断努力下出现了多种移动端适配方案，下面就介绍一下常用的两种方案：**Rem 布局**和 **Viewport 布局**。

> 推荐大家阅读下面这篇文章。
> 其中有介绍普通屏和视网膜屏的区别，以及一些手机屏幕相关的基本概念。
>
> [使用Flexible实现手淘H5页面的终端适配]( https://github.com/amfe/article/issues/17)

### Rem 布局

Rem 布局我们通过使用 `rem` 单位和 [`lib-flexible`](https://github.com/amfe/lib-flexible) 这个库来解决。

`rem` 是 css 中的一个相对单位，它依据 `html` 标签的 `font-size` 来动态计算大小，具体可以看下面这个例子：

```css
html {
  font-size: 14px;
}
p {
  font-size: 1rem; /* 相当于 font-size: 14px，1rem = 14px */
}
h1 {
  font-size: 2rem; /* 相当于 font-size: 28px，2rem = 14*2 px */
}
```

这样就有了个思路，我们可以使用 `rem` 单位，并且在不同的手机屏幕下动态的改变 `html` 的 `font-size` 大小，这样就可以使所有屏幕下展示的内容保持一致性。

`lib-flexible` 这个库已经帮我们做好了计算，想了解底层相关的可以参考上面的文章，下面只介绍如何使用：

```bash
$ yarn add amfe-flexible
```

```html
// public/index.html
// 把 meta 标签替换为下面这段代码
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no">
```

```javascript
// main.js
import 'amfe-flexible'
```

以上已经完成了一半的设置，我们还可以配合 [`postcss-pxtorem`](https://github.com/cuth/postcss-pxtorem#readme) 来将 px 单位自动转化为 rem 单位，方便我们开发：

```bash
$ yarn add postcss-pxtorem@^5.1.1 -D
```

> 这里需要指定一下版本，最新安装版本为 6.0.0 版本，在项目中会报错。

```javascript
// .postcssrc.js
module.exports = {
  plugins: {
    // 英文文档 https://github.com/cuth/postcss-pxtorem#readme
    'postcss-pxtorem': {
      rootValue: 37.5, // UI 设计稿的宽度 / 10
      unitPrecision: 6, // 转换后的精度，即小数点位数
      propList: ['*'], // 指定转换的 css 属性的单位，* 代表全部 css 属性的单位都进行转换
      selectorBlackList: [], // 指定不转换为视窗单位的类名
      replace: true, // 是否转换后直接更换属性值
      mediaQuery: true, // 是否在媒体查询的 css 代码中也进行转换，默认 false
      minPixelValue: 1, // 默认值 0，小于或等于 0px 则不进行转换
      // exclude: /node_modules/i // 设置忽略文件，用正则做目录名匹配
    }
  }
}
```

这样就设置完成了，在实际使用中只需要更改 `rootValue` 的值即可，如：设计稿宽为 750px，`rootValue` 值设置为 75，在浏览器中窗口宽度调整至 750px 即可根据设计稿一比一开发了。

### Viewport 布局

此项目使用 viewport 做解决方案，使用视口单位 vh、vw 做适配。

> 以下摘抄自 MDN 上对 [viewport](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Viewport_concepts) 的介绍：
>
> 视口（viewport） 代表当前可见的计算机图形区域。在 Web 浏览器术语中，通常与浏览器窗口相同，不包括浏览器的UI，菜单栏等。
>
> 我们可以通过 `innerHeight` 和 `innerWidth` 来获取 viewport 的宽高。

视口分为**布局视口**和**视觉视口**，下面所说的视口对应的都是布局视口。下面是 vh、vw 与视口宽高的对应关系：

- `100vh` 等于 `Window.innerHeight` ，`1vh` 等于 1% 布局视口高度。
- `100vw` 等于 `Window.innerWidth` ，`1vw` 等于 1% 布局视口宽度。

由于布局视口的宽高，会自动根据浏览器窗口的大小自动改变，相比于 rem ，我们不需要再额外引入一个 js 来辅助计算，并且发展到现在，设备支持度也非常高了，所以我们选择这种方法。

下面是使用流程：

```html
// public/index.html
// 把 meta 标签替换为下面这段代码
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no">
```

> 通过 meta 可以设置 viewport 的一些属性，下面是一些介绍：
>
> - width 视口宽度，device-width 代表的是设备的屏幕宽度
>
> - initial-scale 初始缩放比例
> - maximum-scale 最大缩放比例
> - minimum-scale 最小缩放比例
> - user-scalable 是否允许用户缩放（两指放大缩小）

在这里我们使用了 `postcss-px-to-viewport` 插件，它将 px 自动转换为 vh、vw 单位，其配置项在 `.postcssrc.js` 文件中，下面是一些配置文件：

```bash
$ yarn add postcss-px-to-viewport -D
```

```javascript
// .postcssrc.js
module.exports = {
  plugins: {
    // 中文文档 https://github.com/evrone/postcss-px-to-viewport/blob/HEAD/README_CN.md
    'postcss-px-to-viewport': {
      unitToConvert: 'px', // 要转化的单位
      viewportWidth: 375, // UI 设计稿的宽度
      unitPrecision: 6, // 转换后的精度，即小数点位数
      propList: ['*'], // 指定转换的 css 属性的单位，* 代表全部 css 属性的单位都进行转换
      viewportUnit: 'vw', // 指定需要转换成的视窗单位，默认 vw
      fontViewportUnit: 'vw', // 指定字体需要转换成的视窗单位，默认 vw
      selectorBlackList: [], // 指定不转换为视窗单位的类名，
      minPixelValue: 1, // 默认值 1，小于或等于 1px 则不进行转换
      mediaQuery: true, // 是否在媒体查询的 css 代码中也进行转换，默认 false
      replace: true, // 是否转换后直接更换属性值
      // exclude: [/node_modules/], // 设置忽略文件，用正则做目录名匹配
      landscape: false // 是否处理横屏情况
    }
  }
}
```

配置文件中默认设计稿宽度为 375 （可以在配置文件中修改），在还原设计稿时，我们只需要将浏览器窗口宽度设置为 375 px，之后将可以 1:1 对设计稿进行还原。

```html
<div class="box"></div>

<style>
  .box {
    width: 375px;
    height: 375px;
    font-size: 12PX;
  }
</style>

将会被自动转换为
<style>
  .box {
    width: 100vw;
    height: 100vh;
    font-size: 12PX;
  }
</style>
```

如果某些单位我们不想让他自动转化为视口单位，可以将 `px` 改为 `PX`。

## 界面

### Layout

因为项目比较偏向 webApp，而 App 通常有两大基础母版页面：

- TabBar 页
  - 页面上面有 NavBar，下面有 TabBar；
  - NavBar 没有返回键。
- 内页
  - 页面上只有 NavBar；
  - NavBar 上会有返回键。

为了减少重复工作量，在项目中将 TabBar 页和内页抽离成了一个 Layout 组件，与 Router 进行关联，通过 vuex 进行统一管理，使用方法设置 Layout 相关显示内容。

下面的目录是和此功能相关的文件：

```bash
├── configs                        # 设置
│   ├── app.json                   # webApp 的默认设置
├── plugins                        # 插件
│   ├── nav-bar.js                 # navBar 相关方法
│   ├── tab-bar.js                 # tabBar 相关方法
├── layout                         # 页面布局
│   ├── BaseLayout.vue             # 基础 Layout
├── router                         # 路由
│   ├── index.js             			 # 路由表
├── store                          # vuex
│   ├── modules                    # vuex 模块
│   │   ├── app.js                 # app 模块，用于存储当前展示的相关变量
│   ├── getters.js                 #
│   ├── index.js                   #
├── main.js                        # 将 core 中的方法挂载到 vue prototype 上
```

大部分人对于小程序比较熟悉，所以在开发中，我也尽量使其偏向于小程序，我们可以在 `configs/app.json` 里对 Layout 的一些默认值进行设置。

```json
// configs/app.json
{
  "navBar": {
    "show": true, // 是否显示 nav bar
    "title": "默认标题", // 默认 nav bar 的 title
    "leftText": "", // 默认 nav bar 左边显示的文本
    "leftArrow": true, // 默认是否显示返回箭头
    "rightText": "", // 默认 nav bar 右边显示的文本
    "rightIcon": "", // 默认 nav bar 右边显示的 icon
    "border": true, // 默认是否显示 border
    "safeAreaInsetTop": false // 
  },
  "tabBar": {
    "show": true, // 是否显示 tab bar
    "border": true, // 是否显示 tab bar 的 border
    "activeColor": "#1989fa", // tab bar 激活颜色
    "inactiveColor": "#7d7e80", // tab bar 未激活时的颜色
    "safeAreaInsetBottom": false, // 
    "list": [ // tab bar 的数据项
      {
        "key": "HOME", // 后面会根据 key 来对每一项进行设置
        "title": "主页", // tab bar 每一项的 title
        "icon": "home-o", // tab bar 每一项的 icon
        "path": "/home" // tab bar 每一项的绑定的 route path
      },
      {
        "key": "ABOUT",
        "title": "我的",
        "icon": "setting-o",
        "path": "/about"
      }
    ]
  }
}
```

之后通过在 vuex 中的 app module 来将配置和 Layout 关联起来，因为双向绑定这样也方便之后使用 vuex 对配置进行动态设置。

```javascript
import appConfig from '@/configs/app.json'

const state = () => {
  return {
    navBar: appConfig.navBar, // nav bar 默认设置
    currPageNavBar: {}, // 当前页面的 nav bar 设置，在 getters 中和 navBar 进行合并
    tabBar: appConfig.tabBar
  }
}
```

这里我们使用 `currPageNavBar` 来对页面的 navBar 进行单独设置，之后在 getters 中进行合并，这样就避免了和默认配置的冲突，而且方便了每个页面的重置工作。

```javascript
// layout/BaseLayout.vue

watch: {
    // 每当 route 改变时，进行一些处理
    $route: {
      handler (route) {
        // 先重置 nav bar 设置
        this.$navBar.resetConfig()
        // 进行其他操作...
      },
      immediate: true
    }
  },
```

上面的 `this.$navBar.resetConfig()` 方法在 `plugins/nav-bar.js` 中定义，使用插件的方式挂载到 Vue 的原型上，这样每个实例都可以很方便的使用这个方法了。

```javascript
// plugins/nav-bar.js
const navBar = {// 一些方法}

export default {
  install: (Vue) => {
    Vue.prototype.$navBar = navBar
  }
}
```

```javascript
// main.js
import Vue from 'vue'
import navBar from '@/plugins/nav-bar'

Vue.use(navBar)
```

> 同时还定义了操作 tab bar 的方法在 `plugins/tab-bat.js` 中，具体方法大家可以去看代码。

每个页面的单独配置可以在路由表里通过 meta 来进行单独定义。

```javascript
const routes = [
  {
    path: '/',
    component: BaseLayout,
    name: 'BaseLayout',
    redirect: '/home',
    children: [
      {
        path: '/home',
        name: 'Home',
        component: () => import(/* webpackChunkName: "Home" */ '@/views/Home.vue'),
        meta: { 
          title: '主页', // nav bar 显示的 title
          showTabBar: true, // 是否是 TabBar 页面
          hiddenNavBar: false, // 是否隐藏 nav bar，默认为 false，隐藏之后下面设置不生效
          navBarLeftText: '', // nav bar 左边的文本
          navBarHiddenLeftArrow: '', //  // 是否隐藏 nav bar 的返回箭头 
          navBarRightText: '', // nav bar 右边的文本
          navBarRightIcon: '' // nav bar 右边的 icon
        }
      }
    ]
  }
]
```

关于每个页面的 nav bar 左边内容和右边内容点击之后的事件，每个页面肯定不能相同。我是通过在 vuex 中存储一个函数，在回调事件中调用，这样就实现了每个页面使用不同的事件处理函数。

```javascript
// 主要方法
onClickLeft () {
  let flag = true
  const cb = this.navBar.handleLeftClick
  const next = (bool = true) => (flag = bool)
  cb && cb(next)
  flag && this.$router.go(-1)
},
onClickRight () {
  const cb = this.navBar.handleRightClick
  cb && cb()
}

// 通过方法设置不同的回调
this.$navBar.onLeftClick(function (next) {
  next(false)
  console.log('左键点击，取消默认返回')
})
```

### 特殊尺寸布局错乱

遇见在某些尺寸下布局出现问题，没有达到预期效果，我们可以通过 `@media` 媒体查询来手动调整。

``` css
/* 文档宽度小于 300 px */
@media screen and (max-width: 300px) {
    body {
        background-color:lightblue;
    }
}
```

> @media 参考手册：https://www.runoob.com/cssref/css3-pr-mediaquery.html

### 1PX 边框
说问题之前，先来了解几个基本概念（最上面手淘 H5 文章里介绍的很清楚了）：

1. 物理像素：设备的分辨率，每个像素都是一个点。如：1080x1920 就是垂直方向有 1080 个点，水平方向有 1920 个点；
2. 设备独立像素：由 CSS 像素组成，最终通过系统底层转化为设备像素；
3. CSS 像素：CSS 的长度单位，通常是 px，主要使用在浏览器中；
4. 设备像素比（dpr）：`物理像素 / 设备独立像素` 得到的结果就是设备像素比。

它们之间的关系，使用 iphone6 举例：它的物理像素为 `750x1134`，它的设备独立像素为 `375x667`，根据计算所得它的像素比为 `750/375 = 2dpr`，也就是在 iphone6 上 1 个独立像素会被换算为 2 个物理像素。

所以 1px 实际上要比期望的效果粗上不少，通常有 4 种解决方案：

1. 0.5px 边框
2. border-image
3. box-shadow 模拟边框
4. 伪元素 + transform，Vant 中采用的就是这种方案，下面的代码是基于 Vant 的修改：

```less
// styles/mixins.less

// 1px 边框解决方案
.hairline(@dir, @radius: 0, @width: @border-width-base, @color: @border-color) {
  position: relative;

  &::after {
    z-index: 9;
    position: absolute;
    box-sizing: border-box;
    content: " ";
    pointer-events: none;
    top: -50%;
    right: -50%;
    bottom: -50%;
    left: -50%;
    border: 0 solid @color;
    .forOutputBorderWidth(@dir, @width);
    border-radius: @radius * 2;
    transform: scale(0.5);
  }
}

.forOutputBorderWidth(@list, @width) {
  .loop(@i:1) when (@i =< length(@list)) {
    @value: extract(@list, @i);
    border-@{value}-width: @width;
    .loop(@i + 1);
  }
  .loop();
}


// 使用
@import 'mixins.less';

.hairline(); // 默认全边框
.hairline(left); // 单边使用
.hairline(@dir: left, right); // 多边使用
.hairline(@dir: left, right; @color: '#333'; @radius: 20px); // 任意参数传入
```

### TabBar 被键盘顶起

在项目中一开始 TabBar 使用 `position:fixed` 固定在底部，但是会出现被键盘顶起的问题。

这个是 Android 在使用 `position:fixed` 时的通病，想具体了解的大家可以百度一下。

经过百度，可以使用 flex + 固定高度解决这个问题，但是在项目中使用固定高度感觉并不是太好，所以这个问题并没有被解决。不过看了一下大厂的项目，它们都是在有 TabBar 时避免键盘的弹出。

## 工程化

### 目录设计

目录设计是项目工程化中重要的一环，尽量使人一眼就能明白每个文件夹的作用。

在目录设计时，时间不要占用太长，有时候一开始并不知道该如何设计，但是当项目做到一定程度之后，自然而然就知道如何设计了。

另外我们可以参考 dalao 开源项目中的一些规范，毕竟站在巨人的肩膀上我们可以看的更远，如：**[ vue-element-admin](https://github.com/PanJiaChen/vue-element-admin)**、**[ ant-design-vue-pro](https://github.com/vueComponent/ant-design-vue-pro)**。

```bash
├── public                     # 静态资源
│   │── favicon.ico            # favicon 图标
│   └── index.html             # html 模板
├── src                        # 源代码
│   ├── api                    # 所有请求
│   ├── assets                 # 主题 字体等静态资源
│   ├── components             # 全局公用组件
│   ├── configs                # 全局配置
│   ├── constants              # 固定常量
│   ├── layout                 # 全局 layout
│   ├── plugins                # 插件
│   ├── router                 # 路由
│   ├── store                  # 全局 store 管理
│   ├── styles                 # 全局样式
│   ├── utils                  # 全局公用方法
│   ├── views                  # views 所有页面
│   ├── App.vue                # 入口页面
│   └── main.js                # 入口文件 加载组件 初始化等
├── .eslintrc.js               # eslint 配置项
├── .babelrc                   # babel-loader 配置
├── vue.config.js              # vue-cli 配置
├── .postcssrc.js          		 # postcss 配置
└── package.json               # package.json
```

### Less 应用

由于项目中使用了 Vant 组件库，它们的主题是通过 less 的变量系统进行更改，所以本项目也采用了 less 进行 css 编写。

使用 less 的好处是，它可以提升我们的开发效率，以及 css 的维护性。less 的使用并不难，虽然它的功能很多，但是我们主要使用其中的四项功能即可：

1. 我们可以将 css 进行拆分，然后**引入**到需要使用的 less 文件中；

```less
@import '~normalize.css'; // 如果引入的是 npm 包里的 style 样式，前面需要加 ~
@import './var.less';
```

2. 可以使用**混入**对常用的效果进行抽离封装；

```less
// 单行省略
.ellipsis() {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

// 使用
.txt {
	.ellipsis()
}
```

3. 可以使用**变量**来对项目整体的样式进行统一管理；

```less
@width: 20px;
@height: 20px;

.box {
	width: @width;
  height: @height;
  line-height: @height;
}
```

> 在项目中 Vant 的变量文件就定义在 `styles/var.less` 中。

4. 可以使用**嵌套**来提升css编写时的效率。

```less
.box {
  width: 20px;
  height: 20px;

  .txt {
    font-size: 12px;
  }

  &__line {
    height: 1px;
    background-color: red;
  }
}

// 等同于

.box {
  width: 20px;
  height: 20px;
}
.box .txt {
  font-size: 12px;
}
.box__line {
  height: 1px;
  background-color: red;
}
```

### 样式初始化

在 Web 开发时，因为浏览器内核的不同，所以会导致浏览器默认的渲染样式有所差别，虽然很细微，但是会影响我们在不同浏览器中的显示效果。

所以我们先通过一段 style 样式，将所有浏览器的样式都重置成我们需要的那个效果，然后再进行开发，这样就可以保证每个浏览器显示效果的统一性。

目前常用的有两种解决方案：

- Normalize - [`normalize.css`](https://necolas.github.io/normalize.css/) 偏向于修复浏览器的默认 BUG 和一致性，但是保留元素的默认样式。
- Reset - [`reset.css`](https://meyerweb.com/eric/tools/css/reset/) 偏向于完全重置浏览器默认样式，可控性更高。

两种方案各有优劣，具体的大家可以百度进行了解，在本项目中将其结合使用。

```less
// styles/index.less
@import '~normalize.css'; // 修复浏览器BUG，统一一致性
@import './reset.less'; // 对元素的默认样式进行初始化
```

### API 封装 And 统一错误处理

在项目中前后端交互我们使用 `axios` 这个插件，基于它进行了一层封装，使其适用于我们的项目：

```javascript
// utils/request.js
import axios from 'axios'

const service = axios.create({
  timeout: 8000
})

// 请求拦截器，可以在请求发送之前进行一些处理
service.interceptors.request.use(
  config => {
    // 一般项目都有权限管理，比如使用 token，可以在这个地方统一加入 token
    const token = 'xxxxx'
    if (token) {
      config.headers.Authorization = token
    }

    return config
  }, error => {
    console.log(error)
    return Promise.reject(error)
  })

// 响应拦截器，可以在接收到响应结果之后进行一些处理
service.interceptors.response.use(
  response => {
    const res = response.data
    return res
  },
  error => {
    console.log(error)
    return Promise.reject(error)
  })

export default service
```

```javascript
// apis/demo.js
import request from '@/utils/request'

export function demo (data) {
  return request({
    url: 'xxxx',
    methods: 'post',
    data
  })
}
```

统一错误处理，我们一般是写在响应拦截器中，并且需要和后端定义一个前后端交互规范，现在比较常用的有以下两种规范：

```javascript
// 自定义 code 码风格
// 通过自定义 code 码来判断接口状态
service.interceptors.response(
  response => {
    const res = response.data
    
    // 当 code 不为 0 时，代表接口出现问题
    if (res.code !== 0) {
      // 进行错误处理
      console.log(res.error)
      return Promise.reject(res.error)
    }
    
    // 正确时返回数据
    return res
  },
  error => {
    console.log(error)
    return Promise.reject(error)
  })
```

```javascript
// resultful 风格
service.interceptors.response(
  response => {
    // 正确时直接返回数据
    const res = response.data
    return res
  },
  error => {
    console.log(error)
    // 错误时进行处理
    const { status, response } = error.request
    console.log('状态码', status)
    console.log('返回的错误信息', response.error)
    return Promise.reject(error)
  })
```

### 代码规范

> 代码规范大家可以参考 [Vue 官方风格指南](https://cn.vuejs.org/v2/style-guide/) 这里写的还是很详细的。

下面简单写一下在项目中开发的一些规范：

1. 命名规范
    - 整体采用小驼峰命名（JS 变量名，函数名等等）；
    - 组件和类名采用大驼峰命名；
    - 文件采用全小写命名，单词之间由短横线分割；
    - 变量，方法，文件命名保持语义化，使人一眼就能确定其作用。
2. 注释规范
    - 写注释的作用是使代码更加方便阅读，所以没必要每行都写注释，大部分可以通过规范的命名来解决代码阅读问题；
    - 功能、算法相关的函数一定要写注释，采用 [JSDoc](https://www.html.cn/doc/jsdoc/tags-example.html) 规范。
3. 开发规范
    - 在编写代码时，首先**保证代码可读性**。
    - 功能开发时，遵守单一功能原则（每部分只负责一个功能），多进行拆分，保证可维护性；
    - 组件开发时，把通用、常用的组件进行拆分，保证可维护性。

## 案例代码

案例代码总共包含 3 个版本：`vue2-rem`、`vue2-viewport`、`vue3-ts-viewport`。

案例代码：[vue-webapp-h5-template](https://github.com/Only-Xc/vue-webapp-h5-template)

欢迎大家来指点问题，希望大家不要吝啬手里的小🌟🌟，也希望能和大家一起进步。
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
      selectorBlackList: [], // 指定不转换为视窗单位的类名
      minPixelValue: 1, // 默认值 1，小于或等于 1px 则不进行转换
      mediaQuery: true, // 是否在媒体查询的 css 代码中也进行转换，默认 false
      replace: true, // 是否转换后直接更换属性值
      // exclude: [/node_modules/], // 设置忽略文件，用正则做目录名匹配
      landscape: false // 是否处理横屏情况
    }
  }
}

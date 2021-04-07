module.exports = {
  plugins: {
    // 英文文档 https://github.com/cuth/postcss-pxtorem#readme
    'postcss-pxtorem': {
      rootValue: 75, // UI 设计稿的宽度 / 10
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

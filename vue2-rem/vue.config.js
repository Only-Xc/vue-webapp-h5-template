const path = require('path')

module.exports = {
  css: {
    loaderOptions: {
      less: {
        modifyVars: {
          // 通过 less 文件覆盖（文件路径为绝对路径）
          hack: `true; @import "${path.resolve('./src/styles/var.less')}";`
        }
      }
    }
  }
}

import store from '@/store'
import { NAVBAR } from '@/constants/mutation-types'

const NEW_NAVBAR = Object.keys(NAVBAR).reduce((origin, key) => {
  const item = NAVBAR[key]
  origin[key] = 'app/' + item
  return origin
}, {})

const { commit } = store

export default {
  handler: {
    /**
     * 设置 nav bar 的显示
     * @param {Boolean} bool 是否显示
     */
    setShow (bool) {
      commit(NEW_NAVBAR.SET_SHOW, !!bool)
    },
    /**
     * 设置 nav bar 的 title
     * @param {String} title 文本
     */
    setTitle (title) {
      commit(NEW_NAVBAR.SET_TITLE, title)
    },
    /**
     * 设置 nav bar 左边内容
     * @param {String} text 文本
     */
    setLeftText (text) {
      commit(NEW_NAVBAR.SET_LEFT_TEXT, text)
    },
    /**
     * 设置 nav bar 的左边的箭头是否显示
     * @param {Boolean} bool 是否显示
     */
    setShowLeftArrow (bool) {
      commit(NEW_NAVBAR.SET_SHOW_LEFT_ARROW, !!bool)
    },
    /**
     * 设置 nav bar 右边内容
     * @param {String} text 文本
     */
    setRightText (text) {
      commit(NEW_NAVBAR.SET_RIGHT_TEXT, text)
    },
    /**
     * 设置 nav bar 右边的 Icon
     * @param {String} icon 图标
     */
    setRightIcon (icon) {
      commit(NEW_NAVBAR.SET_RIGHT_ICON, icon)
    },
    /**
     * 重置 nav bar 的配置
     */
    resetConfig () {
      commit(NEW_NAVBAR.RESET_CONFIG)
    },
    /**
     * 监听 left 点击事件
     * @param {Function} fn 事件处理函数
     */
    onLeftClick (fn) {
      commit(NEW_NAVBAR.ON_LEFT_CLICK, fn)
    },
    /**
     * 监听 right 点击事件
     * @param {Function} fn 事件处理函数
     */
    onRightClick (fn) {
      commit(NEW_NAVBAR.ON_RIGHT_CLICK, fn)
    }
  },
  install (Vue) {
    Vue.prototype.$navBar = this.handler
  }
}

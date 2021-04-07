import store from '@/store'
import { TABBAR } from '@/constants/mutation-types'

const NEW_TABBAR = Object.keys(TABBAR).reduce((origin, key) => {
  const item = TABBAR[key]
  origin[key] = 'app/' + item
  return origin
}, {})

const { commit } = store

export default {
  handler: {
    /**
     * 设置 tab bar 的显示
     * @param {Boolean} bool 是否显示
     */
    setShow (bool) {
      commit(NEW_TABBAR.SET_SHOW, !!bool)
    },
    /**
     * 设置 dot
     * @param {String|Array} key tab bar 的 key，传入数组会循环设置每一项
     * @param {Boolean} bool 是否显示
     */
    setDot (key, bool) {
      const keyArr = Array.isArray(key) ? key : [key]
      keyArr.forEach(item => commit(NEW_TABBAR.SET_SHOW_DOT, { key: item, bool: !!bool }))
    },
    /**
     * 设置 badge
     * @param {String|Array} key tab bar 的 key，传入数组会循环设置每一项
     * @param {Number|String} content 内容
     */
    setBadge (key, content) {
      const keyArr = Array.isArray(key) ? key : [key]
      keyArr.forEach(item => commit(NEW_TABBAR.SET_BADGE, { key: item, content }))
    },
    /**
     * 设置新的 tab bar 列表项
     * @param {Array} list 列表数据
     */
    setNewList (list) {
      commit(NEW_TABBAR.SET_NEW_LIST, list)
    }
  },
  install (Vue) {
    Vue.prototype.$tabBar = this.handler
  }
}

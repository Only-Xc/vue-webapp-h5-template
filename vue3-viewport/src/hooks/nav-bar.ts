
import { computed } from 'vue'
import { useStore } from 'vuex'
import { NAVBAR, NAVBAR_INTERFACE } from '@/constants/mutation-types'

const NEW_NAVBAR = Object.keys(NAVBAR).reduce((origin: {[key: string]: string;}, key: string) => {
  const item = NAVBAR[key]
  origin[key] = 'app/' + item
  return origin
}, {}) as NAVBAR_INTERFACE

type CallBack = () => void

export const useNavBar = () => {
  const { state, commit } = useStore()
  const navBar = computed(() => Object.assign({}, state.app.navBar, state.app.currPageNavBar))

  const handler = {
    /**
     * 设置 nav bar 的显示
     * @param {Boolean} bool 是否显示
     */
    setShow (bool: boolean | undefined) {
      commit(NEW_NAVBAR.SET_SHOW, !!bool)
    },
    /**
     * 设置 nav bar 的 title
     * @param {String} title 文本
     */
    setTitle (title: string | undefined) {
      commit(NEW_NAVBAR.SET_TITLE, title)
    },
    /**
     * 设置 nav bar 左边内容
     * @param {String} text 文本
     */
    setLeftText (text: string | undefined) {
      commit(NEW_NAVBAR.SET_LEFT_TEXT, text)
    },
    /**
     * 设置 nav bar 的左边的箭头是否显示
     * @param {Boolean} bool 是否显示
     */
    setShowLeftArrow (bool: boolean | undefined) {
      commit(NEW_NAVBAR.SET_SHOW_LEFT_ARROW, !!bool)
    },
    /**
     * 设置 nav bar 右边内容
     * @param {String} text 文本
     */
    setRightText (text: string | undefined) {
      commit(NEW_NAVBAR.SET_RIGHT_TEXT, text)
    },
    /**
     * 设置 nav bar 右边的 Icon
     * @param {String} icon 图标
     */
    setRightIcon (icon: string | undefined) {
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
    onLeftClick (fn: CallBack) {
      commit(NEW_NAVBAR.ON_LEFT_CLICK, fn)
    },
    /**
     * 监听 right 点击事件
     * @param {Function} fn 事件处理函数
     */
    onRightClick (fn: CallBack) {
      commit(NEW_NAVBAR.ON_RIGHT_CLICK, fn)
    }
  }

  return { navBar, navBarHandler: handler }
}

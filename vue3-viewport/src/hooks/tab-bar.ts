import { computed } from 'vue'
import { useStore } from 'vuex'
import { TABBAR, TABBAR_INTERFACE } from '@/constants/mutation-types'
import { TabBarItemOption } from '@/store/modules/app'

const NEW_TABBAR = Object.keys(TABBAR).reduce((origin: {[key: string]: string;}, key: string) => {
  const item = TABBAR[key]
  origin[key] = 'app/' + item
  return origin
}, {}) as TABBAR_INTERFACE

export const useTabBar = () => {
  const { state, commit } = useStore()

  const tabBar = computed(() => state.app.tabBar)

  const handler = {
    /**
     * 设置 tab bar 的显示
     * @param {Boolean} bool 是否显示
     */
    setShow (bool: boolean | undefined) {
      commit(NEW_TABBAR.SET_SHOW, !!bool)
    },
    /**
     * 设置 dot
     * @param {String|Array} key tab bar 的 key，传入数组会循环设置每一项
     * @param {Boolean} bool 是否显示
     */
    setDot (key: string, bool: boolean) {
      const keyArr = Array.isArray(key) ? key : [key]
      keyArr.forEach(item => commit(NEW_TABBAR.SET_SHOW_DOT, { key: item, bool: !!bool }))
    },
    /**
     * 设置 badge
     * @param {String|Array} key tab bar 的 key，传入数组会循环设置每一项
     * @param {Number|String} content 内容
     */
    setBadge (key: string, content: (string | number)) {
      const keyArr = Array.isArray(key) ? key : [key]
      keyArr.forEach(item => commit(NEW_TABBAR.SET_BADGE, { key: item, content }))
    },
    /**
     * 设置新的 tab bar 列表项
     * @param {Array} list 列表数据
     */
    setNewList (list: TabBarItemOption[]) {
      commit(NEW_TABBAR.SET_NEW_LIST, list)
    }
  }

  return { tabBar, tabBarHandler: handler }
}

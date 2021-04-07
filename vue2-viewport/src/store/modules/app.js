import keyBy from 'lodash/keyBy'

import appConfig from '@/configs/app.json'
import { TABBAR, NAVBAR } from '@/constants/mutation-types'

// 缓存 tabBarList，根据集合中的 key 提取为一个对象，减少使用时遍历的次数
let cacheTabBarList = keyBy(appConfig.tabBar.list, 'key')

const state = () => {
  return {
    navBar: appConfig.navBar, // nav bar 默认设置
    currPageNavBar: {}, // 当前页面的 nav bar 设置，在 getters 中和 navBar 进行合并
    tabBar: appConfig.tabBar
  }
}

const tabBarTools = {
  [TABBAR.SET_SHOW] (state, bool) {
    state.tabBar.show = bool
  },
  [TABBAR.SET_SHOW_DOT] (state, { key, bool }) {
    const tabBarItem = cacheTabBarList[key]
    if (tabBarItem) {
      tabBarItem.dot = bool
      state.tabBar.list = Object.values(cacheTabBarList)
    }
  },
  [TABBAR.SET_BADGE] (state, { key, content }) {
    const tabBarItem = cacheTabBarList[key]
    if (tabBarItem) {
      tabBarItem.badge = content
      state.tabBar.list = Object.values(cacheTabBarList)
    }
  },
  [TABBAR.SET_NEW_LIST] (state, list) {
    state.tabBar.list = list
    cacheTabBarList = keyBy(list, 'key')
  }
}

const navBarTools = {
  [NAVBAR.SET_SHOW] (state, bool) {
    state.currPageNavBar = Object.assign({}, state.currPageNavBar, { show: bool })
  },
  [NAVBAR.SET_TITLE] (state, title) {
    state.currPageNavBar = Object.assign({}, state.currPageNavBar, { title })
  },
  [NAVBAR.SET_LEFT_TEXT] (state, text) {
    state.currPageNavBar = Object.assign({}, state.currPageNavBar, { leftText: text })
  },
  [NAVBAR.SET_SHOW_LEFT_ARROW] (state, bool) {
    state.currPageNavBar = Object.assign({}, state.currPageNavBar, { leftArrow: bool })
  },
  [NAVBAR.SET_RIGHT_TEXT] (state, text) {
    state.currPageNavBar = Object.assign({}, state.currPageNavBar, { rightText: text })
  },
  [NAVBAR.SET_RIGHT_ICON] (state, icon) {
    state.currPageNavBar = Object.assign({}, state.currPageNavBar, { rightIcon: icon })
  },
  [NAVBAR.ON_LEFT_CLICK] (state, fn) {
    state.currPageNavBar = Object.assign({}, state.currPageNavBar, { handleLeftClick: fn })
  },
  [NAVBAR.ON_RIGHT_CLICK] (state, fn) {
    state.currPageNavBar = Object.assign({}, state.currPageNavBar, { handleRightClick: fn })
  },
  [NAVBAR.RESET_CONFIG] (state) {
    state.currPageNavBar = {}
  }
}

const mutations = {
  ...tabBarTools,
  ...navBarTools
}

export default {
  namespaced: true,
  state,
  mutations
}

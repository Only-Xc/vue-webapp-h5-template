import keyBy from 'lodash/keyBy'

import appConfig from '@/configs/app.json'
import { TABBAR, NAVBAR } from '@/constants/mutation-types'

type CallBack = () => void

export interface NavBarOption {
  show: boolean;
  title: string;
  leftText: string;
  leftArrow: boolean;
  rightText: string;
  rightIcon: string;
  border: boolean;
  safeAreaInsetTop: boolean;
  handleLeftClick?: CallBack;
  handleRightClick?: CallBack;
}

export interface CurrentNavBarOption {
  show?: boolean;
  title?: string;
  leftText?: string;
  leftArrow?: boolean;
  rightText?: string;
  rightIcon?: string;
  handleLeftClick?: CallBack;
  handleRightClick?: CallBack;
}

export interface TabBarItemOption {
  key: string;
  title: string;
  icon: string;
  path: string;
  dot?: boolean;
  badge?: string | number;
}

export interface TabBarOption {
  show: boolean;
  border: boolean;
  activeColor: string;
  inactiveColor: string;
  safeAreaInsetBottom: boolean;
  list: TabBarItemOption[];
}

export interface AppState {
  navBar: NavBarOption;
  currPageNavBar: CurrentNavBarOption;
  tabBar: TabBarOption;
}

// 缓存 tabBarList，根据集合中的 key 提取为一个对象，减少使用时遍历的次数
let cacheTabBarList = keyBy(appConfig.tabBar.list, 'key')

const state = (): AppState => {
  return {
    navBar: appConfig.navBar, // nav bar 默认设置
    currPageNavBar: {}, // 当前页面的 nav bar 设置，在 getters 中和 navBar 进行合并
    tabBar: appConfig.tabBar
  }
}

const tabBarTools = {
  [TABBAR.SET_SHOW] (state: AppState, bool: boolean) {
    state.tabBar.show = bool
  },
  [TABBAR.SET_SHOW_DOT] (state: AppState, { key, bool }: {key: string; bool: boolean;}) {
    const tabBarItem = cacheTabBarList[key]
    if (tabBarItem) {
      tabBarItem.dot = bool
      state.tabBar.list = Object.values(cacheTabBarList)
    }
  },
  [TABBAR.SET_BADGE] (state: AppState, { key, content }: {key: string; content: string;}) {
    const tabBarItem = cacheTabBarList[key]
    if (tabBarItem) {
      tabBarItem.badge = content
      state.tabBar.list = Object.values(cacheTabBarList)
    }
  },
  [TABBAR.SET_NEW_LIST] (state: AppState, list: TabBarItemOption[]) {
    state.tabBar.list = list
    cacheTabBarList = keyBy(list, 'key')
  }
}

const navBarTools = {
  [NAVBAR.SET_SHOW] (state: AppState, bool: boolean) {
    state.currPageNavBar = Object.assign({}, state.currPageNavBar, { show: bool })
  },
  [NAVBAR.SET_TITLE] (state: AppState, title: string) {
    state.currPageNavBar = Object.assign({}, state.currPageNavBar, { title })
  },
  [NAVBAR.SET_LEFT_TEXT] (state: AppState, text: string) {
    state.currPageNavBar = Object.assign({}, state.currPageNavBar, { leftText: text })
  },
  [NAVBAR.SET_SHOW_LEFT_ARROW] (state: AppState, bool: boolean) {
    state.currPageNavBar = Object.assign({}, state.currPageNavBar, { leftArrow: bool })
  },
  [NAVBAR.SET_RIGHT_TEXT] (state: AppState, text: string) {
    state.currPageNavBar = Object.assign({}, state.currPageNavBar, { rightText: text })
  },
  [NAVBAR.SET_RIGHT_ICON] (state: AppState, icon: string) {
    state.currPageNavBar = Object.assign({}, state.currPageNavBar, { rightIcon: icon })
  },
  [NAVBAR.ON_LEFT_CLICK] (state: AppState, fn: CallBack) {
    state.currPageNavBar = Object.assign({}, state.currPageNavBar, { handleLeftClick: fn })
  },
  [NAVBAR.ON_RIGHT_CLICK] (state: AppState, fn: CallBack) {
    state.currPageNavBar = Object.assign({}, state.currPageNavBar, { handleRightClick: fn })
  },
  [NAVBAR.RESET_CONFIG] (state: AppState) {
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

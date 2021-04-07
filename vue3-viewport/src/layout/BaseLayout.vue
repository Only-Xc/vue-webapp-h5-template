<template>
  <div ref="baseLayout" class="base-layout">
    <van-nav-bar
      v-if="navBar.show"
      :title="navBar.title"
      :left-arrow="!tabBar.show && navBar.leftArrow"
      :left-text="navBar.leftText"
      :right-text="navBar.rightText"
      :border="navBar.border"
      :safe-area-inset-top="navBar.safeAreaInsetTop"
      @click-left="onClickLeft"
      @click-right="onClickRight"
    >
      <template v-if="navBar.rightIcon" #right>
        <span v-if="navBar.rightText" class="van-nav-bar__text">{{navBar.rightText}}</span>
        <van-icon :name="navBar.rightIcon" size="18" />
      </template>
    </van-nav-bar>

    <div class="container">
      <router-view v-slot="{ Component }">
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </router-view>
    </div>

    <van-tabbar
      v-if="tabBar.show"
      v-model="active"
      :border="tabBar.border"
      :active-color="tabBar.activeColor"
      :inactive-color="tabBar.inactiveColor"
      :safe-area-inset-bottom="tabBar.safeAreaInsetBottom"
      :fixed="false"
      route
      @change="onTabBarChange"
    >
      <van-tabbar-item
        v-for="item of tabBar.list"
        :key="item.key"
        :to="item.path"
        :icon="item.icon"
        :dot="item.dot"
        :badge="item.badge"
        replace
      >{{ item.title }}</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script lang="ts">
// utils
import { defineComponent, watch, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useNavBar } from '@/hooks/nav-bar'
import { useTabBar } from '@/hooks/tab-bar'
// types
import { BaseLayoutMetaOption } from '@/router/index'
// components
import { NavBar, Tabbar, TabbarItem, Icon } from 'vant'
// others
function notUndefined (val: any) {
  return typeof val !== 'undefined'
}
// vm
export default defineComponent({
  components: {
    [NavBar.name]: NavBar,
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem,
    [Icon.name]: Icon
  },
  setup () {
    const route = useRoute()
    const router = useRouter()

    const active = ref(0)

    const { navBar, navBarHandler } = useNavBar()
    const { tabBar, tabBarHandler } = useTabBar()

    watch(() => route.path,
      () => {
        // 先重置 nav bar 设置
        navBarHandler.resetConfig()
        // 根据 route meta 设置一些默认值
        const { title, showTabBar, hiddenNavBar, navBarLeftText, navBarHiddenLeftArrow, navBarRightText, navBarRightIcon } = route.meta as BaseLayoutMetaOption
        tabBarHandler.setShow(showTabBar)
        // 如果显示 tab bar 就不需要默认展示内页的相关配置
        if (showTabBar) {
          navBarHandler.setLeftText('')
          navBarHandler.setRightText('')
          navBarHandler.setRightIcon('')
        }
        if (hiddenNavBar) {
          navBarHandler.setShow(false)
        } else {
          // 显示 nav bar 时再进行相关设置
          notUndefined(title) && navBarHandler.setTitle(title)
          notUndefined(navBarLeftText) && navBarHandler.setLeftText(navBarLeftText)
          notUndefined(navBarHiddenLeftArrow) && navBarHandler.setShowLeftArrow(false)
          notUndefined(navBarRightText) && navBarHandler.setRightText(navBarRightText)
          notUndefined(navBarRightIcon) && navBarHandler.setRightIcon(navBarRightIcon)
        }
      },
      { immediate: true }
    )

    const onClickLeft = () => {
      let flag = true
      const cb = navBar.value.handleLeftClick
      const next = (bool = true) => (flag = bool)
      cb && cb(next)
      flag && router.go(-1)
    }

    const onClickRight = () => {
      const cb = navBar.value.handleRightClick
      cb && cb()
    }

    const onTabBarChange = (index: number) => {
      console.log(index, tabBar.value.list[index])
    }

    return { navBar, tabBar, active, onClickLeft, onClickRight, onTabBarChange }
  }
})
</script>

<style lang="less" scoped>
.base-layout {
  display: flex;
  flex-direction: column;
  height: 100%;

  .container {
    height: 100%;
    flex: 1;
    position: relative;
    overflow: hidden;

    .animate-container {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
    }
  }
}

.van-nav-bar__text {
  margin-right: 4px;
}
</style>

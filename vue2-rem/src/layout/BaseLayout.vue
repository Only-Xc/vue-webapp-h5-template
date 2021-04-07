<template>
  <div class="base-layout">
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
      <keep-alive>
        <router-view />
      </keep-alive>
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

<script>
// utils
import { mapGetters } from 'vuex'
// components
import { NavBar, Tabbar, TabbarItem, Icon } from 'vant'
// others
function notUndefined (val) {
  return typeof val !== 'undefined'
}
// vm
export default {
  components: {
    [NavBar.name]: NavBar,
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem,
    [Icon.name]: Icon
  },
  computed: {
    ...mapGetters(['navBar', 'tabBar'])
  },
  watch: {
    // 每当 route 改变时，进行一些处理
    $route: {
      handler (route) {
        // 先重置 nav bar 设置
        this.$navBar.resetConfig()
        // 根据 route meta 设置一些默认值
        const { title, showTabBar, hiddenNavBar, navBarLeftText, navBarHiddenLeftArrow, navBarRightText, navBarRightIcon } = route.meta
        this.$tabBar.setShow(showTabBar)
        // 如果显示 tab bar 就不需要默认展示内页的相关配置
        if (showTabBar) {
          this.$navBar.setLeftText('')
          this.$navBar.setRightText('')
          this.$navBar.setRightIcon('')
        }
        if (hiddenNavBar) {
          this.$navBar.setShow(false)
        } else {
          // 显示 nav bar 时再进行相关设置
          notUndefined(title) && this.$navBar.setTitle(title)
          notUndefined(navBarLeftText) && this.$navBar.setLeftText(navBarLeftText)
          notUndefined(navBarHiddenLeftArrow) && this.$navBar.setShowLeftArrow(false)
          notUndefined(navBarRightText) && this.$navBar.setRightText(navBarRightText)
          notUndefined(navBarRightIcon) && this.$navBar.setRightIcon(navBarRightIcon)
        }
      },
      immediate: true
    }
  },
  data () {
    return {
      active: 0
    }
  },
  methods: {
    onClickLeft () {
      let flag = true
      const cb = this.navBar.handleLeftClick
      const next = (bool = true) => (flag = bool)
      cb && cb(next)
      flag && this.$router.go(-1)
    },
    onClickRight () {
      const cb = this.navBar.handleRightClick
      cb && cb()
    },
    onTabBarChange (index) {
      console.log(index, this.tabBar.list[index])
    }
  }
}
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

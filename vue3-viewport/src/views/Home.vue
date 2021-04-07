<template>
  <div class="home">
    <div class="txt line" @click="$router.push('/inner')">MI</div>
  </div>
</template>

<script lang="ts">
// utils
import { defineComponent, onActivated } from 'vue'
import { useNavBar } from '@/hooks/nav-bar'
import { useTabBar } from '@/hooks/tab-bar'
// components
import { Button } from 'vant'
// vm
export default defineComponent({
  name: 'Home',
  components: {
    [Button.name]: Button
  },
  setup () {
    const { navBarHandler } = useNavBar()
    const { tabBarHandler } = useTabBar()

    onActivated(() => {
      navBarHandler.setTitle('啦啦啦')

      tabBarHandler.setDot('HOME', true)
      tabBarHandler.setBadge('ABOUT', '100')
    })
  }
})
</script>

<style lang="less" scoped>
@import '~@/styles/mixins.less';

.home {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.txt {
  width: 55px;
  height: 55px;
  margin: 0 auto;
  line-height: 55px;
  text-align: center;
  border-radius: 19px;
  background-color: #ff6700;
  font-size: 24px;
  font-weight: 700;
  color: #fff;
}

.line {
  .hairline(@dir: left, right, top, bottom; @radius: 19px;);
}
</style>

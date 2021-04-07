<template>
  <div class="home">
    <div class="txt line" @click="$router.push('/inner')">MI</div>
  </div>
</template>

<script>
// @ is an alias to /src
import { Button } from 'vant'

export default {
  name: 'Home',
  components: {
    [Button.name]: Button
  },
  activated () {
    this.$navBar.setTitle('啦啦啦')

    this.$tabBar.setDot('HOME', true)
    this.$tabBar.setBadge('ABOUT', '100')
  }
}
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

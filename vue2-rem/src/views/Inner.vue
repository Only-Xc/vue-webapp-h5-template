<template>
  <div class="home">
    <van-button >内页</van-button>
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
    this.$navBar.onLeftClick(function (next) {
      next(false)
      console.log('左键点击，取消默认返回')
    })
  }
}
</script>

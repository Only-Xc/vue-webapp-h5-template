<template>
  <div class="home">
    <van-button>内页</van-button>
  </div>
</template>

<script>
// utils
import { defineComponent, onActivated } from 'vue'
import { useNavBar } from '@/hooks/nav-bar'
// components
import { Button } from 'vant'
// vm
export default defineComponent({
  name: 'Inner',
  components: {
    [Button.name]: Button
  },
  setup () {
    const { navBarHandler } = useNavBar()

    onActivated(() => {
      navBarHandler.onLeftClick(function (next) {
        next(false)
        console.log('左键点击，取消默认返回')
      })
    })
  }
})
</script>

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 全局 css
import './styles/index.less'

createApp(App)
  .use(store)
  .use(router)
  .mount('#app')

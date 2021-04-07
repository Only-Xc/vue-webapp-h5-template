import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 适配
import 'amfe-flexible'

// 全局 css
import './styles/index.less'

// plugins
import navBar from '@/plugins/nav-bar'
import tabBar from '@/plugins/tab-bar'

Vue.config.productionTip = false

Vue.use(navBar)
Vue.use(tabBar)

Vue.prototype.bus = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

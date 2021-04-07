import Vue from 'vue'
import VueRouter from 'vue-router'

import BaseLayout from '@/layout/BaseLayout'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home'
  },

  {
    path: '/home',
    component: BaseLayout,
    children: [
      {
        path: '/',
        name: 'Home',
        hidden: false,
        component: () => import(/* webpackChunkName: "Home" */ '@/views/Home.vue'),
        meta: {
          title: '主页',
          showTabBar: true
          // hiddenNavBar: false,
          // navBarLeftText: '',
          // navBarHiddenLeftArrow: '',
          // navBarRightText: '',
          // navBarRightIcon: ''
        }
      }
    ]
  },

  {
    path: '/about',
    component: BaseLayout,
    children: [
      {
        path: '/',
        name: 'About',
        component: () => import(/* webpackChunkName: "About" */ '@/views/About.vue'),
        meta: { title: '我的', showTabBar: true, hiddenNavBar: true }
      }
    ]
  },

  {
    path: '/inner',
    component: BaseLayout,
    children: [
      {
        path: '/',
        name: 'Inner',
        component: () => import(/* webpackChunkName: "Inner" */ '@/views/Inner.vue'),
        meta: { title: '内页' }
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

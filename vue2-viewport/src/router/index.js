import Vue from 'vue'
import VueRouter from 'vue-router'

import BaseLayout from '@/layout/BaseLayout'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: BaseLayout,
    name: 'BaseLayout',
    redirect: '/home',
    children: [
      {
        path: '/home',
        name: 'Home',
        component: () => import(/* webpackChunkName: "Home" */ '@/views/Home.vue'),
        meta: { title: '主页', showTabBar: true }
      },
      {
        path: '/about',
        name: 'About',
        component: () => import(/* webpackChunkName: "About" */ '@/views/About.vue'),
        meta: { title: '我的', showTabBar: true, hiddenNavBar: true }
      },
      {
        path: '/inner',
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

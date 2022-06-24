import Vue from 'vue';
import Vuerouter from 'vue-router'

const home = () => import('@/pages/home/home')
const category = () => import('@/pages/category/category')
const shopcart = () => import('@/pages/shopcart/shopcart')
const profile = () => import('@/pages/profile/profile')
const detail = () => import('@/pages/detail/detail')
const mygoods = () => import('@/pages/myGoods/MyGoods')


// 下面两行代码解决路由重复使用报错消除

// const originalPush = Vuerouter.prototype.push

// Vuerouter.prototype.push = function push(location) {
//   return originalPush.call(this, location).catch(err => err)
// }

Vue.use(Vuerouter)

const routes = [
  {
    path: '',
    redirect: '/home'
  },
  {
    path: '/home',
    component: home
  },
  {
    path: '/category',
    component: category
  },
  {
    path: '/shopcart',
    component: shopcart
  },
  {
    path: '/profile',
    component: profile
  },
  {
    name: 'Detail',
    path: '/detail/:iid',
    component: detail
  },
  {
    path: '/mygoods',
    component: mygoods
  }
]

const router = new Vuerouter({
  mode: 'history',
  routes,

})

export default router
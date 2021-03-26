import { createRouter, createWebHistory } from 'vue-router'
// import Home from '@/views/Home.vue'

// route level code-splitting
// this generates a separate chunk (about.[hash].js) for this route
// which is lazy-loaded when the route is visited.
const Home = () => import(/* webpackChunkName: "home" */ '@/views/home/Home.vue')
const Catrgory = () => import(/* webpackChunkName: "home" */ '@/views/category/Catrgory.vue')
const Cart = () => import(/* webpackChunkName: "home" */ '@/views/cart/Cart.vue')
const User = () => import(/* webpackChunkName: "home" */ '@/views/user/User.vue')

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/category',
    name: 'Catrgory',
    component: Catrgory
  },
  {
    path: '/cart',
    name: 'Cart',
    component: Cart
  },
  {
    path: '/user',
    name: 'User',
    component: User
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router

import Vue from "vue";
import Router from "vue-router";
const Home = () => import('../views/home/Home')
const Category = () => import('../views/category/Catgory')
const Cart = () => import('../views/cart/Cart')
const Profile = () => import('../views/profile/Profile')

// 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)}

//安装插件
Vue.use(Router)



//创建router
const routes =[
  {
    path: '',
    redirect: './home'
  }, {
    path: '/home',
    component: Home
  }, {
    path: '/category',
    component: Category
  }, {
    path: '/cart',
    component: Cart
  }, {
    path: '/profile',
    component: Profile
  }
]

const router = new Router({
  routes,
  mode:'history'
})

export default router

import Vue from 'vue'
import Router from 'vue-router'
// tabbar组件引入
import Home from '@/components/tabbar/home'
import Member from '@/components/tabbar/member'
import Cart from '@/components/tabbar/cart'
import Search from '@/components/tabbar/search'
// goods组件引入
import Goods from '@/components/goods/goods'
import GoodsDetail from '@/components/goods/goodsDetail'
// news组件引入
import News from '@/components/news/news'
import NewsDetail from '@/components/news/newsDetail'
// pics组件引入
import Pics from '@/components/pics/pics'
import PicsDetail from '@/components/pics/picsDetail'



Vue.use(Router)

export default new Router({
  routes: [
    // tabbar 路由
    {
      path: '/',
      redirect: "/home"
    },
    {
      path: '/home',
      component: Home
    },
    {
      path: '/member',
      component: Member
    },
    {
      path: '/cart',
      component: Cart
    },
    {
      path: '/search',
      component: Search
    },
    // 商品路由
    {
      path: '/goods',
      component: Goods
    },
    {
      path: '/goods/detail/:id',
      component: GoodsDetail
    },
    // 新闻路由
    {
      path: '/news',
      component: News
    },
    {
      path: '/news/detail/:id',
      component: NewsDetail
    },
    // 图片路由
    {
      path: '/pics/:id',
      component: Pics
    },
    {
      path: '/pics/detail/:id',
      component: PicsDetail
    }
  ],
  linkActiveClass:"mui-active"
})

import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false

// 引入mint-ui全部组件
import Mint from 'mint-ui';
// 引入mint-ui的css样式
import "../node_modules/mint-ui/lib/style.min.css"
// 挂载在Vue对象上 --> 全局均可使用mint-ui
Vue.use(Mint);
// 引入mint-ui的lazyload模块
import { Lazyload } from 'mint-ui';
Vue.use(Lazyload);
// 引入vuepreview插件
import VuePreview from 'vue-preview'
// defalut install
Vue.use(VuePreview)

// 引入mui样式
import "@/assets/mui/css/mui.min.css"
import "@/assets/mui/css/icons-extra.css"
// 引入vuex的store
import store from "@/store/index";

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App),
  store
})

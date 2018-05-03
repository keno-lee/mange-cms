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

// 引入mui样式
import "@/assets/mui/css/mui.min.css"
import "@/assets/mui/css/icons-extra.css"

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})

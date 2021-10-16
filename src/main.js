import Vue from 'vue'
import App from './App'
import router from './router'
import store from "@/store";
import FastClick from "fastclick"
import VueLazyload from "vue-lazyload";

import toast from "@/components/common/toast/index";

Vue.config.productionTip = false
//添加事件总线对象
Vue.prototype.$bus = new Vue()

//安装toast插件
Vue.use(toast)

//解决移动端300ms延时
FastClick.attach(document.body)

//使用懒加载插件
Vue.use(VueLazyload)
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})

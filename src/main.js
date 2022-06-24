import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index';
import VueLazyload from 'vue-lazyload';
import FastClick from 'fastclick';


Vue.config.productionTnpmip = false

// 解决移动端300ms延迟
FastClick.attach(document.body);

Vue.use(VueLazyload, {
  loading: require("./assets/img/common/胡桃.gif")
});
new Vue({
  render: h => h(App),
  router,
  store,
  beforeCreate() {
    Vue.prototype.$bus = this
  }
}).$mount('#app')

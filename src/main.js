// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import iview from 'iview'
import 'iview/dist/styles/iview.css'
import animate from 'animate.css'

Vue.config.productionTip = false
Vue.use(iview);
Vue.use(animate);

//切换路由进度条配置
Vue.prototype.$Loading.config({
  color: 'rgb(25,125,127)',
  failedColor: '#f0ad4e'
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
});


router.beforeEach((to, from, next) => {
  iview.LoadingBar.start();
  next();
});

router.afterEach(route => {
  iview.LoadingBar.finish();
});
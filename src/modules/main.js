// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import services from './service/index'
import router from './router';
import './router/routeInterceptor';
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);
Object.defineProperty(Vue.prototype,'$services',{value:services});

Vue.config.errorHandler = (err, vm, info) => {
  console.error(err);
};

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

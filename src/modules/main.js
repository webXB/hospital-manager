// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router/index'
import services from './service/index'

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

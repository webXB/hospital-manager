import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
const routes = [
  {
    path:'/login',
    name:'login',
    meta:{
      title:'登录',
    },
    component(resolve){
      require(['@views/login'],resolve);
    }
  },
  {
    path:'/',
    name:'main',
    meta:{
      title:'首页',
    },
    component(resolve){
      require(['@views/main'],resolve);
    }
  },
  // {
  //   path: '*', redirect: '/login'
  // }
];

const router = new Router({
  mode:'hash',
  routes
});

export default router;

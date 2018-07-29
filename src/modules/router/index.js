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
    },
    children:[{
      path:'/sectionManage',
      name:'sectionManage',
      meta:{
        title:'部门管理'
      },
      component(resolve){
        require(['@views/sectionManage'],resolve);
      }
    },{
        path:'/employeeManage',
        name:'employeeManage',
        meta:{
          title:'员工管理'
        },
        component(resolve){
          require(['@views/employeeManage'],resolve);
        }
      },{
        path:'/operationLog',
        name:'operationLog',
        meta:{
          title:'操作日志'
        },
        component(resolve){
          require(['@views/operationLog'],resolve);
        }
      },
    ]
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

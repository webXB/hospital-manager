import router from './index';
import {getToken} from "@/modules/utils/common";

const whiteList = ['/login'];
router.beforeEach((to,from,next)=>{
  if(getToken() && getToken() != undefined){
    if(to.path === '/login'){
      next('/');
    }else{
      next();
    }
  }else{
    if(whiteList.includes(to.path)){
      next();
    }else{
      next('/login')
    }
  }
});


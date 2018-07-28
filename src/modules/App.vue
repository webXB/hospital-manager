<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  import "@assets/icon/iconfont.css"
  import 'element-ui/lib/theme-chalk/index.css'
  export default {
   data(){
     return {
       tabbarList:{},

     }
   }
  }
</script>

<style scoped rel="stylesheet/less" lang="less">
  @import "~@assets/less/reset.less";

  #app{
    width: 100%;
    height: 100%;
  }
</style>

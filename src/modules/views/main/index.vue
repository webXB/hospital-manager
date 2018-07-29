<template>
  <el-container style="height: 100%">
    <el-header style="background-color: #1ABC9C;height: 50px;">
      <HeaderNav></HeaderNav>
    </el-header>
    <el-main>
      <LeftNav :menuList="allMenuList" @mainJump= "mainJump" :url="url"></LeftNav>
      <div class="page-main">
        <router-view></router-view>
      </div>
      </el-main>
  </el-container>
</template>

<script>
    import ElContainer from "element-ui/packages/container/src/main";
    import 'element-ui/lib/theme-chalk/index.css'
    import {HeaderNav,LeftNav} from '@/modules/components'
    import ElMain from "element-ui/packages/main/src/main";
    import ElHeader from "element-ui/packages/header/src/main";
    export default {
      data(){
        return{
          allMenuList:[],
        }
      },
      created(){
        this.getAllMenuList();
      },
      methods:{
        async getAllMenuList(){
          let res = await this.$services.getCurrentUserMenuList({
            method:'get'
          });

          if(res.code === 1){
            this.allMenuList = res.data;
          }
        },
        mainJump(url){
           this.$router.push(url);
        }
      },
      components: {
        ElHeader,
        ElMain,
        ElContainer,HeaderNav,LeftNav}

    }
</script>

<style scoped lang="less" rel="stylesheet/less">
  @import './style.less';
</style>

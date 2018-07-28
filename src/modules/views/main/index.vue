<template>
  <el-container style="height: 100%">
    <el-header style="background-color: #1ABC9C;height: 50px;">
      <HeaderNav></HeaderNav>
    </el-header>
    <el-container style="height: 100%">
      <LeftNav></LeftNav>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
    import ElContainer from "element-ui/packages/container/src/main";
    import 'element-ui/lib/theme-chalk/index.css'
    import {HeaderNav,LeftNav} from '@/modules/components'
    import ElMain from "element-ui/packages/main/src/main";
    import ElAside from "element-ui/packages/aside/src/main";
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
          let res = await this.$services.getAllMenuList();

          if(res.code === 1){
            this.allMenuList = res.data;
            console.log(this.allMenuList);
          }
        }
      },
      components: {
        ElHeader,
        ElAside,
        ElMain,
        ElContainer,HeaderNav,LeftNav}

    }
</script>

<style scoped>

</style>

<template>
  <div class="left-nav">
    <ul class = "menuList">
      <li class="menuListItem" v-for="(item,index) in menuList" @mouseover = "showFocusDetail(item)" @mouseleave = "hideFocusDetail()">
        <span>{{item.menu_name}}</span>
        <ul class="menuListDetail" v-for="item in menuFocusList"  v-if="showDetail">
          <li class="currentMenu">{{item.menu_name}}</li>
          <li class="menuListDetailItem" @click = "jumpOtherPage(items.menu_url)" v-for="items in item.child">• {{items.menu_name}}</li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
    export default {
      data(){
        return{
          showDetail:false,
          menuFocusList:[],
          currentMenu:''
        }
      },
      methods:{
        showFocusDetail(item){
          this.menuFocusList = item.child;
          this.showDetail  = true;
          this.currentMenu = item.menu_classify;
        },
        hideFocusDetail(){
          this.menuFocusList = [];
          this.showDetail  = false;
        },
        jumpOtherPage(url){
          this.$emit('mainJump',url);
        }
      },
      props:{
        menuList:{
          type:Array
        }
      }
    }
</script>

<style scoped  lang="less" rel="stylesheet/less">
  @import "./style.less";
</style>

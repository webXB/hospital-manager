<template>
  <div class="left-nav">
    <ul class = "menuList">
      <li class="menuListItem" v-for="(item,index) in menuList" @mouseover = "showFocusDetail(item)" @mouseleave = "hideFocusDetail()">
        <span>{{item.menu_name}}</span>
        <ul class="menuListDetail"  v-if="showDetail" :style = "{height : listHeight + 'px'}">
          <li class="currentMenu">{{currentMenu}}</li>
          <li class="menuListDetailItem" v-for="item in menuFocusList" @click = "jumpOtherPage(item.url)">• {{item.menu_name}}</li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
    import ElAside from "element-ui/packages/aside/src/main";
    const H = document.documentElement.scrollHeight > document.documentElement.clientHeight ? document.documentElement.scrollHeight  : document.documentElement.clientHeight - 50;
    export default {
      data(){
        return{
          showDetail:false,
          menuFocusList:[],
          currentMenu:'',
          listHeight:H
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
      components: {ElAside},
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

<template>
  <div class="body-container">
    <div class="imgInstall"></div>
    <div class="login-container">
      <h1>华速医药管理系统</h1>
      <div class="form-container">
        <div class="input-container">
        <el-input v-model="account" placeholder = '请输入用户名称' type="text"></el-input>
        </div>
        <div class="input-container">
        <el-input v-model="pwd" placeholder = '请输入登陆密码' type="password"></el-input>
        </div>
        <el-button size="medium" @click = 'login' :class="{'input-wrong':inputError}">登录</el-button>
        <div class="login-tips" v-if="inputError">
          {{message}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    import ElInput from "element-ui/packages/input/src/input";
    import ElButton from "element-ui/packages/button/src/button";
    import md5 from 'js-md5'
    import {setToken} from '@/modules/utils/common'

    export default {
      components: {
        ElButton,
        ElInput},
      data(){
        return{
          pwd:'',
          account:'',
          message:'',
          inputError:false,
          tips:''
        }
      },
      methods:{
        async login(){
          this.inputError = false;
          if(this.account === ''){
            this.inputError = true;
            this.message = '请输入用户名';
            return;
          }else if(this.pwd === ''){
            this.inputError = true;
            this.message = '请输入密码';
            return;
          }
          try{
          let res = await this.$services.login({
            data:{
              account:this.account,
              pwd:md5(this.pwd)
            }
          });
          if(res.code !== 1){
            this.inputError = true;
            this.message = '用户名或密码错误';
          }else {
            setToken(res.data.sid);
            this.$router.replace('/');
          }
          }catch (err){
            this.inputError = false;
            this.message = '';
          }
        }
      }
    }
</script>
<style>
  .form-container .el-input .el-input__inner{
    height: 50px;
    line-height: 50px;
  }
  .form-container .el-input .el-input__inner:focus{
    border: 2px solid #1ABC9C;
  }
  .form-container .el-button.el-button--default.el-button--medium{
    box-sizing: border-box;
    width: 100%;
    height: 50px;
    text-align: center;
    font-size: 18px;
    background-color: #1ABC9C;
    color: #ffffff;
    margin-bottom: 10px;
    border-radius: 3px;
  }
</style>
<style scoped lang="less" rel="stylesheet/less">
  @import "./style.less";

</style>

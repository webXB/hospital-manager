<template>

  <div class="table-container">
    <div>
      <div class="clearfix search-container">
      <div class="fl">
        <span class="table-title">筛选查询</span>
      </div>
      <div class="fr">
        <a href="javaScript:;">收起查询</a>
        <el-button size="medium" @click="getUserListPage">查询结果</el-button>
      </div>
    </div>
      <div class="search-item clearfix">
        <div class="input-container">
          <label class="input-label">输入搜索：</label>
          <el-input v-model="qryLikeInfo" placeholder="用户名/姓名/手机号"></el-input>

        </div>
        <div class="input-container">
          <label class="input-label">所属部门：</label>
          <el-select v-model="departmentId" placeholder="全部">
            <el-option v-for="item in departmentOptions" :key="item.id" :label="item.department_name" :value="item.id"></el-option>
          </el-select>
        </div>
      </div>
    </div>
    <div class="clearfix title-container">
      <div class="fl">
        <span class="table-title">数据列表</span>
      </div>
      <div class="fr">
        <el-button size="medium" @click="showaddDialog">增加</el-button>
      </div>
    </div>
    <el-table :data="userListPage" border style="width: 100%" >
      <el-table-column prop="account" label="成员账号" width="139" align="center" ></el-table-column>
      <el-table-column prop="name" label="姓名" width="139" align="center"></el-table-column>
      <el-table-column prop="email" label="邮箱地址" width="145" align="center"></el-table-column>
      <el-table-column prop="department_name" label="所属部门" width="145" align="center"></el-table-column>
      <el-table-column prop="create_time" label="添加时间" width="145" align="center"></el-table-column>
      <el-table-column prop="last_login_time" label="最后登录" width="145" align="center"></el-table-column>
      <el-table-column  label="是否启用" width="139" align="center">

      </el-table-column>
      <el-table-column  label="操作" width="200" align="center">
        <template slot-scope="scope">
          <el-button type="text" size="small">权限操作</el-button>
          <el-button type="text" size="small" @click="showUpdateDialog(scope.row)">编辑</el-button>
          <el-button type="text" size="small" @click="deleteUser(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[5,10,20,50]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pageDetail.totalItem">
      </el-pagination>
    </div>

    <el-dialog title="成员编辑" :visible.sync="dialogVisiable" width="50%" center>
      <div>
        <div class="input-container">
          <label class="input-label">登录用户名：</label>
          <el-input v-model="account" placeholder="请输入内容" @blur="validateAccount"></el-input>
        </div>
        <div>
          <div class="input-container">
            <label class="input-label">员工姓名：</label>
            <el-input v-model="name" placeholder="请输入内容"></el-input>
          </div>
        </div>
      </div>
      <div>
        <div class="input-container">
          <label class="input-label">手机号：</label>
          <el-input v-model="phone" placeholder="请输入内容" @blur="validatePhone"></el-input>
        </div>
        <div>
          <div class="input-container">
            <label class="input-label">所属部门：</label>
            <el-select v-model="dialogDepartmentId" placeholder="全部">
              <el-option v-for="item in departmentOptions" :key="item.id" :label="item.department_name" :value="item.id"></el-option>
            </el-select>
          </div>
        </div>
      </div>
      <div>
        <div class="input-container">
          <label class="input-label">登录密码：</label>
          <el-input v-model="pwd" type="password" placeholder="请输入内容"></el-input>
        </div>
        <div>
          <div class="input-container">
            <label class="input-label">确认密码：</label>
            <el-input v-model="repwd" type="password" placeholder="请输入内容"></el-input>
          </div>
        </div>
      </div>
      <div class="input-container">
        <label>备注：</label>
        <el-input type="textarea" :rows="5" v-model="remark" placeholder="请输入内容"></el-input>
      </div>
      <span slot="footer" class="dialog-footer">
         <el-button type="primary" @click="addNewOrUpdateUser">确 定</el-button>
         <el-button @click="hideDialog">取 消</el-button>
      </span>
    </el-dialog>
  </div>



</template>

<script>

  import ElButton from "element-ui/packages/button/src/button";
  import {MessageBox} from 'element-ui';
  import md5 from 'js-md5';

  export default {

    components: {ElButton},
    data(){
      return {
        //查询
        userListPage:[],
        pageDetail:{},
        currentPage:1,
        pageSize:10,
        //控制对话框
        dialogVisiable:false,

        buttonType:'',
        updateId:'',
        updateUpdateTime:'',
        qryLikeInfo:'',
        departmentId:'',
        departmentOptions:[],
        //用户编辑新增相关
        account:'',
        pwd:'',
        dialogDepartmentId:'',
        name:'',
        phone:'',
        remark:'',
        repwd:''
      }
    },
    created(){
      this.getUserListPage();
      this.getDepartmentAll();
    },
    methods:{
      async getUserListPage(){
        let data = {
          currentPage:this.currentPage,
          pageSize:this.pageSize,
          qry_like_info:this.qryLikeInfo,
          department_id:this.departmentId
        };
        let res = await this.$services.userPageList({
          data,
          method:'get'
        });
        if(res.code === 1){
          this.userListPage = res.data.pageList;
          this.pageDetail = res.data.page;
        }
      },
      handleCurrentChange(val){
        this.currentPage = val;
        this.getUserListPage();
      },
      handleSizeChange(val){
        this.pageSize = val;
        this.getUserListPage();
      },
      showaddDialog(){
        this.account = '';
        this.pwd='';
        this.dialogDepartmentId = '';
        this.name='';
        this.phone = '';
        this.remark = '';
        this.repwd = '';
        this.updateUpdateTime = '';
        this.updateId = '';
        this.buttonType = 'add';
        this.dialogVisiable = true;
      },
      showUpdateDialog(data){
          this.account = data.account;
          this.pwd='';
          this.dialogDepartmentId = data.department_id;
          this.name=data.name;
          this.phone = data.phone;
          this.remark = data.remark;
          this.repwd = '';
          this.updateUpdateTime = data.update_time;
          this.updateId = data.id;
          this.buttonType = 'update';
          this.dialogVisiable = true;
      },
      showDialog(){
        this.dialogVisiable = true;
      },
      hideDialog(){
        this.dialogVisiable = false;
      },
      addNewOrUpdateUser(){
        if(this.buttonType === 'add'){
          if(this.pwd === '' || this.repwd ===''){
            return;
          }
          if(this.pwd !== this.repwd){
            return;
          }
          this.addNew();
        }else{
          if(this.pwd !== '' || this.repwd!==''){
            if(this.pwd !== this.repwd){
              return;
            }
          }
          this.updateUser();
        }
      },
      async addNew(){
        try{
          let res = await this.$services.userAdd({
            data: {
              account:this.account,
              pwd:pwed===''?'':md5(this.pwd),
              department_id:this.dialogDepartmentId,
              name:this.name,
              phone:this.phone,
              remark:this.remark
            }
          });
          if(res.code === 1){
            this.hideDialog();
            MessageBox.confirm('添加成功', '提示', {
              confirmButtonText: '确定',
              callback:()=>{
                let data = {
                  currentPage:1,
                  pageSize:this.pageSize
                };
                this.getUserListPage();
              }
            });
          }else {
            this.hideDialog();
            MessageBox.confirm(res.msg, '提示', {
              confirmButtonText: '确定',
              callback:()=>{
                this.showDialog()
              }
            });
          }
        }catch(err){
          console.log(err);
        }
      },
      async updateUser(){
        try{
          let res = await this.$services.userUpdate({
            data: {
              account:this.account,
              pwd:md5(this.pwd),
              department_id:this.dialogDepartmentId,
              name:this.name,
              phone:this.phone,
              remark:this.remark,
              id:this.updateId,
              update_time:this.updateUpdateTime
            }
          });
          if(res.code === 1){
            this.hideDialog();
            MessageBox.confirm('更新成功', '提示', {
              confirmButtonText: '确定',
              callback:()=>{
                let data = {
                  currentPage:1,
                  pageSize:this.pageSize
                };
                this.getUserListPage();
              }
            });
          }else {
            this.hideDialog();
            MessageBox.confirm(res.msg, '提示', {
              confirmButtonText: '确定',
              callback:()=>{
                this.showDialog()
              }
            });
          }
        }catch(err){
          console.log(err);
        }
      },
      async getDepartmentAll(){
        try{
          let res = await this.$services.departmentListAll({
            method:'get'
          });
          this.departmentOptions = res.data;
        }catch (err){
          console.error(err);
        }
      },
      async deleteUser(data){
        try{
          let res = await this.$services.userDelete({
            data:{
              idArrStr:data.id
            }
          });
          if(res.code === 1){
            MessageBox.confirm('删除成功', '提示', {
              confirmButtonText: '确定',
              callback: () => {
                let data = {
                  currentPage: 1,
                  pageSize: this.pageSize
                };
                this.getUserListPage();
              }
            });
          }
        }catch (error){
          console.error(err);
        }
      },
      validateAccount(){
        try{
          let res = this.$services.validateAccount({
            data:{
              account:this.account,
              id:this.updateId
            },
            method:'get'
          });
          if(res.code === 1){
            return;
          }else{
            //Todo
          }
        }catch (err){
          console.error(err);
        }
      },
      validatePhone(){
        try{
          let res = this.$services.validateAccount({
            data:{
              phone:this.phone,
              id:this.updateId
            },
            method:'get'
          });
          if(res.code === 1){
            return;
          }else{
            //Todo
          }
        }catch (err){
          console.error(err);
        }
      }
    }
  }
</script>

<style scoped lang="less" rel="stylesheet/less">
  @import './style.less';
</style>

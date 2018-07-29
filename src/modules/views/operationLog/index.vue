<template>
  <div class="table-container">
    <div class="clearfix title-container">
      <div class="fl">
        <span class="table-title">数据列表</span>
      </div>
      <div class="fr">
        <el-button size="medium" @click="showaddDialog">增加</el-button>
      </div>
    </div>
    <el-table :data="departmentListPage" border style="width: 100%" >
      <el-table-column prop="department_name" label="部门名称" width="200" align="center" ></el-table-column>
      <el-table-column prop="description" label="职能描述" width="350" align="center"></el-table-column>
      <el-table-column prop="num_of_member" label="成员数量" width="100" align="center"></el-table-column>
      <el-table-column prop="create_time" label="添加时间" width="150" align="center"></el-table-column>
      <el-table-column  label="操作" width="200" align="center">
        <template slot-scope="scope">
          <el-button type="text" size="small">权限操作</el-button>
          <el-button type="text" size="small" @click="showUpdateDialog(scope.row)">编辑</el-button>
          <el-button type="text" size="small">删除</el-button>
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

    <el-dialog title="新增机构" :visible.sync="dialogVisiable" width="50%" center>
      <div class="input-container">
        <label class="input-label">部门名称：</label>
        <el-input v-model="departmentName" placeholder="请输入内容"></el-input>
      </div>
      <div class="input-container">
        <label>部门描述：</label>
        <el-input type="textarea" :rows="5" v-model="description" placeholder="请输入内容"></el-input>
      </div>
      <span slot="footer" class="dialog-footer">
         <el-button type="primary" @click="addNewOrUpdateDepartment">确 定</el-button>
         <el-button @click="hideDialog">取 消</el-button>
      </span>
    </el-dialog>
  </div>



</template>

<script>

  import ElButton from "element-ui/packages/button/src/button";
  import {MessageBox} from 'element-ui'

  export default {

    components: {ElButton},
    data(){
      return {
        departmentListPage:[],
        pageDetail:{},
        currentPage:1,
        pageSize:10,
        dialogVisiable:false,
        departmentName:'',
        description:'',
        buttonType:'',
        updateId:'',
        updateUpdateTime:''
      }
    },
    created(){
      this.getDepartmentListPage();
    },
    methods:{
      async getDepartmentListPage(data){
        let res = await this.$services.departmentListPage({
          data,
          method:'get'
        });
        if(res.code === 1){
          this.departmentListPage = res.data.pageList;
          this.pageDetail = res.data.page;
        }
      },
      handleCurrentChange(val){
        this.currentPage = val;
        let data = {
          currentPage:this.currentPage,
          pageSize:this.pageSize
        };
        this.getDepartmentListPage(data);
      },
      handleSizeChange(val){
        this.pageSize = val;
        let data = {
          currentPage:this.currentPage,
          pageSize: this.pageSize
        }
        this.getDepartmentListPage(data);
      },
      showaddDialog(){
        this.departmentName='';
        this.description='';
        this.updateUpdateTime = '';
        this.updateId = '';
        this.buttonType = 'add';
        this.dialogVisiable = true;
      },
      showUpdateDialog(data){
        this.departmentName = data.department_name;
        this.description = data.description;
        this.updateUpdateTime = data.update_time;
        this.updateId = data.id;
        this.buttonType = 'update';
        this.dialogVisiable = true;
      },
      hideDialog(){
        this.dialogVisiable = false;
      },
      addNewOrUpdateDepartment(){
        if(this.buttonType === 'add'){
          this.addNewDepartment();
        }else{
          this.updateDepartment();
        }
      },
      async addNewDepartment(){
        try{
          let res = await this.$services.addDepartment({
            data: {
              department_name:this.departmentName,
              description:this.description
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
                this.getDepartmentListPage(data);
              }
            });
            this.departmentName='';
            this.description='';
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
      async updateDepartment(){
        try{
          let res = await this.$services.updateDepartment({
            data: {
              id:this.updateId,
              update_time:this.updateUpdateTime,
              department_name:this.departmentName,
              description:this.description
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
                this.getDepartmentListPage(data);
              }
            });
            this.departmentName='';
            this.description='';
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
      }
    }
  }
</script>

<style scoped lang="less" rel="stylesheet/less">
  @import './style.less';
</style>

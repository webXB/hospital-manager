<template>
  <div class="table-container">
    <el-table :data="departmentListPage" border style="width: 100%" >
      <el-table-column prop="department_name" label="部门名称" width="200" ></el-table-column>
      <el-table-column prop="description" label="职能描述" width="350"></el-table-column>
      <el-table-column prop="num_of_member" label="成员数量" width="100"></el-table-column>
      <el-table-column prop="create_time" label="添加时间" width="150"></el-table-column>
      <el-table-column  label="操作" width="200">
        <template scope="scope">
          <el-button type="text" size="small">删除</el-button>
          <el-button type="text" size="small">增加</el-button>

        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>

  export default {

    data(){
      return {
        departmentListPage:[],
      }
    },
    created(){
      this.getDepartmentListPage();
    },
    methods:{
      async getDepartmentListPage(){
        let res = await this.$services.departmentListPage({
          method:'get'
        });
        if(res.code === 1){
          this.departmentListPage = res.data.pageList;
          console.log(this.departmentListPage);
        }
      }
    }
  }
</script>

<style scoped lang="less" rel="stylesheet/less">
  @import './style.less';
</style>

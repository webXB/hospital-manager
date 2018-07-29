<template>
  <div class="table-container">
    <div class="clearfix title-container">
      <div class="fl">
        <p class="table-title">数据列表</p>
      </div>
      <div class="fr">

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
          <el-button type="text" size="small">编辑</el-button>
          <el-button type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageDetail.currentPage"
        :page-sizes="[5,10,20,50]"
        :page-size="pageDetail.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pageDetail.totalItem">
      </el-pagination>
    </div>
  </div>
</template>

<script>

  export default {

    data(){
      return {
        departmentListPage:[],
        pageDetail:{}
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
          this.pageDetail = res.data.page;
        }
      }
    }
  }
</script>

<style scoped lang="less" rel="stylesheet/less">
  @import './style.less';
</style>

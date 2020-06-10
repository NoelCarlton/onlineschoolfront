<template>
  <div class="app-container">
    <!--查询表单-->
    <el-form :inline="true"
             class="demo-form-inline">
      <el-form-item>
        <el-input v-model="queryInfo.name"
                  placeholder="讲师名" />
      </el-form-item>

      <el-form-item>
        <el-select v-model="queryInfo.level"
                   clearable
                   placeholder="讲师头衔">
          <el-option :value="1"
                     label="高级讲师" />
          <el-option :value="2"
                     label="首席讲师" />
        </el-select>
      </el-form-item>

      <el-form-item label="添加时间">
        <el-date-picker v-model="queryInfo.begin"
                        type="datetime"
                        placeholder="选择开始时间"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        default-time="00:00:00" />
      </el-form-item>
      <el-form-item>
        <el-date-picker v-model="queryInfo.end"
                        type="datetime"
                        placeholder="选择截止时间"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        default-time="00:00:00" />
      </el-form-item>

      <el-button type="primary"
                 icon="el-icon-search"
                 @click="getTeachers()">查询</el-button>
      <el-button type="default"
                 @click="resetData()">清空</el-button>
    </el-form>
    <el-table :data="list"
              style="width: 100%">
      <el-table-column prop="id"
                       label="編號"
                       width="180"
                       type="index">
      </el-table-column>
      <el-table-column prop="name"
                       label="姓名"
                       width="180">
      </el-table-column>
      <el-table-column prop="intro"
                       label="描述">
      </el-table-column>
      <el-table-column prop="career"
                       label="職位">
      </el-table-column>
      <el-table-column label="头衔">
        <template slot-scope="scope">
          {{ scope.row.level === 1 ? "高级讲师":"首席讲师"}}
        </template>
      </el-table-column>
      <el-table-column prop="gmtCreate"
                       label="入駐時間">
      </el-table-column>
      <el-table-column label="操作" with="200" align="center">
        <template slot-scope="scope">
          <router-link :to="'/teacher/update/'+scope.row.id">
            <el-button type="primary" size="mini" icon="el-icon-edit">修改</el-button>
          </router-link>
          <el-button type="danger" size="mini" icon="el-icon-delete" @click="deleteById(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>

    </el-table>
    <div class="block">
      <el-pagination @current-change="getTeachers"
                     :current-page="current"
                     :page-size="limit"
                     layout="total, prev, pager, next, jumper"
                     :total="total"
                     style="padding:30px 0; text-align:center;">
      </el-pagination>
    </div>
  </div>
</template>
<script>
import teacher from '@/api/teacher/teacher'
export default {
  data () { // 定义变量初始值
    return {
      current: 1,
      limit: 3,
      total: 0,
      queryInfo: {},
      list: null
    }
  },
  created () {
    this.getTeachers()
  },
  methods: {
    getTeachers (current = 1) {
      this.current = current
      teacher.getList(this.current, this.limit, this.queryInfo)
        .then(response => {
          console.log(response)
          this.list = response.data.teachers
          this.total = response.data.total
        })
        .catch(err => { console.log(err) })
    },
    resetData () {//清空的方法
      //表单输入项数据清空
      this.queryInfo = {}
      //查询所有讲师数据
      this.getTeachers()
    },
    deleteById(id){
      //delete
      this.$confirm('改教师信息将会被永久删除. 继续?', '警告', {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          teacher.deleteById(id).then(() => {
            this.$message({
              type: 'success',
              message: '删除成功'
            });
            this.getTeachers();
          })
        });
      // teacher.deleteById(id);
      console.log(id);
    }
  }
}
</script>

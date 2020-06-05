<template>
  <el-table :data="list"
            style="width: 100%">
    <el-table-column prop="id"
                     label="編號"
                     width="180">
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
    <el-table-column prop="gmtCreate"
                     label="入駐時間">
    </el-table-column>
  </el-table>
</template>
<script>
import teacher from '@/api/teacher/teacher'
export default {
  data () { // 定义变量初始值
    return {
      current: 1,
      limit: 10,
      total: 0,
      query: {},
      list: null
    }
  },
  created () {
    this.getTeachers()
  },
  methods: {
    getTeachers () {
      teacher.getList(this.current, this.limit, this.query)
        .then(response => {
          console.log(response) 
          this.list = response.data.teachers
          this.total = response.data.total
        })
        .catch(err => { console.log(err) })
    }
  }
}
</script>

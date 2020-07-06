<template>
  <div class="app-container">
    <h2 style="text-align:center">发布新课程</h2>
    <el-steps :active="active"
              process-status="wait" align-center style="margin-bottom:40px;">
      <el-step title="填写基本信息"></el-step>
      <el-step title="填写大纲"></el-step>
      <el-step title="确认发布"></el-step>
    </el-steps>
    <el-form label-width="120px">      
      <el-form-item label="课程标题">
        <el-input v-model="courseInfo.title"
                  placeholder="示例：机器学习项目：从基础到搭建项目视频课程，专业名称注意大小写。"/>
      </el-form-item>
      <el-form-item label="总课时">
        <el-input-number v-model="courseInfo.lessonNum" :min="0" controls-position="right"
                  placeholder="课程总课时"/>
      </el-form-item>
      <el-form-item label="课程价格">
        <el-input-number v-model="courseInfo.price" :min="0" controls-position="right"
                  placeholder="输入课程价格"/>
      </el-form-item>
      <el-button style="margin-top: 12px;"
               @click="next"
               type="primary"
               :disabled="saveBtnDisabled">下一步</el-button>
    </el-form>
  </div>
</template>
<script>

  const defaultForm = {
    title:"",
    subjectId:"",
    teacherID:"",
    lessonId:"",
    description:"",
    price:0,
    cover:""
  }
export default {
  data () {
    return {
      active: 1,
      saveBtnDisabled: false,
      courseInfo:{}
    }
  },
  created () {

  },

  methods: {
    next () {
      this.$router.push({ path: "/course/chapter/1" })
    }
  }
}
</script>
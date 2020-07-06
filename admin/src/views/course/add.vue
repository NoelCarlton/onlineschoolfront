<template>
  <div class="app-container">
    <h2 style="text-align:center">发布新课程</h2>
    <el-steps :active="active"
              process-status="wait"
              align-center
              style="margin-bottom:40px;">
      <el-step title="填写基本信息"></el-step>
      <el-step title="填写大纲"></el-step>
      <el-step title="确认发布"></el-step>
    </el-steps>
    <el-form label-width="120px">
      <el-button style="margin-top: 12px;"
                 @click="preview">上一步</el-button>
      <el-button style="margin-top: 12px;"
                 @click="next"
                 type="primary"
                 :disabled="saveBtnDisabled">确认</el-button>
    </el-form>
  </div>
</template>
<script>
export default {
  data () {
    return {
      active: 3,
      saveBtnDisabled: false
    }
  },
  created () {

  },

  methods: {
    next () {
      this.$router.push({ path: "/course/list" })
    },
    preview () {
    }
  }
}
</script>
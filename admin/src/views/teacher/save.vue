<template>
  <div class="app-container">
    <h1>添加老师</h1>
    <el-form label-width="120px">
      <el-form-item label="讲师名称">
        <el-input v-model="teacher.name" />
      </el-form-item>
      <el-form-item label="讲师排序">
        <el-input-number v-model="teacher.sort"
                         controls-position="right"
                         min="0" />
      </el-form-item>
      <el-form-item label="讲师头衔">
        <el-select v-model="teacher.level"
                   clearable
                   placeholder="请选择">
          <el-option :value="1"
                     label="高级讲师" />
          <el-option :value="2"
                     label="首席讲师" />
        </el-select>
      </el-form-item>
      <el-form-item label="讲师资历">
        <el-input v-model="teacher.career" />
      </el-form-item>
      <el-form-item label="讲师简介">
        <el-input v-model="teacher.intro"
                  :rows="10"
                  type="textarea" />
      </el-form-item>

      <el-form-item label="讲师头像">
        <pan-thumb :image="teacher.avatar" />
        <el-button type="primary"
                   icon="el-icon-upload"
                   @click="imagecropperShow=true">更换头像</el-button>
        <image-cropper v-show="imagecropperShow"
                       :width="300"
                       :height="300"
                       :key="imagecropperKey"
                       :url="BASE_API+'/oss/uploadAvatar'"
                       field="image"
                       @close="close"
                       @crop-upload-success="cropSuccess" />
      </el-form-item>

      <el-form-item>
        <el-button :disabled="saveBtnDisabled"
                   type="primary"
                   @click="saveOrUpdate">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import teacherApi from '@/api/teacher/teacher'
import ImageCropper from '@/components/ImageCropper'
import PanThumb from '@/components/PanThumb'
export default {
  components: { ImageCropper, PanThumb },
  data () {
    return {
      teacher: {
        sort: 0, name: '', intro: '', career: '', level: 1, avatar: ''
      },
      imagecropperShow: false, //上传图片弹框是否显示
      imagecropperKey: 0, //上传组件key值
      BASE_API: process.env.BASE_API,
      saveBtnDisabled: false
    }
  },
  created () {
    this.init()
  },
  watch: {
    $route (to, from) {
      console.log(to)
      console.log(from)
      this.init()
    }
  },
  methods: {
    close () {
      //关闭弹窗
      this.imagecropperShow = false
      this.imagecropperKey = this.imagecropperKey + 1
    },
    cropSuccess (data) {
      this.teacher.avatar = data.url
      this.close()
    },
    init () {
      if (this.$route.params && this.$route.params.id) {
        const id = this.$route.params.id
        this.getTeacher(id)
      } else {
        this.teacher = {}
      }
    },
    saveOrUpdate () {
      if (!this.teacher.id) {
        this.saveTeacher()
      } else {
        this.updateTeacher()
      }
    },
    saveTeacher () {
      teacherApi.saveTeacher(this.teacher)
        .then(response => {
          this.$message({
            message: "添加成功",
            type: "success"
          })
          this.$router.push({ path: "/teacher/index" })
        })
    },
    getTeacher (id) {
      teacherApi.getTeacher(id).then(response => {
        this.teacher = response.data.teacher
      })
    },
    updateTeacher () {
      teacherApi.update(this.teacher).then(response => {
        this.$message({
          message: "修改成功",
          type: "success",
        })
        this.$router.push({ path: "/teacher/index" })
      })
    }
  }
}
</script>
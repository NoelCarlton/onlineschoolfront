<template>
  <div class="app-container">
    <el-form label-width="120px">
      <el-form-item label="信息描述">
        <el-tag type="info">excel摸板</el-tag>
        <el-tag>
          <i class="el-icon-download"></i>
          <a :href="'/static/01.xlsx'">点击下载</a>
        </el-tag>
      </el-form-item>
      <el-form-item label="选择excel">
        <el-upload class="upload-demo"
                   ref="upload"
                   :action="BASE_API+'/eduservice/subject/addInBatch'"
                   :auto-upload="false"
                   :on-success="fileUploadSuccess"
                   :on-error="fielUploadError"
                   :disabled="importBtnDisabled"
                   :limit="1"
                   name="file"
                   accpet="application/vnd.ms-excel">
          <el-button slot="trigger"
                     size="small"
                     type="primary">select file</el-button>
          <el-button :loading="loading"
                     style="margin-left: 10px;"
                     size="small"
                     type="success"
                     @click="submitUpload">{{ fileUploadBtnText}}</el-button>
          <div class="el-upload__tip"
               slot="tip">请选择excel文件</div>
        </el-upload>
      </el-form-item>
    </el-form>

  </div>
</template>

<script>
export default {
  data() {
    return {
      BASE_API: process.env.BASE_API,
      OSS_PATH:process.env.OSS_PATH,
      fileUploadBtnText: '上传到服务器',
      importBtnDisabled: false,
      loading: false
    }
  },
  created(){

  },
  methods: {
    submitUpload () {
      this.importBtnDisabled = true
      this.loading =true
      this.$refs.upload.submit()
    },
    fileUploadSuccess(response){
      if(response.success){
        this.fileUploadBtnText = "导入成功"
        this.loading= false
        this.$message({
          type:"success",
          message: response.msg
        })
      }
    },
    fielUploadError(response){
      this.fileUploadBtnText = "导入失败"
      this.loading= false
      this.$message({
        type:"error",
        message: "导入失败"
      })
    }
  }
}
</script>
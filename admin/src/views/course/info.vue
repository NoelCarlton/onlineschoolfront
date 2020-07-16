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
      <el-form-item label="课程种类">
        <el-select v-model="courseInfo.subjectParentId" placeholder="一级分类" @change="onSubjectLevel1Changed">
           <el-option
             v-for="item in subjectLevel1"
             :key="item.id"
             :label="item.title"
             :value="item.id">
           </el-option>
         </el-select>
         <el-select v-model="courseInfo.subjectId" placeholder="二级分类">
           <el-option
             v-for="item in subjectLevel2"
             :key="item.id"
             :label="item.title"
             :value="item.id">
           </el-option>
         </el-select>
      </el-form-item>
      <el-form-item label="课程讲师">
        <el-select v-model="courseInfo.teacherId" placeholder="Select">
          <el-option
            v-for="item in teachers"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="总课时">
        <el-input-number v-model="courseInfo.lessonNum" :min="0" controls-position="right"
                  placeholder="课程总课时"/>
      </el-form-item>
      <el-form-item label="课程价格">
        <el-input-number v-model="courseInfo.price" :min="0" controls-position="right"
                  placeholder="输入课程价格"/>
      </el-form-item>
      <el-form-item label="课程简介">
        <tinymce :height="300" v-model="courseInfo.description">
      </el-form-item>
      <el-form-item label="课程封面">
        <el-upload
          class="avatar-uploader"
          :action="BASE_API+'/oss/uploadAvatar'"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeUplaod"
          :show-file-list="false"
          name = "image">
          <img :src="courseInfo.cover" style="height:200px;"/>
        </el-upload>
      </el-form-item>
      <el-form-item label="课程描述">
        <el-input v-model="courseInfo.description"
                  placeholder="一点点课程描述"/>
      </el-form-item>
      <el-button style="margin-top: 12px;"
               @click="next"
               type="primary"
               :disabled="saveBtnDisabled">下一步</el-button>
    </el-form>
  </div>
</template>
<script>
import courseApi from '@/api/course/course'
import teacherApi from '@/api/teacher/teacher'
import subjectApi from '@/api/subject/subject'
import Tinymce from '@/components/Tinymce'
export default {
  components: {Tinymce},
  data () {
    return {
      active: 1,
      saveBtnDisabled: false,
      courseInfo:{
        title:"",
        subjectId:"",
        subjectParentId:"",
        teacherId:"",
        lessonId:"",
        description:"",
        price:0,
        cover:"/static/default.png"
      },
      BASE_API:process.env.BASE_API,
      teachers:[],
      subjectLevel1:[],
      subjectLevel2:[]
    }
  },
  created () {
    this.getTeachers();
    this.getSubjects();
  },

  methods: {
    next () {
      courseApi.add(this.courseInfo)
      .then(response=>{
        this.$message({
          message: "添加成功",
          type: "success"
        });
        this.$router.push({ path: "/course/chapter/"+response.data.courseId })
      })
    },
    getTeachers(){
      teacherApi.getAll().then(response=>{
        this.teachers = response.data.teachers;
      })
    },
    getSubjects(){
      subjectApi.subjects().then(response=>{
        debugger;
        this.subjectLevel1 = response.data.subjects;
      })
    },
    onSubjectLevel1Changed(value){
      //value 代表选择项的value
      for(let i=0;i< this.subjectLevel1.length; i++){
        if(value === this.subjectLevel1[i].id){
          this.subjectLevel2 = this.subjectLevel1[i].childSubjects;
          this.courseInfo.subjectId = '';
        }
      }
    },
    handleAvatarSuccess(res, file) {
      console.log(res);
        this.courseInfo.cover = res.data.url;
    },
    beforeUplaod(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('Avatar picture must be JPG format!');
        }
        if (!isLt2M) {
          this.$message.error('Avatar picture size can not exceed 2MB!');
        }
        return isJPG && isLt2M;
      }
  }
}
</script>
<style scoped>
.tinymce-container{
  line-height: 29px;
}
</style>

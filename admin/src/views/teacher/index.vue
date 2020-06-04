<template>
  <div class="app-container">
    <h1>教师查询</h1>
  </div>
</template>
<script>
import teacher from "@/api/teacher/teacher"
export default {
    data() {
        return {
            current:1,
            limit:10,
            total:0,
            query:{},
            list:null
        }
    },
    created(){

    },
    methods: {
        getTeachers() { 
            teacher.getTeachers(this.current, this.limit, this.query)
            .then(response =>{console.log(response)})
            .catch(err =>{console.log(err)})
        }
    }
</script>
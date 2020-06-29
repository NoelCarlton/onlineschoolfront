<template>
  <div class="app-container">
    <el-input
  placeholder="Filter keyword"
  v-model="filterText">
</el-input>

<el-tree
  class="filter-tree"
  :data="data"
  :props="defaultProps"
  default-expand-all
  :filter-node-method="filterNode"
  ref="tree">
</el-tree>

  </div>
</template>

<script>
import subject from '@/api/subject/subject'
  export default {
    watch: {
      filterText(val) {
        this.$refs.tree.filter(val);
      }
    },
    created(){
      this.getSubjects();
    },
    methods: {
      filterNode(value, data) {
        if (!value) return true;
        return data.title.toLowerCase().indexOf(value.toLowerCase()) !== -1;
      },
      getSubjects(){
        subject.subjects().then(response =>{
          this.data = response.data.subjects;
        })
      }
    },

    data() {
      return {
        filterText: '',
        data: [],
        defaultProps: {
          children: 'childSubjects',
          label: 'title'
        }
      };
    }
  };
</script>
<template>
    <TopNav/>
      <div class="content">
        <FindIdForm/>
      </div>
    </template>
    
    
    <script>
    import TopNav from '../components/TopNav.vue'
    import FindIdForm from '../components/forms/FindIdForm.vue'
    export default {
      name: 'FindIdPage',
      components:{
        TopNav,
        FindIdForm,
      }
    };
    </script>
    <style scoped>
    .content {
      display: flex;       
      flex-direction: row;
      gap: 10px;            /* 자식 간 간격 */
      padding: 10px;
      margin-top: 8vh;
      height: 92vh;
      
    }
  
    </style>
<template>
    <TopNav/>
      <div class="content">
        <FindPwForm/>
      </div>
    </template>
    
    
    <script>
    import TopNav from '../components/TopNav.vue'
    import FindPwForm from '../components/forms//FIndPwForm.vue'
    export default {
      name: 'FindPwPage',
      components:{
        TopNav,
        FindPwForm,
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
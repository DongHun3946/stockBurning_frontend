<template>
    <TopNav/>
      <div class="content">
        <ModifyPwForm />
      </div>
    </template>
    
    <script>
    import TopNav from '../components/TopNav.vue';
    import ModifyPwForm from '../components/forms/ModifyPwForm.vue'
  
    export default {
      name: 'ModifyPwPage',
      components:{
        TopNav,
        ModifyPwForm,
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
      height: calc(100vh - 8vh); /* 화면 높이에서 상단 네비게이션 제외한 영역 */
    }
    </style>
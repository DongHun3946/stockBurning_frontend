<template>
    <div class="center-content">
      <div class="top">
        <DiscussCount />
      </div>
      <div class="bottom">
        <StockInfo />
        <HotSearch />
      </div>
    </div>
  </template>
  
  <script>
  import  DiscussCount from '../DiscussionCount.vue'
  import StockInfo from '../StockInfo.vue'
  import HotSearch from '../HotSearch.vue'
 
  export default {
    name: 'CenterContent',
    components: {
      DiscussCount,
      StockInfo,
      HotSearch
    }
  }
  </script>
  
  <style scoped>
  .center-content {
    /* background-color: rgb(185, 169, 255); */
    flex: 1.5;
  }
  .top{
    border-radius: 30px;
    /* background-color: #ffa1a1; */
    padding: 10px; 
    height: 50%;
    width: 100%; 
    text-align: left; 
    box-sizing: border-box;
  }
  .bottom {
    display: flex; /*StockInfo.vue와 HotSearch.vue를 가로로 배치*/ 
    justify-content: space-between; 
    gap: 20px;     /*StockInfo.vue와 HotSearch.vue 사이 간격*/ 
    /* background-color: #68e9a2; */ 
    border-radius: 30px; 
    padding: 10px; 
    height: 50%;
    width: 100%; 
    text-align: left; 
    box-sizing: border-box;
  }
  </style>
  
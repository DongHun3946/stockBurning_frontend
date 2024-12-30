<template>
    <div class="right-content">
      <div class="mid">
        <StockCommunity />
      </div>
    </div>
  </template>
  
  <script>
  import  StockCommunity from '../StockCommunity.vue'
 
  export default {
    name: 'RightContent',
    components: {
      StockCommunity
    }
  }
  </script>
  
  <style scoped>
  .right-content {
    /* background-color: rgb(163, 255, 151); */
    flex: 1;
  }
  .mid{
    display: flex; 
    justify-content: space-between; 
    /* background-color: #a99aeb; */
    border-radius: 30px; 
    padding: 10px; 
    height: 100%;
    width: 100%; 
    text-align: left; 
    box-sizing: border-box;
  }
  </style>
  
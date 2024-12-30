<template>
    <div class="left-content">
      <div class="top">
        <NasdaqIndex />
        <SP500Index />
      </div>
      <div class="bottom">
        <BankRates />
      </div>
    </div>
  </template>
  
  <script>
  import NasdaqIndex from '../NasdaqIndex.vue'
  import SP500Index from '../SP500Index.vue'
  import BankRates from '../GlobalBankRates.vue'
  
  export default {
    name: 'LeftContent',
    components: {
      NasdaqIndex,
      SP500Index,
      BankRates
    }
  }
  </script>
  
  <style scoped>
  .left-content {
    /* background-color: rgb(92, 231, 255); */
    flex: 1;
  }
  .top {
    display: flex; 
    justify-content: space-between; 
    gap: 20px; 
    /* background-color: #f76060; */
    border-radius: 30px; 
    padding: 10px; 
    height: 25%;
    width: 100%; 
    text-align: left; 
    box-sizing: border-box;
  }
  .bottom {
    display: flex; 
    /* background-color: #b9e672; */
    border-radius: 30px;
    padding: 10px;
    height: 75%;
    width: 100%; 
    text-align: left;
    box-sizing: border-box;
  }
  </style>
  
<template>
  <div class="discuss-count">
    <div class="title">
      <span v-if="stockData">{{stockData.stockSymbol}}</span>
      <span v-else>StockBurning</span>
      <span>커뮤니티 의견 수 변화(1일 단위)</span>
    </div>
    <div class="chart">
      
    </div>
  </div>
    
  </template>
  
  <script>
  
  import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
  } from "chart.js";
  import { mapGetters } from 'vuex';

  ChartJS.register(Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement);
  
  export default {
    name: 'DiscussCount',
    
    data(){
      return {
      }
    },
    computed:{
      ...mapGetters(["stockData"]),
    },
  
  };
  </script>
  
  <style scoped>
  .discuss-count{
    display: flex;
    flex-direction: column;
    font-size: 16px;
    color: #ffffff;
    background-color: #464646; /* 상자 배경색 */
    border-radius: 30px; /* 테두리 둥글게 */
    padding: 2% 3% 2% 3%; /* 내부 여백 */
    width: 100%; /* 상자 너비 */
    height: 100%;
    max-width: 100%; /* 부모 요소를 초과하지 않도록 제한 */
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.5); /* 그림자 추가 */
    line-height: 0.6; /* 텍스트 간격 줄이기 */
    box-sizing: border-box; /* padding 포함하여 너비 계산 */
   
  }
  .title {
    flex: 1;
    font-size: 20px;
    font-weight: bold;
    text-align: left;
    color: #ffffff;
    display: flex;
    align-items: center;
    /*background-color: #77ca51; */
    box-sizing: border-box;
  }
  .chart{
    flex: 7;
    font-size: 1em;
    /* background-color: #fa5151; */
    box-sizing: border-box;
  }
  </style>
  
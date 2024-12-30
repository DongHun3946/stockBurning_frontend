<template>
  <div class="discuss-count">
    <div class="title">
      <h3>토스 증권 커뮤니티 의견 수 변화(1일 단위)</h3>
    </div>
    <div class="chart">
      <h3>차트</h3>
    </div>
    <div class="day">
      <h3>날짜</h3>
    </div>
  </div>
    
  </template>
  
  <script>
  export default {
    name: 'DiscussCount'
  };
  </script>
  
  <style scoped>
  .discuss-count{
    font-size: 16px;
    color: #ffffff;
    background-color: #464646; /* 상자 배경색 */
    border-radius: 30px; /* 테두리 둥글게 */
    padding: 2% 3% 2% 3%; /* 내부 여백 */
    width: 100%; /* 상자 너비 */
    height: 100%;
    max-width: 100%; /* 부모 요소를 초과하지 않도록 제한 */
    text-align: left; /* 텍스트 왼쪽 정렬 */
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.5); /* 그림자 추가 */
    line-height: 0.6; /* 텍스트 간격 줄이기 */
    box-sizing: border-box; /* padding 포함하여 너비 계산 */
   
  }
 
  .chart{
    font-size: 1em;
  }
  .day{
    font-size: 1em;
  }
  </style>
  
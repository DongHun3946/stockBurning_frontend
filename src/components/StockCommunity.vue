<template>
    <div class="community">
      <div class="top">
        <h3>커뮤니티</h3>
      </div>
      <div class="mid">
        <h3>게시글</h3>
      </div>
      <div class="bottom">
        <h3>게시글 작성</h3>
      </div>
    </div>
      
    </template>
    
    <script>
    export default {
      name: 'StockCommunity'
    };
    </script>
    
    <style scoped>
    .community{
      color: #ffffff;
      font-size: 15px;
      background-color: #464646; /* 상자 배경색 */
      border-radius: 30px; /* v테두리 둥글게 */
      padding: 2% 0% 0% 5%; /* 내부 여백 */
      width: 100%; /* 상자 너비 */
      height: 100%;
      text-align: left; /* 텍스트 가운데 정렬 */
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.5); /* 그림자 추가 */
      line-height: 0.6; /* 텍스트 간격 줄이기 */
    }
    
    .top{
      font-size: 1em;
    }
    .mid{
      font-size: 1em;
    }
    .bottom{
      font-size: 1em;
    }
    </style>
    
<template>
  <div class="search-index">
    <div class="header">
      <h2>검색량 급상승한 티커</h2>
    </div>
    <div class="content">
      <ul class="ticker-list" v-if="top5Tickers.length > 0">
        <!-- 티커와 검색 수를 함께 출력 -->
        <li v-for="(ticker, index) in top5Tickers" :key="ticker.ticker" class="ticker-item">
          <span class="ticker-rank">{{ index+1 }}.</span>
          <span class="ticker-name">{{ ticker.ticker }}</span>
          <span class="search-count">{{ ticker.searchCount }}회</span>
        </li>
        
      </ul>
      <p v-else class="loading-text">검색 데이터 쌓는 중..</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'HotSearch',
  data() {
    return {
      top5Tickers: [],
    };
  },
  methods: {
    async getTop5Ticker(){
      const response = await axios.get("http://localhost:8081/api/search/top5");
      this.top5Tickers = response.data;
    }
  },
  mounted() { 
    this.getTop5Ticker();
    //setInterval(this.getTop5Ticker, 10000);
  },
};
</script>

<style scoped>
.search-index {
  font-size: 1em;
  color: #ffffff;
  background-color: #464646;
  border-radius: 30px;
  padding: 2% 3% 2% 3%;
  width: 50%;
  text-align: left;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.5);
  line-height: 0.3;
}

.header {
  padding: 0.5%;
  font-weight: bold;
  border-bottom: 3px solid #ffffff;
  font-size: 0.8em;
  /* background-color: #00A449; */
}

.ticker-list {
  list-style-type: none;
  padding: 0;
  margin: 0;
  line-height: 1.9;
  /* background-color: aqua; */
}

.ticker-item {
  margin-top: 15px;
  background-color: #3a3a3a;
  color: #f1f1f1;
  padding: 10px;
  border-radius: 10px;
  margin: 5px 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  font-size: 1.1em;
  transition: background-color 0.3s;
  display: flex;
  flex-direction: row;
}
.ticker-rank {
  flex: 0.3;
  font-weight: bold;
  /* background-color: #e68536; */
}
.ticker-name {
  flex: 1;
  /* background-color: #9640e6; */
}

.search-count {
  flex: 1;
  color: #d83232;
  font-weight: bold;
  /* background-color: #47d860; */
  text-align: right;
}

.ticker-item:hover {
  background-color: #575757;
  cursor: pointer;
}
@keyframes blink {
  0% { opacity: 1; }
  50% { opacity: 0.3; }
  100% { opacity: 1; }
}
.loading-text {
  font-size: 25px;
  font-weight: bold;
  color: #6f61f0;
  text-align: center;
  margin-top: 70px;
  animation: blink 1.5s infinite; /* 1.5초마다 반복 */
}
</style>

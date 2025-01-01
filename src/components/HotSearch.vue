<template>
  <div class="search-index">
    <div class="header">
      <h2>검색량 급상승한 티커</h2>
    </div>
    <div class="content">
      <ul>
        <li v-for="(count, ticker) in mostSearchedTickers" :key="ticker">
          {{ ticker }}: {{ count }}회
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'HotSearch',
  data() {
    return {
      mostSearchedTickers: [],
    };
  },
  mounted() {
    this.fetchMostSearchedTickers();
  },
  methods: {
    fetchMostSearchedTickers() {
      axios.get(`http://localhost:8081/api/most-searched-tickers`)
        .then(response => {
          this.mostSearchedTickers = response.data;
        })
        .catch(error => {
          console.error("가장 많이 검색된 티커를 가져오던 중 에러 발생 : ", error);
        })
    }
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
  font-size: 0.8em;
  border-bottom: 3px solid #ffffff;
}
</style>
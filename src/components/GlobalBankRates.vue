<template>
  <div class="bank-rates">
    <h3>전 세계 중앙은행 금리</h3>
    <table class="rates-table">
      <thead>
        <tr>
          <th>중앙은행</th>
          <th>금리</th>
          <th>다음 회의</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(rate, index) in bankRates" :key="index">
          <td>
            <img :src="'../imgs/' + rate.bankTicker + '.jpg'" :alt="rate.bankTicker" /> {{ rate.bankTicker }}
          </td>
          <td>{{ rate.currentRate }}</td>
          <td>{{ rate.nextMeeting }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: "BankRates",
  data() {
    return {
      bankRates: [],
    };
  },
  mounted() {
    axios
      .get("http://localhost:8081/scrape/bank-rates")
      .then((response) => {
        console.log(response.data);
        this.bankRates = response.data;
      })
      .catch((error) => {
        console.error("데이터를 불러오는데 실패하였습니다.", error);
      });
  }
};
</script>

<style scoped>
.bank-rates {
  font-size: 16px;
  color: #ffffff;
  background-color: #464646;
  /* 상자 배경색 */
  border-radius: 30px;
  /* 테두리 둥글게 */
  padding: 1% 5%;
  /* 내부 여백 */
  width: 95%;
  /* 상자 너비 */
  max-width: 100%;
  /* 부모 요소를 초과하지 않도록 제한 */
  text-align: left;
  /* 텍스트 왼쪽 정렬 */
  margin: 1% auto 0;
  /* 좌우 여백 자동 */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.5);
  /* 그림자 추가 */
  box-sizing: border-box;
  /* padding 포함하여 너비 계산 */
}

table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  padding: 0.34em;
  text-align: left;
}

thead {
  font-weight: bold;
  border-bottom: 2px solid #ffffff;
}

tr {
  border-bottom: 1px solid #cccccc;
}

td img {
  height: 15px;
  margin-right: 5%;
}
</style>

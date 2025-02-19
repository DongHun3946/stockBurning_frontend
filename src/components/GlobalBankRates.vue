<template>
  <div class="bank-rates">
    <h3 class="title">전 세계 중앙은행 금리</h3>
    <table class="rates-table">
      <thead>
        <tr>
          <th>중앙은행</th>
          <th>금리</th>
          <th>다음 회의</th>
        </tr>
      </thead>
      <tbody v-if="bankRates.length > 0">
        <tr v-for="(rate, index) in bankRates" :key="index">
          <td>
            <img :src="'../imgs/' + rate.bank + '.jpg'" :alt="rate.bankTicker" /> 
            {{ rate.bank }}
          </td>
          <td>{{ rate.rate }}</td>
          <td>{{ rate.nextMeeting }}</td>
        </tr>
      </tbody>
      <tbody v-else>
        <tr>
          <td colspan="3" class="no-data">서버와의 연결이 끊겼습니다.</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios';
//import apiClient from '@/middleware/axios';

export default {
  name: "BankRates",
  data() {
    return {
      bankRates: [],
    };
  },
  mounted() {
    axios
      .get("http://localhost:8081/api/scrape/bank-rates")
      .then((response) => {
        this.bankRates = response.data;
      })
      .catch((error) => {
        console.error("bank-rates데이터를 불러오는데 실패하였습니다.", error);
      });
  }
};
</script>

<style scoped>
.bank-rates {
  font-size: 16px;
  color: #ffffff;
  background-color: #464646;
  border-radius: 30px;
  padding: 2% 5% 2% 5%;
  width: 100%;
  max-width: 100%;
  text-align: left;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.5);
  box-sizing: border-box;
}
.title {
  color: #b4c5ee;
}
.no-data {
  text-align: center;
  color: rgb(240, 106, 106);
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
  border-bottom: 3px solid #ffffff;
}

tr {
  border-bottom: 2px solid #b8b8b8;
}

td img {
  height: 15px;
  margin-right: 5%;
}
</style>

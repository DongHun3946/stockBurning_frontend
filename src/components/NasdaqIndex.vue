<template>
  <div class="nasdaq-index">
    <h2>QQQ
      <span style="font-size: 0.5em;"> (2분 지연)</span>
    </h2>
    <p 
      v-if="nasdaqPrice" 
      style="font-size: 1.3em;" 
      :style="priceStyle">
      {{ nasdaqPrice }}
    </p>
    <p v-else style="font-size: 1.3em; font-weight: bold; color:chocolate">서버 API호출실패</p>

    <p 
      v-if="priceChangePercent" 
      class="nasdaq-change" 
      :style="changeStyle">
      <span>{{ priceChangeValue }}</span> ({{ priceChangePercent }})
    </p>
    <p v-else style="font-size: 1.0em; font-weight: bold; color:chocolate">서버 API호출실패</p>
  </div>
</template>

<script>
export default {
  name: 'NasdaqIndex',
  data() {
    return {
      nasdaqPrice: null,            // qqq 주가 저장
      previousPrice: null,          // 전날 종가 저장
      priceChangeValue: null,       // 가격 변동 값 저장
      priceChangePercent: null,     // 가격 변동 퍼센트 저장
      apiKey: 'ctkkv0hr01qntkqpd110ctkkv0hr01qntkqpd11g', // API 키
    };
  },
  methods: {
    async fetchNasdaqData() {
      try {
        const response = await fetch('http://localhost:8081/api/stock/qqq');
        const data = await response.json();
        this.nasdaqPrice = data.c;
        this.previousPrice = data.pc;
        this.calculatePriceChange();
      } catch (error) {
        console.log("QQQ 지수를 불러오는데 실패하였습니다. 에러 : ", error);
      }
    },
    calculatePriceChange() {
      if (this.nasdaqPrice && this.previousPrice) {
        const changeValue = this.nasdaqPrice - this.previousPrice;
        const changePercent = ((this.nasdaqPrice - this.previousPrice) / this.previousPrice) * 100; // 상승/하락 퍼센트 계산
        this.priceChangeValue = `${changeValue.toFixed(2)}`;
        this.priceChangePercent = `${changePercent.toFixed(2)}%`; // 소수점 두 자리까지 표시
      }
    },
  },
  computed: {
    priceStyle() {
      return {
        color: this.nasdaqPrice > this.previousPrice ? '#d43131' : (this.nasdaqPrice < this.previousPrice ? '#4f87ee' : '#919191')
      };
    },
    changeStyle() {
      return {
        color: this.priceChangeValue > 0 ? '#d43131' : (this.priceChangeValue < 0 ? '#4f87ee' : '#919191')
      };
    }
  },
  mounted() {
    this.fetchNasdaqData();
    setInterval(this.fetchNasdaqData, 120000); // 2분마다 데이터 호출
  }
};
</script>

<style scoped>
  .nasdaq-index {
    font-size: 16px;
    color: #ffffff;
    background-color: #464646; 
    border-radius: 30px; 
    padding: 3% 0% 0% 4%; /* 내부 여백 */
    width: 50%; 
    text-align: left; 
    margin: 1% auto 0; /* 좌우 여백 자동 */
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.5); 
    line-height: 0.6; 
    box-sizing: border-box;
  }

  .nasdaq-change {
    font-weight: bold;
  }
</style>

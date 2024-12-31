<template>
  <div class="sp500-index">
    <h2>SPY
      <span style="font-size: 0.5em;"> (2분 지연)</span>
    </h2>
    <p 
      v-if="SP500Price" 
      style="font-size: 1.3em;" 
      :style="priceStyle">
      {{ SP500Price }}
    </p>
    <p v-else style="font-size: 1.3em; font-weight: bold; color:chocolate">서버 API호출실패</p>

    <p 
      v-if="priceChangePercent" 
      class="sp500-change" 
      :style="changeStyle">
      <span>{{ priceChangeValue }}</span> ({{ priceChangePercent }})
    </p>
    <p v-else style="font-size: 1.0em; font-weight: bold; color:chocolate">서버 API호출실패</p>
  </div>
</template>

<script>
export default {
  name: 'SP500Index',
  data() {
    return {
      SP500Price: null,             // spy 주가 저장
      previousPrice: null,          // 전날 종가 저장
      priceChangeValue: null,       // 가격 변동 값 저장
      priceChangePercent: null,     // 가격 변동 퍼센트 저장
    };
  },
  methods: {
    async fetchSpData() {
      try {
        const response = await fetch('http://localhost:8081/api/stock/spy');
        const data = await response.json();
        this.SP500Price = data.c;
        this.previousPrice = data.pc;
        this.calculatePriceChange();
      } catch (error) {
        console.log("SPY 지수를 불러오는데 실패하였습니다. 에러 : ", error);
      }
    },
    calculatePriceChange() {
      if (this.SP500Price && this.previousPrice) {
        const changeValue = this.SP500Price - this.previousPrice;
        const changePercent = ((this.SP500Price - this.previousPrice) / this.previousPrice) * 100; // 상승/하락 퍼센트 계산
        this.priceChangeValue = `${changeValue.toFixed(2)}`;
        this.priceChangePercent = `${changePercent.toFixed(2)}%`; // 소수점 두 자리까지 표시
      }
    },
  },
  computed: {
    priceStyle() {
      return {
        color: this.SP500Price > this.previousPrice ? '#d43131' : (this.SP500Price < this.previousPrice ? '#4f87ee' : '#919191')
      };
    },
    changeStyle() {
      return {
        color: this.priceChangeValue > 0 ? '#d43131' : (this.priceChangeValue < 0 ? '#4f87ee' : '#919191')
      };
    }
  },
  mounted() {
    this.fetchSpData();
    setInterval(this.fetchSpData, 120000);
  }
};
</script>

<style scoped>
  .sp500-index {
    font-size: 20px;
    color: #ffffff;
    background-color: #464646; 
    border-radius: 30px; 
    padding: 2% 3% 2% 3%; /* 내부 여백 */
    width: 50%; 
    text-align: left; 
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.5); 
    line-height: 0.6; 
    box-sizing: border-box;
  }

  .sp500-change {
    font-weight: bold;
  }
</style>

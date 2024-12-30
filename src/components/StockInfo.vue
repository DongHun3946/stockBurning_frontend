<template>
  <div class="stock-index">
    <div v-if="stockData">
      <div class="header">
        <p>
          <span class="header-ticker">{{ stockData.stockSymbol }}</span>
          <span>현재 정보</span>
        </p>
      </div>
      <div class="info">
        <p>RSI(14)</p>
        <p>
          <span class="rsi-value">{{ stockData.rsi }}</span>
          <span class="rsi-status">과매수 구간</span>
        </p>
      </div>
      <div class="info">
        <p>직원 수</p>
        <span class="volume">{{ stockData.volume }}</span>
      </div>
      <div class="info">
        <p>내부자 보유율</p>
        <span class="avg-volume">{{ stockData.avgVolume }}</span>
      </div>
      <div class="info">
        <p>내부자 거래</p>
        <span class="volume">{{ stockData.volume }}</span>
      </div>
    </div>
    <div v-else>
      <p>티커를 입력해주세요!</p>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "StockInfo",
  computed: {
    ...mapGetters(["stockData"]), // Vuex의 stockData를 가져옴
  },
};
</script>

<style scoped>
.stock-index {
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
  font-weight: bold;
  border-bottom: 2px solid #ffffff;
  font-size: 18px;
}

.header-ticker {
  font-style: italic;
  color: #f18a15;
  margin-right: 0.5em;
}

.info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 3px 0;
}

.rsi-value {
  font-weight: bold;
  margin-right: 3em;
}

.rsi-status {
  color: #ff5c5c;
  font-weight: bold;
}
.avg-volume {
  font-weight: bold;
  margin-right: 8em;
}
.volume {
  font-weight: bold;
  margin-right: 8em;
}

.up-down {
  color: #3d9aff;
  font-weight: bold;
}
</style>

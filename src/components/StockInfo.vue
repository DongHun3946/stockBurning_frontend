<template>
  <div class="stock-index">
    <div v-if="stockData">
      <div class="header">
        <p>
          <span class="header-ticker">{{ stockData.stockSymbol }}</span>
          <span>관련 정보</span>
        </p>
      </div>
      <div class="info">
        <p>RSI(14)</p>
        <span class="rsi" :class="getRsiClass(stockData.rsi)">{{ stockData.rsi }}</span>
      </div>
      <div class="info">
        <p>직원 수</p>
        <span class="employee">{{ stockData.employee }} 명</span>
      </div>
      <div class="info">
        <p>내부자 보유율</p>
        <span class="insider-own">{{ stockData.insiderOwn }}</span>
      </div>
      <div class="info">
        <p>기관 보유율</p>
        <span class="inst-own">{{ stockData.instOwn }}</span>
      </div>
      <div class="info">
        <p>애널리스트 평균 추천 의견</p>
        <span class="recommend" :class="getRecommendClass(stockData.recommend)">
          {{ stockData.recommend }}</span>
      </div>
      <div class="indicator-container">
        <div class="indicator strong-buy">강력 매수
          <p>1</p>
        </div>
        <div class="indicator buy">매수
          <p>2</p>
        </div>
        <div class="indicator neutral">중립
          <p>3</p>
        </div>
        <div class="indicator sell">매도
          <p>4</p>
        </div>
        <div class="indicator strong-sell">강력 매도
          <p>5</p>
        </div>
      </div>
    </div>
    <div v-else>
      <div class="blurred-data">
        <div class="header">
          <p>
            <span class="header-ticker">NVDA</span>
            <span>관련 정보</span>
          </p>
        </div>
        <div class="info">
          <p>RSI(14)</p>
          <span class="rsi" :class="getRsiClass(73)">73</span>
        </div>
        <div class="info">
          <p>직원 수</p>
          <span class="employee">29600 명</span>
        </div>
        <div class="info">
          <p>내부자 보유율</p>
          <span class="insider-own">3.99%</span>
        </div>
        <div class="info">
          <p>기관 보유율</p>
          <span class="inst-own">65.30%</span>
        </div>
        <div class="info">
          <p>애널리스트 평균 추천 의견</p>
          <span class="recommend" :class="getRecommendClass(1.00)">
            1.00</span>
        </div>
        <div class="indicator-container">
          <div class="indicator strong-buy">강력 매수
            <p>1</p>
          </div>
          <div class="indicator buy">매수
            <p>2</p>
          </div>
          <div class="indicator neutral">중립
            <p>3</p>
          </div>
          <div class="indicator sell">매도
            <p>4</p>
          </div>
          <div class="indicator strong-sell">강력 매도
            <p>5</p>
          </div>
        </div>
      </div>
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
  methods: {
    getRsiClass(rsi) {
      if (rsi <= 30) return "low-rsi";
      if (rsi >= 70) return "high-rsi";
      return "normal-rsi";
    },
    getRecommendClass(recommend) {
      if (recommend <= 2) return "high-recommend";
      if (recommend >= 4) return "low-recommend";
      return "normal-recommend";
    }
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
.blurred-data {
  filter: blur(4px);
  opacity: 0.5;
  pointer-events: none;  /* 클릭 불가능하게 */
  user-select: none;     /* 텍스트 선택 불가능 */
}

.header {
  font-weight: bold;
  border-bottom: 3px solid #ffffff;
  font-size: 18px;
  /* background-color: #00A449;*/
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
  font-size: 1.1em;
  font-weight: bold;
}

.low-rsi {
  color: #4f87ee;
  /* 파란색 */
}

.high-rsi {
  color: #eb5050;
  /* 빨간색 */
}

.normal-rsi {
  color: #ffffff;
  /* 기본 흰색 */
}

.high-recommend {
  color: #00A449;
  /* 파란색 */
}

.low-recommend {
  color: #eb5050;
  /* 빨간색 */
}

.normal-recommend {
  color: #ffffff;
  /* 기본 흰색 */
}

.indicator-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  border-color: #464646;
  margin-top: 4%;
  overflow: hidden;
}

.indicator {
  flex: 1;
  /* 각 구간이 동일한 크기 */
  padding: 3% 2% 1% 2%;
  font-size: 1.0rem;
  /* 글자 크기 */
  font-weight: bold;
  color: black;
  white-space: nowrap;
  /* 텍스트 줄바꿈 방지 */
  line-height: 0.6;
  /* 줄 간격 조정 */
}

.strong-buy {
  background-color: #00cc00;
  /* 강력매수 초록 */
  border-top-left-radius: 12px;
  /* 왼쪽 상단 둥글게 */
  border-bottom-left-radius: 12px;
  /* 왼쪽 하단 둥글게 */
}

.buy {
  background-color: #66ff66;
  /* 매수 연초록 */
}

.neutral {
  background-color: #e0e0e0;
  /* 중립 회색 */
}

.sell {
  background-color: #ff6666;
  /* 매도 연빨강 */
}

.strong-sell {
  background-color: #f03737;
  /* 강력매도 빨강 */
  border-top-right-radius: 12px;
  /* 오른쪽 상단 둥글게 */
  border-bottom-right-radius: 12px;
  /* 오른쪽 하단 둥글게 */
}
</style>


<template>
  <div class="discuss-count">
    <div class="title">
      <span v-if="stockData">{{ stockData.stockSymbol }}&nbsp;</span>
      <span v-else>StockBurning&nbsp;</span>
      <span>커뮤니티 의견 수 변화(1일 단위)</span>
    </div>
    <div class="chart">
      <canvas ref="discussChart"></canvas> <!-- 차트를 렌더링할 캔버스 -->
    </div>
  </div>
</template>

<script>
/*
import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement, LineController } from "chart.js";
import { mapGetters } from 'vuex';

ChartJS.register(Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement, LineController); 
*/
export default {
  name: 'DiscussCount',
  /*
  computed: {
    ...mapGetters(["stockData"]), // Vuex에서 stockData 가져오기
  },

  watch: {
    stockData(newData) {
      if (newData) {
        this.renderChart(newData);
      }
    }
  },

  mounted() {
    // stockData가 초기값이 있을 경우 차트를 렌더링
    if (this.stockData) {
      this.renderChart(this.stockData);
    }
  },

  methods: {
    renderChart(stockData) {
      const ctx = this.$refs.discussChart.getContext('2d');
      
      // 예시: stockData에서 의견 수에 대한 데이터를 차트로 표시
      const data = {
        labels: stockData.dates, // 날짜 리스트
        datasets: [
          {
            //label: '커뮤니티 의견 수',
            data: stockData.commentCounts, // 댓글 수 데이터
            borderColor: '#77ca51', // 라인 색
            fill: false, // 채우기 여부
            tension: 0.1, // 라인의 곡률
          }
        ]
      };
      
      // 차트 생성
      new ChartJS(ctx, {
        type: 'line',
        data: data,
        options: {
          responsive: true,
          plugins: {
            /*
            title: {
              display: true,
              text: '1일 단위 커뮤니티 의견 수 변화',
            },
            
            tooltip: {
              callbacks: {
                label: function(tooltipItem) {
                  return `댓글 수: ${tooltipItem.raw}`;
                }
              }
            }
          },
          scales: {
            x: {
              title: {
                display: true,
                text: '날짜'
              }
            },
            y: {
              title: {
                display: true,
                text: '댓글 수'
              },
              min: 0,
            }
          }
        }
      });
    }
  } */
};

</script>

<style scoped>
.discuss-count {
  display: flex;
  flex-direction: column;
  font-size: 16px;
  color: #ffffff;
  background-color: #464646;
  border-radius: 30px;
  padding: 2% 3% 2% 3%;
  width: 100%;
  height: 100%;
  max-width: 100%;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.5);
  line-height: 0.6;
  box-sizing: border-box;
}

.title {
  flex: 1;
  font-size: 20px;
  font-weight: bold;
  text-align: left;
  color: #ffffff;
  display: flex;
  align-items: center;
  /*background-color: #a54646;*/
}

.chart {
  flex: 7;
  font-size: 1em;
  box-sizing: border-box;
  max-height: 87.5%;
  /*background-color: #bb6036;*/
}
</style>

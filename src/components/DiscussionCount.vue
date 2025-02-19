<template>
  <div class="discuss-count">
    <div class="title" v-if="weeklyPostCountData && stockData">
      <span v-if="stockData">{{ stockData.stockSymbol }}&nbsp; 커뮤니티 의견 수 변화(1일 단위) </span>
      <br>
    </div>
    <div class="chart" v-if="weeklyPostCountData && stockData">
      <canvas ref="discussChart"></canvas> <!-- 차트를 렌더링할 캔버스 -->
    </div>
    <div class="default" v-else>
      <Discuss_part1 />
      <Discuss_part2 />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Chart from "chart.js/auto";
import Discuss_part1 from './Discuss_part1.vue';
import Discuss_part2 from './Discuss_part2.vue';

export default {
  name: 'DiscussCount',
  data() {
    return {
      chart: null,
    };
  },
  components: {
    Discuss_part1,
    Discuss_part2,
  },
  computed: {
    ...mapGetters(["stockData", "weeklyPostCountData"]), // Vuex에서 데이터 가져오기
  },
  watch: {
    weeklyPostCountData: {
      handler(newData) {
        if (this.chart) { //기존 차트가 있으면
          this.updateChart(newData);
        } else {          //기존 차트가 없으면
          this.renderChart(newData);
        }
      },
      deep: true, //객체 내부 변경을 감지함
    },
  },
  mounted() {
    this.watchTicker();
  },
  methods: {
    
    watchTicker() {
      this.$watch(
        () => this.$route.query, // 전체 query 객체 감시
        (newQuery) => {
          const newTicker = newQuery.ticker;
          const newType = newQuery.type || "allPost"; // 기본값 설정
          if (newTicker) {
            if (!this.weeklyPostCountData && newTicker !== "nasdaq") {
              this.$store.dispatch('fetchStockInfo', { ticker: newTicker, type: newType });
            }
          }
        },
        { immediate: true } // mounted 시 즉시 실행
      );
    },
    
    extractChartData(data) {
      const labels = data.map(entry => entry.date);
      const counts = data.map(entry => entry.count || 0);
      const bullishCounts = data.map(entry => entry.bullishCnt || 0);
      const bearishCounts = data.map(entry => entry.bearishCnt || 0);

      return { labels, counts, bullishCounts, bearishCounts };
    },
    renderChart(data) {
      if (!this.$refs.discussChart || !data) return;

      const ctx = this.$refs.discussChart.getContext("2d");
      const { labels, counts, bullishCounts, bearishCounts } = this.extractChartData(data);

      this.chart = new Chart(ctx, {
        type: "line",
        data: {
          labels: labels,
          datasets: [
            {
              label: "게시글 수",
              data: counts,
              borderColor: "rgba(75, 192, 192, 1)",
              backgroundColor: "rgba(75, 192, 192, 0.2)",
              borderWidth: 3,
              fill: true,

            },
            {
              label: "상승 의견 수",
              data: bullishCounts,
              borderColor: "rgba(54, 162, 235, 1)",
              backgroundColor: "rgba(54, 162, 235, 0.2)",
              borderWidth: 3,
              fill: true,
            },
            {
              label: "하락 의견 수",
              data: bearishCounts,
              borderColor: "rgba(255, 99, 132, 1)",
              backgroundColor: "rgba(255, 99, 132, 0.2)",
              borderWidth: 3,
              fill: true,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              labels: {
                usePointStyle: true,
                boxWidth: 7,
                boxHeight: 7,
                font: {
                  size: 14, // 라벨 폰트 크기
                  family: "'Arial', sans-serif", // 폰트 종류
                },
                color: '#ffffff',
              },
            },
          },
          scales: {
            x: {
              ticks: {
                color: "#d4d2d2",
                font: {
                  weight: "bold",
                },
              }
            },
            y: {
              ticks: {
                color: "#d4d2d2",
                font: {
                  weight: "bold",  // X축 라벨 폰트 굵기 (bold)
                },
              },
              beginAtZero: true,
            },
          },
        },

      });
    },
    updateChart(newData) {
      if (!this.chart) {
        return;
      }
      this.chart.destroy();

      const { labels, counts, bullishCounts, bearishCounts } = this.extractChartData(newData);
      this.chart.data.labels = labels;
      this.chart.data.datasets[0].data = counts;
      this.chart.data.datasets[1].data = bullishCounts;
      this.chart.data.datasets[2].data = bearishCounts;
      this.renderChart(newData);
    },
  },
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
  color: #b4c5ee;
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

.default {
  flex: 7;
  font-size: 1em;
  box-sizing: border-box;
  max-height: 100%;
  display: flex;
  flex-direction: row;
  gap: 20px;
  /* background-color: #bb6036; */
}
</style>

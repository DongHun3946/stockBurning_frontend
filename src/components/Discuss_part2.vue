<template>
  <div class="gauge-container">
    <div class="gauge-title">
      StockBurning식 공포 ⦁ 탐욕 지수
    </div>
    <div class="gauge-chart">
      <canvas id="gaugeChart"></canvas>
    </div>
    <div class="gauge-label">
      <span class="current-label">현재 지수 : </span>
      <span class="current-value" :style="{ color: getEmotionColor(score) }">{{ score }}</span>
      <span>→</span>
      <span class="current-status" :style="{ color: getEmotionColor(score) }">{{ getEmotionStatus(score) }}</span>
    </div>
  </div>
</template>

<script>
import { onMounted, ref, watch } from "vue";
import Chart from "chart.js/auto";
import axios from "axios";

export default {
  name: "GaugeChart",
  setup() {
    const score = ref(0);
    let chart = null;

    const fetchScore = async() => {
      try{
        const response = await axios.get("http://localhost:8081/api/fear-greed-index");
        score.value = response.data;
        updateChart();
      }catch(error){
        console.error("Discuss_part2.vue error : ", error);
      }
    }
    
    const getEmotionColor = (value) => {
      if (value <= 15) return "#d9534f";
      if (value <= 44) return "#f0ad4e";
      if (value <= 55) return "#b4b4b4";
      if (value <= 84) return "#5cb85c";
      return "#05fc05";
    };

    const getEmotionStatus = (value) => {
      if (value <= 15) return "극단적인 공포";
      if (value <= 44) return "공포";
      if (value <= 55) return "중립";
      if (value <= 84) return "탐욕";
      return "극단적인 탐욕";
    };

    const updateChart = () => {
      if (!chart) return;

      const ctx = chart.ctx;
      const gradient = ctx.createLinearGradient(0, 0, 250, 0);
      gradient.addColorStop(0.15, "#e64641");
      gradient.addColorStop(0.3, "#f0ad4e");
      gradient.addColorStop(0.6, "#b4b4b4");
      gradient.addColorStop(0.8, "#81c781");
      gradient.addColorStop(1, "#4cda4c");

      chart.data.datasets[0].data = [score.value, 100 - score.value];
      chart.data.datasets[0].backgroundColor = [gradient, 'transparent'];
      chart.update();
    };

    onMounted(() => {
      fetchScore();
      const ctx = document.getElementById("gaugeChart").getContext("2d");

      const gradient = ctx.createLinearGradient(0, 0, 250, 0);
      gradient.addColorStop(0.15, "#e64641");
      gradient.addColorStop(0.3, "#f0ad4e");
      gradient.addColorStop(0.6, "#b4b4b4");
      gradient.addColorStop(0.8, "#81c781");
      gradient.addColorStop(1, "#4cda4c");

      chart = new Chart(ctx, {
        type: "doughnut",
        data: {
          labels: [],
          datasets: [
            {
              data: [score.value, 100 - score.value],
              backgroundColor: [gradient, 'transparent'],
              borderWidth: 2,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          cutout: "70%",
          rotation: 270,
          circumference: 180,
          plugins: {
            legend: {
              display: false
            }
          }
        },
        plugins: [{
          id: 'needlePlugin',
          afterDraw: (chart) => {
            const { width, height, ctx } = chart;

            const segments = [
              { text: "극공", angle: -170, color: "#d9534f" },
              { text: "공포", angle: -134, color: "#f0ad4e" },
              { text: "중립", angle: -90, color: "#b4b4b4" },
              { text: "탐욕", angle: -46, color: "#5cb85c" },
              { text: "극탐", angle: -10, color: "#05fc05" }
            ];

            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.font = 'bold 14px Arial';

            segments.forEach(segment => {
              const angleInRad = (segment.angle * Math.PI) / 180;
              const radius = height * 0.43;
              const x = width / 2 + radius * Math.cos(angleInRad);
              const y = height * 0.87 + radius * Math.sin(angleInRad);

              ctx.save();
              ctx.translate(x, y);
              ctx.rotate(angleInRad + Math.PI / 2);
              ctx.fillStyle = segment.color;
              ctx.fillText(segment.text, 0, 0);
              ctx.restore();
            });

            const angle = (score.value / 100 * Math.PI) - Math.PI;
            const needleLength = height / 2;
            const centerX = width / 2;
            const centerY = height * 0.89;
            
            const needleX = centerX + needleLength * Math.cos(angle);
            const needleY = centerY + needleLength * Math.sin(angle);
            
            const leftX = centerX + (needleLength * 0.13) * Math.cos(angle + Math.PI/2);
            const leftY = centerY + (needleLength * 0.13) * Math.sin(angle + Math.PI/2);
            const rightX = centerX + (needleLength * 0.13) * Math.cos(angle - Math.PI/2);
            const rightY = centerY + (needleLength * 0.13) * Math.sin(angle - Math.PI/2);

            ctx.beginPath();
            ctx.moveTo(leftX, leftY);
            ctx.lineTo(needleX, needleY);
            ctx.lineTo(rightX, rightY);
            ctx.closePath();
            ctx.fillStyle = "#292929";
            ctx.fill();

            ctx.beginPath();
            ctx.arc(centerX, centerY, 16, 0, Math.PI * 2);

            ctx.shadowColor = "rgba(0, 0, 0, 0.5)";
            ctx.shadowBlur = 10;
            ctx.shadowOffsetX = 2;
            ctx.shadowOffsetY = 2;
            
            ctx.fillStyle = "#c5c5c5";
            ctx.fill();
            ctx.restore();
          }
        }]
      });
    });

    watch(score, updateChart);

    return { score, getEmotionStatus, getEmotionColor };
  },
};
</script>

<style scoped>
.gauge-container {
  display: flex;
  flex-direction: column;
  background-color: #555454;
  border-radius: 30px;
  padding: 1% 3% 1% 3%;
  width: 100%;
  height: 100%;
  max-width: 100%;
  max-height: 100%;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.5);
  box-sizing: border-box;
}

.gauge-title {
  flex: 2;
  font-size: 20px;
  color: #b4c5ee;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
}

.gauge-chart {
  flex: 1;
  position: relative;
  height: 200px;
}

.gauge-label {
  flex: 2;
  font-size: 18px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.current-date {
  color: #ebebeb;
  font-size: 16px;
}

.current-label {
  color: #ebebeb;
  margin-right: 5px;
}

.current-value {
  font-weight: bold;
  font-size: 20px;
}
</style>
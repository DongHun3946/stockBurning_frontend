<template>
  <div v-if="isVisible" class="modal-overlay">
    <div class="modal-content">
      <p v-show="!option">{{ option }}</p>
      <p class="modal-content-title" :style="titleStyle"> {{ titleMessage }}</p>
      <p class="modal-content-main">{{ mainMessage }}</p>
      <p class="modal-content-sub">{{ subMessage }}</p>
      <p v-if="option === 4" class="progress-text">{{ progressMessage }}</p>
      <button v-show="option !== 4" @click="handleButtonClick">확인</button>
    </div>
  </div>
</template>

<script>
export default {
  /* Option 1 : 실패 (타이틀 : 빨강색) 확인버튼 누르면 모달창만 닫힘
            2 : 성공 (타이틀 : 초록색) 확인버튼 누르면 모달창 닫히고 홈으로 이동 및 로그아웃됨
            3 : 실패 (타이틀 : 빨강색) 확인버튼 누르면 모달창 닫히고 홈으로 이동
            4 : 애니메이션 효과부여
  */
  data() {
    return {
      progressMessage: "",
      intervalId: null,
    }
  },
  props: {
    isVisible: { type: Boolean, required: true },
    option: { type: Number, required: false },
    titleMessage: { type: String, default: '' },
    mainMessage: { type: String, default: '' },
    subMessage: { type: String, default: '' },
    inputProgressMessage: { type: String, default: '' },
  },

  methods: {
    closeModal() {
      this.$emit('close');
    },
    completeModal() {
      this.$emit('close');
      this.$router.push("/");
    },
    handleButtonClick() {
      if (this.option === 1) {
        this.closeModal();
      } else if (this.option === 2) {
        this.completeModal();
        this.$store.dispatch('logout');
      } else if (this.option === 3) {
        this.completeModal();
      }
    },
    startAnimation() {
      if (this.intervalId) return;
      let count = 0;
      this.intervalId = setInterval(() => {
        count = (count + 1) % 4;
        this.progressMessage = this.inputProgressMessage + ".".repeat(count);
      }, 500); //0.5초마다 애니메이션 효과
    },
    stopAnimation() {
      if (this.intervalId) {
        clearInterval(this.intervalId);
        this.intervalId = null;
      }
    },
  },
  watch: {
    option(newValue) {
      if (newValue === 4) {
        this.startAnimation();
      }
    }
  },
  computed: {
    titleStyle() {
      return this.option === 2 ? { color: '#64da6a' } : { color: '#e24040' };
    }
  },

};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 50%;
  /* 화면의 세로 중간 */
  left: 50%;
  /* 화면의 가로 중간 */
  transform: translate(-50%, -50%);
  /* 정확히 중앙 정렬 */
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: rgb(51, 51, 51);
  padding: 5px 30px 15px 30px;
  border-radius: 10px;
  text-align: center;
  font-size: bold;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.modal-content-title {
  font-size: 30px;
  font-weight: bold;
}

.modal-content-main {
  font-weight: bold;
}

.progress-text {
  font-size: 20px;
  font-weight: bold;
}

button {
  margin-top: 10px;
  padding: 10px 20px;
  background-color: #636363;
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;
}

button:hover {
  background-color: #a3a3a3;
}
</style>
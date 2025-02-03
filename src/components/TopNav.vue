<template>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap" rel="stylesheet" />
  <div class="navbar">

    <div class="navbar-left">
      <button class="home-button" @click="goToHome">StockBurning</button>
    </div>

    <div class="navbar-center">
      <div class="search-container">
        <input type="text" placeholder="티커를 입력해주세요!" class="search-input" v-model="ticker" @input="handleTickerInput"
          @keyup.enter="fetchStockInfo" />
        <img src="/imgs/delete.png" alt="Clear" class="clear-icon" @click="clearTicker" />
      </div>
      <ul v-if="suggestions.length > 0" class="suggestions-list">
        <li v-for="suggestion in suggestions" :key="suggestion.id" @click="selectSuggestion(suggestion)">
          {{ suggestion.stockSymbol }}
        </li>
      </ul>
    </div>


    <div class="navbar-right">
      <button class="nav-button" @click="goToLoginOrLogout">
        {{ !this.$store.getters.isLoggedIn ? '로그인' : '로그아웃' }}
      </button>
      <button class="nav-button" @click="goToSignup">
        회원가입
      </button>
      <div class="userInfo" v-show="this.$store.getters.isLoggedIn">
        <span style="color:gray">I</span>
        <div class="user-id">
          <span>{{ this.$store.getters.nickName }}</span>
        </div>
        <img src="/imgs/downArrow_64.png" class="setting-img" alt="설정 이미지" @click="settingClick" />
        <SettingModal :isVisible="isModalVisible" />
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import SettingModal from './forms/settingForm.vue'

export default {
  name: "TopNav",
  data() {
    return {
      ticker: "",        // 검색창 입력값
      suggestions: [],   // 추천 검색어 목록
      apikey: "ctkf5upr01qntkqovocgctkf5upr01qntkqovod0",
      isModalVisible: false,
    };
  },
  components: {
    SettingModal
  },
  methods: {
    settingClick() {
      this.isModalVisible = !this.isModalVisible;
    },
    fetchStockSuggestions() { // 추천 검색창에 출력할 종목 받아오기
      if (this.ticker.trim() === "") {
        this.suggestions = [];
        return;
      }
      axios
        .get(`http://localhost:8081/api/stock/suggestions?prefix=${this.ticker}`)
        .then((response) => {
          this.suggestions = response.data;
        })
        .catch((error) => {
          console.error("관련 티커를 가져오는 중 에러 발생:", error);
        });
    },
    selectSuggestion(suggestion) {    // 검색창 입력값을 추천 티커로 변경
      this.ticker = suggestion.stockSymbol;
      this.suggestions = [];
      this.fetchStockInfo();
    },
    handleTickerInput(event) {   // 입력값을 영문자만 허용하고 소문자를 대문자로 처리
      const input = event.target.value.toUpperCase().replace(/[^A-Z]/g, "");
      this.ticker = input;
      this.fetchStockSuggestions();

    },
    fetchStockInfo() {
      this.$store.dispatch("fetchStockInfo", this.ticker); // Vuex 액션 호출
      this.suggestions = [];
    },
    clearTicker() {
      this.ticker = ""; // x 아이콘 클릭 시 ticker 값을 초기화
    },
    goToHome() {
      if (this.$route.path !== "/") {
        this.$router.push("/").catch(error => {
          console.error(error);
        })
      }
      else {
        this.$router.push("/");
      }

    },
    goToLoginOrLogout() {
      if (!this.$store.getters.isLoggedIn) {
        this.$router.push("/login");
      }
      else {
        this.$store.dispatch("logout");
        this.$router.push("/");
      }

    },
    goToSignup() {
      this.$router.push("/signup");
    },
  },
};
</script>

<style scoped>
* {
  box-sizing: border-box;
}

.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 25px;
  /*위 아래 5px 여백, 왼쪽 오른쪽 25px 여백*/
  top: 0;
  background-color: #292929;
  color: white;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
  position: fixed;
  width: 100%;
  height: 8vh;
  z-index: 1000;
}

.home-button {
  font-size: 24px;
  color: white;
  background-color: transparent;
  border: none;
  cursor: pointer;
  text-align: left;
  padding: 0;
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-style: italic;
}

.navbar-center {
  flex-grow: 1;
  display: flex;
  justify-content: center;
  position: relative;
}

.navbar-right {
  display: flex;
  align-items: center;
  font-size: 1.1em;
}
.userInfo {
  display: flex;
  flex-direction: row;
}
.nav-button {
  background-color: #292929;
  border: none;
  color: white;
  padding: 10px;
  font-size: 0.9em;
  font-weight: bold;
  margin-left: 20px;
  margin-right: 2em;
  cursor: pointer;
  border-radius: 5px;
}

.nav-button:hover {
  background-color: #555;
}

.user-id {
  margin-left: 25px;
  margin-right: 25px;
}

.clear-icon {
  position: absolute;
  top: 50%;
  /* 검색창 중앙 정렬 */
  right: 10px;
  /* 오른쪽 끝에서 약간 여백 */
  transform: translateY(-50%);
  width: 20px;
  height: 20px;
  cursor: pointer;
}

.search-container {
  position: relative;
  width: 400px;
  /* 검색창과 동일한 너비 */
}

.search-input {
  width: 100%;
  /* 부모 요소인 search-container 너비에 맞춤 */
  height: 40px;
  padding: 15px;
  padding-right: 45px;
  /* Clear 아이콘이 겹치지 않도록 여백 추가 */
  background-color: #858585;
  border-radius: 25px;
  border: none;
  font-family: 'Inter', sans-serif;
  font-size: 15px;
  font-weight: bold;
  caret-color: #292929;
  transition: all 0.3s ease;
}

.search-input::placeholder {
  font-family: 'MyFont', sans-serif;
  font-weight: 600;
  font-size: 15px;
  color: #292929;
}

.search-input:focus {
  outline: none;
  width: 410px;
  height: 45px;
  background-color: #818181;
}

.suggestions-list {
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  width: 400px;
  list-style: none;
  padding: 0;
  margin-top: 8px;
  background-color: rgb(31, 31, 31);
  border: 3px solid #4e4e4e;
  border-radius: 8px;
  max-height: 150px;
  overflow-y: auto;
  z-index: 1001;
}

.suggestions-list li {
  padding: 8px 12px;
  cursor: pointer;
  border-bottom: 0.5px solid #4e4e4e;
}

.suggestions-list li:hover {
  background-color: #6b6b6b;
}

.suggestions-list {
  &::-webkit-scrollbar {
    width: 10px;
  }

  &::-webkit-scrollbar-track {
    background: #8b8b8b;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: #494949;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #5a5a5a;
  }
}

.setting-img {
  margin-right: 20px;
}

.setting-img:hover {
  cursor: pointer;
}
</style>

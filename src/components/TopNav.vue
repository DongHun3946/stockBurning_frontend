<template>
  <link
    href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap"
    rel="stylesheet"
  />
  <div class="navbar">
    <div class="navbar-left">
      <button class="home-button" @click="goToHome">StockBurning</button>
    </div>
    <div class="navbar-center">
      <input
        type="text"
        placeholder="티커를 입력해주세요!"
        class="search-input"
        v-model="ticker"
        @input="handleTickerInput"
        @keyup.enter="fetchStockInfo"
      />
      <ul v-if="suggestions.length > 0" class="suggestions-list">
        <li
          v-for="suggestion in suggestions"
          :key="suggestion.id"
          @click="selectSuggestion(suggestion)"
        >
          {{ suggestion.stockSymbol }}
        </li>
      </ul>
    </div>
    <div class="navbar-right">
      <button class="nav-button" @click="goToLogin">로그인</button>
      <button class="nav-button" @click="goToSignup">회원가입</button>
      <div class="user-id">
        <span>a3989957</span>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: "TopNav",
  data() {
    return {
      ticker: "",        // 검색창 입력값
      suggestions: [],   // 추천 검색어 목록
      apikey: "ctkf5upr01qntkqovocgctkf5upr01qntkqovod0",
    };
  },
  methods: {
    fetchStockSuggestions() { // 추천 검색창에 출력할 종목 받아오기
      if (this.ticker.trim() === "") {
        this.suggestions = [];
        return;
      }
      axios
        .get(`http://localhost:8081/stock/suggestions?prefix=${this.ticker}`)
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
    },
    goToHome() {   // 홈 페이지로 이동
      this.$router.push("/");
    },
    goToLogin() {
      this.$router.push("/login");
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

.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 25px;
  top: 0;
  background-color: #292929;
  color: white;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.5);
  position: fixed;
  width: 100%;
  height: 8%;
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

.search-input {
  width: 400px;
  height: 40px;
  padding: 15px;
  background-color: #858585;
  border-radius: 25px;
  border: none;
  font-family: 'Inter', sans-serif;
  font-size: 15px;
  font-weight: bold;
  caret-color: #292929;
}

.search-input::placeholder {
  font-family: 'MyFont', sans-serif;
  font-weight: 600;
  font-size: 15px;
  color: #292929;
}

.search-input:focus {
  outline: none;
}

.navbar-right {
  display: flex;
  align-items: center;
}

.nav-button {
  background-color: #444;
  border: none;
  color: white;
  padding: 10px;
  margin-left: 20px;
  margin-right: 20px;
  cursor: pointer;
  border-radius: 5px;
}

.nav-button:hover {
  background-color: #555;
}

.user-id {
  margin-left: 15px;
}
</style>

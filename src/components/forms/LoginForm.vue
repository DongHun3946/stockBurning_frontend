<template>
  <div class="login-container">
    <div class="login-form">
      <h1 class="form-title">StockBurning</h1>

      <input type="text" placeholder="아이디" class="form-input" v-model="userid" />
      <input type="password" placeholder="비밀번호" class="form-input" v-model="userpw" @keyup.enter="login" />

      <button class="login-button" @click="login">
        로그인
      </button>

      <p class="social-login-text">소셜 로그인</p>
      <img src="/imgs/kakao_login_medium_wide.png" alt="Kakao Img" class="kakao-button" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';



export default {
  name: "LoginForm",
  computed: {
    ...mapGetters(["isLoggedIn"]),
  },
  data() {
    return {
      userid: "",
      userpw: "",
    };
  },
  methods: {
    async login() {
      await this.$store.dispatch("login", {
        id: this.userid,
        password: this.userpw,
      });
      this.$router.push("/");
      console.log(this.$store.getters.isLoggedIn);
    },
  },
}
</script>

<style scoped>
* {
  box-sizing: border-box;
}

.login-container {
  display: flex;
  justify-content: center;
  /* 수평 가운데 */
  align-items: center;
  /* 수직 가운데 */
  height: 100%;
  width: 100%;

}

.login-form {
  background-color: #464646;
  padding: 25px;
  border-radius: 15px;
  text-align: center;
  width: 20%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
}

.form-title {
  font-family: 'Inter', sans-serif;
  font-size: 1.6em;
  font-weight: 600;
  color: #ffffff;
  margin-bottom: 15px;
}

.form-input {
  background-color: #737373;
  width: 100%;
  height: 3em;
  margin-top: 15px;
  padding-left: 15px;
  border-radius: 15px;
  font-size: 16px;
  font-weight: bold;
  color: #2b2b2b;
  border: none;
  caret-color: #3b3b3b;
  /* 커서 깜빡이는 색상 */
}

.form-input:focus {
  outline: none;
  padding-left: 15px;
}

.form-input::placeholder {
  color: #ffffff;
  font-size: 0.75em;
  font-family: 'Inter', sans-serif;
  font-weight: bold;
  transform: translateY(-7px);
}

.login-button {
  width: 100%;
  padding: 10px;
  margin-top: 20px;
  background-color: #c0c0c0;
  border: none;
  border-radius: 5px;
  color: #000000;
  font-weight: 600;
  font-size: 16px;
  cursor: pointer;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.3);
}

.social-login-text {
  margin: 20px 0 10px;
  font-size: 14px;
  font-weight: bold;
  text-align: left;
  color: #cccccc;
}

.kakao-button {
  width: 100%;
  height: 100%;
  cursor: pointer;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.3);
}
</style>
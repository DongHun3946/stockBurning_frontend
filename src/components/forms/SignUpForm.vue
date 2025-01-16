<template>
  <div class="registration-form">
    <h1>StockBurning</h1>
    <form @submit.prevent="submitRegistration">
      <div class="form-group">
        <label for="nickname">닉네임
          <span v-if="errorNickNameMessage" class="error-message">{{ errorNickNameMessage }}
          </span>
          <span v-if="validNickNameMessage" class="valid-message">{{ validNickNameMessage }}
          </span>
        </label>
        <div class="nickname-group">
          <input v-model="nickname" @input="validNickName" type="text" id="nickname" maxlength="20" />
          <button type="button" @click="checkNickNameDuplicated" style="width: 25%;">중복 확인</button>
        </div>
      </div>

      <div class="form-group">
        <label for="id">아이디
          <span v-if="errorUserIdMessage" class="error-message">{{ errorUserIdMessage }}
          </span>
          <span v-if="validUserIdMessage" class="valid-message">{{ validUserIdMessage }}
          </span>
        </label>
        <div class="id-group">
          <input v-model="userid" @input="validUserId" type="text" id="id" maxlength="20" />
          <button type="button" @click="checkUserIdDuplicated" style="width: 25%;">중복 확인</button>
        </div>

      </div>
      <div class="form-group">
        <label for="password">비밀번호 (8~25자리의 영문, 숫자, 특수기호 포함)
          <br>
          <span v-if="errorPasswordMessage && !validPasswordMessage" class="error-message">{{ errorPasswordMessage }}
          </span>
          <span v-if="validPasswordMessage && !errorPasswordMessage" class="valid-message">{{ validPasswordMessage }}
          </span>
        </label>

        <input v-model="password" @input="validPassword" type="password" id="password" />
      </div>
      <div class="form-group">
        <label for="confirm-password">비밀번호 확인
          <br>
          <span v-if="errorConfirmPasswordMessage && !validConfirmPasswordMessage" class="error-message">{{
            errorConfirmPasswordMessage }}
          </span>
          <span v-if="validConfirmPasswordMessage && !errorConfirmPasswordMessage" class="valid-message">{{
            validConfirmPasswordMessage }}
          </span>
        </label>
        <input v-model="confirmPassword" @input="validConfirmPassword" type="password" id="confirm-password" />
      </div>
      <div class="form-group">
        <label for="email">이메일
          <span v-if="errorEmailMessage && !validEmailMessage" class="error-message">{{ errorEmailMessage }}
          </span>
          <span v-if="validEmailMessage && !errorEmailMessage" class="valid-message">{{ validEmailMessage }}
          </span>
        </label>
        <div class="email-group">
          <input v-model="email" @input="validEmail" type="email" id="email" />
          <button type="button" @click="sendVerificationCode">인증번호 전송</button>
        </div>
      </div>
      <div class="form-group">
        <label for="verification-code">인증번호 입력
          <span v-if="errorEmailCodeMessage && !validEmailCodeMessage" class="error-message">{{ errorEmailCodeMessage }}
          </span>
          <span v-if="validEmailCodeMessage && !errorEmailCodeMessage" class="valid-message">{{ validEmailCodeMessage }}
          </span>
        </label>
        <div class="verification-group">
          <input v-model="verificationCode" @input="validEmailCode" type="text" id="verification-code" />
          <button type="button" @click="verifyCode">확인</button>
          <button v-if="isValidEmail" type="button" @click="reSendVerificationCode">재전송</button>
        </div>
      </div>
      <button type="submit" class="submit-button">회원가입 하기</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "RegistrationForm",
  data() {
    return {
      nickname: "",
      userid: "",
      password: "",
      confirmPassword: "",
      email: "",
      verificationCode: "",

      errorNickNameMessage: "",
      validNickNameMessage: "",
      isValidNickName: false,

      errorUserIdMessage: "",
      validUserIdMessage: "",
      isValidUserId: false,

      errorPasswordMessage: "",
      validPasswordMessage: "",
      isValidPassword: false,

      errorConfirmPasswordMessage: "",
      validConfirmPasswordMessage: "",
      isValidConfirmPassword: false,

      errorEmailMessage: "",
      validEmailMessage: "",
      isValidEmail: false,

      errorEmailCodeMessage: "",
      validEmailCodeMessage: "",
      isValidEmailCode: false,
    };
  },
  methods: {
    validNickName() {
      this.isValidNickName = false;
      this.errorNickNameMessage = "";
      this.validNickNameMessage = "";
    },
    validUserId() {
      this.isValidUserId = false;
      this.errorUserIdMessage = "";
      this.validUserIdMessage = "";
    },
    validPassword() {
      const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@#$%^&+=]).{8,25}$/;
      this.isValidPassword = false;
      this.isValidConfirmPassword = false;
      this.validConfirmPasswordMessage = "";
      this.errorConfirmPasswordMessage = "";
      if (this.password.length !== 0 && !passwordRegex.test(this.password)) {
        this.validPasswordMessage = "";
        this.errorPasswordMessage = "8~25자의 영문, 숫자, 특수문자를 포함해야합니다.";
      }
      if (passwordRegex.test(this.password)) {
        this.validPasswordMessage = "사용 가능합니다."
        this.errorPasswordMessage = "";
        this.isValidPassword = true;
      }
      if (this.confirmPassword === this.password && this.isValidPassword) {
        this.validConfirmPasswordMessage = "일치합니다."
        this.errorConfirmPasswordMessage = "";
        this.isValidConfirmPassword = true;
      }
    },
    validConfirmPassword() {
      if (this.confirmPassword === this.password && this.isValidPassword) {
        this.validConfirmPasswordMessage = "일치합니다."
        this.errorConfirmPasswordMessage = "";
        this.isValidConfirmPassword = true;
      } else {
        this.validConfirmPasswordMessage = "";
        this.errorConfirmPasswordMessage = "불일치합니다.";
        this.isValidConfirmPassword = false;
      }
    },
    validEmail() {
      this.validEmailMessage = "";
      this.errorEmailMessage = "";
      this.isValidEmail = false;
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailRegex.test(this.email)) {
        return false;
      } else {
        return true;
      }
    },
    validEmailCode() {
      this.isValidEmailCode = false;
    },
    async checkNickNameDuplicated() {
      try {
        const response = await axios.get("http://localhost:8081/api/signup/check-nickname", {
          params: { nickname: this.nickname }
        });
        console.log(response.data);
        if (response.data.available) {
          this.validNickNameMessage = response.data.message;
          this.errorNickNameMessage = "";
          this.isValidNickName = true;
        } else if (!response.data.available) {
          this.validNickNameMessage = "";
          this.errorNickNameMessage = response.data.message;
          this.isValidNickName = false;
        }
      } catch (error) {
        this.validNickNameMessage = ""
        this.errorNickNameMessage = "(중복 확인에 실패했습니다. 다시 시도해주세요.)";
        console.log("에러: ", error);
        this.isValidNickName = false;
      }
    },
    async checkUserIdDuplicated() {
      try {
        const response = await axios.get("http://localhost:8081/api/signup/check-userid", {
          params: { userid: this.userid }
        });
        if (response.data.available) {
          this.validUserIdMessage = response.data.message;
          this.errorUserIdMessage = "";
          this.isValidUserId = true;
        } else if (!response.data.available) {
          this.validUserIdMessage = "";
          this.errorUserIdMessage = response.data.message;
          this.isValidUserId = false;
        }
      } catch (error) {
        this.validUserIdMessage = ""
        this.errorUserIdMessage = "(중복 확인에 실패했습니다. 다시 시도해주세요.)";
        console.log("에러: ", error);
        this.isValidUserId = false;
      }
    },
    async sendVerificationCode() {
      if (!this.validEmail()) {
        this.errorEmailMessage = "이메일 형식이 알맞지 않습니다.";
        this.validEmailMessage = "";
        return;
      }
      try {
        this.validEmailMessage = "전송 중...";
        this.errorEmailMessage = "";
        const response = await axios.post("http://localhost:8081/api/signup/send-email", null, {
          params: { email: this.email },
        });

        if (response.data.success) {
          this.isValidEmail = true;
          this.validEmailMessage = response.data.message;
          this.errorEmailMessage = "";
        } else {
          this.validEmailMessage = "";
          this.errorEmailMessage = response.data.message;
        }
      }
      catch (error) {
        alert("인증코드 전송에 실패했습니다. 다시 시도해주세요.");
        console.log(error);
      }
    },
    async reSendVerificationCode() {
      if(!this.email){
        alert("이메일란을 입력해주세요.");
        return;
      }
      else if(!this.validEmail()){
        alert("이메일 형식이 알맞지 않습니다.");
        return;
      }
      this.isValidEmail = true;
      this.validEmailCodeMessage = "전송 중...";
      this.errorEmailCodeMessage = "";
      try {
        const response = await axios.post("http://localhost:8081/api/signup/send-email", null, {
          params: { email: this.email },
        });
        
        if (response.data.success) {
          this.validEmailCodeMessage = response.data.message;
          this.errorEmailCodeMessage = "";
          this.isValidEmailCode = false;
        } else {
          this.validEmailCodeMessage = "";
          this.errorEmailCodeMessage = response.data.message;
        }
      }
      catch (error) {
        alert("인증코드 재전송에 실패했습니다. 다시 시도해주세요.");
        console.log(error);
      }
    },
    async verifyCode() {
      try {
        const response = await axios.post("http://localhost:8081/api/signup/verify-code", null, {
          params: { email: this.email, code: this.verificationCode },
        });
        if (response.data.success) {
          this.validEmailCodeMessage = response.data.message;
          this.errorEmailCodeMessage = "";
          this.isValidEmailCode = true;
        } else {
          this.validEmailCodeMessage = "";
          this.errorEmailCodeMessage = response.data.message;
        }
      }
      catch (error) {
        alert("인증코드 확인에 실패했습니다. 다시 시도해주세요.");
        console.log(error);
      }
    },
    async submitRegistration() {
      console.log(this.isValidNickName);
      console.log(this.isValidUserId);
      console.log(this.isValidPassword);
      console.log(this.isValidConfirmPassword);
      console.log(this.isValidEmail);
      console.log(this.isValidEmailCode);

      if (!this.isValidNickName) {
        alert("닉네임을 다시 확인해주세요.");
        return;
      }
      if (!this.isValidUserId) {
        alert("아이디를 다시 확인해주세요.");
        return;
      }
      if (!this.isValidPassword) {
        alert("비밀번호를 다시 확인해주세요.");
        return;
      }
      if (!this.isValidConfirmPassword) {
        alert("비밀번호 확인란을 다시 확인해주세요.");
        return;
      }
      if (!this.isValidEmail) {
        alert("이메일을 다시 확인해주세요.");
        return;
      }
      if (!this.isValidEmailCode) {
        alert("인증코드를 다시 확인해주세요.");
        return;
      }
      try {
        const response = await axios.post("http://localhost:8081/api/signup", {
          nickName: this.nickname,
          userId: this.userid,
          userPw: this.password,
          email: this.email
        });
        if (response.status === 201) {
          alert("회원가입 되셨습니다.");
          this.$router.push("/");
        }
      } catch (error) {
        if (error.response) {
          // 서버 응답이 있을 경우
          alert(`회원가입 실패 : ${error.response.data}`);
        } else if (error.request) {
          // 서버로 요청은 했으나 응답이 없을 경우
          alert(`서버 응답을 받을 수 없습니다. 네트워크 오류가 발생했습니다.`);
        } else {
          // 요청 중 오류 발생
          alert(`회원가입 요청 중 문제가 발생했습니다: ${error.message}`);
        }
      }
    }
  },
};
</script>

<style scoped>
* {
  box-sizing: border-box;
}

.registration-form {
  width: 24%;
  height: 81vh;
  margin: 0 auto;
  background-color: #464646;
  padding: 20px;
  border-radius: 15px;
  color: #fff;
  font-family: Arial, sans-serif;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);

}

h1 {
  text-align: center;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-size: 14px;
  font-weight: bold;
  color: #cccccc;
}

input {
  width: 100%;
  height: 50px;
  padding: 10px;
  font-size: 18px;
  font-weight: bold;
  color: #2b2b2b;
  border: none;
  background-color: #737373;
  border-radius: 4px;
  box-sizing: border-box;
  border-radius: 12px;
  caret-color: #3b3b3b;
  box-shadow: 0 4px 3px rgba(0, 0, 0, 0.3);
}

input:focus {
  outline: none;
}

.nickname-group,
.id-group,
.email-group,
.verification-group {
  display: flex;
  gap: 10px;
}

#verification-code {
  width: 68%;
}

#email {
  width: 71%;
}

button {
  background-color: #3b3b3b;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  font-weight: bold;
  box-shadow: 0 3px 0px rgba(0, 0, 0, 0.3);
}

button:hover {
  background-color: #636363;
}

.submit-button {
  width: 100%;
  height: 50px;
  margin-top: 10px;
  color: #353535;
  font-size: 17px;
  font-weight: bold;
  background-color: #b7b7b7;
  border-radius: 10px;
  box-shadow: 0 4px 0px rgba(0, 0, 0, 0.3);
}

.submit-button:hover {
  background-color: #6e6e6e;
}

.error-message {
  color: #ad4444
}

.valid-message {
  color: #65b85e
}
</style>
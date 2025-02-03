<template>
  <div class="modify-form">
    <h1>내 정보 수정</h1>
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
        <label>아이디</label>
        <div class="id-group">
          <input v-model="userid" type="text" id="userid" disabled />
        </div>
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
          <button type="button" :disabled="isButtonDisabled" :class="{ 'disabled-button': isButtonDisabled }"
            @click="sendVerificationCode">인증번호 전송</button>
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

      <button type="submit" class="submit-button">수정하기</button>
      <button type="button" class="cacel-button" @click="cacelModify">취소</button>
    </form>
    <Modal :isVisible="isModalVisible" 
    :option="modalOption"
    :titleMessage="modalTitleMessage" :mainMessage="modalMainMessage"
      :subMessage="modalSubMessage" @close="closeModal" />

  </div>
</template>

<script>
import axios from "axios";
import Modal from './ModalForm.vue';

export default {
  name: "ModifyForm",
  components: {
    Modal,
  },
  data() {
    return {
      nickname: this.$store.getters.nickName,
      userid: this.$store.getters.userId,
      email: this.$store.getters.userEmail,
      verificationCode: "",
      isButtonDisabled: false,

      errorNickNameMessage: "",
      validNickNameMessage: "",
      isValidNickName: true,

      errorUserIdMessage: "",
      validUserIdMessage: "",
      isValidUserId: true,

      errorEmailMessage: "",
      validEmailMessage: "",
      isValidEmail: true,

      errorEmailCodeMessage: "",
      validEmailCodeMessage: "",
      isValidEmailCode: true,

      isModalVisible: false,
      modalOption: 0,
      modalTitleMessage: "",
      modalMainMessage: "",
      modalSubMessage: "",
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
    validEmail() {
      this.validEmailMessage = "";
      this.errorEmailMessage = "";
      this.isValidEmail = false;
      this.isValidEmailCode = false;
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
      if (this.nickname === this.$store.getters.nickName) {
        this.validNickNameMessage = "현재 사용 중인 닉네임과 동일합니다.";
        this.errorNickNameMessage = "";
        this.isValidNickName = true;
        return;
      }
      try {
        const response = await axios.get("http://localhost:8081/api/signup/check-nickname", {
          params: { nickname: this.nickname }
        });
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
          this.isButtonDisabled = true;

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
      if (!this.email) {
        alert("이메일란을 입력해주세요.");
        return;
      }
      else if (!this.validEmail()) {
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
    cacelModify(){
      this.$router.push("/");
    },
    showModal(option, titleMessage, mainMessage, subMessage) {
      this.isModalVisible = true;
      this.modalOption = option;
      this.modalTitleMessage = titleMessage;
      this.modalMainMessage = mainMessage;
      this.modalSubMessage = subMessage;
  
    },
    closeModal() {
      this.isModalVisible = false;
    },
    async submitRegistration() {
      console.log(this.isValidNickName);
      console.log(this.isValidUserId);
      console.log(this.isValidEmail);
      console.log(this.isValidEmailCode);

      if (!this.isValidNickName) {
        this.showModal(1, "주의", "닉네임을 다시 확인해주세요.", "");
        return;
      }
      if (!this.isValidUserId) {
        this.showModal(1, "주의", "아이디를 다시 확인해주세요.", "");
        return;
      }
      if (!this.isValidEmail) {
        this.showModal(1, "주의", "이메일을 다시 확인해주세요.", "");
        return;
      }
      if (!this.isValidEmailCode) {
        this.showModal(1, "주의", "인증코드를 다시 확인해주세요.", "");
        return;
      }
      try {
        const response = await axios.put(`http://localhost:8081/api/modify/user/${this.userid}`, {
          nickName: this.nickname,
          email: this.email,
        });
        
        if (response.status === 200) {
          this.showModal(2, "", this.nickname + "님의 개인정보가 수정되었습니다 ");
        }
      } catch (error) {
        alert("개인정보 수정 실패 : ", error);
      }
    }
  },
};
</script>

<style scoped>
* {
  box-sizing: border-box;
}

.modify-form {
  width: 24%;
  height: 65vh;
  margin: 4% auto;
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
.email-group,
.id-group,
.verification-group {
  display: flex;
  gap: 10px;
}

#userid {
  background-color: #3a3a3a;
  color: white;
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

button.disabled-button {
  background-color: #6c757d;
  /* 비활성화 상태 색상 */
  cursor: not-allowed;
  /* 비활성화된 커서 스타일 */
}

.submit-button {
  width: 100%;
  height: 50px;
  margin-top: 10px;
  color: #353535;
  font-size: 17px;
  font-weight: bold;
  background-color: #6283f0;
  border-radius: 10px;
  box-shadow: 0 4px 0px rgba(0, 0, 0, 0.3);
}

.cacel-button {
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
  background-color: #435eb8;
}

.cacel-button:hover {
  background-color: #757575;
}

.error-message {
  color: #ad4444
}

.valid-message {
  color: #65b85e
}
</style>
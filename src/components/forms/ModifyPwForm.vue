<template>
  <div class="modify-form">
    <h1>비밀번호 수정</h1>
    <form @submit.prevent="submitRegistration">

      <div class="form-group">
        <label>현재 비밀번호
          <br>
          <span v-if="errorCurrentPasswordMessage && !validCurrentPasswordMessage" class="error-message">{{ errorCurrentPasswordMessage }}
          </span>
          <span v-if="validCurrentPasswordMessage && !errorCurrentPasswordMessage" class="valid-message">{{ validCurrentPasswordMessage }}
          </span>
        </label>
        <div class="form-password">
          <input v-model="currentPassword" type="password" class="input-password" :disabled="isValidCurrentPassword"/>
          <button type="button" class="button-password" @click="checkCurrentPassword">인증하기</button>
        </div>
      
      </div>

      <div class="form-group">
        <label>새 비밀번호 (8~25자리의 영문, 숫자, 특수기호 포함)
          <br>
          <span v-if="errorNewPasswordMessage && !validNewPasswordMessage" class="error-message">{{ errorNewPasswordMessage }}
          </span>
          <span v-if="validNewPasswordMessage && !errorNewPasswordMessage" class="valid-message">{{ validNewPasswordMessage }}
          </span>
        </label>
        <input v-model="newPassword" @input="validNewPassword" type="password"/>
      </div>

      <div class="form-group">
        <label>새 비밀번호 확인
          <br>
          <span v-if="errorConfirmNewPasswordMessage && !validConfirmNewPasswordMessage" class="error-message">
            {{ errorConfirmNewPasswordMessage }}
          </span>
          <span v-if="validConfirmNewPasswordMessage && !errorConfirmNewPasswordMessage" class="valid-message">
            {{ validConfirmNewPasswordMessage }}
          </span>
        </label>
        <input v-model="confirmNewPassword" @input="validConfirmNewPassword" type="password"/>
      </div>

      <button type="submit" class="submit-button">수정하기</button>
      <button type="button" class="cacel-button" @click="cacelModify">취소</button>
    </form>
    <Modal :isVisible="isModalVisible" :option="modalOption" :titleMessage="modalTitleMessage"
      :mainMessage="modalMainMessage" :subMessage="modalSubMessage" @close="closeModal" />

  </div>
</template>

<script>
import axios from "axios";
import Modal from './ModalForm.vue';

export default {
  name: "ModifyPwForm",
  components: {
    Modal,
  },
  data() {
    return {
      userid: "",

      isValidCurrentPassword : false,
      isValidNewPassword : false,
      isValidConfirmNewPassword : false,
     
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",

      errorCurrentPasswordMessage: "",
      validCurrentPasswordMessage: "",

      errorNewPasswordMessage: "",
      validNewPasswordMessage: "",

      errorConfirmNewPasswordMessage: "",
      validConfirmNewPasswordMessage: "",

      isModalVisible: false,
      modalOption: 0,
      modalTitleMessage: "",
      modalMainMessage: "",
      modalSubMessage: "",
    };
  },
  methods: {
    async checkCurrentPassword(){
      try {
        const response = await axios.post("http://localhost:8081/api/modify/check-password", {
          userid : this.$store.getters.userId,
          password : this.currentPassword,
        });
        if (response.data.available) {
          this.validCurrentPasswordMessage = response.data.message;
          this.errorCurrentPasswordMessage = "";
          this.isValidCurrentPassword = true;
        } else if (!response.data.available) {
          this.validCurrentPasswordMessage = "";
          this.errorCurrentPasswordMessage = response.data.message;
          this.isValidCurrentPassword = false;
        }
      } catch (error) {
        this.validCurrentPasswordMessage = ""
        this.errorCurrentPasswordMessage = "(인증 확인에 실패했습니다. 다시 시도해주세요.)";
        console.log("에러: ", error);
        this.isValidCurrentPassword = false;
      }
    },
    validNewPassword() {
      const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@#$%^&+=]).{8,25}$/;
      this.isValidNewPassword = false;
      this.isValidConfirmNewPassword = false;
      this.validConfirmNewPasswordMessage = "";
      this.errorConfirmNewPasswordMessage = "";
      if (this.newPassword.length !== 0 && !passwordRegex.test(this.newPassword)) {
        this.validNewPasswordMessage = "";
        this.errorNewPasswordMessage = "8~25자의 영문, 숫자, 특수문자를 포함해야합니다.";
      }
      if (passwordRegex.test(this.newPassword)) {
        this.validNewPasswordMessage = "사용 가능합니다."
        this.errorNewPasswordMessage = "";
        this.isValidNewPassword = true;
      }
      if (this.confirmNewPassword === this.newPassword && this.isValidNewPassword) {
        this.validConfirmNewPasswordMessage = "일치합니다."
        this.errorConfirmNewPasswordMessage = "";
        this.isValidConfirmNewPassword = true;
      }
      if(this.confirmNewPassword.length !==0 && this.confirmNewPassword !== this.newPassword){
        this.validConfirmNewPasswordMessage = "";
        this.errorConfirmNewPasswordMessage = "불일치합니다.";
        this.isValidConfirmNewPassword = false;
      }
    },
    validConfirmNewPassword() {
      if (this.confirmNewPassword === this.newPassword && this.isValidNewPassword) {
        this.validConfirmNewPasswordMessage = "일치합니다."
        this.errorConfirmNewPasswordMessage = "";
        this.isValidConfirmNewPassword = true;
      } else {
        this.validConfirmNewPasswordMessage = "";
        this.errorConfirmNewPasswordMessage = "불일치합니다.";
        this.isValidConfirmNewPassword = false;
      }
    },
    cacelModify() {
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
      console.log(this.isValidCurrentPassword);
      console.log(this.isValidNewPassword);
      console.log(this.isValidConfirmNewPassword);
    

      if (!this.isValidCurrentPassword) {
        this.showModal(1, "주의", "현재 비밀번호를 다시 확인해주세요.", "");
        return;
      }
      if (!this.isValidNewPassword) {
        this.showModal(1, "주의", "새 비밀번호를 다시 확인해주세요.", "");
        return;
      }
      if (!this.isValidConfirmNewPassword) {
        this.showModal(1, "주의", "새 비밀번호 확인란을 다시 확인해주세요.", "");
        return;
      }
      try {
        const response = await axios.put(`http://localhost:8081/api/modify/password`, {
          userid : this.$store.getters.userId,
          password: this.newPassword,
        });

        if (response.status === 200) {
          this.showModal(2, "", "비밀번호가 수정되었습니다");
        }
      } catch (error) {
        alert("ModifyPwForm.vue 비밀번호 수정 실패 : ", error);
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
  min-height: 55vh;
  margin: 7% auto;
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
.form-password {
  display: flex;
  flex-direction: row;
  gap: 10px;
}

.input-password {
  flex: 4;
}
.button-password {
  flex: 1;
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
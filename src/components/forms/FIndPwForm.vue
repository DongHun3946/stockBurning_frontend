<template>
    <div class="findid-form">
        <h1>비밀번호 찾기</h1>
        <form @submit.prevent="submitFindPw">

            <div class="form-group">
                <div class="form-group-1">
                    <label>아이디</label>
                    <div class="form-userid">
                        <input v-model="userid" type="text" @input="validUserid" />
                    </div>
                </div>
                <div class="form-group-2">
                    <label>이메일 주소
                        <span v-if="errorEmailMessage && !validEmailMessage" class="error-message">{{ errorEmailMessage
                            }}
                        </span>
                        <span v-if="validEmailMessage && !errorEmailMessage" class="valid-message">{{ validEmailMessage
                            }}
                        </span>
                    </label>
                    <div class="form-email">
                        <input class="input-email" v-model="email" type="email" @input="validEmail" />
                        <button class="button-email" type="button" @click="checkEmailAndUserid">인증하기</button>
                    </div>
                </div>
                <div class="form-group-3">
                    <label>인증코드
                        <span v-if="errorEmailCodeMessage && !validEmailCodeMessage" class="error-message">{{
                            errorEmailCodeMessage }}
                        </span>
                        <span v-if="validEmailCodeMessage && !errorEmailCodeMessage" class="valid-message">{{
                            validEmailCodeMessage }}
                        </span>
                    </label>
                    <div class="form-code">
                        <input class="input-code" v-model="verificationCode" @input="validEmailCode" type="text"
                            id="verification-code" />
                        <button class="verify" type="button" @click="verifyCode">확인</button>
                        <button class="resend" type="button" @click="reSendVerificationCode">재전송</button>
                    </div>
                </div>
            </div>

            <button type="submit" class="submit-button">확인</button>
            <button type="button" class="cacel-button" @click="cacelButton">취소</button>
        </form>
        <Modal :isVisible="isModalVisible" 
            :option="modalOption" 
            :titleMessage="modalTitleMessage"
            :mainMessage="modalMainMessage" 
            :subMessage="modalSubMessage" 
            :inputProgressMessage="modalProgressMessage" 
            @close="closeModal" />
    </div>
</template>

<script>
import axios from "axios";
import Modal from './ModalForm.vue';

export default {
    name: "FindPwForm",
    components: {
        Modal,
    },
    data() {
        return {
            email: "",
            verificationCode: "",
            userid: "",

            isValidUserid: false,
            
            isValidEmail: false,
            validEmailMessage: "",
            errorEmailMessage: "",

            isValidCode: false,
            validEmailCodeMessage: "",
            errorEmailCodeMessage: "",

            isModalVisible: false,
            modalOption: 0,
            modalTitleMessage: "",
            modalMainMessage: "",
            modalSubMessage: "",
            modalProgressMessage: "",
        };
    },
    methods: {
        async checkEmailAndUserid() {
            if (!this.validEmail()) {
                this.errorEmailMessage = "이메일 형식이 알맞지 않습니다.";
                this.validEmailMessage = "";
                return;
            }
            this.validEmailMessage = "전송 중...";
            this.errorEmailMessage = "";
            try {
                const response = await axios.get("http://localhost:8081/api/find/userPw/check-userInfo", {
                    params: { 
                        userid: this.userid,
                        email: this.email 
                    }
                });
                if (response.data.success) {
                    this.validEmailMessage = response.data.message;
                    this.errorEmailMessage = "";
                    this.isValidEmail = true;
                    this.isValidUserid = true;
                } else if (!response.data.success) {
                    this.validEmailMessage = "";
                    this.errorEmailMessage = response.data.message;
                    this.isValidEmail = false;
                    this.isValidUserid = false;
                }
            } catch (error) {
                this.validEmailMessage = ""
                this.errorEmailMessage = "(인증 확인에 실패했습니다. 다시 시도해주세요.)";
                console.log("에러: ", error);
                this.isValidEmail = false;
                this.isValidUserid = false;
            }
        },
        async verifyCode() {
            const EmailCodeRequest = {
                email: this.email,
                code: this.verificationCode
            }
            try {
                const response = await axios.post("http://localhost:8081/api/find/userId/verify-code", 
                    EmailCodeRequest
                );
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
        async reSendVerificationCode() {
            console.log(this.isValidEmail);
            console.log(this.isValidEmailCode);
            if (!this.email) {
                alert("이메일란을 입력해주세요.");
                return;
            }
            else if (!this.validEmail()) {
                alert("이메일 형식이 알맞지 않습니다.");
                return;
            }
            this.validEmailCodeMessage = "전송 중...";
            this.errorEmailCodeMessage = "";
            try {
                const response = await axios.get("http://localhost:8081/api/find/userId/check-email", {
                    params: { email: this.email },
                });

                if (response.data.success) {
                    this.validEmailCodeMessage = response.data.message;
                    this.errorEmailCodeMessage = "";
                    this.isValidEmail = true;
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
        validUserid(){
        
            this.isValidUserid = false;
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
            this.isValidCode = false;
            this.errorEmailCodeMessage = "";
            this.validEmailCodeMessage = "";
        },
        cacelButton() {
            this.$router.push("/");
        },
        showModal(option, titleMessage, mainMessage, subMessage, inputProgressMessage) {
            this.isModalVisible = true;
            this.modalOption = option;
            this.modalTitleMessage = titleMessage;
            this.modalMainMessage = mainMessage;
            this.modalSubMessage = subMessage;
            this.modalProgressMessage = inputProgressMessage;
        },
        closeModal() {
            this.isModalVisible = false;
        },
        async submitFindPw() {
            console.log(this.isValidUserid);
            console.log(this.isValidEmail);
            console.log(this.isValidEmailCode);
            if(!this.isValidUserid){
                this.showModal(1, "주의", "아이디란을 다시 확인해주세요.");
                return;
            }
            if (!this.isValidEmail) {
                this.showModal(1, "주의", "이메일 주소란을 다시 확인해주세요.");
                return;
            }
            if (!this.isValidEmailCode) {
                this.showModal(1, "주의", "인증코드란을 다시 확인해주세요.");
                return;
            }
            try {
                const FindPwRequest = {
                    userid: this.userid,
                    email: this.email
                }
                this.showModal(4, "", "", "","진행 중");
                const response = await axios.post(
                    `http://localhost:8081/api/find/userPw`, 
                    FindPwRequest
                );
                
                if (response.status === 200) {
                    this.showModal(2, "임시 비밀번호 발급완료", this.email + "로 임시 비밀번호를 전송했습니다.");
                }else{
                    this.showModal(3, "임시 비밀번호 발급실패", "다시 시도해주세요.");
                }
            } catch (error) {
                console.error(error);
            }
        }
    },
};
</script>

<style scoped>
* {
    box-sizing: border-box;
}

.findid-form {
    width: 20%;
    height: 55vh;
    min-height: 52vh;
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
    display: flex;
    flex-direction: column;
    margin-bottom: 15px;
    gap: 10px;
    /* background-color: #65b85e; */
}

.form-group-1 {
    flex: 1;
    /* background-color: #ad4444; */
}

.form-group-2 {
    flex: 1;

    /* background-color: #6283f0; */
}
.form-group-3 {
    flex: 1;

    /* background-color: #6283f0; */
}


.form-email {
    display: flex;
    flex-direction: row;
    gap: 10px;
    /* background-color: #1a2e57; */
}

.form-code {
    display: flex;
    flex-direction: row;
    gap: 10px;
    /* background-color: #c42e2e; */
}

.form-userid {
    /* background-color: #1a2e57; */
}

.input-code {
    flex: 6;
}

.verify {
    flex: 1;
}

.resend {
    flex: 1.3;
}

.input-email {
    flex: 4;
}

.button-email {
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
<template>
    <div class="registration-form">
      <h1>StockBurning</h1>
      <form>
        <div class="form-group">
          <label for="name">이름 (실명)</label>
          <input type="text" id="name" />
        </div>
        <div class="form-group">
          <label for="nickname">닉네임</label>
          <input type="text" id="nickname" />
        </div>
        <div class="form-group">
          <label for="id">아이디</label>
          <input type="text" id="id" />
        </div>
        <div class="form-group">
          <label for="password">비밀번호 (8~16자리의 영문, 숫자, 특수기호 포함)</label>
          <input
            type="password"
            id="password"
          />
        </div>
        <div class="form-group">
          <label for="confirm-password">비밀번호 확인</label>
          <input
            type="password"
            id="confirm-password"
            placeholder="비밀번호 확인"
          />
        </div>
        <div class="form-group">
          <label for="email">이메일</label>
          <div class="email-group">
            <input type="email" id="email"  />
            <button type="button">인증번호 전송</button>
          </div>
        </div>
        <div class="form-group">
          <label for="verification-code">인증번호 입력</label>
          <div class="verification-group">
            <input type="text" id="verification-code"  />
            <button type="button">확인</button>
            <button type="button">재전송</button>
          </div>
        </div>
        <button type="submit" class="submit-button">회원가입 하기</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    name: "RegistrationForm",
  };
  </script>
  
  <style scoped>
  * {
    box-sizing: border-box;
  }

  .registration-form {
    width: 24%;
    height: 100;
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
  .email-group,
  .verification-group {
    display: flex;
    gap: 10px;
  }
  #verification-code {
    width: 68% ;
  }
  #email {
    width: 71% ;
  }
  button {
    background-color: #3b3b3b;
    color: white;
    border: none;
    padding: 5px 10px;
    border-radius: 8px;
    cursor: pointer;
    font-size: 14px;
    box-shadow: 0 4px 3px rgba(0, 0, 0, 0.3);
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
  </style>
  
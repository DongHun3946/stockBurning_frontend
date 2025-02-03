<template>
    <div>
      <!-- 설정 창 -->
      <div v-if="isVisible" class="setting-menu">
        <p class="welcome-text"><span style="color: #8bca58">{{ this.$store.getters.nickName }}</span>님<br>환영합니다</p>
        <div class="content">
          <button @click="modifyUserInfo">
          <img src="/imgs/edit-file_24.png" alt="editImg" style="margin-right: 5px;">
            내 정보 수정
          </button>
          <button @click="modifyPassword">
          <img src="/imgs/password_24.png" alt="settingImg" style="margin-right: 5px;">
            비밀번호 변경
          </button>
          <button @click="settings">
          <img src="/imgs/settings_24.png" alt="settingImg" style="margin-right: 5px;">
            설정
          </button>
        </div>
        
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      isVisible: { type: Boolean, required: true},
    },
    data() {
      return {
        isSettingOpen: false, // 드롭다운 열림 상태
        username: "",  // 사용자 이름
      };
    },
    methods: {
      toggleDropdown() {
        this.isSettingOpen = !this.isSettingOpen;
      },
      modifyUserInfo() {
        this.$router.push("/modify/info");
      },
      modifyPassword() {
        this.$router.push("/modify/password");
      },
      settings() {
        alert("설정 페이지로 이동합니다.");
      },
    },
  };
  </script>
  
  <style scoped>
  
  /* 드롭다운 메뉴 스타일 */
  .setting-menu {
    position: absolute;
    top: 55px;
    right: 50px;
    width: 200px;
    background-color: #535353;
    border-radius: 8px;
    box-shadow: 3px 6px 3px rgba(0, 0, 0, 0.5);
    padding: 7px 8px 7px 8px;
    z-index: 100;
  }
  
  /* 환영 텍스트 스타일 */
  .welcome-text {
    font-size: 20px;
    text-align: center;
    font-weight: bold;
    margin-bottom: 20px;
    color: #ffffff;
  }

  .content {
    display: flex;
    flex-direction: column;
    padding: 5px 10px 5px 10px;
  }
  .content button {
    background-color: #535353;
    text-align: left;
    border-radius: 10px;
    margin-top: 5px;
    font-size: 17px;
    border: none;
    display: flex;
    align-items: center;
    font-weight: bold;
    color: #0D0D0D;
    padding: 5px;
  }
  .content button:hover{
    background-color: #777777;
    cursor: pointer;
  }
  </style>
  
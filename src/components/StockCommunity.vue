<template>
  <div class="community">

    <div class="top">
      <div class="top-left" v-if="stockData">
        <span>{{stockData.stockSymbol}} 커뮤니티</span>
      </div>
      <div class="top-right" v-if="stockData">
        <button class="top-button">전체글</button> I
        <button class="top-button">베스트글</button>
      </div>
    </div>

    <div class="mid" v-if="postData">
      <!-- 게시글 출력 -->
        <article v-for="(post, index) in postData" :key="index" class="post">
          <div class="profile-image">
            <img src="/imgs/profile_32.png" alt="profile_img">
          </div>
          <div class="post-content">
            <div class="nickNameAndTime">
              <div class="nickName">{{ post.nickName }}</div>
              <div class="createdTime">{{ getTimeAgo(post.createdAt) }} </div>
            </div>
            <div class="contentAndImage">
              <div class="content">{{ post.content }}</div>
              
              <div class="image"></div>
            </div>
            <div class="likeAndComment">
              <div class="like-button">
                <img src="/imgs/thumbs-up_16.png" alt="like_img" @click="setLike">
              </div>
              <div class="like">{{ post.likes }} </div>
              <div class="comment-button">
                <img src="/imgs/comment2_16.png" alt="comment_img" @click="setComment">
              </div>
              <div class="commentCount">{{ post.commentCount }}</div>
            </div>
          </div>
          
        </article>
    </div>


    <div class="bottom">
      <form @submit.prevent="createPost">
        <div class="bottom-top">
          <textarea v-model="postContent" 
          class="custom-textarea" 
          rows="3" 
          :placeholder="placeholderText" 
          :disabled="!isLoggedIn"
          required></textarea>
        </div>

        <div class="bottom-bottom">
          <div class="image-button">
            <img src="/imgs/image_32.png" style="width: 20px; height: 20px;" alt="사진이미지">
          </div>
          <button class="up-button">
            ↑상승
          </button>
          <button class="down-button">
            ↓하락
          </button>
          <button type="submit" class="post-button">
            등록
          </button>
        </div>

      </form>
    </div>

  </div>
</template>

<script>
import axios from 'axios';
import { mapGetters } from 'vuex';

export default {
  name: "StockCommunity",
  data() {
    return {
      postContent: "",
    }
  },
  computed: { //특정 값을 계산하여 반환함
    ...mapGetters(["stockData", "postData"]),
    getNickName(){
      return this.$store.getters.nickName;
    },
    isLoggedIn() {
      return this.$store.getters.isLoggedIn;
    },
    placeholderText(){
      return this.isLoggedIn ? this.getNickName + "님의 의견을 남겨보세요!" : "로그인 후 의견을 남길 수 있습니다!"
    },
  },
  methods: {
    setLike(){
      alert("좋아요 +1");
    },
    setComment(){
      alert("댓글 작성");
    },
    getStockData() {
      return this.$store.getters.stockData;
    },
    async createPost(){
      
      if(this.getStockData() === null){
        alert("티커를 입력해주세요");
        return;
      }
        
      if(!this.postContent.trim()){
        alert("내용을 입력해주세요!");
        return;
      }
      const postCreateRequest = {
        content: this.postContent,
        imagePath: null,
        opinion: null,
        stockSymbol: this.getStockData().id,
      }
      try{
        const response = await axios.post(
          "http://localhost:8081/api/posts/create",
           postCreateRequest
        );
        
        if(response.status === 200){
          this.postContent="";
        } else{
          alert("게시글 등록에 실패했습니다. 다시 시도해주세요");
        }
      }catch(error){
        console.error("community post error :" + error);
      }
    },
    getTimeAgo(createdAt) {
      const now = new Date();
      const createdTime = new Date(createdAt);
      const diff = Math.floor((now - createdTime) / 1000); // 초 단위 차이

      if (diff < 60) {
        return `${diff}초 전`;
      } else if (diff < 3600) {
        const minutes = Math.floor(diff / 60);
        return `${minutes}분 전`;
      } else if (diff < 86400) {
        const hours = Math.floor(diff / 3600);
        return `${hours}시간 전`;
      } else {
        const days = Math.floor(diff / 86400);
        return `${days}일 전`;
      }
    },
  },
};
</script>

<style scoped>
.community {
  display: flex;
  flex-direction: column;
  height: 100vh;
  /* 화면 전체 높이 */
  color: #ffffff;
  font-size: 16px;
  background-color: #464646;
  border-radius: 30px;
  padding: 2%;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.5);
}

.top {
  display: flex;
  height: 3%;
  flex-direction: row;
  top: 0;
  justify-content: space-around;
  /* background-color: #f79898; */
  align-items: center;
  color: #b4c5ee;
  padding: 10px 0;
  z-index: 10;
  text-align: center;
}

.top-left {
  /* background-color: #7fa1c5; */
  width: 65%;
  text-align: left;
  font-weight: bold;
  font-size: 19px;
  margin-left: 10px;
}

.top-right {
  /* background-color: #83d19d; */
  color: #b4c5ee;
  width: 35%;
  font-size: 14px;
  color: #bbbbbb;
}

.top-button {
  background-color: #464646;
  border: none;
  cursor: pointer;
  color: #b4c5ee;
  border-radius: 5px;
}

.top-button:hover {
  background-color: #666666;

}




.mid {
  height: 77%;
  display: flex;
  flex-direction: column;
  /* background-color: #7fa1c5; */
  flex: 1;
  margin: 10px 0;
  overflow-y:scroll; /* 세로 스크롤 활성화 */
  max-height: 77%; /* 높이 제한 */
}
.mid::-webkit-scrollbar {
  width: 10px; /* 스크롤바 너비 */
}

.mid::-webkit-scrollbar-thumb {
  background: #a0a0a0; /* 스크롤바 색상 */
  border-radius: 10px; /* 둥근 모서리 */
}

.mid::-webkit-scrollbar-thumb:hover {
  background: #888888; /* 스크롤바에 마우스 올렸을 때 색상 */
  cursor: pointer;
}
.mid::-webkit-scrollbar-thumb:active {
  background: #1f1f1f;
}
.mid::-webkit-scrollbar-track {
  background: #464646; /* 트랙 배경색 */
  border-radius: 10px;
}
.post {
  display: flex;
  flex-direction: row;
  background-color: #3a3a3a;
  border-radius: 10px;
  padding: 10px;
  margin-bottom: 10px;
}
.profile-image {
  margin-right: 10px;
  /* background-color: #dd5757; */
}
.post-content {
  /* background-color: #c9ca7b; */
  flex: 1;
  display: flex;
  flex-direction: column;
  color: #2e2e2e;
}
.nickNameAndTime{
  display: flex;
  flex-direction: row;
  /*background-color: #da9554; */
}
.nickName {
  flex: 1.5;
  font-weight: bold;
  color: #5ad342;
  /*background-color: #defa3d; */
}
.createdTime {
  flex: 1;
  font-weight: bold;
  color: #1f1f1f;
  /*background-color: #94653a; */
}
.contentAndImage {
  /*background-color: #3cdf57; */
  display: flex;
  flex-direction: column;
}          
.content {
  flex: 1;
  color: #000000;
  margin-bottom: 10px;
}
.image{
  flex: 1;
}
.likeAndComment {
  display: flex;
  flex-direction: row;
  /*background-color: #8e54da;*/ 
}
.like-button {
  flex:0.7;
}
.like-button:hover{
  cursor: pointer;
}
.like {
  flex:1;
  color: #000000;
  /*background-color: #0c3c96;*/
}
.comment-button {
  flex:0.7;
}
.comment-button:hover {
  cursor: pointer;
}
.commentCount {
  flex: 9;
  color: #000000;
  /*background-color: #48ffff; */
}

.bottom {
  display: flex;
  flex-direction: column;
  height: 20%;
  width: 100%;
  position: sticky;
  bottom: 0;
  padding: 10px;
  background-color: #686868;
  box-sizing: border-box;
  border-radius: 20px;
}

.bottom-top {
  height: 80%;
  width: 100%;
  box-sizing: border-box;
  padding: 13px;
  background-color: #5c5c5c;
  border-radius: 20px;
}

.custom-textarea {
  background-color: #5c5c5c;
  width: 100%;
  height: 100%;
  resize: none;
  box-sizing: border-box;
  outline: none;
  padding: 0px 10px 0px 10px;
  font-size: 17px;
  font-family: 'Inter', sans-serif;
  font-weight: bold;
  border: none;
}

.custom-textarea::placeholder {
  color: #444444;
  font-weight: 600;
  font-family: 'Inter', sans-serif;
  font-size: 17px;
}

.custom-textarea::-webkit-scrollbar {
  width: 10px;
  overflow-y: hidden;
  background-color: #464646;
  border-radius: 10px;
}

.custom-textarea::-webkit-scrollbar-thumb {
  background: #a0a0a0;
  border-radius: 10px;
}

.custom-textarea::-webkit-scrollbar-thumb:hover {
  background: #888888;
  cursor: pointer;
}

.custom-textarea::-webkit-scrollbar-thumb:active {
  background: #1f1f1f;
}

.custom-textarea::-webkit-scrollbar-track {
  background: #464646;
  border-radius: 10px;
  height: 80%;
}

.bottom-bottom {
  display: flex;
  flex-direction: row;
  height: 30%;
  width: 100%;
  padding: 5px 0px 5px 0px;
  background-color: #686868;
  box-sizing: border-box;
  justify-content: space-between;
}

.image-button {
  margin-left: 10px;
}
.image-button:hover {
  cursor: pointer;
}
.up-button {
  margin-left: 90px;
  width: 60px;
  border-radius: 15px;
  background-color: #858585;
  border: none;
  color: #c03f3f;
  font-size: 16px;
  font-weight: bold;
  box-shadow: 0 4px 3px rgba(0, 0, 0, 0.5);
  transition: background-color 0.3s ease, transform 0.3s ease;
}
.up-button:hover {
  cursor: pointer;
  transform: scale(1.1);
}
.down-button {
  margin-right: 120px;
  width: 60px;
  height: 100%;
  border-radius: 15px;
  background-color: #858585;
  border: none;
  color: #3555d3;
  font-size: 16px;
  font-weight: bold;
  box-shadow: 0 4px 3px rgba(0, 0, 0, 0.5);
  transition: background-color 0.3s ease, transform 0.3s ease;
}
.down-button:hover {
  cursor: pointer;
  transform: scale(1.1);
}
.post-button {
  margin-right: 10px;
  width: 60px;
  border-radius: 15px;
  background-color: #458EED;
  color: white;
  border: none;
  font-size: 16px;
  font-weight: bold;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.5);
  transition: background-color 0.3s ease, transform 0.3s ease;
}
.post-button:hover {
  cursor: pointer;
  transform: scale(1.1);
}
</style>

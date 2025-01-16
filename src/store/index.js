import { createStore } from 'vuex';
import axios from 'axios';

const store = createStore({
  state: {     // 전역 상태로 관리할 데이터
    stockData: null, 
    postData: [],
    isLoggedIn: false,
    accessToken: null,
    nickName: "User",
    token: null,
  },
  mutations: { // state를 변경하는 메소드
    SET_STOCK_DATA(state, stockData) {
      state.stockData = stockData; 
    },
    SET_POST_DATA(state, postDTO){
      state.postData = postDTO;
    },
    SET_LOGIN_STATE(state, value){
      state.isLoggedIn = value;
    },
    SET_ACCESS_TOKEN(state, value){
      state.accessToken = value;
    },
    SET_NICK_NAME(state, value){
      state.nickName = value;
    }
  },
  actions: { //비동기 작업을 처리하고 mutation을 통해 상태 변경
    async fetchStockInfo({ commit, state }, ticker) { 
      try {
        const { data: fetchedData } = await axios.get( //db에서 해당 티커 찾기
          `http://localhost:8081/stock?ticker=${ticker}`
        );
        if(!fetchedData){
          window.alert("유효하지 않은 티커입니다. 다시 입력해주세요!");
          throw new Error("서버로부터 데이터를 받지 못했습니다.");
        }
        const { stockDataDTO, postDTO } = fetchedData;

        commit('SET_STOCK_DATA', stockDataDTO);
        commit('SET_POST_DATA', postDTO);
        console.log(postDTO);
        console.log("여기"+ state.postData);
        
      } catch (error) {
        console.error("티커 정보를 처리하는 중 에러 발생 : ", error);
      }
    },
    async login({ commit }, {id, password}) {
      try {
        const response = await axios.post("http://localhost:8081/api/login", {
          userId: id,
          userPw: password,
        });
        const getHeader = response.headers.get("Authorization");
        
        const accessToken = getHeader.split(' ')[1];
        
        axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
        commit('SET_ACCESS_TOKEN', accessToken);
        commit('SET_NICK_NAME', response.data);
        commit('SET_LOGIN_STATE', true);
      } catch (error) {
        console.error("로그인 실패 : ", error);
        alert("로그인 정보 불일치");
      }
    },
    
    logout({ commit }) {
      commit('SET_ACCESS_TOKEN', null);
      commit('SET_LOGIN_STATE', false);
      commit('SET_NICK_NAME', "User");
    }

  },
  getters: {
    stockData: (state) => state.stockData, 
    postData: (state) => state.postData,
    isLoggedIn: (state) => state.isLoggedIn,
    accessToken: (state) => state.accessToken,
    nickName: (state) => state.nickName,
  },
});

export default store;

import { createStore } from 'vuex';
import apiClient from '../middleware/axios';
import axios from 'axios';


const store = createStore({
  state: {     // 전역 상태로 관리할 데이터
    stockData: null, 
    postData: [],
    realtimeStatData: null,
    weeklyPostCountData: null,
    isLoggedIn: false,
    accessToken: null,
    nickName: "User",
    userId: null,
    userEmail: null,
    token: null,
    stockUp: 0,
    stockDown: 0,
    
  },
  mutations: { // state를 변경하는 메소드
    SET_STOCK_DATA(state, stockData) {
      state.stockData = stockData; 
    },
    SET_POST_DATA(state, postDTO){
      state.postData = postDTO;
    },
    SET_TICKER_COUNT_DATA(state, realtimeStatDTO){
      state.realtimeStatData = realtimeStatDTO;
    },
    SET_WEEKLY_POST_DATA(state, weeklyPostCountDTO){
      state.weeklyPostCountData = weeklyPostCountDTO;
    },
    SET_LOGIN_STATE(state, value){
      state.isLoggedIn = value;
    },
    SET_ACCESS_TOKEN(state, value){
      state.accessToken = value;
    },
    SET_NICK_NAME(state, value){
      state.nickName = value;
    },
    SET_USER_ID(state, value){
      state.userId = value;
    },
    SET_USER_EMAIL(state, value){
      state.userEmail = value;
    },
    INCREASE_STOCK_UP(state){
      state.stockUp += 1;
    },
    INCREASE_STOCK_DOWN(state){
      state.stockDown += 1;
    },
  },
  actions: { //비동기 작업을 처리하고 mutation을 통해 상태 변경
    async fetchStockInfo({ commit }, {ticker, type="allPost"}) { 
      try {
        //console.log("fetchStockInfo() 실행" + " " + ticker + " " + type);
        
        const { data: fetchedData } = await axios.get( //db에서 해당 티커 찾기
          `http://localhost:8081/api/stock?ticker=${ticker}&type=${type}`,
        );
        
        if(!fetchedData){
          window.alert("유효하지 않은 티커입니다. 다시 입력해주세요!");
          throw new Error("서버로부터 데이터를 받지 못했습니다.");
        }
        const { stockDataDTO, postDTO, realtimeStatDTO, weeklyPostCountDTO } = fetchedData;
        commit('SET_STOCK_DATA', stockDataDTO);
        commit('SET_POST_DATA', postDTO);
        commit('SET_TICKER_COUNT_DATA', realtimeStatDTO);
        commit('SET_WEEKLY_POST_DATA', weeklyPostCountDTO);
        
      } catch (error) {
        console.error("fetchStockInfo() method error : " , error);
      }
    },
    async fetchDefaultInfo({ commit },  {type="allPost"} ) { 
      try {
        //console.log("fetchDefaultInfo() 실행" + " " + type);
        const { data: fetchedData } = await axios.get( 
          `http://localhost:8081/api/stock?ticker=nasdaq&type=${type}`,
        );
        if(!fetchedData){
          throw new Error("서버로부터 데이터를 받지 못했습니다.");
        }
        const postDTO = fetchedData;
        commit('SET_POST_DATA', postDTO);
      
      } catch (error) {
        console.error("fetchDefaultInfo() method error : " , error);
      }
    },
    async refresh({ commit }){
      try{
        const response = await apiClient.post(
          `http://localhost:8081/api/auth/refresh`,
        );
        if (response.status === 200) {
          const getHeader = response.headers.get("Authorization");  
          const accessToken = getHeader.split(' ')[1];
          commit('SET_ACCESS_TOKEN', accessToken);
          commit('SET_NICK_NAME', response.data.nickName);
          commit('SET_USER_ID', response.data.userId);
          commit('SET_USER_EMAIL', response.data.email);
          commit('SET_LOGIN_STATE', true);
        }
      }catch(error){
        if(error.response.status !== 401){
          console.error("refresh() : " + error);
        }
        
      }
    },
    async login({ commit }, {id, password}) {
      try {
        const response = await axios.post("http://localhost:8081/api/login", {
          userId: id,
          userPw: password,
        },{
          withCredentials: true,
        });
        
        const getHeader = response.headers.get("Authorization");  
        const accessToken = getHeader.split(' ')[1];
        
        commit('SET_ACCESS_TOKEN', accessToken);
        commit('SET_NICK_NAME', response.data.nickName);
        commit('SET_USER_ID', response.data.userId);
        commit('SET_LOGIN_STATE', true);
      } catch (error) {
        console.error("login() : " + error);
        alert("로그인 정보 불일치");
      }
    },
  
    async logout({ commit }) {
      try{
        await axios.post("http://localhost:8081/api/logout", 
        null
        ,{ withCredentials: true });
      }catch(error){
        console.error("logout() : " + error);
      }
      window.location.reload();
      commit('SET_ACCESS_TOKEN', null);
      commit('SET_LOGIN_STATE', false);
      commit('SET_NICK_NAME', "User");
    }

  },
  getters: {
    stockData: (state) => state.stockData, 
    postData: (state) => state.postData,
    realtimeStatData: (state) => state.realtimeStatData,
    weeklyPostCountData: (state) => state.weeklyPostCountData,
    isLoggedIn: (state) => state.isLoggedIn,
    accessToken: (state) => state.accessToken,
    nickName: (state) => state.nickName,
    userId: (state) => state.userId,
    userEmail: (state) => state.userEmail,
    stockUp: (state) => state.stockUp,
    stockDown: (state) => state.stockDown,
  },
});

export default store;

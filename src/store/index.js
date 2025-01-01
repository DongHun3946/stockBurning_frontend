import { createStore } from 'vuex';
import axios from 'axios';

const store = createStore({
  state: {
    stockData: null, // 전역 상태로 관리할 주식 데이터
  },
  mutations: { //상태를 수정하는 메소드(상태 변경을 추적할 수 있도록 함)
    SET_STOCK_DATA(state, data) {
      state.stockData = data; // 상태 업데이트
    },
  },
  actions: {
    async fetchStockInfo({ commit }, ticker) { //서버로부터 사용자가 입력한 ticker에 대해 주식데이터를 가져옴
      try {
        const { data: fetchedData } = await axios.get(
          `http://localhost:8081/stock?ticker=${ticker}`
        );
        if(!fetchedData){
          window.alert("유효하지 않은 티커입니다. 다시 입력해주세요!");
          throw new Error("서버로부터 데이터를 받지 못했습니다.");
        }
        commit('SET_STOCK_DATA', fetchedData);
        
        //axios.post(`http://localhost:8081/api/sendTicker`, {ticker});
        
        const { data: updatedData } = await axios.post( // POST 요청으로 stockData 서버로 전송 및 업데이트된 데이터 수신
          `http://localhost:8081/scrape/stock/data`,
          {
            id: fetchedData.id,
            stockSymbol: fetchedData.stockSymbol,
          }
        );
        // 업데이트된 데이터로 상태 재설정
        commit('SET_STOCK_DATA', updatedData);

        console.log('티커 입력정보 서버로 전송 및 업데이트 완료');
        console.log(updatedData);
      } catch (error) {
        console.error('(티커 정보를 처리하는 중 에러 발생)', error);
      }
    },
  },
  getters: {
    stockData: (state) => state.stockData, // 데이터 접근용 getter
  },
});

export default store;

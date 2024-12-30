import { createStore } from 'vuex';
import axios from 'axios';

const store = createStore({
  state: {
    stockData: null, // 전역 상태로 관리할 주식 데이터
  },
  mutations: {
    SET_STOCK_DATA(state, data) {
      state.stockData = data; // 상태 업데이트
    },
  },
  actions: {
    async fetchStockInfo({ commit }, ticker) {
      try {
        const { data: fetchedData } = await axios.get(
          `http://localhost:8081/stock?ticker=${ticker}`
        );
        console.log(fetchedData);
        commit('SET_STOCK_DATA', fetchedData);

        // POST 요청으로 stockData 서버로 전송 및 업데이트된 데이터 수신
        const { data: updatedData } = await axios.post(
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
        console.error('티커 정보를 처리하는 중 에러 발생:', error);
      }
    },
  },
  getters: {
    stockData: (state) => state.stockData, // 데이터 접근용 getter
  },
});

export default store;

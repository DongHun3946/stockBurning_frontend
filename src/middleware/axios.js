import axios from 'axios';
import store from '../store/index'

// Axios 인스턴스 생성
const apiClient = axios.create({
  baseURL: 'http://localhost:8081',
  withCredentials: true ,
});

// 요청 인터셉터 설정 (요청이 전송되기 전에 확인)
apiClient.interceptors.request.use(
  (request) => {
  const access = store.getters.accessToken;
  if(access){
    request.headers['Authorization'] = `Bearer ${access}`
  }
  return request;
}, error => {
  return Promise.reject(error);
});

// 응답 인터셉터 설정
apiClient.interceptors.response.use(
  (response) => {
    return response; // 응답 그대로 반환
  },
  async (error) => {
    if (error.response && error.response.status === 401) {
      const originalRequest = error.config;

      // accessToken 재발급 요청
      if (error.response.data === "accessToken 재발급 요청") {
        try {
          const response = await apiClient.post('/api/reissue'); // refreshToken으로 accessToken 재발급 요청
          const getHeader = response.headers.get("Authorization");  
          const accessToken = getHeader.split(' ')[1];
          store.commit('SET_ACCESS_TOKEN', accessToken);
          return apiClient(originalRequest); // 원래 요청 재시도
        } catch (refreshError) {
          return Promise.reject(refreshError);
        }
      }

      /*
      alert('로그인이 필요합니다. 로그인 페이지로 이동합니다.');
      window.location.href = '/login'; 
      */
    }
    return Promise.reject(error); // 그 외 에러는 그대로 반환
  }
);

export default apiClient;

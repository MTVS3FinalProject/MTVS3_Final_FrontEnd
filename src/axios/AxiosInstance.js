import axios from 'axios';

const axiosInstance = axios.create({ baseURL: import.meta.env.VITE_BASE_URL });

axiosInstance.interceptors.request.use(
  async (config) => {
    const accessToken = localStorage.getItem('token');

    if (!accessToken) {
      // 토큰이 없을 경우 로그아웃 처리 및 로그인 페이지로 리다이렉트
      localStorage.clear();
      window.location.href = '/';
      return Promise.reject('No token found');  // 요청 중단
    }

    config.headers['Authorization'] = `Bearer ${accessToken}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// 토큰 관련 에러 처리
axiosInstance.interceptors.response.use(
  async (response) => {
    return response;
  },

  async (error) => {
    // 토큰 만료나 잘못된 토큰일 때 로그아웃 처리
    if (error.response?.data?.code === 'AUTH_001') {
      console.log('잘못된 토큰');
      localStorage.clear();
      window.location.href = '/';
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;

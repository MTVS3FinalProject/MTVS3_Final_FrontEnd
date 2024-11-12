import axios from 'axios';

const baseURL = import.meta.env.VITE_BASE_URL;

const storeTokens = (authorization, refreshToken) => {

    console.log('authorization: ' + authorization);

    if (authorization) {
        localStorage.setItem('token', authorization);
        console.log('토큰 저장 성공:', authorization);
    } else {
        console.error('Authorization 토큰이 없습니다.');
    }

    console.log('refreshToken: ' + refreshToken);

    if (refreshToken) {
        localStorage.setItem('refresh', refreshToken);
        console.log('리프레시 토큰 저장 성공:', refreshToken);
    } else {
        console.error('Refresh-Token 토큰이 없습니다.');
    }
};

export const login = async (email, password) => {

    console.log('Login 요청 전송 전')

    // authDTO 형식으로 요청 본문을 구성
    const authDTO = {
        email: email,
        password: password
    };

    const res = await axios.post(`${baseURL}/auth/login`, authDTO);

    const { authTokenDTO } = res.data.response;
    const token = authTokenDTO.accessToken;
    const refresh = authTokenDTO.refreshToken;

    console.log(res.data);
    console.log('token: ' + token);
    console.log('refresh: ' + refresh);

    storeTokens(token, refresh);

    return res.data;
};
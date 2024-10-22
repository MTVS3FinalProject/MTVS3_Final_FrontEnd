import axios from 'axios';

const baseURL = import.meta.env.VITE_BASE_URL;

const storeTokens = (authorization, refreshToken) => {

    if (authorization && authorization.startsWith('Bearer ')) {
        const token = authorization.split(' ')[1];
        localStorage.setItem('token', token);
        console.log('토큰 저장 성공:', token);
    } else {
        console.error('Authorization 헤더에 토큰이 없습니다.');
    }

    if (refreshToken && refreshToken.startsWith('Bearer ')) {
        const refresh = refreshToken.split(' ')[1];
        localStorage.setItem('refresh', refresh);
        console.log('리프레시 토큰 저장 성공:', refresh);
    } else {
        console.error('Refresh-Token 헤더에 토큰이 없습니다.');
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

    // 헤더에서 토큰 정보 추출
    const token = res.headers['Authorization'] || res.headers['authorization'];
    const refresh = res.headers['Refresh-Token'] || res.headers['refresh-token'];

    console.log(res.headers);
    console.log('token: ' + token);
    console.log('refresh: ' + refresh);

    storeTokens(token, refresh);

    return res.data;
};
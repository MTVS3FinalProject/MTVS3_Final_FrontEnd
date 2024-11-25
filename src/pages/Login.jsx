import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from 'styled-components';
import LogoImage from '../assets/logo/white.png';

import { login } from "../api/auth";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState(''); 

    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const res = await login(email, password);
            console.log('Login successful:', res);
            navigate('/member/tickets');
        } catch (err) {
            console.error('Login failed:', err);
        }
    };

    return (
        <LoginContainer>
            <LoginForm>
                <LogoContainer>
                    <LogoImg src={LogoImage} alt="Logo" />
                    <InputContainer>
                        <InputDescription>E-mail</InputDescription>
                        <Input
                            type="email"
                            placeholder="e-mail"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <InputDescription>Password</InputDescription>
                        <Input
                            type="password"
                            placeholder="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </InputContainer>
                </LogoContainer>
                <LoginButton onClick={handleLogin}>Sign in</LoginButton>
            </LoginForm>
        </LoginContainer>
    );
};

export default Login;

const LoginContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100dvh;
    width: 100vw;
    background-color: #0f121a;
`;

const LoginForm = styled.div`
    display: flex;
    width: 80%;
    height: 40%;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    /* background-color: #1b2230; */
    padding: 1rem;
    border-radius: 15px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
    /* border: 1px solid #fff; */
    opacity: 0.8;
    margin-bottom: 1.5rem;
    gap: 1.5rem;
`;

const LogoContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    justify-content: center;
    align-items: center;
`;

const LogoImg = styled.img`
    width: 25vw; /* 로고 크기 조정 */
    height: auto;
`;

const InputContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%; /* 입력 필드들이 폼의 전체 너비를 차지하도록 설정 */
    gap: 1.5vh; /* 각 입력 필드와 설명 사이의 간격 */
`;

const InputDescription = styled.div`
    color: #81AEDB;
    font-size: 3vw;
`;

const Input = styled.input`
    width: 100%;
    padding: 12px;
    border-radius: 10px;
    border: none;
    background-color: #2c3547;
    color: white;
    font-size: 1rem;
    box-sizing: border-box;

    &::placeholder {
        color: #9fa6b2;
    }
`;

const LoginButton = styled.button`
    width: 100%;
    padding: 0.7rem;
    background-color: #000000;
    color: white;
    border: none;
    border-radius: 25px;
    font-size: 1.2rem;
    transition: background-color 0.3s;

    &:hover {
        color: #000000;
        background-color: #fff;
    }
`;

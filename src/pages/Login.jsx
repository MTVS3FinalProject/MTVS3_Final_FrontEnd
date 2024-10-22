import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from 'styled-components';
import LogoImage from '../assets/login/logo.png'

import { login } from "../api/auth";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const handleLogin = async () => {
      try {
        const res = await login(email, password);
        console.log('Login successful:', res);
        navigate('/ticket');
      } catch (err) {
        console.error('Login failed:', err);
      }
    };

return (
    <LoginContainer>
    <LoginForm>
        <Title>ToDorian</Title>
        <InputForm>
        <LogoImg src={LogoImage} alt="Chick" />
        <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
        />
        <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
        />
        <LoginButton onClick={handleLogin}>로그인</LoginButton>
        </InputForm>
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
    height: 100%;
    width: 100%;
    background-color: #f7f4f0;
    padding: 0;
    margin: 0;
`;

const Title = styled.h1`
    font-size: 5rem;
    color: #d4886e;
    margin-bottom: 30px;
`;

const LoginForm = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #fff6e6;
    padding: 50px;
    border-radius: 10px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
`;

const InputForm = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 30%;
`;

const LogoImg = styled.img`
    width: 250px;
    margin-bottom: 30px;
`;

const Input = styled.input`
    width: 100%;
    padding: 15px;
    margin: 15px 0;
    border-radius: 5px;
    border: 1px solid #ddd;
    box-sizing: border-box;
    font-size: 1.2rem;
`;

const LoginButton = styled.button`
    width: 100%;
    padding: 15px;
    background-color: #ffd233;
    color: black;
    border: none;
    border-radius: 5px;
    font-size: 1.5rem;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
    background-color: #fbc02d;
    }
`;
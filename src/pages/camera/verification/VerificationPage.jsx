import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import CaptureVerificationPhoto from './CaptureVerificationPhoto.jsx';

function VerificationPage() {
  const location = useLocation();
  const [userCode, setUserCode] = useState('');

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const userCodeFromQR = queryParams.get('userCode');
    
    if (userCodeFromQR) {
      setUserCode(userCodeFromQR);
    }
  }, [location]);

  return (
    <PageContainer>
      <MainContent>
        <Title>신원 인증</Title>
        {userCode ? <CaptureVerificationPhoto userCode={userCode} /> : <LoadingText>Loading..</LoadingText>}
        <BlinkText>눈을 두번 깜빡이면 촬영이 진행됩니다.</BlinkText>
      </MainContent>
    </PageContainer>
  );
}

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  justify-content: space-between;
  align-items: center;
  font-family: Arial, sans-serif;
  background-color: #0d1117;
  color: white;
`;

const Title = styled.div`
  color: #fff;
  padding-top: 5rem;
`;

const MainContent = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 90%;
  gap: 1rem;
  margin-bottom: 8rem;
`;

const BlinkText = styled.p`
  color: #ff4d4f;
  font-size: 1rem;
`;

const LoadingText = styled.p`
  color: #ffffff;
  font-size: 1.2rem;
`;

export default VerificationPage;

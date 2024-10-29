import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import CaptureVerificationPhoto from './CaptureVerificationPhoto';

function VerificationPage() {
  const location = useLocation();
  const [userCode, setUserCode] = useState('');
  const [isReadyToCapture, setIsReadyToCapture] = useState(false);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const userCodeFromQR = queryParams.get('userCode');
    
    if (userCodeFromQR) {
      setUserCode(userCodeFromQR);
    }
  }, [location]);

  useEffect(() => {
    if (userCode) {
      // 5초 후에 캡처 동작을 시작하도록 타이머 설정
      const timer = setTimeout(() => {
        setIsReadyToCapture(true);
      }, 1000);

      // 컴포넌트가 언마운트될 때 타이머를 정리
      return () => clearTimeout(timer);
    }
  }, [userCode]);

  return (
    <PageContainer>
      <MainContent>
        <Title>신원 인증</Title>
        {isReadyToCapture && userCode ? <CaptureVerificationPhoto userCode={userCode} /> : <LoadingText>Loading..</LoadingText>}
        <BlinkText>눈을 두번 깜빡이면 촬영이 진행됩니다.</BlinkText>
      </MainContent>
    </PageContainer>
  );
}

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100dvh;
  justify-content: space-between;
  align-items: center;
  font-family: Arial, sans-serif;
  background-color: #0d1117;
  color: white;
`;

const Title = styled.div`
  color: #fff;
  font-size: larger;
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

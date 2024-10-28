import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useRef } from 'react';
import { uploadVerificationPhoto } from '../../../api/camera';
import styled from 'styled-components';
import Modal from '../../../components/Modal';

function VerificationPhoto() {
  const location = useLocation();
  const navigate = useNavigate(); // 페이지 이동을 위해 추가
  const { photo, userCode } = location.state || {};
  const [secondPwd, setSecondPwd] = useState(['', '', '', '']);
  const [isUploading, setIsUploading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(''); // 에러 메시지 상태 추가

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalMessage, setModalMessage] = useState('');
  const [modalNavigateTo, setModalNavigateTo] = useState(null); // navigate 주소를 관리
  
  const inputRefs = useRef([]);

  const generateFileName = () => {
    const now = new Date();
    const timestamp = now.getFullYear().toString() +
      (now.getMonth() + 1).toString().padStart(2, '0') +
      now.getDate().toString().padStart(2, '0') +
      now.getHours().toString().padStart(2, '0') +
      now.getMinutes().toString().padStart(2, '0') +
      now.getSeconds().toString().padStart(2, '0');
    return `verification-${timestamp}.png`;
  };

  const handleUploadClick = async () => {
    const fullPwd = secondPwd.join('');

    if (!photo || !fullPwd) {
      setErrorMessage('사진과 4자리 비밀번호가 필요합니다.');
      return;
    }

    if (fullPwd.length !== 4 || isNaN(fullPwd)) {
      setErrorMessage('비밀번호는 정확히 4자리 숫자여야 합니다.');
      return;
    }

    setErrorMessage('');

    const response = await fetch(photo);
    const blob = await response.blob();
    const fileName = generateFileName();
    const file = new File([blob], fileName, { type: 'image/png' });

    try {
      setIsUploading(true);
      await uploadVerificationPhoto(file, userCode, fullPwd);
      setModalTitle('성공');
      setModalMessage('신원 인증에 성공하였습니다!');
      setModalNavigateTo('/verification/complete'); // 성공 시 이동할 페이지 설정
    } catch (error) {
      console.error('Error during upload:', error);
      setModalTitle('실패');
      setModalMessage(error.response?.data?.error?.message || '신원 인증에 실패했습니다.');
      setModalNavigateTo(null); // 실패 시 모달 닫기만
    } finally {
      setIsUploading(false);
      setIsModalOpen(true); // 업로드 성공 또는 실패 후 모달 열기
    }
  };

  const handlePwdChange = (e, idx) => {
    const value = e.target.value;
    if (!isNaN(value) && value.length <= 1) {
      const newPwd = [...secondPwd];
      newPwd[idx] = value;
      setSecondPwd(newPwd);
      if (value && idx < 3) {
        inputRefs.current[idx + 1].focus();
      }
    }
  };

  const handleKeyDown = (e, idx) => {
    if (e.key === 'Backspace' && idx > 0 && !secondPwd[idx]) {
      inputRefs.current[idx - 1].focus();
    }
  };

  const handleRetry = () => {
    navigate(`/verification/guide?userCode=${userCode}`); // 재시도 시 설정된 페이지로 이동
  };

  const closeModal = () => {
    if (modalNavigateTo) {
      navigate(modalNavigateTo); // 성공 시 설정된 페이지로 이동
    }
    setIsModalOpen(false);
  };

  return (
    <PageContainer>
      {photo ? (
        <ContentContainer>
          <Title>신원 인증</Title>
          <PhotoContainer>
            <CapturedImage src={photo} alt="Captured" />
          </PhotoContainer>
          <Label>2차 비밀번호 입력</Label>
          <PasswordInputContainer>
            {secondPwd.map((digit, idx) => (
              <PasswordInput
                key={idx}
                type='password'
                inputMode='numeric'
                value={digit}
                onChange={(e) => handlePwdChange(e, idx)}
                onKeyDown={(e) => handleKeyDown(e, idx)}
                maxLength={1}
                ref={(el) => (inputRefs.current[idx] = el)}
              />
            ))}
          </PasswordInputContainer>
          {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
          <ButtonContainer>
            <UploadButton onClick={handleUploadClick} disabled={isUploading}>
              {isUploading ? '신원 인증 중...' : '인증하기'}
            </UploadButton>
            <RetryButton onClick={handleRetry}>재시도</RetryButton>
          </ButtonContainer>
        </ContentContainer>
      ) : (
        <p>사진이 없습니다.</p>
      )}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={modalTitle}
        message={modalMessage}
      />
    </PageContainer>
  );
}

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #0d1117;
  height: 100vh;
  color: white;
  padding-top: 2rem;
`;

const Title = styled.div`
  color: #ffffff;
  margin-bottom: 1rem;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  width: 80%;
`;

const PhotoContainer = styled.div`
  width: 90%;
  height: 90%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #2c3547;
  border-radius: 25px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
`;

const CapturedImage = styled.img`
  width: 90%;
  height: 90%;
  object-fit: cover;
  border-radius: 15px;
`;

const Label = styled.div`
  color: #ffffff;
  font-size: 1rem;
  margin-bottom: 0.5rem;
`;

const PasswordInputContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
`;

const PasswordInput = styled.input`
  width: 40px;
  height: 40px;
  font-size: 24px;
  text-align: center;
  border-radius: 10px;
  border: 1px solid #ffffff;
  background-color: #1c1f2b;
  color: #ffffff;
`;

const ErrorMessage = styled.p`
  color: #ff4d4f;
  font-size: 0.9rem;
  margin-top: 0.5rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 0.5rem;
  margin-top: 2rem;
`;

const UploadButton = styled.button`
  background-color: #2ea043;
  color: white;
  padding: 0.8rem 0;
  border: none;
  border-radius: 25px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #2c974b;
  }

  &:disabled {
    background-color: #555;
    cursor: not-allowed;
  }
`;

const RetryButton = styled.button`
  background-color: #ff4d4f;
  color: white;
  padding: 0.8rem 0;
  border: none;
  border-radius: 25px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #e43a3d;
  }
`;

export default VerificationPhoto;

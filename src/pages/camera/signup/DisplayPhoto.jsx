import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import { uploadPhoto } from '../../../api/camera';
import styled from 'styled-components';
import Modal from '../../../components/Modal';

function DisplayPhoto() {
  const location = useLocation();
  const navigate = useNavigate();
  const { photo, email } = location.state || {};
  const [secondPwd, setSecondPwd] = useState(['', '', '', '']);
  const [confirmPwd, setConfirmPwd] = useState(['', '', '', '']);
  const [isUploading, setIsUploading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(''); // 에러 메시지 상태 추가
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalMessage, setModalMessage] = useState('');
  const [modalNavigateTo, setModalNavigateTo] = useState(null); // navigate 주소를 관리

  const inputRefs = useRef([]);
  const confirmInputRefs = useRef([]);

  useEffect(() => {
    // 비밀번호 확인 입력이 모두 채워진 경우에만 비밀번호 일치 여부를 감지
    const fullPwd = secondPwd.join('');
    const fullConfirmPwd = confirmPwd.join('');
    
    if (fullPwd.length === 4 && fullConfirmPwd.length === 4) {
      if (fullPwd !== fullConfirmPwd) {
        setErrorMessage('Passwords do not match.');
      } else {
        setErrorMessage('');
      }
    }
  }, [secondPwd, confirmPwd]);

  const generateFileName = () => {
    const now = new Date();
    const timestamp = now.getFullYear().toString() +
      (now.getMonth() + 1).toString().padStart(2, '0') +
      now.getDate().toString().padStart(2, '0') +
      now.getHours().toString().padStart(2, '0') +
      now.getMinutes().toString().padStart(2, '0') +
      now.getSeconds().toString().padStart(2, '0');
    return `signup-${timestamp}.png`;
  };

  const handleUploadClick = async () => {
    const fullPwd = secondPwd.join('');
    const fullConfirmPwd = confirmPwd.join('');

    if (!photo || !fullPwd) {
      setErrorMessage('Photo and 4-digit password are required.');
      return;
    }

    if (fullPwd.length !== 4 || isNaN(fullPwd)) {
      setErrorMessage('Password must be exactly 4 digits.');
      return;
    }

    if (fullPwd !== fullConfirmPwd) {
      setErrorMessage('Passwords do not match.');
      return;
    }

    // 비밀번호가 일치하면 에러 메시지를 지움
    setErrorMessage('');

    console.log('email : ' + email);
    console.log('secondPwd : ' + fullPwd);

    const response = await fetch(photo);
    const blob = await response.blob();
    const fileName = generateFileName();
    const file = new File([blob], fileName, { type: 'image/png' });

    try {
      setIsUploading(true);
      await uploadPhoto(file, email, fullPwd);
      setModalTitle('성공');
      setModalMessage('신원 인증 등록에 성공하였습니다!');
      setModalNavigateTo('/signup/complete'); // 성공 시 이동할 페이지 설정
    } catch (error) {
      console.error('Error during upload:', error);
      setModalTitle('실패');
      setModalMessage(error.response?.data?.error?.message || '신원 인증 등록에 실패했습니다.');
      setModalNavigateTo(null); // 실패 시 모달 닫기만
    } finally {
      setIsUploading(false);
      setIsModalOpen(true); // 업로드 성공 또는 실패 후 모달 열기
    }
  };

  const handlePwdChange = (e, idx, type) => {
    const value = e.target.value;
    if (!isNaN(value) && value.length <= 1) {
      if (type === 'register') {
        const newPwd = [...secondPwd];
        newPwd[idx] = value;
        setSecondPwd(newPwd);
        if (value && idx < 3) {
          inputRefs.current[idx + 1].focus();
        }
      } else if (type === 'confirm') {
        const newConfirmPwd = [...confirmPwd];
        newConfirmPwd[idx] = value;
        setConfirmPwd(newConfirmPwd);
        if (value && idx < 3) {
          confirmInputRefs.current[idx + 1].focus();
        }
      }
    }
  };

  const handleKeyDown = (e, idx, type) => {
    if (e.key === 'Backspace' && idx > 0 && ((type === 'register' && !secondPwd[idx]) || (type === 'confirm' && !confirmPwd[idx]))) {
      if (type === 'register') {
        inputRefs.current[idx - 1].focus();
      } else if (type === 'confirm') {
        confirmInputRefs.current[idx - 1].focus();
      }
    }
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
          <Title>신원 인증 등록</Title>
          <PhotoContainer>
            <CapturedImage src={photo} alt="Captured" />
          </PhotoContainer>
          <Label>2차 비밀번호 등록</Label>
          <PasswordInputContainer>
            {secondPwd.map((digit, idx) => (
              <PasswordInput
                key={idx}
                type='password'
                inputMode='numeric'
                value={digit}
                onChange={(e) => handlePwdChange(e, idx, 'register')}
                onKeyDown={(e) => handleKeyDown(e, idx, 'register')}
                maxLength={1}
                ref={(el) => (inputRefs.current[idx] = el)}
              />
            ))}
          </PasswordInputContainer>
          <Label>2차 비밀번호 확인</Label>
          <PasswordInputContainer>
            {confirmPwd.map((digit, idx) => (
              <PasswordInput
                key={idx}
                type="password"
                inputMode='numeric'
                value={digit}
                onChange={(e) => handlePwdChange(e, idx, 'confirm')}
                onKeyDown={(e) => handleKeyDown(e, idx, 'confirm')}
                maxLength={1}
                ref={(el) => (confirmInputRefs.current[idx] = el)}
              />
            ))}
          </PasswordInputContainer>
          {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
          <ButtonContainer>
            <UploadButton onClick={handleUploadClick} disabled={isUploading || errorMessage}>
              {isUploading ? '신원 인증 중...' : '등록하기'}
            </UploadButton>
            <RetryButton onClick={() => window.location.reload()}>재시도</RetryButton>
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

export default DisplayPhoto;

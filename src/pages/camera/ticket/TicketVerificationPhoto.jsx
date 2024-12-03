import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useRef } from 'react';
import { verifyTicketOwner } from '../../../api/camera';
import styled from 'styled-components';
import Modal from '../../../components/Modal';

function TicketVerificationPhoto() {
    const location = useLocation();
    const navigate = useNavigate();
    const { photo, ticketId } = location.state || {};
    const [secondPwd, setSecondPwd] = useState(['', '', '', '']);
    const [isUploading, setIsUploading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalTitle, setModalTitle] = useState('');
    const [modalMessage, setModalMessage] = useState('');
    const [modalNavigateTo, setModalNavigateTo] = useState(null);
    
    const inputRefs = useRef([]);

    const generateFileName = () => {
        const now = new Date();
        const timestamp = now.getFullYear().toString() +
            (now.getMonth() + 1).toString().padStart(2, '0') +
            now.getDate().toString().padStart(2, '0') +
            now.getHours().toString().padStart(2, '0') +
            now.getMinutes().toString().padStart(2, '0') +
            now.getSeconds().toString().padStart(2, '0');
        return `ticket-verification-${timestamp}.png`;
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
            await verifyTicketOwner(file, ticketId, fullPwd);
            setModalTitle('성공');
            setModalMessage('티켓 소유자 인증에 성공하였습니다!');
            setModalNavigateTo('/member/tickets');
        } catch (error) {
            console.error('Error during upload:', error);
            setModalTitle('실패');
            setModalMessage(error.response?.data?.message || '티켓 소유자 인증에 실패했습니다.');
            setModalNavigateTo(null);
        } finally {
            setIsUploading(false);
            setIsModalOpen(true);
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
        navigate(`/tickets/verify-owner/guide?ticketId=${ticketId}`);
    };

    const closeModal = () => {
        if (modalNavigateTo) {
            navigate(modalNavigateTo);
        }
        setIsModalOpen(false);
    };

    return (
        <PageContainer>
            {photo ? (
                <ContentContainer>
                    <Title>티켓 소유자 인증</Title>
                    <PhotoContainer>
                        <CapturedImage src={photo} alt="Captured" />
                    </PhotoContainer>
                    <PasswordContainer>
                        <Label>2차 비밀번호 입력</Label>
                        <PasswordInputContainer>
                            {secondPwd.map((digit, idx) => (
                                <PasswordInput
                                    key={idx}
                                    type="password"
                                    inputMode="numeric"
                                    value={digit}
                                    onChange={(e) => handlePwdChange(e, idx)}
                                    onKeyDown={(e) => handleKeyDown(e, idx)}
                                    maxLength={1}
                                    ref={(el) => (inputRefs.current[idx] = el)}
                                />
                            ))}
                        </PasswordInputContainer>
                    </PasswordContainer>
                    {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
                    <ButtonContainer>
                        <UploadButton onClick={handleUploadClick} disabled={isUploading}>
                            {isUploading ? '인증 중...' : '인증하기'}
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
    height: 100dvh;
    color: white;
`;

const Title = styled.div`
    color: #ffffff;
    font-size: larger;
    margin-bottom: 1rem;
`;

const ContentContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    width: 80%;
    min-height: 80vh;
    justify-content: space-between;
`;

const PhotoContainer = styled.div`
    width: 100%;
    height: 100%;
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

const PasswordContainer = styled.div`
    padding-top: 2rem;
`;

const PasswordInputContainer = styled.div`
    display: flex;
    justify-content: center;
    gap: 0.5rem;
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
    margin-top: 1rem;
`;

const UploadButton = styled.button`
    background-color: #2ea043;
    color: white;
    padding: 0.3rem 0;
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
    padding: 0.3rem 0;
    border: none;
    border-radius: 25px;
    font-size: 1rem;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: #e43a3d;
    }
`;

export default TicketVerificationPhoto; 
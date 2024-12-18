import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import styled from 'styled-components';
import HeaderBar from '../../components/Header';
import { verifyMember } from '../../api/admin';

function AdminMemberVerificationPhoto() {
    const location = useLocation();
    const navigate = useNavigate();
    const { photo, ticketId } = location.state || {};
    const [isUploading, setIsUploading] = useState(false);

    const handleUpload = async () => {
        if (!photo || !ticketId) {
            alert('사진이 없습니다.');
            return;
        }

        try {
            setIsUploading(true);
            const response = await fetch(photo);
            const blob = await response.blob();
            const file = new File([blob], `member-verification-${Date.now()}.png`, { type: 'image/png' });
            
            await verifyMember(ticketId, file);
            alert('신원 확인이 완료되었습니다.');
            navigate('/admin/qr');
        } catch (error) {
            console.error('신원 확인 실패:', error);
            alert('신원 확인에 실패했습니다.');
        } finally {
            setIsUploading(false);
        }
    };

    const handleRetry = () => {
        navigate(-1);
    };

    return (
        <>
            <HeaderBar />
            <PageContainer>
                {photo ? (
                    <ContentContainer>
                        <Title>촬영된 사진 확인</Title>
                        <PhotoContainer>
                            <CapturedImage src={photo} alt="Captured" />
                        </PhotoContainer>
                        <ButtonContainer>
                            <UploadButton 
                                onClick={handleUpload} 
                                disabled={isUploading}
                            >
                                {isUploading ? '처리 중...' : '신원 확인 완료'}
                            </UploadButton>
                            <RetryButton onClick={handleRetry}>
                                다시 촬영
                            </RetryButton>
                        </ButtonContainer>
                    </ContentContainer>
                ) : (
                    <ErrorMessage>사진이 없습니다.</ErrorMessage>
                )}
            </PageContainer>
        </>
    );
}

const PageContainer = styled.div`
    padding: 20px;
    background-color: #0d1117;
    min-height: 100vh;
    color: white;
`;

const ContentContainer = styled.div`
    max-width: 800px;
    margin: 0 auto;
    padding-top: 60px;
`;

const Title = styled.h1`
    text-align: center;
    margin-bottom: 2rem;
    font-size: 1.5rem;
`;

const PhotoContainer = styled.div`
    width: 100%;
    aspect-ratio: 4/3;
    background-color: #1c1f2b;
    border-radius: 10px;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const CapturedImage = styled.img`
    width: 100%;
    height: 100%;
    object-fit: contain;
`;

const ButtonContainer = styled.div`
    display: flex;
    gap: 1rem;
    margin-top: 2rem;
`;

const Button = styled.button`
    flex: 1;
    padding: 1rem;
    border: none;
    border-radius: 25px;
    font-size: 1rem;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:disabled {
        opacity: 0.7;
        cursor: not-allowed;
    }
`;

const UploadButton = styled(Button)`
    background-color: #1f6feb;
    color: white;

    &:hover:not(:disabled) {
        background-color: #388bfd;
        transform: translateY(-1px);
    }

    &:active {
        transform: translateY(1px);
    }
`;

const RetryButton = styled(Button)`
    background-color: #21262d;
    color: #c9d1d9;

    &:hover {
        background-color: #30363d;
        transform: translateY(-1px);
    }

    &:active {
        transform: translateY(1px);
    }
`;

const ErrorMessage = styled.p`
    text-align: center;
    color: #ff4d4f;
    font-size: 1.2rem;
    margin-top: 2rem;
`;

export default AdminMemberVerificationPhoto; 
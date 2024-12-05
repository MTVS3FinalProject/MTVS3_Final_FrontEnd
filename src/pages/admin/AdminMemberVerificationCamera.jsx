import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useRef } from 'react';
import styled from 'styled-components';
import HeaderBar from '../../components/Header';

function AdminMemberVerificationCamera() {
    const location = useLocation();
    const navigate = useNavigate();
    const { ticketId } = location.state || {};
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const streamRef = useRef(null);

    const startCamera = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: { facingMode: 'environment' }
            });
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
            }
            streamRef.current = stream;
        } catch (error) {
            console.error('카메라 접근 실패:', error);
            alert('카메라에 접근할 수 없습니다.');
        }
    };

    const stopCamera = () => {
        if (streamRef.current) {
            streamRef.current.getTracks().forEach(track => track.stop());
        }
    };

    const capturePhoto = () => {
        const video = videoRef.current;
        const canvas = canvasRef.current;

        if (video && canvas) {
            const context = canvas.getContext('2d');
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            context.drawImage(video, 0, 0, canvas.width, canvas.height);

            const photo = canvas.toDataURL('image/png');
            stopCamera();
            navigate('/admin/member/verification/photo', { 
                state: { 
                    photo,
                    ticketId 
                } 
            });
        }
    };

    const handleCancel = () => {
        stopCamera();
        navigate(-1);
    };

    useState(() => {
        startCamera();
        return () => stopCamera();
    }, []);

    return (
        <>
            <HeaderBar />
            <PageContainer>
                <ContentContainer>
                    <Title>회원 신원 확인</Title>
                    <CameraSection>
                        <CameraView>
                            <Video ref={videoRef} autoPlay playsInline />
                        </CameraView>
                        <canvas ref={canvasRef} style={{ display: 'none' }} />
                    </CameraSection>
                    <ButtonContainer>
                        <CaptureButton onClick={capturePhoto}>
                            사진 촬영
                        </CaptureButton>
                        <CancelButton onClick={handleCancel}>
                            취소
                        </CancelButton>
                    </ButtonContainer>
                </ContentContainer>
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

const CameraSection = styled.div`
    margin-bottom: 2rem;
`;

const CameraView = styled.div`
    width: 100%;
    aspect-ratio: 4/3;
    background: #1c1f2b;
    border-radius: 10px;
    overflow: hidden;
`;

const Video = styled.video`
    width: 100%;
    height: 100%;
    object-fit: cover;
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

const CaptureButton = styled(Button)`
    background-color: #2ea043;
    color: white;

    &:hover:not(:disabled) {
        background-color: #2c974b;
    }
`;

const CancelButton = styled(Button)`
    background-color: #ff4d4f;
    color: white;

    &:hover {
        background-color: #e43a3d;
    }
`;

export default AdminMemberVerificationCamera; 
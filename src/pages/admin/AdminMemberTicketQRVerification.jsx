import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Html5QrcodeScanner } from 'html5-qrcode';
import HeaderBar from '../../components/Header';
import styled from 'styled-components';

const AdminMemberTicketQRVerification = () => {
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const scanner = new Html5QrcodeScanner('reader', {
            qrbox: {
                width: 250,
                height: 250,
            },
            fps: 5,
        });

        const success = async (decodedText) => {
            try {
                const url = new URL(decodedText);
                const ticketId = url.searchParams.get('ticketId');

                if (!ticketId) {
                    setError('유효하지 않은 QR 코드입니다.');
                    return;
                }

                // 회원 신원 확인 카메라 페이지로 이동
                scanner.clear();
                navigate('/admin/member/verification/camera', { 
                    state: { ticketId } 
                });
            } catch (err) {
                console.error('Error:', err);
                setError(err.message || '회원 정보 확인 중 오류가 발생했습니다.');
            }
        };

        const error = (err) => {
            console.warn(err);
        };

        scanner.render(success, error);

        return () => {
            scanner.clear();
        };
    }, [navigate]);

    return (
        <>
            <HeaderBar />
            <Container>
                <Title>회원 신원 확인</Title>
                <SubTitle>회원의 QR 코드를 스캔해주세요</SubTitle>
                <div id="reader"></div>
                {error && <ErrorMessage>{error}</ErrorMessage>}
            </Container>
        </>
    );
};

const Container = styled.div`
    padding: 20px;
    background-color: #0d1117;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    #reader {
        width: 100%;
        max-width: 600px;
        background: white;
        padding: 20px;
        border-radius: 10px;
    }

    #reader video {
        border-radius: 10px;
    }
`;

const Title = styled.h1`
    color: white;
    margin-bottom: 1rem;
    font-size: 1.5rem;
`;

const SubTitle = styled.p`
    color: #666;
    margin-bottom: 2rem;
    font-size: 1rem;
`;

const ErrorMessage = styled.div`
    margin-top: 20px;
    color: #ff4d4f;
    text-align: center;
    font-size: 1rem;
`;

export default AdminMemberTicketQRVerification; 
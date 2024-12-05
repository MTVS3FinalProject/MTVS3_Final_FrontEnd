import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { verifyTicket } from '../../api/admin/ticket';
import HeaderBar from '../../components/Header';
import styled from 'styled-components';

const QRCodeReader = () => {
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const scannerRef = useRef(null);

    useEffect(() => {
        if (scannerRef.current) return;

        scannerRef.current = new Html5QrcodeScanner('reader', {
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
                const type = url.pathname.includes('member/verification') ? 'member' : 'ticket';

                if (!ticketId) {
                    setError('유효하지 않은 QR 코드입니다.');
                    return;
                }

                if (type === 'member') {
                    scannerRef.current?.clear();
                    navigate('/admin/member/verification/camera', { 
                        state: { ticketId } 
                    });
                } else {
                    const response = await verifyTicket(ticketId);
                    scannerRef.current?.clear();
                    navigate('/admin/ticket/info', { state: response });
                }
            } catch (err) {
                console.error('Error:', err);
                setError(err.message || 'QR 코드 확인 중 오류가 발생했습니다.');
            }
        };

        const error = (err) => {
            console.warn(err);
        };

        scannerRef.current.render(success, error);

        return () => {
            if (scannerRef.current) {
                scannerRef.current.clear();
                scannerRef.current = null;
            }
        };
    }, [navigate]);

    return (
        <>
            <HeaderBar />
            <Container>
                <Title>QR 코드 스캔</Title>
                <SubTitle>QR 코드를 스캔해주세요</SubTitle>
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
    text-align: center;
    line-height: 1.5;
`;

const ErrorMessage = styled.div`
    margin-top: 20px;
    color: #ff4d4f;
    text-align: center;
    font-size: 1rem;
`;

export default QRCodeReader;

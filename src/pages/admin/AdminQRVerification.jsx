import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { verifyTicket } from '../../api/admin/ticket';
import HeaderBar from '../../components/Header';
import styled from 'styled-components';

const QRCodeReader = () => {
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

                const response = await verifyTicket(ticketId);
                scanner.clear();
                navigate('/admin/ticket/info', { state: response });
            } catch (err) {
                console.error('Error:', err);
                setError(err.message || '티켓 확인 중 오류가 발생했습니다.');
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

const ErrorMessage = styled.div`
    margin-top: 20px;
    color: #ff4d4f;
    text-align: center;
    font-size: 1rem;
`;

export default QRCodeReader;

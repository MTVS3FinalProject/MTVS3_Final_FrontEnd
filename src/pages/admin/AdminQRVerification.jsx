import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Html5Qrcode } from 'html5-qrcode';
import { verifyTicket } from '../../api/admin/ticket';
import HeaderBar from '../../components/Header';
import styled from 'styled-components';

const QRCodeReader = () => {
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const qrRef = useRef(null);

    useEffect(() => {
        let html5QrCode = null;

        const startScanner = async () => {
            try {
                const readerElement = document.getElementById('reader');
                if (!readerElement) {
                    throw new Error('스캐너 요소를 찾을 수 없습니다.');
                }

                html5QrCode = new Html5Qrcode("reader");
                qrRef.current = html5QrCode;

                const devices = await Html5Qrcode.getCameras();
                if (!devices || devices.length === 0) {
                    throw new Error('카메라를 찾을 수 없습니다.');
                }

                // 후면 카메라 찾기
                const rearCamera = devices.find(device => 
                    device.label.toLowerCase().includes('back') || 
                    device.label.toLowerCase().includes('rear') ||
                    device.label.toLowerCase().includes('환경')
                );
                const cameraId = rearCamera ? rearCamera.id : devices[0].id;

                await html5QrCode.start(
                    cameraId,
                    {
                        fps: 10,
                        qrbox: { width: 250, height: 250 }
                    },
                    async (decodedText) => {
                        try {
                            const url = new URL(decodedText);
                            const ticketId = url.searchParams.get('ticketId');
                            const type = url.pathname.includes('member/verification') ? 'member' : 'ticket';

                            if (!ticketId) {
                                setError('유효하지 않은 QR 코드입니다.');
                                return;
                            }

                            if (html5QrCode && html5QrCode.isScanning) {
                                await html5QrCode.stop();
                            }

                            if (type === 'member') {
                                navigate('/admin/member/verification/camera', { 
                                    state: { ticketId } 
                                });
                            } else {
                                const response = await verifyTicket(ticketId);
                                navigate('/admin/ticket/info', { state: response });
                            }
                        } catch (err) {
                            console.error('Error:', err);
                            setError(err.message || 'QR 코드 확인 중 오류가 발생했습니다.');
                        }
                    },
                    (error) => {
                        console.warn(error);
                    }
                );
            } catch (err) {
                console.error("Error starting scanner:", err);
                setError('카메라 사용 중');
            }
        };

        // DOM이 준비된 후 스캐너 시작
        setTimeout(startScanner, 1000);

        return () => {
            if (qrRef.current && qrRef.current.isScanning) {
                qrRef.current.stop()
                    .catch(console.error)
                    .finally(() => {
                        qrRef.current = null;
                    });
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

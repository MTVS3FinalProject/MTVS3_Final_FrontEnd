import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import CaptureTicketVerificationPhoto from './CaptureTicketVerificationPhoto';

function TicketVerificationCamera() {
    const location = useLocation();
    const [ticketId, setTicketId] = useState('');
    const [isReadyToCapture, setIsReadyToCapture] = useState(false);

    useEffect(() => {
        const { ticketId: locationTicketId } = location.state || {};
        if (locationTicketId) {
            setTicketId(locationTicketId);
        }
    }, [location]);

    useEffect(() => {
        if (ticketId) {
            const timer = setTimeout(() => {
                setIsReadyToCapture(true);
            }, 1000);

            return () => clearTimeout(timer);
        }
    }, [ticketId]);

    return (
        <PageContainer>
            <MainContent>
                <Title>티켓 소유자 인증</Title>
                {isReadyToCapture && ticketId ? (
                    <CaptureTicketVerificationPhoto ticketId={ticketId} />
                ) : (
                    <LoadingText>Loading..</LoadingText>
                )}
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

export default TicketVerificationCamera; 
import { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const TicketModal = ({ ticketDetails, loading, onClose }) => {
    const [isFlipped, setIsFlipped] = useState(false); // 플립 상태 관리

    const handleFlip = () => {
        setIsFlipped(!isFlipped);
    };

    return (
        <ModalBackground onClick={onClose}>
            <ModalContent onClick={(e) => e.stopPropagation()}>
                {loading ? (
                    <LoadingText>Loading ticket details...</LoadingText>
                ) : (
                    <TicketWrapper onClick={handleFlip}>
                        <TicketInner $isFlipped={isFlipped}>
                            {/* 티켓 앞면 */}
                            <TicketFront>
                                <TicketImage src={ticketDetails.ticketImage} alt="Ticket Image" />
                            </TicketFront>
                            {/* 티켓 뒷면 */}
                            <TicketBack backgroundImage={ticketDetails.backgroundImage}>
                                <ConcertInfo>
                                    <p>{ticketDetails.seatInfo}</p>
                                    <QRCodeImage src={ticketDetails.qrImage} alt="QR Code" />
                                </ConcertInfo>
                            </TicketBack>
                        </TicketInner>
                    </TicketWrapper>
                )}
            </ModalContent>
        </ModalBackground>
    );
};

// PropTypes 정의
TicketModal.propTypes = {
    ticketDetails: PropTypes.shape({
        ticketImage: PropTypes.string.isRequired,
        concertName: PropTypes.string.isRequired,
        year: PropTypes.number.isRequired,
        month: PropTypes.number.isRequired,
        day: PropTypes.number.isRequired,
        time: PropTypes.string.isRequired,
        seatInfo: PropTypes.string.isRequired,
        qrImage: PropTypes.string.isRequired,
        backgroundImage: PropTypes.string.isRequired, // backgroundImage 추가
    }).isRequired,
    loading: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
};

// Styled components
const ModalBackground = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
`;

const ModalContent = styled.div`
    background: transparent;
    width: 90%;
    height: 90%;
    perspective: 1000px; /* 3D 효과를 위한 원근감 */
`;

const TicketWrapper = styled.div`
    width: 100%;
    height: 100%;
    cursor: pointer;
`;

const TicketInner = styled.div`
    width: 100%;
    height: 100%;
    position: relative;
    transform-style: preserve-3d;
    transition: transform 0.6s;
    transform: ${({ $isFlipped }) => ($isFlipped ? 'rotateY(180deg)' : 'none')}; /* $isFlipped 사용 */
`;

const TicketFront = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
`;

const TicketBack = styled.div`
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
    transform: rotateY(180deg);
    background-image: url(${(props) => props.backgroundImage}); /* backgroundImage prop 사용 */
    background-size: contain; /* 배경 이미지를 티켓 크기에 맞춤 */
    background-position: center; /* 배경 위치를 중앙으로 설정 */
    background-repeat: no-repeat; /* 배경 반복 방지 */
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative; /* QRCodeImage의 위치 설정을 위한 기준 */
`;

const TicketImage = styled.img`
    width: 100%;
    height: auto;
`;

const QRCodeImage = styled.img`
    width: 20%;
    height: 20%;
    margin-top: 1rem;
    align-items: right;
`;

const ConcertInfo = styled.div`
    p {
        font-size: 1rem;
        margin: 0.5rem 0;
    }
    
`;

const LoadingText = styled.p`
    font-size: 1.2rem;
    color: #fff;
`;

export default TicketModal;

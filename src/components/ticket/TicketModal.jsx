import { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import QrModal from './QRModal';

const TicketModal = ({ ticketDetails, loading, onClose }) => {
    const [isFlipped, setIsFlipped] = useState(false); // 플립 상태 관리
    const [showQrModal, setShowQrModal] = useState(false); // QR 모달 상태

    const handleFlip = () => {
        setIsFlipped(!isFlipped);
    };

    const handleQrClick = () => {
        setShowQrModal(true);
    };

    const closeQrModal = () => {
        setShowQrModal(false);
    };

    return (
        <>
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
                                        <p>
                                            {`${ticketDetails.year}/${ticketDetails.month}/${ticketDetails.day} ${ticketDetails.time}`}
                                        </p>
                                        <div className="seat-info">
                                            <SeatInfo>{ticketDetails.seatInfo}</SeatInfo>
                                        </div>
                                        <QRCodeImage
                                            src={ticketDetails.qrImage}
                                            alt="QR Code"
                                            onClick={handleQrClick} // QR 클릭 이벤트
                                        />
                                    </ConcertInfo>
                                </TicketBack>
                            </TicketInner>
                        </TicketWrapper>
                    )}
                </ModalContent>
            </ModalBackground>

            {/* QR 모달 */}
            {showQrModal && (
                <QrModal
                    qrImage={ticketDetails.qrImage}
                    onClose={closeQrModal}
                />
            )}
        </>
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

export default TicketModal;

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
    width: 19.5%;
    align-self: flex-end; /* QR 코드를 오른쪽으로 정렬 */
    position: absolute; /* 위치를 절대값으로 조정 */
    right: 2.5rem; /* 오른쪽에서 조금 띄움 */
    top: 5.4rem;
    cursor: pointer; /* 클릭 가능 */
`;

const ConcertInfo = styled.div`
    display: flex;
    flex-direction: column; /* 요소를 세로로 배치 */
    justify-content: center;
    align-items: center;
    width: 100%; /* 부모 요소 전체 사용 */
    position: relative; /* QR 코드 위치 조정을 위해 부모 요소를 relative로 설정 */
    gap: 1rem;
    padding-bottom: 1rem;
    p {
        font-size: 0.84rem;
        text-align: center;
    }
    /* Seat와 QR 코드 조정을 위한 추가 스타일 */
    .seat-info {
        display: flex;
        justify-content: center;
        width: 100%;
    }
`;

const SeatInfo = styled.span`
    padding-top: 0.5rem;
    text-align: left; /* 텍스트 왼쪽 정렬 */
`;

const LoadingText = styled.p`
    font-size: 1.2rem;
    color: #fff;
`;

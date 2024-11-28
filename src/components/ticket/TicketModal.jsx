import { useState } from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes, css } from 'styled-components';
import QrModal from './QRModal';

const TicketModal = ({ ticketDetails, loading, onClose }) => {
    const [isFlipped, setIsFlipped] = useState(false); // 플립 상태 관리
    const [showQrModal, setShowQrModal] = useState(false); // QR 모달 상태
    const [isAnimating, setIsAnimating] = useState(ticketDetails.isUsed); // 애니메이션 상태

    const handleFlip = () => {
        if (!showQrModal) {
            setIsFlipped(!isFlipped);
        }
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
                                    <TicketContainer>
                                        {/* 상단 부분 */}
                                        <TicketTop src={ticketDetails.ticketImage} />
                                        {/* 하단 부분 */}
                                        <TicketBottom
                                            src={ticketDetails.ticketImage}
                                            $isAnimating={isAnimating} // 애니메이션 상태 전달
                                        />
                                    </TicketContainer>
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
                                            onClick={handleQrClick}
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
        backgroundImage: PropTypes.string.isRequired,
        isUsed: PropTypes.bool.isRequired,
    }).isRequired,
    loading: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default TicketModal;

// Styled components

// 하단 뜯기 애니메이션 정의
const tearAnimation = keyframes`
    0% {
        clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%); /* 하단 전체 표시 */
    }
    100% {
        clip-path: polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%); /* 오른쪽에서 왼쪽으로 제거 */
    }
`;

// 티켓 전체 컨테이너
const TicketContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
`;

// 상단 이미지
const TicketTop = styled.div`
    width: 100%;
    height: 75%; /* 상단 70% */
    background-image: url(${(props) => props.src});
    background-size: cover;
    background-position: top;
    background-repeat: no-repeat;
`;

// 하단 이미지
const TicketBottom = styled.div`
    width: 100%;
    height: 2%; /* 하단 30% */
    background-image: url(${(props) => props.src});
    background-size: cover;
    background-position: bottom;
    background-repeat: no-repeat;

    ${({ $isAnimating }) =>
        $isAnimating &&
        css`
            animation: ${tearAnimation} 1s ease-in-out forwards; /* 애니메이션 적용 */
        `}
`;

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
    perspective: 1000px;
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
    transform: ${({ $isFlipped }) => ($isFlipped ? 'rotateY(180deg)' : 'none')};
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
    background-image: url(${(props) => props.backgroundImage});
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
`;

const QRCodeImage = styled.img`
    width: 19.5%;
    align-self: flex-end;
    position: absolute;
    right: 2.5rem;
    top: 5.4rem;
    cursor: pointer;
`;

const ConcertInfo = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    position: relative;
    gap: 1rem;
    padding-bottom: 1rem;
    p {
        font-size: 0.84rem;
        text-align: center;
    }
    .seat-info {
        display: flex;
        justify-content: center;
        width: 100%;
    }
`;

const SeatInfo = styled.span`
    padding-top: 0.5rem;
    text-align: left;
`;

const LoadingText = styled.p`
    font-size: 1.2rem;
    color: #fff;
`;

import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import QrModal from './QRModal';
import { useLocation } from 'react-router-dom';

const TicketModal = ({ ticketDetails, loading, onClose }) => {
    const [isFlipped, setIsFlipped] = useState(false); // 플립 상태 관리
    const [showQrModal, setShowQrModal] = useState(false); // QR 모달 상태
    const location = useLocation();

    // 인증 성공 후 돌아왔을 때만 QR Modal 자동으로 열기
    useEffect(() => {
        if (location.state?.showQR && location.state?.ticketId === ticketDetails.ticketId) {
            setShowQrModal(true);
            window.history.replaceState({}, document.title);
        }
    }, [location.state, ticketDetails.ticketId]);

    const handleFlip = () => {
        if (!showQrModal) {
            setIsFlipped(!isFlipped);
        }
    };

    const handleQrClick = (e) => {
        e.stopPropagation();  // 이벤트 버블링 방지
        setShowQrModal(true);  // 항상 모달은 열되, QRModal 내부에서 조건에 따라 다른 내용 표시
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
                                        <Ticket src={ticketDetails.ticketImage} />
                                    </TicketContainer>
                                </TicketFront>
                                {/* 티켓 뒷면 */}
                                <TicketBack>
                                    <BackgroundImage $backgroundImage={ticketDetails.backgroundImage} $isUsed={ticketDetails.isUsed} />
                                    {ticketDetails.isUsed && (
                                        <Overlay>
                                            <CheckMark>✔</CheckMark>
                                            <UsedText>사용된 티켓입니다.</UsedText>
                                        </Overlay>
                                    )}
                                    <ConcertInfo $isUsed={ticketDetails.isUsed}>
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
                                            $isVerified={ticketDetails.isVerified}
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
                    ticketId={ticketDetails.ticketId}
                    onClose={closeQrModal}
                    isVerified={ticketDetails.isVerified}
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
        ticketId: PropTypes.string.isRequired,
        isVerified: PropTypes.bool.isRequired,
    }).isRequired,
    loading: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default TicketModal;

// 티켓 전체 컨테이너
const TicketContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

// 상단 이미지
const Ticket = styled.div`
    width: 100%;
    height: 100%;
    background-image: url(${(props) => props.src});
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
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
    transform: rotateY(0deg);
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
`;

const TicketBack = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
    transform: rotateY(180deg);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const BackgroundImage = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url(${props => props.$backgroundImage});
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    filter: ${props => props.$isUsed ? 'grayscale(50%) brightness(0.7) blur(2px)' : 'none'};
`;

const QRCodeImage = styled.img`
    width: 19.5%;
    align-self: flex-end;
    position: absolute;
    right: 2.5rem;
    top: 5.4rem;
    cursor: pointer;
    filter: ${props => !props.$isVerified ? 'blur(5px)' : 'none'};
    transition: filter 0.3s ease;

    &:hover {
        filter: ${props => !props.$isVerified ? 'blur(3px)' : 'none'};
    }
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
    opacity: ${props => props.$isUsed ? 0.5 : 1};
    filter: ${props => props.$isUsed ? 'blur(1px)' : 'none'};
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

const Overlay = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1;
    filter: none !important;
    backdrop-filter: none;
    transform: translateZ(0);
`;

const CheckMark = styled.div`
    font-size: 3rem;
    color: #4caf50;
    filter: none !important;
    backdrop-filter: none;
    transform: translateZ(0);
`;

const UsedText = styled.p`
    margin-top: 1rem;
    font-size: 1.2rem;
    color: #fff;
    font-weight: bold;
    filter: none !important;
    backdrop-filter: none;
    transform: translateZ(0);
`;

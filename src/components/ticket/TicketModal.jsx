import { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import QrModal from './QRModal';

const TicketModal = ({ ticketDetails, loading, onClose }) => {
    const [isFlipped, setIsFlipped] = useState(false); // 플립 상태 관리
    const [showQrModal, setShowQrModal] = useState(false); // QR 모달 상태

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
                                        <Ticket src={ticketDetails.ticketImage} />
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
    background-color: #1a1a1a;
`;

const TicketBack = styled.div`
    position: absolute;
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

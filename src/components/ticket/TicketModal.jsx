import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useState } from 'react';

const TicketModal = ({ ticket, onClose }) => {
    if (!ticket) return null;

    const [isFlipped, setIsFlipped] = useState(false);

    // Convert byte array string to base64
    const getBase64Image = (byteArrayString) => {
        return `data:image/png;base64,${byteArrayString}`;
    };

    const handleFlip = () => {
        setIsFlipped(!isFlipped);
    };

    return (
        <ModalOverlay onClick={onClose}>
            <ModalContent onClick={(e) => e.stopPropagation()}>
                <FlippableContainer onClick={handleFlip} isFlipped={isFlipped}>
                    <FlippableCard isFlipped={isFlipped}>
                        <FrontFace>
                            <TicketImage src={getBase64Image(ticket.ticketImage)} alt="Ticket Image" />
                        </FrontFace>
                        <BackFace>
                            <InfoContainer>
                                <ConcertInfo>{`Concert: ${ticket.concertInfo.concertName}`}</ConcertInfo>
                                <DateTimeInfo>{`${ticket.concertInfo.year}/${ticket.concertInfo.month}/${ticket.concertInfo.day} ${ticket.concertInfo.time}`}</DateTimeInfo>
                                <SeatInfo>{`Seat: ${ticket.seatInfo}`}</SeatInfo>
                                <QRCodeImage src={getBase64Image(ticket.qrImage)} alt="QR Code" />
                            </InfoContainer>
                        </BackFace>
                    </FlippableCard>
                </FlippableContainer>
            </ModalContent>
        </ModalOverlay>
    );
};

TicketModal.propTypes = {
    ticket: PropTypes.shape({
        ticketImage: PropTypes.string.isRequired, 
        barcodeImage: PropTypes.string, 
        qrImage: PropTypes.string,
        concertInfo: PropTypes.shape({
            concertName: PropTypes.string,
            year: PropTypes.number,
            month: PropTypes.number,
            day: PropTypes.number,
            time: PropTypes.string
        }).isRequired,
        seatInfo: PropTypes.string
    }).isRequired,
    onClose: PropTypes.func.isRequired
};

// Styled components for flipping effect
const FlippableContainer = styled.div`
    perspective: 1000px;
    width: 100%;
    height: 100%;
`;

const FlippableCard = styled.div`
    width: 100%;
    height: 100%;
    transition: transform 0.6s;
    transform-style: preserve-3d;
    transform: ${({ isFlipped }) => (isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)')};
    position: relative;
`;

const CardFace = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const FrontFace = styled(CardFace)``;

const BackFace = styled(CardFace)`
    transform: rotateY(180deg);
`;

const InfoContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 1rem;
    color: #fff;
`;

const ConcertInfo = styled.p`
    font-size: 1.2rem;
    margin-bottom: 0.5rem;
`;

const DateTimeInfo = styled.p`
    font-size: 1rem;
    margin-bottom: 0.5rem;
`;

const SeatInfo = styled.p`
    font-size: 1rem;
    margin-bottom: 0.5rem;
`;

const QRCodeImage = styled.img`
    width: 100px;
    height: 100px;
`;

const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    align-items: center;
    justify-content: center;
`;

const ModalContent = styled.div`
    background: #0d1117;
    border-radius: 8px;
    width: 80vw;
    height: 80vh;
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    overflow: hidden;
`;

const TicketImage = styled.img`
    max-height: 90%;
    max-width: 90%;
`;

export default TicketModal;

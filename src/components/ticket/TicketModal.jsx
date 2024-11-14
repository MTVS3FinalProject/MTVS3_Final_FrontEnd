import PropTypes from 'prop-types';
import styled from 'styled-components';

const TicketModal = ({ ticket, onClose }) => {
    if (!ticket) return null;

    // Convert byte array string to base64
    const getBase64Image = (byteArrayString) => {
        return `data:image/png;base64,${byteArrayString}`;
    };

    return (
        <ModalOverlay onClick={onClose}>
            <ModalContent onClick={(e) => e.stopPropagation()}>
                <ImageContainer>
                    <TicketImage src={getBase64Image(ticket.ticketImage)} alt="Ticket Image" />
                    <BarcodeImage src={ticket.barcodeImage} alt="Barcode Image" />
                </ImageContainer>
            </ModalContent>
        </ModalOverlay>
    );
};

TicketModal.propTypes = {
    ticket: PropTypes.shape({
        ticketImage: PropTypes.string.isRequired, 
        barcodeImage: PropTypes.string 
    }).isRequired,
    onClose: PropTypes.func.isRequired
};

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
    flex-direction: column;
    align-items: center;
    justify-content: center; 
    box-sizing: border-box; 
    overflow: hidden; 
`;

const ImageContainer = styled.div`
    display: flex;
    flex-direction: column; 
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
`;

const TicketImage = styled.img`
    max-height: 100%;
    rotate: calc(90deg);
    transform-origin: center center;
`;

const BarcodeImage = styled.img`
    max-width: 100%;
    height: auto;
    object-fit: contain; 
`;

export default TicketModal;

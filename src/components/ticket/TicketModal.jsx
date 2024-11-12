import PropTypes from 'prop-types';
import styled from 'styled-components';

const TicketModal = ({ ticket, onClose }) => {
    if (!ticket) return null; 

    return (
        <ModalOverlay onClick={onClose}>
            <ModalContent onClick={(e) => e.stopPropagation()}>
                <TicketImage src={ticket.ticketImage} alt="Ticket Image" />
                <BarcodeImage src={ticket.barcodeImage} alt="Barcode Image" />
                <CloseButton onClick={onClose}>Close</CloseButton>
            </ModalContent>
        </ModalOverlay>
    );
};

TicketModal.propTypes = {
    ticket: PropTypes.shape({
        ticketImage: PropTypes.string.isRequired,
        barcodeImage: PropTypes.string.isRequired
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
    background: #ffffff;
    padding: 20px;
    border-radius: 8px;
    max-width: 90%;
    max-height: 80%;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const TicketImage = styled.img`
    width: 80%;
    height: auto;
    margin-bottom: 1rem;
`;

const BarcodeImage = styled.img`
    width: 70%;
    height: auto;
    margin-bottom: 1rem;
`;

const CloseButton = styled.button`
    padding: 0.5rem 1rem;
    background: #e63946;
    color: #ffffff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    &:hover {
        background: #d62839;
    }
`;

export default TicketModal;

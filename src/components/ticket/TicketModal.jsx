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
                    {ticket.barcodeImage && <BarcodeImage src={ticket.barcodeImage} alt="Barcode Image" />} {/* Conditional Rendering */}
                </ImageContainer>
            </ModalContent>
        </ModalOverlay>
    );
};

TicketModal.propTypes = {
    ticket: PropTypes.shape({
        ticketImage: PropTypes.string.isRequired, // Expecting byte[] as a base64 string
        barcodeImage: PropTypes.string // Optional
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
    padding: 20px;
    border-radius: 8px;
    width: 70vw; 
    height: 70vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center; /* 수직 및 수평 중앙 정렬 */
    box-sizing: border-box; /* 패딩 포함한 너비 계산 */
    overflow: hidden; /* 스크롤을 없앰 */
`;

const ImageContainer = styled.div`
    display: flex;
    flex-direction: column; /* 이미지들을 세로로 배치 */
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    gap: 1rem; /* 이미지 간의 간격 */
`;

const TicketImage = styled.img`
    max-width: 100%;
    max-height: 100%;
    width: auto;
    height: auto;
    transform: rotate(90deg);
`;

const BarcodeImage = styled.img`
    max-width: 100%;
    max-height: 100%;
    width: auto;
    height: auto;
    transform: rotate(90deg);
`;

export default TicketModal;

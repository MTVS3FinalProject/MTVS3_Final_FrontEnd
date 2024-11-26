import PropTypes from 'prop-types';
import styled from 'styled-components';

const QrModal = ({ qrImage, onClose }) => (
    <ModalBackground onClick={onClose}>
        <ModalContent onClick={(e) => e.stopPropagation()}>
        <QrImage src={qrImage} alt="QR Code" />
        </ModalContent>
    </ModalBackground>
);

QrModal.propTypes = {
    qrImage: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default QrModal;

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
    background: #fff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    display: flex;
    justify-content: center;
    align-items: center;
`;

const QrImage = styled.img`
    width: 80%;
    height: auto;
    max-width: 400px;
    border: 5px solid #fff;
    border-radius: 10px;
`;

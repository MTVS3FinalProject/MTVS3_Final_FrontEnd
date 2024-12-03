import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const QrModal = ({ qrImage, ticketId, onClose, isVerified }) => {
    const navigate = useNavigate();

    console.log(isVerified);
    
    const handleVerification = () => {
        navigate(`/member/tickets/verification/guide?ticketId=${ticketId}`);
    };

    return (
        <ModalBackground onClick={onClose}>
            <ModalContent onClick={(e) => e.stopPropagation()}>
                {isVerified && qrImage ? (
                    <QrImage src={qrImage} alt="QR Code" />
                ) : (
                    <VerificationContainer>
                        <VerificationMessage>
                            티켓 사용을 위해 얼굴 인증이 필요합니다
                        </VerificationMessage>
                        <VerifyButton onClick={handleVerification}>
                            얼굴 인증하기
                        </VerifyButton>
                    </VerificationContainer>
                )}
            </ModalContent>
        </ModalBackground>
    );
};

QrModal.propTypes = {
    qrImage: PropTypes.string,
    ticketId: PropTypes.number.isRequired,
    onClose: PropTypes.func.isRequired,
    isVerified: PropTypes.bool,
};

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
    z-index: 1000;
`;

const ModalContent = styled.div`
    background: #1a1a1a;
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
    animation: fadeIn 0.5s ease-in;

    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: scale(0.9);
        }
        to {
            opacity: 1;
            transform: scale(1);
        }
    }
`;

const VerificationContainer = styled.div`
    padding: 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
`;

const VerificationMessage = styled.p`
    color: #ffffff;
    font-size: 1.1rem;
    text-align: center;
`;

const VerifyButton = styled.button`
    background-color: #2ea043;
    color: white;
    padding: 0.8rem 1.5rem;
    border: none;
    border-radius: 25px;
    font-size: 1rem;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: #2c974b;
    }
`;

export default QrModal;

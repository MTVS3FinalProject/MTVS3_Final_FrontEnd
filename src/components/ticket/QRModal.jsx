import PropTypes from 'prop-types';
import styled from 'styled-components';
import { QRCodeSVG } from 'qrcode.react';

const QrModal = ({ qrImage, ticketId, onClose, isVerified }) => {

    const verificationQrData = `${window.location.origin}/admin/ticket/member/verification?ticketId=${ticketId}`;

    return (
        <ModalBackground onClick={onClose}>
            <ModalContent onClick={(e) => e.stopPropagation()}>
                {isVerified ? (
                    <QrImage src={qrImage} alt="QR Code" />
                ) : (
                    <VerificationContainer>
                        <VerificationMessage>
                            관리자에게 QR코드를 보여주세요
                        </VerificationMessage>
                        <QRCodeWrapper>
                            <QRCodeSVG 
                                value={verificationQrData}
                                size={200}
                                level="H"
                                includeMargin={true}
                                style={{ background: 'white', padding: '10px' }}
                            />
                        </QRCodeWrapper>
                        <VerificationGuide>
                            관리자가 QR코드를 스캔하여 신원을 확인할 것입니다
                        </VerificationGuide>
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

const QRCodeWrapper = styled.div`
    margin: 20px 0;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const VerificationGuide = styled.p`
    color: #666;
    font-size: 0.9rem;
    margin-top: 1rem;
    text-align: center;
`;

export default QrModal;

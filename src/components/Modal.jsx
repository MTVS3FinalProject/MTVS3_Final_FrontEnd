import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

function Modal({ isOpen, onClose, title, message, navigateTo }) {
    const navigate = useNavigate();

    if (!isOpen) return null;

    const handleButtonClick = () => {
        if (navigateTo) {
            navigate(navigateTo); // 특정 페이지로 이동
        } else {
            onClose(); // 단순히 모달 닫기
        }
    };

    return (
        <ModalOverlay>
            <ModalContent>
                <ModalTitle>{title}</ModalTitle>
                <ModalMessage>{message}</ModalMessage>
                <CloseButton onClick={handleButtonClick}>
                    {navigateTo ? '이동하기' : '확인'}
                </CloseButton>
            </ModalContent>
        </ModalOverlay>
    );
}

Modal.propTypes = {
    isOpen: PropTypes.bool.isRequired, // isOpen은 반드시 boolean 값이어야 함
    onClose: PropTypes.func.isRequired, // onClose는 반드시 함수여야 함
    title: PropTypes.string.isRequired, // title은 반드시 문자열이어야 함
    message: PropTypes.string.isRequired, // message는 반드시 문자열이어야 함
    navigateTo: PropTypes.string, // 특정 페이지로 이동하기 위한 URL (옵션)
};

const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
`;

const ModalContent = styled.div`
    background: #1c1f2b;
    padding: 2rem;
    border-radius: 15px;
    text-align: center;
    width: 300px;
    color: white;
`;

const ModalTitle = styled.h2`
    margin-bottom: 1rem;
`;

const ModalMessage = styled.p`
    margin-bottom: 1.5rem;
`;

const CloseButton = styled.button`
    padding: 0.6rem 1rem;
    background-color: #ff4d4f;
    color: white;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: #e43a3d;
    }
`;

export default Modal;

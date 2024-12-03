import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import LogoImage from '../assets/logo/white.png';

function HeaderBar() {
    const navigate = useNavigate();

    const handleLogoClick = () => {
        navigate('/member/tickets');
    };

    return (
        <Header>
            <LogoImg 
                src={LogoImage} 
                alt="Logo" 
                onClick={handleLogoClick}
            />
        </Header>
    );
}

const Header = styled.header`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 7%;
    background-color: #0d1117;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 100;
`;

const LogoImg = styled.img`
    height: 40px;
    cursor: pointer;  // 클릭 가능함을 나타내는 커서 추가
`;

export default HeaderBar;

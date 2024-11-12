import styled from 'styled-components';

import LogoImg from '../assets/logo/white.png'

const HeaderBar = () => {
    return (
        <HeaderContainer>
            <LeftPlaceholder />
            <Logo src={LogoImg} alt="Logo" /> {/* 로고 텍스트를 변경하거나 이미지로 대체할 수 있습니다 */}
            <RightPlaceholder />
        </HeaderContainer>
    );
};

const HeaderContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 7%;
    background-color: #0d1117; // 배경색을 원하는 색상으로 변경하세요
    padding-top: 3rem;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
`;

const LeftPlaceholder = styled.div`
    flex: 1;
`;

const Logo = styled.img`
    height: 100%;
`;

const RightPlaceholder = styled.div`
    flex: 1;
`;

export default HeaderBar;

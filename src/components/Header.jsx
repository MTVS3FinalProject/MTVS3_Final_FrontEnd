import styled from 'styled-components';

const HeaderBar = () => {
    return (
        <HeaderContainer>
            <LeftPlaceholder />
            <Logo>Logo</Logo> {/* 로고 텍스트를 변경하거나 이미지로 대체할 수 있습니다 */}
            <RightPlaceholder />
        </HeaderContainer>
    );
};

const HeaderContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 60px;
    background-color: #0d1117; // 배경색을 원하는 색상으로 변경하세요
    padding: 1rem;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
`;

const LeftPlaceholder = styled.div`
    flex: 1;
`;

const Logo = styled.div`
    font-size: 1.5rem;
    font-weight: bold;
    color: #ffffff; // 텍스트 색상을 원하는 색상으로 변경하세요
    text-align: center;
`;

const RightPlaceholder = styled.div`
    flex: 1;
`;

export default HeaderBar;

import styled from 'styled-components';

import LogoImage from '../../../assets/login/logo.png';

function SignUpComplete() {
    return (
        <PageContainer>
            <LogoImg src={LogoImage} alt="Logo" />
            <MessageContainer>
                <SuccessMessage>신원 인증 등록 정상처리 되었습니다</SuccessMessage>
                <GuideMessage>Ticketaka에서 회원가입을 완료해주세요</GuideMessage>
            </MessageContainer>
        </PageContainer>
    );
}

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #0d1117;
    height: 100vh;
    color: white;
`;

const LogoImg = styled.img`
    width: 15vw; /* 로고 크기 조정 */
`;

const MessageContainer = styled.div`
    text-align: center;
`;

const SuccessMessage = styled.p`
    font-size: 1.2rem;
    color: #28a745; // 초록색으로 성공 메시지 강조
    margin-bottom: 1rem;
`;

const GuideMessage = styled.p`
    font-size: 1rem;
    color: #ffffff;
`;

export default SignUpComplete;

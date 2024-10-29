import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import styled from 'styled-components';

import MaskImage from '../../../assets/guide/mask.png';
import GlassesImage from '../../../assets/guide/glasses.png';
import LightingImage from '../../../assets/guide/lighting.png';
import CorrectImage from '../../../assets/guide/correct.png';

function SignUpGuide() {
    const location = useLocation();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const emailFromQR = queryParams.get('email');
        
        if (emailFromQR) {
            console.log('emailFromQR: ' + emailFromQR);
            setEmail(emailFromQR);
        }
    }, [location]);

    const handleNext = () => {
        if (email) {
            navigate(`/signup/camera?email=${email}`);
        } else {
            alert('올바른 이메일 정보가 없습니다.');
        }
    };

    return (
        <PageContainer>
            <MainContent>
                <Title>신원 인증 가이드라인</Title>
                <GridContainer>
                    <GuideImageWrapper>
                        <GuideImage src={MaskImage} alt="마스크 사진" />
                        <GuideText>마스크 사용 X</GuideText>
                    </GuideImageWrapper>
                    <GuideImageWrapper>
                        <GuideImage src={GlassesImage} alt="안경 불러쓴 사진" />
                        <GuideText>안경 불러쓴 사진 X</GuideText>
                    </GuideImageWrapper>
                    <GuideImageWrapper>
                        <GuideImage src={LightingImage} alt="과도한 조명" />
                        <GuideText>과도한 조명 X</GuideText>
                    </GuideImageWrapper>
                    <GuideImageWrapper style={{ gridColumn: '2 / span 1' }}>
                        <GuideImage src={CorrectImage} alt="올바른 사진" />
                        <GuideText>올바른 사진</GuideText>
                    </GuideImageWrapper>
                </GridContainer>
                <Button onClick={handleNext}>사진촬영하기</Button>
            </MainContent>
        </PageContainer>
    );
}

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: 100dvh;
    justify-content: space-between;
    align-items: center;
    font-family: Arial, sans-serif;
    background-color: #0d1117;
    color: white;
`;

const MainContent = styled.main`
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 90%;
    gap: 1.5rem;
    padding: 2rem;
`;

const Title = styled.div`
    color: #fff;
    font-size: larger;
    padding-bottom: 2rem;
`;

const GridContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: auto auto;
    width: 100%;
    justify-items: center;
    align-items: center;
`;

const GuideImageWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const GuideImage = styled.img`
    width: 90%;
    height: 85%;
    border-radius: 50%;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
    border: 2px solid ${props => props.alt === "올바른 사진" ? "#00ff00" : "#ff0000"};
`;

const GuideText = styled.div`
    margin-top: 0.5rem;
    padding-bottom: 1rem;
    font-size: 0.85rem;
    color: #ffffff;
    text-align: center;
`;

const Button = styled.button`
    width: 100%;
    background-color: #2ea043;
    color: white;
    padding: 0.8rem 1.5rem;
    border: none;
    border-radius: 25px;
    font-size: 1rem;
    cursor: pointer;
    margin-top: 1.5rem;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: #2c974b;
    }
`;

export default SignUpGuide;

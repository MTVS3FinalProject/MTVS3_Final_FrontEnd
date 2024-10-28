import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import styled from 'styled-components';

import GuideLogoImage from '../../../assets/guide-test.png';

function VerificationGuide() {
    const location = useLocation();
    const navigate = useNavigate();
    const [userCode, setUserCode] = useState('');

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const userCodeFromQR = queryParams.get('userCode');
        
        if (userCodeFromQR) {
            console.log('userCodeFromQR: ' + userCodeFromQR);
            setUserCode(userCodeFromQR);
        }
    }, [location]);

    const handleNext = () => {
        if (userCode) {
            navigate(`/verification/camera?userCode=${userCode}`);
        } else {
            alert('올바른 이메일 정보가 없습니다.');
        }
    };

    return (
        <PageContainer>
            <MainContent>
                <Title>신원 인증 등록 가이드라인</Title>
                <GridContainer>
                    <GuideImage src={GuideLogoImage} alt="가이드 이미지 1" />
                    <GuideImage src={GuideLogoImage} alt="가이드 이미지 2" />
                    <GuideImage src={GuideLogoImage} alt="가이드 이미지 3" />
                    <GuideImage src={GuideLogoImage} alt="가이드 이미지 4" />
                </GridContainer>
                <Button onClick={handleNext}>사진촬영하기</Button>
            </MainContent>
        </PageContainer>
    );
}

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: 100vh;
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
    padding-bottom: 3rem;
`;

const GridContainer = styled.div`
    display: grid;
    grid-template-columns: 50% 50%;
    grid-template-rows: 50% 50%;
    width: 100%;
    justify-items: center; /* 수평 중앙 정렬 */
    align-items: center;  /* 수직 중앙 정렬 */
    padding-top: 1.5rem;
`;

const GuideImage = styled.img`
    width: 90%;
    height: 90%;
    max-width: 300px;
    border-radius: 15px;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
    border: 1px solid #fff;
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
    margin-top: 5rem;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: #2c974b;
    }
`;

export default VerificationGuide;
import { useState, useEffect } from 'react';
import { getTicketList } from '../../api/ticket';
import styled from 'styled-components';

import HeaderBar from '../../components/Header';

const TicketListPage = () => {
    const [ticketStatus, setTicketStatus] = useState('available'); // 'available' or 'used'
    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(0); // 현재 페이지 상태
    const [startX, setStartX] = useState(0); // 터치 시작 위치 저장

    // Function to fetch tickets from the server
    const fetchTickets = async (status) => {
        setLoading(true);
        try {
            const response = await getTicketList(status);
            // Assuming response has a 'response' field containing 'ticketDTOList'
            const ticketData = response?.response?.ticketDTOList || [];
            setTickets(ticketData);
        } catch (error) {
            console.error('Error fetching tickets:', error);
            // Handle error messages as needed
        } finally {
            setLoading(false);
        }
    };

    // Fetch tickets when the status changes
    useEffect(() => {
        fetchTickets(ticketStatus);
    }, [ticketStatus]);

    // Navigation handlers
    const handleNext = () => {
        if (currentPage < tickets.length - 1) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevious = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    };

    // Touch event handlers for slide navigation
    const handleTouchStart = (e) => {
        setStartX(e.touches[0].clientX);
    };

    const handleTouchEnd = (e) => {
        const endX = e.changedTouches[0].clientX;
        if (startX - endX > 50) {
            handleNext(); // 오른쪽으로 슬라이드하면 다음 티켓
        } else if (endX - startX > 50) {
            handlePrevious(); // 왼쪽으로 슬라이드하면 이전 티켓
        }
    };

    return (
        <PageContainer>
            <HeaderBar/>
            {loading ? (
                <LoadingText>Loading...</LoadingText>
            ) : (
                tickets.length > 0 && (
                    <TicketDisplay onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
                        <TicketCard key={tickets[currentPage].ticketId}>
                            <EventTitle>{tickets[currentPage].concertInfo.concertName}</EventTitle>
                            <EventDetails>
                                Date: {`${tickets[currentPage].concertInfo.year}-${tickets[currentPage].concertInfo.month}-${tickets[currentPage].concertInfo.day}`} | Time: {tickets[currentPage].concertInfo.time}
                            </EventDetails>
                            <SeatInfo>Seat: {tickets[currentPage].seatInfo}</SeatInfo>
                            <TicketImage src={tickets[currentPage].ticketImage} alt="Ticket Image" />
                        </TicketCard>
                    </TicketDisplay>
                )
            )}

            <ToggleContainer>
                <ArrowButton onClick={handlePrevious} disabled={currentPage === 0}>
                    ◀
                </ArrowButton>
                <ToggleButton onClick={() => setTicketStatus('available')} active={ticketStatus === 'available'}>
                    사용 가능
                </ToggleButton>
                <ToggleButton onClick={() => setTicketStatus('used')} active={ticketStatus === 'used'}>
                    사용 완료
                </ToggleButton>
                <ArrowButton onClick={handleNext} disabled={currentPage === tickets.length - 1}>
                    ▶
                </ArrowButton>
            </ToggleContainer>
        </PageContainer>
    );
};

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    background-color: #0d1117;
    height: 100vh;
    padding-top: 20px;
`;

const TicketDisplay = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    position: relative;
    touch-action: pan-y; // 수직 스크롤 방지
`;

const TicketCard = styled.div`
    width: 70vw; // 화면 너비의 80% 사용
    height: 70vh; // 화면 높이의 80% 사용
    padding: 20px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    background-color: white;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    transform-origin: center;
`;

const ToggleContainer = styled.div`
    display: flex;
    flex-direction: row; // 수평 정렬
    align-items: center;
    justify-content: center; // 가운데 정렬
    gap: 10px;
    margin-top: auto; // 맨 하단에 위치
    padding-bottom: 2rem;
    width: 100%;
    background-color: #0d1117;
`;

const ToggleButton = styled.span`
    cursor: pointer;
    font-size: 1rem;
    color: ${(props) => (props.active ? '#555' : '#aaa')}; // 선택된 경우 진한 색상, 선택되지 않은 경우 연한 색상
    text-decoration: ${(props) => (props.active ? 'underline' : 'none')}; // 선택된 경우 밑줄 표시
    transition: color 0.3s;
    &:hover {
        color: ${(props) => (props.active ? '#aaa' : '#555')}; // 선택된 경우 더 진한 색상, 선택되지 않은 경우 중간 색상
    }
`;

const ArrowButton = styled.button`
    background-color: transparent;
    border: none;
    font-size: 1.5rem;
    padding-bottom: 2rem;
    color: #aaa;
    cursor: pointer;
    transition: color 0.3s;
    &:disabled {
        color: #555;
        cursor: not-allowed;
    }
    &:hover:enabled {
        color: #fff;
    }
`;

const EventTitle = styled.h1`
    font-size: 24px;
    margin-bottom: 10px;
`;

const EventDetails = styled.p`
    font-size: 16px;
`;

const SeatInfo = styled.p`
    font-size: 18px;
    margin-top: 10px;
`;

const TicketImage = styled.img`
    width: 100px;
    height: 100px;
    margin-top: 20px;
`;

const LoadingText = styled.p`
    font-size: 18px;
    color: #333;
`;

export default TicketListPage;

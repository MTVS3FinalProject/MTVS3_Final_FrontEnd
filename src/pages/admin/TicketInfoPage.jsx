import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { consumeTicket } from '../../api/admin/ticket'; // consumeTicket API 호출 함수 가져오기

const TicketInfoPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const ticketInfo = location.state;

    const handleConsumeTicket = async () => {
        if (!ticketInfo?.ticketId) {
            alert('Invalid ticket information.');
            return;
        }

        try {
            await consumeTicket(ticketInfo.ticketId); // API 호출
            alert('Ticket has been successfully consumed.');
            navigate('/admin/qr'); // 성공적으로 사용 후 스캐너 페이지로 이동
        } catch (error) {
            console.error('Error consuming the ticket:', error);
            alert('Failed to consume ticket. Please try again.');
        }
    };

    if (!ticketInfo) {
        return (
            <Container>
                <h2>No Ticket Information Found</h2>
                <Button onClick={() => navigate('/admin/qr')}>Go Back to Scanner</Button>
            </Container>
        );
    }

    return (
        <Container>
            <h2>Ticket Information</h2>
            <Info>
                <p><strong>Concert:</strong> {ticketInfo.concertName}</p>
                <p><strong>Date:</strong> {ticketInfo.concertDate}</p>
                <p><strong>Seat:</strong> {ticketInfo.seatInfo}</p>
            </Info>
            <Button onClick={handleConsumeTicket}>사용하기</Button>
            <Button onClick={() => navigate('/admin/qr')}>Scan Another Ticket</Button>
        </Container>
    );
};

export default TicketInfoPage;

const Container = styled.div`
    padding: 20px;
    background-color: #0d1117;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: white;
`;

const Info = styled.div`
    margin: 20px 0;
    text-align: center;
`;

const Button = styled.button`
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
    background-color: #007BFF;
    color: white;
    border: none;
    border-radius: 5px;
    margin: 10px;

    &:hover {
        opacity: 0.9;
    }

    &:nth-child(2) {
        background-color: #28a745; /* "사용하기" 버튼은 초록색으로 설정 */
    }
`;

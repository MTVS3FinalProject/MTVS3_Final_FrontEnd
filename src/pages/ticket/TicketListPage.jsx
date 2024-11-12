import { useState, useEffect } from 'react';
import { getTicketList } from '../../api/ticket';
import styled from 'styled-components';

const TicketListPage = () => {
    const [ticketStatus, setTicketStatus] = useState('available'); // 'available' or 'used'
    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(false);

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

    // Toggle handler for changing status
    const handleToggle = () => {
        setTicketStatus((prevStatus) => (prevStatus === 'available' ? 'used' : 'available'));
    };

    return (
        <PageContainer>
            <ToggleContainer>
                <ToggleButton onClick={handleToggle} active={ticketStatus === 'available'}>
                    사용 가능
                </ToggleButton>
                <ToggleButton onClick={handleToggle} active={ticketStatus === 'used'}>
                    사용 완료
                </ToggleButton>
            </ToggleContainer>

            {loading ? (
                <LoadingText>Loading...</LoadingText>
            ) : (
                <TicketGrid>
                    {tickets.map((ticket) => (
                        <TicketCard key={ticket.ticketId}>
                            <EventTitle>{ticket.concertInfo.concertName}</EventTitle>
                            <EventDetails>
                                Date: {`${ticket.concertInfo.year}-${ticket.concertInfo.month}-${ticket.concertInfo.day}`} | Time: {ticket.concertInfo.time}
                            </EventDetails>
                            <SeatInfo>Seat: {ticket.seatInfo}</SeatInfo>
                            <TicketImage src={ticket.ticketImage} alt="Ticket Image" />
                        </TicketCard>
                    ))}
                </TicketGrid>
            )}
        </PageContainer>
    );
};

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    background-color: #f4f4f4;
    height: 100vh;
    padding-top: 20px;
`;

const ToggleContainer = styled.div`
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
`;

const ToggleButton = styled.button`
    padding: 10px 20px;
    border: none;
    border-radius: 20px;
    cursor: pointer;
    background-color: ${(props) => (props.active ? '#2ea043' : '#ccc')};
    color: ${(props) => (props.active ? 'white' : 'black')};
    transition: background-color 0.3s;

    &:hover {
        background-color: ${(props) => (props.active ? '#2c974b' : '#bbb')};
    }
`;

const TicketGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 20px;
    padding: 20px;
`;

const TicketCard = styled.div`
    width: 300px;
    height: auto;
    padding: 20px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    background-color: white;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
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

import { useState, useEffect } from 'react';
import { getTicketList } from '../../api/ticket';
import styled from 'styled-components';

import HeaderBar from '../../components/Header';
import TicketModal from '../../components/ticket/TicketModal'; // Modal component import

const TicketListPage = () => {
    const [ticketStatus, setTicketStatus] = useState('available'); // 'available' or 'used'
    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(0); // Current page state
    const [showModal, setShowModal] = useState(false); // Modal state
    const [selectedTicket, setSelectedTicket] = useState(null); // Selected ticket state
    const itemsPerPage = 1; // Number of tickets per page (1 per row)

    // Fetch tickets from the server
    const fetchTickets = async (status) => {
        setLoading(true);
        try {
            const response = await getTicketList(status);
            const ticketData = response?.response?.ticketDTOList || [];
            setTickets(ticketData);
        } catch (error) {
            console.error('Error fetching tickets:', error);
        } finally {
            setLoading(false);
        }
    };

    // Fetch tickets whenever the status changes
    useEffect(() => {
        fetchTickets(ticketStatus);
    }, [ticketStatus]);

    // Calculate the paginated tickets
    const paginatedTickets = tickets.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);

    // Modal handlers
    const openModal = (ticket) => {
        setSelectedTicket(ticket);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setSelectedTicket(null);
    };

    return (
        <PageContainer>
            <HeaderBar />
            {loading ? (
                <LoadingText>Loading...</LoadingText>
            ) : (
                paginatedTickets.length > 0 && (
                    <TicketDisplay>
                        {paginatedTickets.map((ticket) => (
                            <TicketCard key={ticket.ticketId} onClick={() => openModal(ticket)}>
                                <EventTitle>{ticket.concertInfo.concertName}</EventTitle>
                                <EventDetails>
                                    {`${ticket.concertInfo.year}/${ticket.concertInfo.month}/${ticket.concertInfo.day}`} {ticket.concertInfo.time}
                                </EventDetails>
                                <SeatInfo>{ticket.seatInfo}</SeatInfo>
                            </TicketCard>
                        ))}
                    </TicketDisplay>
                )
            )}

            <ToggleContainer>
                <ArrowButton onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 0}>
                    ◀
                </ArrowButton>
                <ToggleButton onClick={() => setTicketStatus('available')} active={ticketStatus === 'available'}>
                    사용 가능
                </ToggleButton>
                <ToggleButton onClick={() => setTicketStatus('used')} active={ticketStatus === 'used'}>
                    사용 완료
                </ToggleButton>
                <ArrowButton
                    onClick={() => setCurrentPage(currentPage + 1)}
                    disabled={(currentPage + 1) * itemsPerPage >= tickets.length}
                >
                    ▶
                </ArrowButton>
            </ToggleContainer>

            {showModal && <TicketModal ticket={selectedTicket} onClose={closeModal} />}
        </PageContainer>
    );
};

// Styled components
const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    background-color: #0d1117;
    height: 100vh;
    padding-top: 3rem;
    position: relative; /* Make it relative for positioning child elements */
`;

const TicketDisplay = styled.div`
    display: flex;
    flex-direction: column; /* 한 줄에 하나씩 표시 */
    gap: 1rem;
    width: 80%; /* 가로 정렬에 맞추어 조정 */
    padding: 1rem;
    box-sizing: border-box;
    justify-content: center;
    align-items: center;
`;

const TicketCard = styled.div`
    width: 100%;
    height: auto;
    aspect-ratio: 2 / 3; /* Maintain a consistent aspect ratio */
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    border: 1px solid #fff;
    background-color: #0d1117;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    padding: 1rem;
    color: #fff;
    transition: transform 0.2s;

    &:hover {
        transform: scale(1.05);
    }
`;

const ToggleContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 10px;
    width: 100%;
    background-color: #0d1117;
    position: fixed; /* Fix at the bottom */
    bottom: 0;
    padding: 1rem 0;
`;

const ToggleButton = styled.span`
    cursor: pointer;
    font-size: 1rem;
    color: ${(props) => (props.active ? '#555' : '#aaa')};
    text-decoration: ${(props) => (props.active ? 'underline' : 'none')};
    transition: color 0.3s;

    &:hover {
        color: ${(props) => (props.active ? '#aaa' : '#555')};
    }
`;

const ArrowButton = styled.button`
    background-color: transparent;
    border: none;
    font-size: 1.5rem;
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

const EventTitle = styled.h3`
    margin-bottom: 10px;
    color: #fff;
`;

const EventDetails = styled.p`
    font-size: 16px;
    color: #ccc;
`;

const SeatInfo = styled.p`
    font-size: 18px;
    margin-top: 10px;
    color: #ccc;
`;

const LoadingText = styled.p`
    font-size: 18px;
    color: #ccc;
`;

export default TicketListPage;

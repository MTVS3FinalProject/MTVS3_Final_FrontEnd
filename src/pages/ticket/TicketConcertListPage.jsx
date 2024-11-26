import { useState, useEffect } from 'react';
import { getTicketConcertList, getTicketDetails } from '../../api/ticket'; // API 호출 함수
import styled from 'styled-components';

import HeaderBar from '../../components/Header';
import TicketModal from '../../components/ticket/TicketModal'; // Modal component import

const TicketConcertListPage = () => {
    const [thumbnails, setThumbnails] = useState([]); // Concert thumbnails with ticketId
    const [showModal, setShowModal] = useState(false); // Modal state
    const [selectedTicketDetails, setSelectedTicketDetails] = useState(null); // Selected ticket details
    const [loading, setLoading] = useState(false); // Loading state
    const [modalLoading, setModalLoading] = useState(false); // Modal-specific loading state

    // Fetch concert thumbnails and ticket IDs
    const fetchConcertThumbnails = async () => {
        setLoading(true);
        try {
            const response = await getTicketConcertList();
            const concertThumbnails = response?.response?.concertThumbnailList || [];
            setThumbnails(concertThumbnails);
        } catch (error) {
            console.error('Error fetching concert thumbnails:', error);
        } finally {
            setLoading(false);
        }
    };

    // Fetch ticket details by ticket ID when the modal is opened
    const fetchTicketDetails = async (ticketId) => {
        setModalLoading(true);
        try {
            const response = await getTicketDetails(ticketId);
            console.log(response);
            setSelectedTicketDetails(response?.response || null); // Assuming API returns the ticket details
            setShowModal(true);
        } catch (error) {
            console.error('Error fetching ticket details:', error);
        } finally {
            setModalLoading(false);
        }
    };

    useEffect(() => {
        fetchConcertThumbnails();
    }, []);

    // Modal handlers
    const openModal = (ticketId) => {
        fetchTicketDetails(ticketId);
    };

    const closeModal = () => {
        setSelectedTicketDetails(null);
        setShowModal(false);
    };

    return (
        <>
            <HeaderBar />
            <PageContainer>
                {loading ? (
                    <LoadingText>Loading...</LoadingText>
                ) : (
                    <ThumbnailGrid>
                        {thumbnails.map((thumbnail, index) => (
                            <ThumbnailCard
                                key={index}
                                $thumbnail={thumbnail.concertThumbnail} // $thumbnail 속성으로 전달
                                onClick={() => openModal(thumbnail.ticketId)}
                            >
                                <ThumbnailOverlay>
                                    <OverlayText>View Tickets</OverlayText>
                                </ThumbnailOverlay>
                            </ThumbnailCard>
                        ))}
                    </ThumbnailGrid>
                )}
            </PageContainer>

            {showModal && selectedTicketDetails && (
                <TicketModal
                    ticketDetails={selectedTicketDetails}
                    loading={modalLoading}
                    onClose={closeModal}
                />
            )}
        </>
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
    padding: 0.75rem;
    padding-top: calc(10% + 3rem); /* Adjust padding to prevent overlap with HeaderBar */
`;

const ThumbnailGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(48%, 1fr));
    gap: 0.5rem;
    row-gap: 1.5rem; /* 위쪽 간격 */
    width: 100%;
    margin-top: 3.5rem;
`;

const ThumbnailCard = styled.div`
    width: 100%;
    aspect-ratio: 3 / 4; /* 카드 비율 설정 */
    background-image: url(${(props) => props.$thumbnail}); /* $thumbnail 사용 */
    background-size: cover;
    background-position: center;
    border-radius: 15px;
    position: relative;
    cursor: pointer;
    overflow: hidden;
    transition: transform 0.3s;

    &:hover {
        transform: scale(1.05);
    }
`;

const ThumbnailOverlay = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 0;
    transition: opacity 0.3s;

    &:hover {
        opacity: 1;
    }
`;

const OverlayText = styled.span`
    color: #fff;
    font-size: 1.2rem;
    font-weight: bold;
`;

const LoadingText = styled.p`
    font-size: 18px;
    color: #ccc;
`;

export default TicketConcertListPage;

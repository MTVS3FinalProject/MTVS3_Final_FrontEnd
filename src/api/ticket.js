import { GetAxiosInstance } from "../axios/AxiosMethod";

export const getTicketList = async (status) => {
    try {
        const response = await GetAxiosInstance(`/member/tickets?status=${status}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching ticket list:', error);
        throw error;
    }
};

export const getTicketConcertList = async () => {
    try {
        const response = await GetAxiosInstance(`/concerts/thumbnails`);
        return response.data;
    } catch (error) {
        console.error('Error fetching ticket list:', error);
        throw error;
    }
}

export const getTicketDetails = async (ticketId) => {
    try {
        const response = await GetAxiosInstance(`/member/tickets/${ticketId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching ticket list:', error);
        throw error;
    }
}

export const checkTicketVerification = async (ticketId) => {
    try {
        const response = await GetAxiosInstance(`/member/tickets/${ticketId}/verification`);
        return response.data;
    } catch (error) {
        console.error('Error checking ticket verification:', error);
        throw error;
    }
};

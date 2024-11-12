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

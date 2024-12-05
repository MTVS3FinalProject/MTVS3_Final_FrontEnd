import { GetAxiosInstance, PostAxiosInstance } from '../axios/AxiosMethod';

export const getMemberInfo = async (ticketId) => {
    try {
        const response = await GetAxiosInstance(`/admin/member/info/${ticketId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching member info:', error);
        throw error;
    }
};

export const verifyMember = async (ticketId, file) => {
    try {
        const formData = new FormData();
        formData.append('ticketId', ticketId);
        formData.append('image', file);

        const response = await PostAxiosInstance(`/admin/member/verify`, formData);
        return response.data;
    } catch (error) {
        console.error('Error verifying member:', error);
        throw error;
    }
}; 
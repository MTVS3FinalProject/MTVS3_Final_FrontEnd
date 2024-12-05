import { PostAxiosInstance } from '../axios/AxiosMethod';

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
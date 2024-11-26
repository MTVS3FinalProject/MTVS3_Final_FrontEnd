import { PutAxiosInstance } from "../../axios/AxiosMethod";
import jsQR from "jsqr";

export const verifyTicket = async (ticketId) => {
    try {
        const response = await PutAxiosInstance(`/api/admin/ticket/verification`, {
            ticketId,
        });
        return response.data; // 성공 시 데이터 반환
    } catch (error) {
        console.error("Error verifying ticket:", error);
        throw error.response?.data?.message || "An error occurred during verification.";
    }
};

export const decodeQRCode = (imageData) => {

    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");

    const img = new Image();
    img.src = imageData;

    return new Promise((resolve, reject) => {
        img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;
            context.drawImage(img, 0, 0);

            const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
            const code = jsQR(imageData.data, canvas.width, canvas.height);

            if (code) {
                resolve(code.data);
            } else {
                reject("QR Code not found or unreadable");
            }
        };
        img.onerror = () => reject("Failed to load image for decoding");
    });
};
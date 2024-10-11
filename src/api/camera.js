import { PostAxiosInstance } from "../axios/AxiosMethod";
import axios from "axios";

// 로그 전송을 위한 함수
export const sendErrorLog = async (message) => {
  try {
    // axios의 기본 post 메소드 사용
    await axios.post('/logs', { errorLog: message });
  } catch (error) {
    alert(`Failed to send log error: ${error.message}`); // 문자열로 결합하여 출력
    console.error('Failed to send error log to server:', error);
  }
};

// 사진을 서버에 업로드하는 함수
export const uploadPhoto = async (file, email) => {
  if (!file) {
    throw new Error('No file provided for upload.');
  }

  // FormData 객체 생성 및 파일 추가
  const formData = new FormData();
  formData.append('image', file); // 서버에 'image' 필드로 파일 전송
  formData.append('email', email);

  try {
    // PostAxiosInstance를 사용하여 파일 업로드 요청
    const response = await PostAxiosInstance('/file', formData);

    // 업로드 성공 시 반환할 데이터
    return response.data;

  } catch (error) {
    console.error('Error uploading the photo:', error);
    await sendErrorLog(error.message);  // 에러 발생 시 서버로 로그 전송
    throw new Error('Failed to upload the photo.');
  }
};

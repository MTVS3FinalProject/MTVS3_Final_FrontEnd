import { PostAxiosInstance } from "../axios/AxiosMethod";

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
    const response = await PostAxiosInstance('/file/signup', formData);

    // 업로드 성공 시 반환할 데이터
    return response.data;

  } catch (error) {
    console.error('Error uploading the photo:', error);
    throw new Error('Failed to upload the photo.');
  }
};

// 사진을 서버에 업로드하는 함수 (회원 인증용)
export const uploadVerificationPhoto = async (file, memberId) => {
  
  if (!file) {
    throw new Error('No file provided for upload.');
  }

  // FormData 객체 생성 및 파일 추가
  const formData = new FormData();
  formData.append('image', file); // 서버에 'image' 필드로 파일 전송
  formData.append('memberId', memberId);

  try {
    // PostAxiosInstance를 사용하여 파일 업로드 요청
    const response = await PostAxiosInstance('/file/verify', formData);

    // 업로드 성공 시 반환할 데이터
    return response.data;

  } catch (error) {
    console.error('Error uploading the verification photo:', error);
    throw new Error('Failed to upload the verification photo.');
  }
};

import { PostAxiosInstance } from "../axios/AxiosMethod";

// 사진을 서버에 업로드하는 함수
export const uploadPhoto = async (file, email, secondPwd) => {
  
  if (!file || !email || !secondPwd) {
    throw new Error('Missing file or second password.');
  }

  // FormData 객체 생성 및 파일 추가
  const formData = new FormData();
  formData.append('image', file); // 서버에 'image' 필드로 파일 전송
  formData.append('email', email);
  formData.append('secondPwd', secondPwd); 

  try {
    // PostAxiosInstance를 사용하여 파일 업로드 요청
    const response = await PostAxiosInstance('/face/recognition', formData);

    // 업로드 성공 시 반환할 데이터
    return response.data;

  } catch (error) {
    console.error('Error uploading the photo:', error);
    throw new Error('Failed to upload the photo.');
  }
};

// 사진을 서버에 업로드하는 함수 (회원 인증용)
export const uploadVerificationPhoto = async (file, userCode, secondPwd) => {
  
  if (!file || !userCode || !secondPwd) {
    throw new Error('Missing file, user code, or second password.');
  }

  // FormData 객체 생성 및 파일 추가
  const formData = new FormData();
  formData.append('image', file); // 서버에 'image' 필드로 파일 전송
  formData.append('code', userCode);
  formData.append('secondPwd', secondPwd); 

  try {
    // PostAxiosInstance를 사용하여 파일 업로드 요청
    const response = await PostAxiosInstance('/face/verification', formData);

    // 업로드 성공 시 반환할 데이터
    return response.data;

  } catch (error) {
    console.error('Error uploading the verification photo:', error);
    throw new Error('Failed to upload the verification photo.');
  }
};

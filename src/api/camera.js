import axiosInstance from "../axios/AxiosInstance";

// 사진을 서버에 업로드하는 함수
export const uploadPhoto = async (file) => {
  if (!file) {
    throw new Error('No file provided for upload.');
  }

  // FormData 객체 생성 및 파일 추가
  const formData = new FormData();
  formData.append('image', file); // 'image' 필드로 파일 전송

  try {
    // PostAxiosInstance를 사용하여 파일 업로드 요청
    const response = await axiosInstance.post('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data', // 파일 업로드를 위한 헤더
      },
    });

    // 서버에서 새 토큰을 응답하면 로컬 스토리지에 저장
    const newToken = response.headers['Authorization'];
    const newRefresh = response.headers['Refresh-Token'];

    if (newToken) {
      localStorage.setItem('token', newToken.split(' ')[1]);
    }

    if (newRefresh) {
      localStorage.setItem('refresh', newRefresh.split(' ')[1]);
    }

    // 업로드 성공 시 반환할 데이터
    return response.data;
  } catch (error) {
    console.error('Error uploading the photo:', error);
    throw new Error('Failed to upload the photo.');
  }
};
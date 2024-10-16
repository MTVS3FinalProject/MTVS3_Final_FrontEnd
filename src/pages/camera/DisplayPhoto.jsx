import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import { uploadPhoto } from '../../api/camera';
import { sendErrorLog } from '../../api/camera';

function DisplayPhoto() {
  const location = useLocation();
  const { photo, email } = location.state || {}; // 이메일 정보도 받음
  const [isUploading, setIsUploading] = useState(false);

  // 파일 이름 생성 함수: 현재 시간 기반으로 고유 파일명 생성
  const generateFileName = () => {
    const now = new Date();
    const timestamp = now.getFullYear().toString() +
                      (now.getMonth() + 1).toString().padStart(2, '0') +
                      now.getDate().toString().padStart(2, '0') +
                      now.getHours().toString().padStart(2, '0') +
                      now.getMinutes().toString().padStart(2, '0') +
                      now.getSeconds().toString().padStart(2, '0');
    return `captured-photo-${timestamp}.png`;
  };

  const handleUploadClick = async () => {
    if (!photo) {
      alert('No photo available to upload.');
      return;
    }

    // Blob 데이터로 변환 후 파일 생성
    const response = await fetch(photo);
    const blob = await response.blob();
    const fileName = generateFileName(); // 동적으로 생성된 파일 이름
    const file = new File([blob], fileName, { type: 'image/png' });

    try {
      setIsUploading(true);
      await uploadPhoto(file, email); // 파일과 이메일 정보로 업로드
      alert('Photo uploaded successfully!');
    } catch (error) {
      console.error('Error during upload:', error);
      await sendErrorLog(error.message);  // 에러 발생 시 서버로 로그 전송
      alert('Failed to upload the photo. displayphoto');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div>
      <h1>Captured Photo</h1>
      {photo ? (
        <div>
          <img src={photo} alt="Captured" style={{ width: '50%' }} />
          <br />
          <button onClick={handleUploadClick} disabled={isUploading}>
            {isUploading ? 'Uploading...' : 'Confirm and Upload'}
          </button>
        </div>
      ) : (
        <p>No photo captured</p>
      )}
    </div>
  );
}

export default DisplayPhoto;

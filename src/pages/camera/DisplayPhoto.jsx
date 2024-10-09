import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import { uploadPhoto } from '../../api/camera';

function DisplayPhoto() {
  const location = useLocation();
  const { photo } = location.state || {};
  const [isUploading, setIsUploading] = useState(false);

  const handleUploadClick = async () => {
    if (!photo) {
      alert('No photo available to upload.');
      return;
    }

    // Blob 데이터로 변환 후 파일 생성
    const response = await fetch(photo);
    const blob = await response.blob();
    const file = new File([blob], 'captured-photo.png', { type: 'image/png' });

    try {
      setIsUploading(true);
      await uploadPhoto(file); // 파일로 업로드
      alert('Photo uploaded successfully!');
    } catch (error) {
      console.error('Error during upload:', error);
      alert('Failed to upload the photo.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div>
      <h1>Captured Photo</h1>
      {photo ? (
        <div>
          <img src={photo} alt="Captured" style={{ width: '100%', maxHeight: '300px' }} />
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
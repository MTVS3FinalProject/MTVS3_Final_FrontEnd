import { useLocation } from 'react-router-dom';
import { useState, useRef } from 'react';
import { uploadVerificationPhoto } from '../../../api/camera';

function VerificationPhoto() {
  const location = useLocation();
  const { photo, userCode } = location.state || {}; // userCode 정보도 받음
  const [secondPwd, setSecondPwd] = useState(['', '', '', '']); // 4자리 비밀번호 배열
  const [isUploading, setIsUploading] = useState(false);
  const inputRefs = useRef([]);

  // 파일 이름 생성 함수: 현재 시간 기반으로 고유 파일명 생성
  const generateFileName = () => {
    const now = new Date();
    const timestamp = now.getFullYear().toString() +
                      (now.getMonth() + 1).toString().padStart(2, '0') +
                      now.getDate().toString().padStart(2, '0') +
                      now.getHours().toString().padStart(2, '0') +
                      now.getMinutes().toString().padStart(2, '0') +
                      now.getSeconds().toString().padStart(2, '0');
    return `verification-photo-${timestamp}.png`;
  };

  const handleUploadClick = async () => {
    const fullPwd = secondPwd.join(''); // 배열을 하나의 문자열로 결합

    if (!photo || !fullPwd) { // 비밀번호가 없을 때 경고
      alert('Photo and 4-digit password are required.');
      return;
    }

    if (fullPwd.length !== 4 || isNaN(fullPwd)) { // 4자리 숫자 체크
      alert('Password must be exactly 4 digits.');
      return;
    }

    console.log('userCode : ' + userCode);
    console.log('secondPwd : ' + fullPwd);

    // Blob 데이터로 변환 후 파일 생성
    const response = await fetch(photo);
    const blob = await response.blob();
    const fileName = generateFileName(); // 동적으로 생성된 파일 이름
    const file = new File([blob], fileName, { type: 'image/png' });

    try {
      setIsUploading(true);
      await uploadVerificationPhoto(file, userCode, fullPwd); // 파일, userCode, 비밀번호 업로드
      alert('Verification photo uploaded successfully!');
    } catch (error) {
      console.error('Error during upload:', error);
      alert('Failed to upload the verification photo.');
    } finally {
      setIsUploading(false);
    }
  };

  // 입력 값 변경 처리
  const handlePwdChange = (e, idx) => {
    const value = e.target.value;

    if (!isNaN(value) && value.length <= 1) { // 한 자리 숫자만 허용
      const newPwd = [...secondPwd];
      newPwd[idx] = value;
      setSecondPwd(newPwd);

      // 다음 칸으로 자동 포커스 이동
      if (value && idx < 3) {
        inputRefs.current[idx + 1].focus();
      }
    }
  };

  // Backspace로 이전 칸으로 이동
  const handleKeyDown = (e, idx) => {
    if (e.key === 'Backspace' && idx > 0 && !secondPwd[idx]) {
      inputRefs.current[idx - 1].focus();
    }
  };

  return (
    <div>
      <h1>Verification Photo</h1>
      {photo ? (
        <div>
          <img src={photo} alt="Verification" style={{ width: '50%' }} />
          <br />
          <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
            {secondPwd.map((digit, idx) => (
              <input
                key={idx}
                type="password" // 비밀번호 타입으로 변경하여 입력 값 숨김
                value={digit}
                onChange={(e) => handlePwdChange(e, idx)}
                onKeyDown={(e) => handleKeyDown(e, idx)}
                maxLength={1}
                style={{ width: '40px', fontSize: '24px', textAlign: 'center' }} // 4자리 숫자 입력 칸 스타일
                ref={(el) => (inputRefs.current[idx] = el)}
              />
            ))}
          </div>
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

export default VerificationPhoto;

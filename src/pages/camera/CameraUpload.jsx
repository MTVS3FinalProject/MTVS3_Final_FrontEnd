import { useState, useRef, useEffect, useCallback } from 'react';

function CameraUpload() {
  const [cameraType, setCameraType] = useState('user'); // 전면 카메라 기본
  const videoRef = useRef(null);

  // 카메라 시작 함수 (useCallback으로 메모이제이션)
  const startCamera = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: cameraType }, // 카메라 타입에 따라 전면 또는 후면
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error("Error accessing the camera", error);
    }
  }, [cameraType]); // cameraType을 의존성으로 추가

  // 카메라 타입 전환 함수 (전면 <-> 후면)
  const toggleCamera = () => {
    setCameraType((prevType) => (prevType === 'user' ? 'environment' : 'user'));
  };

  useEffect(() => {
    startCamera(); // 카메라 시작
  }, [startCamera]); // startCamera를 의존성 배열에 추가

  return (
    <div>
      <h1>Take a Photo</h1>

      {/* 전면/후면 카메라 전환 버튼 */}
      <button onClick={toggleCamera}>
        Switch to {cameraType === 'user' ? 'Rear' : 'Front'} Camera
      </button>

      {/* 비디오 스트림 */}
      <video ref={videoRef} autoPlay playsInline style={{ width: '100%', maxHeight: '300px' }} />

      {/* 캡처 버튼 */}
      <button onClick={() => console.log('Capture photo logic here')}>
        Capture Photo
      </button>
    </div>
  );
}

export default CameraUpload;
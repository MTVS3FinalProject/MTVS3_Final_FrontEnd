import { useState, useRef, useEffect } from 'react';

function CameraUpload() {
  const [cameraType, setCameraType] = useState('user'); // 전면 카메라 기본
  const videoRef = useRef(null);

  // 카메라 시작 함수
  const startCamera = async () => {
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
  };

  // 카메라 타입 전환 함수 (전면 <-> 후면)
  const toggleCamera = () => {
    setCameraType((prevType) => (prevType === 'user' ? 'environment' : 'user'));
  };

  useEffect(() => {
    startCamera(); // 컴포넌트가 마운트될 때 카메라 시작
  }, [cameraType]); // cameraType이 변경될 때마다 카메라를 다시 시작

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
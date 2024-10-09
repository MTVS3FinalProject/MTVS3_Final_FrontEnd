import { useState, useRef, useEffect, useCallback } from 'react';

function CameraUpload() {
  const [cameraType, setCameraType] = useState('user'); // 전면 카메라 기본
  const videoRef = useRef(null);
  const streamRef = useRef(null); // 스트림 저장

  // 기존 스트림 종료 함수
  const stopStream = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
    }
  };

  // 카메라 장치 선택 함수
  const getCameraDeviceId = async (facingMode) => {
    const devices = await navigator.mediaDevices.enumerateDevices();
    const videoDevices = devices.filter(device => device.kind === 'videoinput');
    
    if (facingMode === 'environment') {
      // 후면 카메라 찾기
      const backCamera = videoDevices.find(device =>
        device.label.toLowerCase().includes('back') || device.label.toLowerCase().includes('rear')
      );
      return backCamera ? backCamera.deviceId : null;
    }
    
    if (facingMode === 'user') {
      // 전면 카메라 찾기
      const frontCamera = videoDevices.find(device =>
        device.label.toLowerCase().includes('front')
      );
      return frontCamera ? frontCamera.deviceId : null;
    }

    return videoDevices.length > 0 ? videoDevices[0].deviceId : null; // 기본 카메라
  };

  // 카메라 시작 함수
  const startCamera = useCallback(async () => {
    stopStream(); // 새 스트림 시작 전에 기존 스트림 종료
    try {
      const deviceId = await getCameraDeviceId(cameraType); // 카메라 ID 가져오기

      const constraints = {
        video: {
          deviceId: deviceId ? { exact: deviceId } : undefined, // 특정 카메라 선택
        },
      };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      streamRef.current = stream; // 새 스트림 저장
    } catch (error) {
      console.error('Error accessing the camera', error);
      alert('카메라에 접근하는 데 문제가 발생했습니다. 권한을 확인하세요.');
    }
  }, [cameraType]);

  // 카메라 타입 전환 함수 (전면 <-> 후면)
  const toggleCamera = () => {
    setCameraType((prevType) => (prevType === 'user' ? 'environment' : 'user'));
  };

  useEffect(() => {
    startCamera(); // 컴포넌트가 마운트될 때 카메라 시작
    return () => {
      stopStream(); // 컴포넌트가 언마운트될 때 스트림 종료
    };
  }, [startCamera]);

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
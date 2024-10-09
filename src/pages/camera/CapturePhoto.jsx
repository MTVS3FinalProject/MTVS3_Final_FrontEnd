import { useState, useRef, useEffect, useCallback } from 'react';

function CapturePhoto() {
  const [cameraType, setCameraType] = useState('user'); // 전면 카메라 기본
  const videoRef = useRef(null);
  const canvasRef = useRef(null); // 사진을 찍기 위한 canvas
  const streamRef = useRef(null); // 스트림 저장
  const [photo, setPhoto] = useState(null); // 캡처한 이미지 상태

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
      const backCamera = videoDevices.find(device =>
        device.label.toLowerCase().includes('back') || device.label.toLowerCase().includes('rear')
      );
      return backCamera ? backCamera.deviceId : null;
    }
    
    if (facingMode === 'user') {
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

  // 캡처 함수
  const capturePhoto = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    if (video && canvas) {
      const context = canvas.getContext('2d');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      context.drawImage(video, 0, 0, canvas.width, canvas.height);

      // 캡처한 이미지를 base64 URL로 변환하여 상태로 저장
      const imageDataUrl = canvas.toDataURL('image/png');
      setPhoto(imageDataUrl);
    }
  };

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
      <button onClick={capturePhoto}>Capture Photo</button>

      {/* 캡처한 사진 미리보기 */}
      {photo && (
        <div>
          <h2>Captured Photo:</h2>
          <img src={photo} alt="Captured" style={{ width: '100%', maxHeight: '300px' }} />
        </div>
      )}

      {/* Canvas 요소 - 캡처용 (화면에 보이지 않음) */}
      <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
    </div>
  );
}

export default CapturePhoto;
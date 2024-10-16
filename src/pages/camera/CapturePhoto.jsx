import { useRef, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
function CapturePhoto({ email }) { // 이메일 정보 받기
  const videoRef = useRef(null);
  const canvasRef = useRef(null); // 사진을 찍기 위한 canvas
  const streamRef = useRef(null); // 스트림 저장
  const navigate = useNavigate(); // 페이지 이동을 위한 hook

  // 기존 스트림 종료 함수
  const stopStream = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
    }
  };

  // 카메라 시작 함수 (전면 카메라만 사용)
  const startCamera = useCallback(async () => {
    stopStream(); // 새 스트림 시작 전에 기존 스트림 종료
    try {
      const constraints = {
        video: {
          facingMode: 'user', // 전면 카메라 고정
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
  }, []);

  // 캡처 함수
  const capturePhoto = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    if (video && canvas) {
      const context = canvas.getContext('2d');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      context.drawImage(video, 0, 0, canvas.width, canvas.height);

      // 캡처한 이미지를 base64 URL로 변환
      const imageDataUrl = canvas.toDataURL('image/png');

      // 이미지를 새로운 페이지로 전달하고 이동 (이메일 정보도 포함)
      navigate('/photo/signup', { state: { photo: imageDataUrl, email } });
    }
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

      {/* 비디오 스트림 */}
      <video ref={videoRef} autoPlay playsInline style={{ width: '100%', maxHeight: '300px' }} />

      {/* 캡처 버튼 */}
      <button onClick={capturePhoto}>Capture Photo</button>

      {/* Canvas 요소 - 캡처용 (화면에 보이지 않음) */}
      <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
    </div>
  );
}

export default CapturePhoto;

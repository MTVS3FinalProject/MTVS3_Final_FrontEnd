import { useRef, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as faceMesh from '@mediapipe/face_mesh';
import * as cameraUtils from '@mediapipe/camera_utils';

function CaptureTicketVerificationPhoto({ ticketId }) {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const streamRef = useRef(null);
    const navigate = useNavigate();
    const blinkCountRef = useRef(0);
    const lastBlinkTimeRef = useRef(0);
    const eyeClosedRef = useRef(false);

    const stopStream = () => {
        if (streamRef.current) {
            streamRef.current.getTracks().forEach((track) => track.stop());
        }
    };

    const startCamera = useCallback(async () => {
        stopStream();
        try {
            const constraints = {
                video: {
                    facingMode: 'user',
                },
            };

            const stream = await navigator.mediaDevices.getUserMedia(constraints);
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
            }
            streamRef.current = stream;
        } catch (error) {
            console.error('Error accessing the camera', error);
            alert('카메라에 접근하는 데 문제가 발생했습니다. 권한을 확인하세요.');
        }
    }, []);

    const startFaceMesh = useCallback(() => {
        const faceMeshInstance = new faceMesh.FaceMesh({
            locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`,
        });

        faceMeshInstance.setOptions({
            maxNumFaces: 1,
            refineLandmarks: true,
            minDetectionConfidence: 0.5,
            minTrackingConfidence: 0.5,
        });

        faceMeshInstance.onResults(onResults);

        if (videoRef.current) {
            const camera = new cameraUtils.Camera(videoRef.current, {
                onFrame: async () => {
                    await faceMeshInstance.send({ image: videoRef.current });
                },
                width: 353,
                height: 373,
            });
            camera.start();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onResults = (results) => {
        if (results.multiFaceLandmarks) {
            const leftEyeUpper = 159;
            const leftEyeLower = 145;
            const rightEyeUpper = 386;
            const rightEyeLower = 374;

            for (const landmarks of results.multiFaceLandmarks) {
                const leftEyeOpen = isEyeOpen(landmarks, leftEyeUpper, leftEyeLower);
                const rightEyeOpen = isEyeOpen(landmarks, rightEyeUpper, rightEyeLower);

                if (!leftEyeOpen && !rightEyeOpen && !eyeClosedRef.current) {
                    eyeClosedRef.current = true;
                    const currentTime = new Date().getTime();
                    if (currentTime - lastBlinkTimeRef.current > 500) {
                        blinkCountRef.current++;
                        lastBlinkTimeRef.current = currentTime;

                        if (blinkCountRef.current === 2) {
                            setTimeout(capturePhoto, 1000);
                            blinkCountRef.current = 0;
                        }
                    }
                }

                if (leftEyeOpen || rightEyeOpen) {
                    eyeClosedRef.current = false;
                }
            }
        }
    };

    const isEyeOpen = (landmarks, upperIndex, lowerIndex) => {
        const upper = landmarks[upperIndex];
        const lower = landmarks[lowerIndex];
        const eyeHeight = Math.abs(upper.y - lower.y);
        return eyeHeight > 0.015;
    };

    const capturePhoto = () => {
        if (!ticketId) {
            console.warn('Ticket ID is not available yet.');
            return;
        }

        const video = videoRef.current;
        const canvas = canvasRef.current;

        if (video && canvas) {
            const context = canvas.getContext('2d');
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;

            context.translate(canvas.width, 0);
            context.scale(-1, 1);
            context.drawImage(video, 0, 0, canvas.width, canvas.height);

            const imageDataUrl = canvas.toDataURL('image/png');

            navigate('/tickets/verify-owner/photo', { 
                state: { 
                    photo: imageDataUrl, 
                    ticketId 
                } 
            });
        }
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            startCamera();
            startFaceMesh();
        }, 1000);
        
        return () => {
            clearTimeout(timer);
            stopStream();
        };
    }, [startCamera, startFaceMesh]);

    return (
        <div>
            <video ref={videoRef} autoPlay playsInline style={{ 
                width: '100%', 
                height: '100%', 
                objectFit: 'cover',
                borderRadius: '15px',
                border: '2px solid #fff'
            }} />
            <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
        </div>
    );
}

CaptureTicketVerificationPhoto.propTypes = {
    ticketId: PropTypes.string.isRequired,
};

export default CaptureTicketVerificationPhoto; 
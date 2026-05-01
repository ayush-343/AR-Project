import { useEffect, useRef, useState } from 'react';
import styles from './CameraView.module.css';

interface CameraViewProps {
    onCapture: (imageData: string) => void;
}

export const CameraView: React.FC<CameraViewProps> = ({ onCapture }) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [permission, setPermission] = useState<'pending' | 'granted' | 'denied' | 'not-requested'>('not-requested');

    const requestCameraAccess = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: { facingMode: 'environment' },
                audio: false,
            });

            if (videoRef.current) {
                videoRef.current.srcObject = stream;
                setPermission('granted');
            }
        } catch (err) {
            console.error('Camera error:', err);
            setPermission('denied');
        }
    };

    useEffect(() => {
        return () => {
            if (videoRef.current?.srcObject instanceof MediaStream) {
                videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
            }
        };
    }, []);

    const handleCapture = () => {
        const video = videoRef.current;
        const canvas = canvasRef.current;

        if (!video || !canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        ctx.drawImage(video, 0, 0);

        const imageData = canvas.toDataURL('image/jpeg', 0.85);
        onCapture(imageData);
    };

    if (permission === 'denied') {
        return (
            <div className={styles.container}>
                <div className={styles.error}>
                    <p>❌ Camera permission denied</p>
                    <p style={{ fontSize: '14px', marginTop: '8px', opacity: 0.8 }}>
                        Go to Settings → Privacy → Camera and allow access to this site, then refresh.
                    </p>
                    <button
                        className={styles.captureButton}
                        onClick={() => setPermission('not-requested')}
                        style={{ marginTop: '16px' }}
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    if (permission === 'not-requested') {
        return (
            <div className={styles.container}>
                <div className={styles.error}>
                    <p>📸 Enable Camera Access</p>
                    <p style={{ fontSize: '14px', marginTop: '8px', opacity: 0.8 }}>
                        Click the button below and allow camera access when prompted.
                    </p>
                    <button
                        className={styles.captureButton}
                        onClick={requestCameraAccess}
                        style={{ marginTop: '16px' }}
                    >
                        🔐 Grant Camera Permission
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <div className={styles.videoContainer}>
                <video
                    ref={videoRef}
                    className={styles.video}
                    autoPlay
                    playsInline
                    muted
                />
                <canvas ref={canvasRef} style={{ display: 'none' }} />
                <div className={styles.overlay}>
                    <p className={styles.instruction}>Point camera at food or menu</p>
                </div>
            </div>
            <button className={styles.captureButton} onClick={handleCapture}>
                Capture
            </button>
        </div>
    );
};

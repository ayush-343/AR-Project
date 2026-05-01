import { useEffect, useRef, useState, useCallback } from 'react';
import styles from './CameraView.module.css';

interface CameraViewProps {
    onCapture: (imageData: string) => void;
}

export const CameraView: React.FC<CameraViewProps> = ({ onCapture }) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const streamRef = useRef<MediaStream | null>(null);
    const [permission, setPermission] = useState<'pending' | 'granted' | 'denied' | 'not-requested'>('not-requested');

    const requestCameraAccess = async () => {
        setPermission('pending');
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: { facingMode: 'environment' },
                audio: false,
            });
            streamRef.current = stream;
            setPermission('granted');
        } catch (err) {
            console.error('Camera error:', err);
            setPermission('denied');
        }
    };

    // Attach stream to video element once both are available
    useEffect(() => {
        if (permission === 'granted' && videoRef.current && streamRef.current) {
            videoRef.current.srcObject = streamRef.current;
        }
    }, [permission]);

    // Cleanup stream on unmount
    useEffect(() => {
        return () => {
            if (streamRef.current) {
                streamRef.current.getTracks().forEach((track) => track.stop());
                streamRef.current = null;
            }
        };
    }, []);

    const handleCapture = useCallback(() => {
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
    }, [onCapture]);

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

    if (permission === 'pending') {
        return (
            <div className={styles.container}>
                <div className={styles.error}>
                    <p>⏳ Requesting camera access...</p>
                    <p style={{ fontSize: '14px', marginTop: '8px', opacity: 0.8 }}>
                        Please allow camera access when prompted by your browser.
                    </p>
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

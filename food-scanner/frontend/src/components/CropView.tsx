import { useState, useRef } from 'react';
import { CropBox } from '../hooks/useImageCrop';
import styles from './CropView.module.css';

interface CropViewProps {
    imageData: string;
    onCrop: (croppedImage: string) => void;
    onBack: () => void;
}

export const CropView: React.FC<CropViewProps> = ({ imageData, onCrop, onBack }) => {
    const imgRef = useRef<HTMLImageElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [cropBox, setCropBox] = useState<CropBox>({
        x: 0.1,
        y: 0.1,
        width: 0.8,
        height: 0.8,
    });
    const [isDragging, setIsDragging] = useState(false);
    const [dragType, setDragType] = useState<'move' | 'resize-se' | null>(null);

    const handleMouseDown = (e: React.MouseEvent, type: 'move' | 'resize-se') => {
        e.preventDefault();
        setIsDragging(true);
        setDragType(type);
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging || !containerRef.current) return;

        const rect = containerRef.current.getBoundingClientRect();
        const relX = e.clientX - rect.left;
        const relY = e.clientY - rect.top;
        const percentX = relX / rect.width;
        const percentY = relY / rect.height;

        if (dragType === 'move') {
            const newX = Math.max(0, Math.min(percentX - cropBox.width / 2, 1 - cropBox.width));
            const newY = Math.max(0, Math.min(percentY - cropBox.height / 2, 1 - cropBox.height));
            setCropBox((prev) => ({ ...prev, x: newX, y: newY }));
        } else if (dragType === 'resize-se') {
            const newWidth = Math.min(Math.max(0.2, percentX - cropBox.x), 1 - cropBox.x);
            const newHeight = Math.min(Math.max(0.2, percentY - cropBox.y), 1 - cropBox.y);
            setCropBox((prev) => ({ ...prev, width: newWidth, height: newHeight }));
        }
    };

    const handleMouseUp = () => {
        setIsDragging(false);
        setDragType(null);
    };

    const handleCrop = async () => {
        if (!imgRef.current) return;

        const img = imgRef.current;
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const x = cropBox.x * img.naturalWidth;
        const y = cropBox.y * img.naturalHeight;
        const width = cropBox.width * img.naturalWidth;
        const height = cropBox.height * img.naturalHeight;

        canvas.width = width;
        canvas.height = height;
        ctx.drawImage(img, x, y, width, height, 0, 0, width, height);

        const croppedImageData = canvas.toDataURL('image/jpeg', 0.85);
        onCrop(croppedImageData);
    };

    return (
        <div className={styles.container}>
            <div
                ref={containerRef}
                className={styles.imageContainer}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
            >
                <img ref={imgRef} src={imageData} alt="Captured" className={styles.image} />

                {/* Crop overlay */}
                <div
                    className={styles.cropOverlay}
                    style={{
                        left: `${cropBox.x * 100}%`,
                        top: `${cropBox.y * 100}%`,
                        width: `${cropBox.width * 100}%`,
                        height: `${cropBox.height * 100}%`,
                    }}
                    onMouseDown={(e) => handleMouseDown(e, 'move')}
                >
                    {/* Resize handle */}
                    <div
                        className={styles.resizeHandle}
                        onMouseDown={(e) => {
                            e.stopPropagation();
                            handleMouseDown(e, 'resize-se');
                        }}
                    />
                </div>

                {/* Darkened areas */}
                <div className={styles.dark} style={{ top: 0, left: 0, right: 0, height: `${cropBox.y * 100}%` }} />
                <div className={styles.dark} style={{ bottom: 0, left: 0, right: 0, height: `${(1 - cropBox.y - cropBox.height) * 100}%` }} />
                <div className={styles.dark} style={{ top: `${cropBox.y * 100}%`, left: 0, width: `${cropBox.x * 100}%`, height: `${cropBox.height * 100}%` }} />
                <div className={styles.dark} style={{ top: `${cropBox.y * 100}%`, right: 0, width: `${(1 - cropBox.x - cropBox.width) * 100}%`, height: `${cropBox.height * 100}%` }} />
            </div>

            <div className={styles.controls}>
                <button className={styles.backButton} onClick={onBack}>
                    ← Back
                </button>
                <button className={styles.cropButton} onClick={handleCrop}>
                    Analyze
                </button>
            </div>
        </div>
    );
};

import { useRef, useCallback } from 'react';

export const useImageCapture = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const captureImage = useCallback(async (): Promise<string | null> => {
    const canvas = canvasRef.current;
    if (!canvas) return null;

    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    try {
      // Get canvas image as base64
      const imageData = canvas.toDataURL('image/jpeg', 0.85);
      return imageData;
    } catch (error) {
      console.error('Error capturing image:', error);
      return null;
    }
  }, []);

  return { canvasRef, captureImage };
};

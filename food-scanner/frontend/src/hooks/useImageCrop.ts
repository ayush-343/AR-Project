import { useState, useCallback } from 'react';

export interface CropBox {
  x: number;
  y: number;
  width: number;
  height: number;
}

export const useImageCrop = () => {
  const [cropBox, setCropBox] = useState<CropBox>({
    x: 0.1,
    y: 0.1,
    width: 0.8,
    height: 0.8,
  });

  const cropImage = useCallback((base64Image: string, crop: CropBox): Promise<string> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Failed to get canvas context'));
          return;
        }

        const x = crop.x * img.width;
        const y = crop.y * img.height;
        const width = crop.width * img.width;
        const height = crop.height * img.height;

        canvas.width = width;
        canvas.height = height;

        ctx.drawImage(img, x, y, width, height, 0, 0, width, height);
        const croppedImageData = canvas.toDataURL('image/jpeg', 0.85);
        resolve(croppedImageData);
      };
      img.onerror = () => reject(new Error('Failed to load image'));
      img.src = base64Image;
    });
  }, []);

  return { cropBox, setCropBox, cropImage };
};

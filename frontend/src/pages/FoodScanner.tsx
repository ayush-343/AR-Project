import { useState } from 'react';
import { CameraView } from '../components/CameraView';
import { CropView } from '../components/CropView';
import { AnalyzingView } from '../components/AnalyzingView';
import { FoodInfoPanel } from '../components/FoodInfoPanel';
import { ARViewer } from '../components/ARViewer';
import { useImageAnalysis } from '../hooks/useImageAnalysis';
import { useImageCrop } from '../hooks/useImageCrop';
import styles from './FoodScanner.module.css';

export const FoodScanner: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<'camera' | 'crop' | 'analyzing' | 'results' | 'ar'>('camera');
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  useImageCrop();
  const { error, result, analyzeImage, reset } = useImageAnalysis();

  const handleCapture = (imageData: string) => {
    setCapturedImage(imageData);
    setCurrentStep('crop');
  };

  const handleCrop = async (croppedImage: string) => {
    setCurrentStep('analyzing');
    try {
      await analyzeImage(croppedImage);
      setCurrentStep('results');
    } catch (err) {
      console.error('Analysis failed:', err);
    }
  };

  const handleScanAnother = () => {
    setCapturedImage(null);
    reset();
    setCurrentStep('camera');
  };

  const handleBack = () => {
    setCapturedImage(null);
    setCurrentStep('camera');
  };

  const handleViewAR = () => {
    setCurrentStep('ar');
  };

  const handleARClose = () => {
    setCurrentStep('results');
  };

  if (error && currentStep === 'analyzing') {
    return (
      <div className={styles.errorContainer}>
        <div className={styles.errorContent}>
          <h2>Analysis Failed</h2>
          <p>{error}</p>
          <button onClick={handleScanAnother}>Try Again</button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {currentStep === 'camera' && <CameraView onCapture={handleCapture} />}
      {currentStep === 'crop' && capturedImage && (
        <CropView imageData={capturedImage} onCrop={handleCrop} onBack={handleBack} />
      )}
      {currentStep === 'analyzing' && <AnalyzingView />}
      {currentStep === 'results' && result && (
        <FoodInfoPanel
          data={result}
          onScanAnother={handleScanAnother}
          onViewAR={handleViewAR}
        />
      )}
      {currentStep === 'ar' && result && (
        <ARViewer foodData={result} onClose={handleARClose} />
      )}
    </div>
  );
};

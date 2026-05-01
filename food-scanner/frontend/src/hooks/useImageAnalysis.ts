import { useState, useCallback } from 'react';
import { FoodAnalysisService } from '../services/FoodAnalysisService';
import { FoodAnalysisResult } from '../types/food';

export const useImageAnalysis = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<FoodAnalysisResult | null>(null);

  const analyzeImage = useCallback(async (base64Image: string) => {
    setIsAnalyzing(true);
    setError(null);
    try {
      const analysisResult = await FoodAnalysisService.analyzeFoodImage(base64Image);
      setResult(analysisResult);
      return analysisResult;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to analyze image';
      setError(errorMessage);
      throw err;
    } finally {
      setIsAnalyzing(false);
    }
  }, []);

  const reset = useCallback(() => {
    setResult(null);
    setError(null);
    setIsAnalyzing(false);
  }, []);

  return { isAnalyzing, error, result, analyzeImage, reset };
};

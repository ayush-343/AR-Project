export interface FoodAnalysisResult {
  name: string;
  price?: string;
  ingredients: string[];
  calories?: number;
  protein?: string;
  carbs?: string;
  fat?: string;
  confidence?: number;
}

export interface AnalysisState {
  capturedImage: string | null;
  croppedImage: string | null;
  analyzedFoodData: FoodAnalysisResult | null;
  isAnalyzing: boolean;
  error: string | null;
  currentStep: 'camera' | 'crop' | 'analyzing' | 'results';
}

import axios from 'axios';
import { FoodAnalysisResult } from '../types/food';

// Use relative API URL for production (same origin), or environment variable
const API_BASE_URL = import.meta.env.VITE_API_URL || (
  import.meta.env.DEV 
    ? 'http://localhost:8000'
    : '' // Empty string = use current origin for Vercel
);

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export class FoodAnalysisService {
  static async analyzeFoodImage(base64Image: string): Promise<FoodAnalysisResult> {
    try {
      const response = await apiClient.post('/api/analyze-food', {
        image: base64Image,
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.error || error.message);
      }
      throw error;
    }
  }

  static async getCachedAnalysis(imageHash: string): Promise<FoodAnalysisResult | null> {
    try {
      const response = await apiClient.get(`/api/cached-analysis/${imageHash}`);
      return response.data;
    } catch (error) {
      // If not cached, return null
      return null;
    }
  }
}

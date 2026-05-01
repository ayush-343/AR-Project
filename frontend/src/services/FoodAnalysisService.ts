import { GoogleGenerativeAI } from '@google/generative-ai';
import { FoodAnalysisResult } from '../types/food';

// Initialize Gemini API
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || '';
const genAI = new GoogleGenerativeAI(API_KEY);

export class FoodAnalysisService {
  static async analyzeFoodImage(base64Image: string): Promise<FoodAnalysisResult> {
    if (!API_KEY) {
      throw new Error('VITE_GEMINI_API_KEY is missing from frontend environment variables.');
    }

    try {
      // Remove data URL prefix if present
      const base64Data = base64Image.startsWith('data:image')
        ? base64Image.split(',')[1]
        : base64Image;

      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash-latest' });

      const prompt = `Analyze this food image and extract the following information in JSON format:
{
  "name": "food name",
  "price": "estimated price if visible (null if not visible)",
  "ingredients": ["ingredient1", "ingredient2", ...],
  "calories": "estimated calories or null",
  "protein": "estimated protein in grams or null",
  "carbs": "estimated carbs in grams or null",
  "fat": "estimated fat in grams or null",
  "confidence": 0.85
}

If the image doesn't contain food, return an error field. Only return valid JSON.`;

      const imagePart = {
        inlineData: {
          data: base64Data,
          mimeType: 'image/jpeg',
        },
      };

      const result = await model.generateContent([prompt, imagePart]);
      const response = await result.response;
      const text = response.text();

      // Extract JSON from the response text
      const jsonStart = text.indexOf('{');
      const jsonEnd = text.lastIndexOf('}') + 1;
      
      if (jsonStart === -1 || jsonEnd === 0) {
        throw new Error('No JSON found in Gemini response');
      }

      const jsonStr = text.substring(jsonStart, jsonEnd);
      const parsedData = JSON.parse(jsonStr);

      if (parsedData.error) {
        throw new Error(parsedData.error);
      }

      if (!parsedData.name) {
        throw new Error('Could not identify food in image');
      }

      return parsedData as FoodAnalysisResult;
    } catch (error: any) {
      console.error('Gemini API Error:', error);
      throw new Error(error.message || 'Failed to analyze image with Gemini');
    }
  }

  static async getCachedAnalysis(imageHash: string): Promise<FoodAnalysisResult | null> {
    // Client-side caching is disabled when directly calling Gemini. 
    // You could implement localStorage caching here if desired.
    return null;
  }
}

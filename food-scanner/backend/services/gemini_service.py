import google.generativeai as genai
import base64
import json
import os
from typing import Dict, Any

class GeminiService:
    def __init__(self):
        """Initialize Gemini API client"""
        api_key = os.getenv('GEMINI_API_KEY')
        if not api_key:
            raise ValueError("GEMINI_API_KEY environment variable not set")
        
        genai.configure(api_key=api_key)
        self.model = genai.GenerativeModel('gemini-1.5-flash')

    def analyze_food_image(self, base64_image: str) -> Dict[str, Any]:
        """
        Analyze food image using Gemini API
        
        Args:
            base64_image: Base64 encoded image string (with or without data URL prefix)
        
        Returns:
            Dict with food details: name, price, ingredients, calories, protein, carbs, fat
        """
        try:
            # Remove data URL prefix if present
            if base64_image.startswith('data:image'):
                base64_image = base64_image.split(',')[1]

            # Decode base64 to bytes
            image_bytes = base64.b64decode(base64_image)

            # Create image part for Gemini
            image_part = {
                "mime_type": "image/jpeg",
                "data": image_bytes
            }

            # Craft prompt for food analysis
            prompt = """Analyze this food image and extract the following information in JSON format:
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

If the image doesn't contain food, return an error field. Only return valid JSON."""

            # Call Gemini API
            response = self.model.generate_content([prompt, image_part])

            # Parse response
            response_text = response.text
            
            # Try to extract JSON from response
            json_start = response_text.find('{')
            json_end = response_text.rfind('}') + 1
            
            if json_start == -1 or json_end == 0:
                raise ValueError("No JSON found in Gemini response")
            
            json_str = response_text[json_start:json_end]
            result = json.loads(json_str)

            # Validate response
            if 'error' in result:
                raise ValueError(result.get('error', 'Unknown error'))

            if 'name' not in result:
                raise ValueError("Could not identify food in image")

            return result

        except json.JSONDecodeError as e:
            raise ValueError(f"Failed to parse Gemini response: {str(e)}")
        except Exception as e:
            raise ValueError(f"Error analyzing image with Gemini: {str(e)}")

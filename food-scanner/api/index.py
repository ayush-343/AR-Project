import sys
import os
sys.path.insert(0, os.path.dirname(__file__))

from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Import services
from backend.services.gemini_service import GeminiService

app = Flask(__name__)

# Enable CORS for mobile requests
CORS(app, resources={r"/api/*": {"origins": "*"}})

# Initialize Gemini service
gemini_service = GeminiService()


@app.route('/api/health', methods=['GET'])
def health():
    """Health check endpoint"""
    return jsonify({'status': 'ok', 'message': 'Food Scanner Backend is running'}), 200


@app.route('/api/analyze-food', methods=['POST'])
def analyze_food():
    """
    Analyze food image using Gemini API
    Expects: { "image": "base64_image_data" }
    Returns: { "name": "...", "price": "...", "ingredients": [...], ... }
    """
    try:
        data = request.get_json()
        if not data or 'image' not in data:
            return jsonify({'error': 'No image provided'}), 400

        base64_image = data['image']

        # Analyze image with Gemini
        analysis_result = gemini_service.analyze_food_image(base64_image)

        return jsonify(analysis_result), 200

    except ValueError as e:
        return jsonify({'error': str(e)}), 400
    except Exception as e:
        print(f"Error analyzing food: {str(e)}")
        return jsonify({'error': 'Failed to analyze image'}), 500


@app.route('/api/cached-analysis/<image_hash>', methods=['GET'])
def get_cached_analysis(image_hash):
    """
    Get cached analysis result (optional feature for performance)
    """
    return jsonify({'error': 'Not found'}), 404

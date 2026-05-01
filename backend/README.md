# Food Scanner Backend

Python Flask API server with Google Gemini AI integration for food image analysis.

## Features

- 🤖 Google Gemini AI for food recognition and nutrition extraction
- 🔐 Secure API key management (server-side only)
- 🚀 Fast image analysis
- 📱 CORS enabled for mobile frontend
- 🔍 Nutritional information extraction
- 💾 Optional result caching

## Requirements

- Python 3.8+
- Google Cloud account with Gemini API enabled
- pip package manager

## Setup

### 1. Create Virtual Environment

```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

### 2. Install Dependencies

```bash
pip install -r requirements.txt
```

### 3. Configure Environment Variables

Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

Edit `.env` and add your Google API key:

```
GEMINI_API_KEY=your_actual_gemini_api_key_here
FLASK_ENV=development
FLASK_DEBUG=True
```

### 4. Get Gemini API Key

1. Go to [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Create a new API key
3. Copy and paste into `.env` file

### 5. Run Server

```bash
python app.py
```

Server runs at `http://localhost:5000`

## API Endpoints

### Health Check

```
GET /api/health
```

Response: `{"status": "ok", "message": "..."}`

### Analyze Food Image

```
POST /api/analyze-food
```

**Request:**

```json
{
  "image": "data:image/jpeg;base64,/9j/4AAQSkZJRg..."
}
```

**Response:**

```json
{
  "name": "Caesar Salad",
  "price": "$12.99",
  "ingredients": ["lettuce", "croutons", "parmesan", "dressing"],
  "calories": 350,
  "protein": "15g",
  "carbs": "25g",
  "fat": "20g",
  "confidence": 0.95
}
```

**Error Response:**

```json
{ "error": "Could not identify food in image" }
```

### Get Cached Analysis

```
GET /api/cached-analysis/{image_hash}
```

Returns cached result if available, otherwise 404.

## Project Structure

```
backend/
├── app.py                  # Main Flask app and routes
├── services/
│   └── gemini_service.py   # Gemini API integration
├── requirements.txt        # Python dependencies
├── .env                   # Environment variables (local)
├── .env.example          # Template for env vars
└── README.md
```

## Environment Variables

- `GEMINI_API_KEY` - Your Google Gemini API key (required)
- `FLASK_ENV` - `development` or `production`
- `FLASK_DEBUG` - `True` or `False`

## CORS Configuration

Configured to accept requests from any origin (for mobile testing). For production, restrict to specific domains:

```python
CORS(app, resources={
    r"/api/*": {
        "origins": ["https://yourdomain.com"],
        "methods": ["POST", "GET"]
    }
})
```

## Gemini API Response Format

Gemini returns a JSON object that the service parses and returns to the frontend.

Field definitions:

- `name` (string, required) - Food item name
- `price` (string, optional) - Estimated or visible price
- `ingredients` (array) - List of main ingredients
- `calories` (number, optional) - Estimated calories
- `protein` (string, optional) - Protein content in grams
- `carbs` (string, optional) - Carbohydrate content in grams
- `fat` (string, optional) - Fat content in grams
- `confidence` (number 0-1) - Confidence level of identification

## Error Handling

The server handles:

- Missing or invalid image data
- Gemini API failures and rate limits
- Invalid JSON responses
- Image decode errors

All errors return appropriate HTTP status codes and error messages.

## Performance

- Average analysis time: 2-5 seconds
- Image size: 500KB - 1MB (recommended)
- Rate limit: Depends on Gemini API plan

## Production Deployment

For production, consider:

1. Moving API key to secure environment management (AWS Secrets Manager, etc.)
2. Adding authentication/authorization
3. Implementing result caching with Redis
4. Adding logging and monitoring
5. Setting up rate limiting
6. Using gunicorn or similar production WSGI server

## Troubleshooting

### "GEMINI_API_KEY not set"

- Ensure `.env` file exists and contains valid API key
- Check that `.env` is in the backend directory

### API Key validation error

- Verify API key is correct
- Check Gemini API is enabled in Google Cloud Console

### Image analysis failures

- Ensure image is valid JPEG/PNG
- Check image contains recognizable food
- Verify internet connection for Gemini API calls

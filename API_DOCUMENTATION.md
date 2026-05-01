# API Documentation

## Base URL

**Development:** `http://localhost:5000`  
**Production:** `https://your-backend-url.com`

---

## Endpoints

### 1. Health Check

**Endpoint:** `GET /api/health`

**Description:** Check if backend is running and accessible

**Request:**

```bash
curl http://localhost:5000/api/health
```

**Response (200 OK):**

```json
{
  "status": "ok",
  "message": "Food Scanner Backend is running"
}
```

**Use Case:** Verify backend connectivity before making analysis requests

---

### 2. Analyze Food Image

**Endpoint:** `POST /api/analyze-food`

**Description:** Send food image to Gemini for analysis

**Request:**

```javascript
// JavaScript (Axios)
const response = await axios.post(
  "http://localhost:5000/api/analyze-food",
  {
    image_data: "data:image/jpeg;base64,/9j/4AAQSkZJRgABA...",
  },
  {
    headers: {
      "Content-Type": "application/json",
    },
  },
);
```

**Request Body:**

```json
{
  "image_data": "data:image/jpeg;base64,<base64_encoded_image>"
}
```

**Request Body Schema:**
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| image_data | string | Yes | Base64 encoded image with data URL prefix |

**Image Format:**

- Must include `data:image/jpeg;base64,` prefix
- Supported formats: JPEG, PNG, WebP
- Maximum size: 10MB
- Minimum size: Food item must be clearly visible

**Response (200 OK):**

```json
{
  "name": "Caesar Salad",
  "price": "$12.99",
  "ingredients": [
    "Romaine Lettuce",
    "Parmesan Cheese",
    "Croutons",
    "Caesar Dressing"
  ],
  "calories": "320",
  "protein": "18g",
  "carbs": "15g",
  "fat": "22g",
  "confidence": "0.92"
}
```

**Response Schema:**
| Field | Type | Description |
|-------|------|-------------|
| name | string | Detected food item name |
| price | string? | Optional estimated price |
| ingredients | array | List of detected ingredients |
| calories | string? | Estimated calorie count |
| protein | string? | Estimated protein content |
| carbs | string? | Estimated carbohydrate content |
| fat | string? | Estimated fat content |
| confidence | string | Confidence score (0-1) |

**Possible Error Responses:**

**400 Bad Request:**

```json
{
  "error": "Missing 'image_data' field"
}
```

**400 Unprocessable Image:**

```json
{
  "error": "Invalid image format. Please use JPEG or PNG."
}
```

**500 Internal Server Error:**

```json
{
  "error": "Failed to analyze image: Invalid API key"
}
```

**503 API Temporarily Unavailable:**

```json
{
  "error": "Gemini API is temporarily unavailable. Please try again later."
}
```

**Use Cases:**

- Analyze food from camera image
- Get nutrition information
- Extract ingredients list
- Estimate food pricing

**Example with cURL:**

```bash
# Create base64 image first
BASE64_IMAGE=$(base64 -i food.jpg | tr -d '\n')

# Send to API
curl -X POST http://localhost:5000/api/analyze-food \
  -H "Content-Type: application/json" \
  -d "{\"image_data\":\"data:image/jpeg;base64,$BASE64_IMAGE\"}"
```

**Timeout:** 30 seconds (Gemini processing typically 2-5 seconds)

---

### 3. Cached Analysis (Optional)

**Endpoint:** `GET /api/cached-analysis/<image_hash>`

**Description:** Retrieve previously analyzed results (currently returns 404)

**Status:** Not implemented in this version

**Future Use:** Would store analysis results to avoid re-analyzing same images

---

## CORS Configuration

The backend includes CORS headers allowing requests from:

- Frontend: `http://localhost:5173`
- Mobile devices: Any origin (development mode)

**Production:** Update CORS settings in `backend/app.py` to restrict to your domain

---

## Error Handling

### HTTP Status Codes

| Code | Meaning             | Action                           |
| ---- | ------------------- | -------------------------------- |
| 200  | Success             | Analysis complete, use results   |
| 400  | Bad Request         | Check image_data format and size |
| 429  | Too Many Requests   | Rate limited, wait 60 seconds    |
| 500  | Server Error        | Check API key, try again         |
| 503  | Service Unavailable | Gemini API down, retry later     |

### Error Response Format

```json
{
  "error": "Human-readable error message",
  "details": "Technical details (in development)"
}
```

---

## Rate Limiting

**Current:** Unlimited (development)  
**Production:** Google Gemini API rate limits apply (typically 60 requests/minute)

**When Rate Limited (429):**

```json
{
  "error": "Rate limit exceeded. Please try again later."
}
```

**Action:** Wait 60 seconds before retrying

---

## Authentication

**Current:** No authentication (API key kept on backend)

**Production Recommendations:**

- Add API key authentication
- Implement JWT tokens
- Use rate limiting per user
- Add request signing

---

## Request/Response Examples

### Example 1: Basic Burger Analysis

**Request:**

```bash
curl -X POST http://localhost:5000/api/analyze-food \
  -H "Content-Type: application/json" \
  -d '{"image_data":"data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUg..."}'
```

**Response:**

```json
{
  "name": "Cheeseburger",
  "price": "$8.99",
  "ingredients": [
    "Ground Beef",
    "Cheddar Cheese",
    "Lettuce",
    "Tomato",
    "Onion",
    "Pickle",
    "Sesame Bun"
  ],
  "calories": "540",
  "protein": "28g",
  "carbs": "42g",
  "fat": "24g",
  "confidence": "0.95"
}
```

### Example 2: Salad Analysis with Lower Confidence

**Response:**

```json
{
  "name": "Mixed Greens Salad",
  "price": "$9.50",
  "ingredients": ["Lettuce Mix", "Tomatoes", "Cucumbers", "Dressing"],
  "calories": "180",
  "protein": "8g",
  "carbs": "12g",
  "fat": "12g",
  "confidence": "0.78"
}
```

### Example 3: Non-Food Image

**Response:**

```json
{
  "name": "Not identified as food",
  "price": null,
  "ingredients": [],
  "calories": null,
  "protein": null,
  "carbs": null,
  "fat": null,
  "confidence": "0.15"
}
```

---

## Integration Guide

### Frontend Integration

```javascript
// Using Axios (already setup)
import axios from "axios";

async function analyzeFoodImage(base64Image) {
  try {
    const response = await axios.post(
      `${process.env.VITE_API_URL}/api/analyze-food`,
      { image_data: base64Image },
    );
    return response.data; // FoodAnalysisResult
  } catch (error) {
    console.error("Analysis failed:", error);
    throw error;
  }
}
```

### Mobile App Integration

```javascript
// React Native example
const analyzeFoodImage = async (base64Image) => {
  const response = await fetch("http://backend-url:5000/api/analyze-food", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      image_data: `data:image/jpeg;base64,${base64Image}`,
    }),
  });
  return await response.json();
};
```

### Python Integration

```python
import requests
import base64

def analyze_food(image_path):
    with open(image_path, 'rb') as f:
        image_base64 = base64.b64encode(f.read()).decode()

    response = requests.post(
        'http://localhost:5000/api/analyze-food',
        json={'image_data': f'data:image/jpeg;base64,{image_base64}'}
    )
    return response.json()
```

---

## Performance Considerations

### Request Size

- Average image: 100-500KB (base64 encoded)
- Maximum: 10MB
- Larger images take longer to transmit

### Response Time

- Network latency: 100-500ms
- Gemini processing: 1-3 seconds
- Total: 2-5 seconds typical

### Optimization Tips

- Compress images before encoding
- Use lossy compression (JPEG) instead of PNG
- Crop to focus area before sending
- Cache results locally when possible

---

## Monitoring & Debugging

### Enable Backend Logging

Edit `backend/app.py`:

```python
import logging
logging.basicConfig(level=logging.DEBUG)
```

### Monitor Requests

```bash
# Watch API calls in real-time
tail -f backend.log | grep "analyze-food"
```

### Measure Response Time

```bash
# Using curl with timing
curl -w "\nTotal: %{time_total}s\n" \
  -X POST http://localhost:5000/api/analyze-food \
  -H "Content-Type: application/json" \
  -d '{"image_data":"..."}'
```

---

## Deployment Considerations

### Environment Variables

Set in production environment:

```
GEMINI_API_KEY=sk-prod-key-here
FLASK_ENV=production
FLASK_DEBUG=False
```

### CORS Headers

Update for production domain:

```python
CORS(app, resources={r"/api/*": {"origins": ["https://yourdomain.com"]}})
```

### SSL/HTTPS

Required in production for camera access

### Rate Limiting

Implement in production:

```python
from flask_limiter import Limiter
limiter = Limiter(app, key_func=lambda: request.remote_addr)
@limiter.limit("60 per minute")
```

---

## API Versioning

**Current Version:** 1.0  
**Base Path:** `/api/`

Future versions would use:

- `/api/v2/analyze-food`
- `/api/v2/health`

---

## Troubleshooting API Calls

### Test with Postman/Insomnia

1. Create new POST request
2. URL: `http://localhost:5000/api/analyze-food`
3. Headers: `Content-Type: application/json`
4. Body (raw):

```json
{
  "image_data": "data:image/jpeg;base64,/9j/4AAQSkZJRgA..."
}
```

### Common API Errors

| Error               | Cause             | Solution             |
| ------------------- | ----------------- | -------------------- |
| 400 Bad Request     | Invalid JSON      | Check JSON syntax    |
| 400 Missing field   | No image_data     | Add image_data field |
| 500 Invalid API key | Wrong Gemini key  | Update .env file     |
| 503 Service down    | Gemini API outage | Check status page    |

---

## Support

- API Issues: Check `TROUBLESHOOTING.md`
- Gemini Documentation: https://ai.google.dev/
- Backend Code: See `backend/app.py`
- Service Implementation: See `backend/services/gemini_service.py`

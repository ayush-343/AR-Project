# Food Scanner - WebAR Food Detection with Gemini AI

A production-grade mobile web application that uses device camera and Google Gemini AI to analyze food images and extract nutritional information.

## 🎯 Overview

**Food Scanner** lets users:

1. 📷 Capture food/menu images using device camera
2. ✂️ Crop the specific food item they want to analyze
3. 🤖 Get AI-powered food analysis (name, ingredients, nutrition)
4. 📊 View extracted nutritional information in a clean interface

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Frontend (React + Vite)                  │
│  - Camera capture via browser APIs                          │
│  - Interactive image cropping                              │
│  - Food details display                                    │
└──────────────────────┬──────────────────────────────────────┘
                       │ HTTPS
┌──────────────────────▼──────────────────────────────────────┐
│           Backend (Python Flask)                            │
│  - API endpoint: POST /api/analyze-food                    │
│  - Receives base64 image from frontend                     │
│  - Proxies to Google Gemini API                           │
│  - Returns structured food data                           │
└──────────────────────┬──────────────────────────────────────┘
                       │
┌──────────────────────▼──────────────────────────────────────┐
│        Google Gemini API (Vision + LLM)                    │
│  - Analyzes image with vision model                        │
│  - Extracts food name, ingredients, nutrition            │
│  - Returns JSON response                                   │
└─────────────────────────────────────────────────────────────┘
```

## 📁 Project Structure

```
food-scanner/
├── frontend/                    # React + Vite application
│   ├── src/
│   │   ├── components/         # React components
│   │   ├── pages/              # Page components
│   │   ├── hooks/              # Custom hooks
│   │   ├── services/           # API clients
│   │   ├── types/              # TypeScript types
│   │   └── App.tsx
│   ├── index.html
│   ├── package.json
│   ├── tsconfig.json
│   ├── vite.config.ts
│   ├── .env                    # Frontend config
│   └── README.md
│
├── backend/                    # Flask API server
│   ├── app.py                  # Main Flask app
│   ├── services/
│   │   └── gemini_service.py   # Gemini integration
│   ├── requirements.txt
│   ├── .env                    # Backend config
│   └── README.md
│
└── README.md                   # This file
```

## 🚀 Quick Start

### Prerequisites

- Node.js 16+ and npm
- Python 3.8+
- Google account with Gemini API access
- Modern browser with camera support (iOS Safari, Android Chrome, etc.)

### Frontend Setup

```bash
cd frontend
npm install
cp .env.example .env
# Edit .env with your API URL
npm run dev
```

Visit `http://localhost:5173`

### Backend Setup

```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env
# Edit .env with your Gemini API key
python app.py
```

Server runs at `http://localhost:5000`

## 🔑 Getting API Keys

### Google Gemini API Key

1. Go to [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Click "Create API Key"
3. Copy key and add to backend `.env`:
   ```
   GEMINI_API_KEY=your_key_here
   ```

### Zappar License (Optional)

- For future AR features, sign up at [Zappar Studio](https://zappar.io)
- Add license key to frontend `.env` when ready

## 📱 User Workflow

1. **Launch App**: Open frontend URL on mobile device
2. **Request Permission**: Grant camera access
3. **Capture Image**: Point camera at food and tap "Capture"
4. **Crop Food Item**: Drag corners to select the food
5. **Wait for Analysis**: App sends to Gemini (2-5 seconds)
6. **View Results**: See food name, ingredients, nutrition facts
7. **Scan Again**: Tap "Scan Another Dish" to repeat

## 🔌 API Endpoints

### Frontend → Backend

**Analyze Food**

```
POST /api/analyze-food
Content-Type: application/json

{
  "image": "data:image/jpeg;base64,/9j/4AAQSkZJRg..."
}
```

Response:

```json
{
  "name": "Spaghetti Carbonara",
  "price": "$14.99",
  "ingredients": ["pasta", "eggs", "bacon", "pecorino cheese"],
  "calories": 450,
  "protein": "18g",
  "carbs": "55g",
  "fat": "16g",
  "confidence": 0.92
}
```

## 📊 Technology Stack

### Frontend

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Axios** - HTTP client
- **CSS Modules** - Styling

### Backend

- **Flask 3.0** - Web framework
- **Flask-CORS** - Cross-origin requests
- **google-generativeai** - Gemini API SDK
- **Python 3.8+** - Runtime

### AI/ML

- **Google Gemini 1.5 Flash** - Vision + LLM model
- **Base64 Image Encoding** - Image transmission

## ⚙️ Configuration

### Frontend (.env)

```
VITE_API_URL=http://localhost:5000
VITE_ZAPPAR_LICENSE_KEY=your_key_here
```

### Backend (.env)

```
GEMINI_API_KEY=your_api_key_here
FLASK_ENV=development
FLASK_DEBUG=True
```

## 🧪 Testing

### Manual Testing Checklist

- [ ] Camera initialization and permission handling
- [ ] Image capture from camera feed
- [ ] Image cropping with drag/resize
- [ ] Image analysis via Gemini API
- [ ] Food data display with all fields
- [ ] Error handling and retry logic
- [ ] Multiple scans in one session
- [ ] Mobile responsive design
- [ ] iOS Safari compatibility
- [ ] Android Chrome compatibility

## 📈 Performance

- **Bundle Size**: ~350KB (gzipped frontend)
- **API Response Time**: 2-5 seconds
- **Memory Usage**: <50MB on mobile
- **Target FPS**: 30+ during camera preview

## 🔒 Security

- ✅ API key stored server-side (never exposed to frontend)
- ✅ CORS configured for production domains
- ✅ Base64 image encoding for safe transmission
- ✅ Input validation on both frontend and backend
- ✅ Error messages don't leak sensitive info

## 🚢 Deployment

### Frontend Deployment (Vercel/Netlify)

```bash
cd frontend
npm run build
# Deploy dist/ folder to Vercel/Netlify
```

### Backend Deployment (Heroku/Railway)

```bash
cd backend
# Add Procfile:
# web: gunicorn app:app
git push heroku main
```

Update frontend `.env` with production backend URL.

## 📝 Development Notes

### Adding Features

1. Frontend components go in `src/components/`
2. Backend routes in `app.py`
3. Services/utilities in respective folders
4. Update TypeScript types in `src/types/`

### Gemini API Customization

Edit the prompt in `backend/services/gemini_service.py` to request different fields or formats.

### Caching

Implement Redis caching in backend for frequently analyzed dishes:

```python
cache.set(image_hash, result, timeout=3600)
```

## 🐛 Troubleshooting

### "Camera permission denied"

- Ensure HTTPS is used on production
- Check browser permissions for camera

### "Gemini API key not found"

- Verify `.env` file in backend root
- Check API key is valid in Google Cloud Console

### "Image analysis failed"

- Ensure image contains recognizable food
- Check backend has internet connection
- Review Gemini API rate limits

## 📚 Resources

- [Google Gemini API Docs](https://ai.google.dev/)
- [React Documentation](https://react.dev/)
- [Flask Documentation](https://flask.palletsprojects.com/)
- [Vite Documentation](https://vitejs.dev/)

## 📄 License

MIT License - feel free to use this project for personal or commercial purposes.

## 👥 Contributing

Contributions welcome! Please:

1. Fork the repository
2. Create a feature branch
3. Submit a pull request

## 📞 Support

For issues and questions:

- Check the README files in `frontend/` and `backend/`
- Review API response handling in the code
- Verify environment variables are set correctly

---

**Ready to get started?** Follow the Quick Start section above! 🚀

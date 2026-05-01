# Food Scanner Frontend

React + Zappar camera-based food scanning application with Google Gemini AI integration.

## Features

- 📷 Real-time camera capture using device camera
- ✂️ Interactive image cropping interface
- 🤖 AI-powered food analysis using Google Gemini
- 📊 Nutritional information extraction
- 📱 Mobile-optimized responsive UI
- ⚡ Fast, lightweight React + Vite setup

## Requirements

- Node.js 16+ and npm
- Modern mobile browser with camera support
- Internet connection for Gemini API calls

## Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Copy `.env.example` to `.env` and update:

```bash
cp .env.example .env
```

Edit `.env`:

```
VITE_API_URL=http://localhost:5000
VITE_ZAPPAR_LICENSE_KEY=your_license_key_here
```

### 3. Run Development Server

```bash
npm run dev
```

The app will open at `http://localhost:5173`

### 4. Build for Production

```bash
npm run build
```

Output will be in the `dist` folder.

## Project Structure

```
src/
├── components/          # React components
│   ├── CameraView.tsx   # Camera capture interface
│   ├── CropView.tsx     # Image cropper
│   ├── AnalyzingView.tsx # Loading state
│   └── FoodInfoPanel.tsx # Results display
├── pages/              # Page components
│   └── FoodScanner.tsx  # Main scanner page
├── hooks/              # Custom React hooks
│   ├── useImageCapture.ts
│   ├── useImageCrop.ts
│   └── useImageAnalysis.ts
├── services/           # API clients
│   └── FoodAnalysisService.ts
├── types/              # TypeScript types
│   └── food.ts
├── App.tsx
└── main.tsx
```

## Usage

1. **Capture**: Point camera at food/menu and tap "Capture"
2. **Crop**: Drag and resize crop box to select food item
3. **Analyze**: Tap "Analyze" to send to backend for Gemini analysis
4. **View Results**: See extracted food details with nutrition info
5. **Scan Again**: Tap "Scan Another Dish" to repeat

## Browser Support

- ✅ Chrome/Chromium (Android)
- ✅ Safari (iOS 14+)
- ✅ Firefox (Android)

## API Integration

The frontend communicates with backend at `VITE_API_URL`:

- `POST /api/analyze-food` - Send cropped image for analysis
- `GET /api/health` - Health check endpoint

See backend README for more details.

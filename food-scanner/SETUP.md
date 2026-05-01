# Setup & Installation Guide

## Project Overview

The Food Scanner consists of two main parts:

- **Frontend**: React + Vite application for camera capture and UI
- **Backend**: Python Flask server for Gemini API integration

## Prerequisites

### Required

- **Node.js 16+** - [Download](https://nodejs.org/)
- **Python 3.8+** - [Download](https://www.python.org/downloads/)
- **Git** (optional) - For version control
- **Modern mobile browser** - iOS Safari (14+) or Android Chrome
- **Internet connection** - For Gemini API

### Accounts

- **Google Account** - For Gemini API access
- **Mobile device** - With camera for testing

## Step-by-Step Installation

### 1. Get Google Gemini API Key

1. Go to [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the API key (you'll need this in Step 6)

### 2. Backend Setup

```bash
# Navigate to backend directory
cd food-scanner/backend

# Create Python virtual environment
python3 -m venv venv

# Activate virtual environment
# On macOS/Linux:
source venv/bin/activate
# On Windows:
# venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Create .env file with your API key
cp .env.example .env

# Edit .env and add your Gemini API key:
# GEMINI_API_KEY=your_actual_key_here
```

### 3. Frontend Setup

```bash
# Navigate to frontend directory
cd ../frontend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env (keep defaults if running locally):
# VITE_API_URL=http://localhost:5000
```

### 4. Start the Backend Server

```bash
# From food-scanner/backend directory
# Make sure virtual environment is activated

# On macOS/Linux:
source venv/bin/activate

# Run Flask app
python3 app.py
```

You should see:

```
 * Running on http://127.0.0.1:5000
```

### 5. Start the Frontend Dev Server

In a new terminal:

```bash
# From food-scanner/frontend directory
npm run dev
```

You should see:

```
  ➜  Local:   http://localhost:5173/
```

### 6. Access the Application

Open your browser to `http://localhost:5173`

- On local machine: Works as-is
- On mobile/remote: Use your machine's IP address
  - Example: `http://192.168.1.100:5173`

## Environment Variable Configuration

### Frontend (.env)

```
# API endpoint
VITE_API_URL=http://localhost:5000

# Zappar license (optional, for future AR features)
VITE_ZAPPAR_LICENSE_KEY=your_license_key
```

### Backend (.env)

```
# Google Gemini API key (REQUIRED)
GEMINI_API_KEY=your_actual_api_key_here

# Flask settings
FLASK_ENV=development
FLASK_DEBUG=True
```

## Testing the Setup

### 1. Check Backend Health

Open in browser: `http://localhost:5000/api/health`

Expected response:

```json
{
  "status": "ok",
  "message": "Food Scanner Backend is running"
}
```

### 2. Test with Sample Food Image

Use the frontend UI:

1. Tap "Capture" button
2. Allow camera access if prompted
3. Point at any food item or image
4. Tap "Capture" to take photo
5. Adjust crop area and tap "Analyze"
6. Wait for results

## Troubleshooting

### Issue: "GEMINI_API_KEY not set"

**Solution:**

1. Verify `.env` file exists in `backend/` directory
2. Check the file contains: `GEMINI_API_KEY=your_key_here`
3. Make sure there are no spaces around the `=` sign
4. Restart the backend server after editing `.env`

### Issue: "Module not found" in backend

**Solution:**

```bash
# Ensure virtual environment is activated
source venv/bin/activate

# Reinstall dependencies
pip install -r requirements.txt
```

### Issue: Frontend can't connect to backend

**Solution:**

1. Verify backend is running: `http://localhost:5000/api/health`
2. Check frontend `.env` has correct `VITE_API_URL`
3. On mobile, use machine IP: `http://192.168.x.x:5000`
4. Disable browser extensions that might block requests

### Issue: Camera permission denied

**Solution:**

1. On mobile, open Settings → Browser → Camera
2. Enable camera access for the app
3. For HTTPS (production), it's required for camera access
4. Clear browser cache and try again

### Issue: Gemini API errors

**Solution:**

1. Verify API key is correct in `.env`
2. Check Google Cloud Console that Gemini API is enabled
3. Check API quotas and rate limits
4. Ensure internet connection is stable

### Issue: Image analysis fails

**Solution:**

1. Try with a clearer food image
2. Ensure crop area contains the food item clearly
3. Check backend logs for detailed error messages
4. Verify Gemini API key has proper permissions

## Development Workflow

### Making Changes

#### Frontend:

```bash
cd frontend
npm run dev  # Auto-reloads on file changes
```

#### Backend:

```bash
cd backend
source venv/bin/activate
python3 app.py  # Reloads on file changes (Flask debug mode)
```

### Building for Production

#### Frontend:

```bash
cd frontend
npm run build  # Creates dist/ folder
npm run preview  # Test production build locally
```

#### Backend:

```bash
# Use gunicorn for production
pip install gunicorn
gunicorn app:app
```

## Accessing from Mobile Device

### Local Network (Development)

1. Get your machine's IP:
   - macOS/Linux: `ifconfig | grep "inet "`
   - Windows: `ipconfig`

2. Access on mobile:
   - Frontend: `http://192.168.x.x:5173`
   - Backend: `http://192.168.x.x:5000/api/health`

### Over Internet (Production)

1. Deploy frontend to Vercel/Netlify
2. Deploy backend to Heroku/Railway
3. Update frontend `.env` with production backend URL

## Project Structure Reminder

```
food-scanner/
├── frontend/          # React app
│   ├── src/
│   ├── package.json
│   ├── .env
│   └── vite.config.ts
│
├── backend/           # Flask server
│   ├── app.py
│   ├── services/
│   ├── requirements.txt
│   ├── .env
│   └── venv/         # Virtual environment
│
└── README.md          # Main documentation
```

## Next Steps

1. ✅ Complete setup as described above
2. Test the app with sample food images
3. Explore the codebase in `frontend/src` and `backend/`
4. Customize Gemini prompt in `backend/services/gemini_service.py`
5. Deploy to production when ready

## Common Tasks

### Run Frontend Only (without backend)

```bash
cd frontend
npm run dev
# App will show errors if trying to analyze, but UI loads
```

### Run Backend Only

```bash
cd backend
source venv/bin/activate
python3 app.py
# Test with API calls only
```

### Check Installed Packages

Frontend:

```bash
npm list
```

Backend:

```bash
pip list
```

### Update Dependencies

Frontend:

```bash
npm update
```

Backend:

```bash
pip install --upgrade -r requirements.txt
```

## Performance Tips

- Close other applications to free up memory
- Use a modern browser (latest Chrome/Safari)
- Test on a device close to your WiFi router
- Keep Gemini API key private and secure

## Support

- Check frontend README: `food-scanner/frontend/README.md`
- Check backend README: `food-scanner/backend/README.md`
- Review Google Gemini docs: https://ai.google.dev/
- Check error messages in browser console and terminal

---

**You're all set!** 🎉 The app is ready to use. Start with step 4 to run the servers.

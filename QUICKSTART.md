# Quick Start (5 Minutes)

## Prerequisites

- Node.js 16+ installed
- Python 3.8+ installed
- Google account for Gemini API
- Terminal/Command line

## The Fast Way

### 1. Get API Key (1 min)

1. Visit https://aistudio.google.com/app/apikey
2. Click "Create API Key"
3. Copy the key

### 2. Setup Backend (2 min)

```bash
cd food-scanner/backend

# Create environment
python3 -m venv venv && source venv/bin/activate

# Install and configure
pip install -r requirements.txt
echo "GEMINI_API_KEY=YOUR_API_KEY_HERE" > .env

# Run
python3 app.py
```

### 3. Setup Frontend (2 min)

**In a new terminal:**

```bash
cd food-scanner/frontend
npm install
npm run dev
```

### 4. Test It!

- Open http://localhost:5173
- Tap Capture → point at food → Capture → Analyze
- Done! 🎉

## Troubleshooting Quick Fixes

**Backend won't start:**

```bash
# Make sure you're in backend folder and venv is activated
source venv/bin/activate
python3 app.py
```

**Frontend won't start:**

```bash
cd frontend
npm install  # Try again
npm run dev
```

**API key error:**

- Make sure `.env` file exists in `backend/` folder
- Check your API key is correct
- Restart backend after editing `.env`

## Next Steps

See detailed docs:

- `SETUP.md` - Complete setup guide
- `README.md` - Full documentation
- `frontend/README.md` - Frontend details
- `backend/README.md` - Backend details

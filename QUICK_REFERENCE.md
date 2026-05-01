# 🚀 Quick Reference Card

## One-Page Cheat Sheet for Food Scanner

---

## ⚡ Start Application (Copy & Paste)

### Terminal 1: Backend

```bash
cd /Users/ayushsrivastava/Projects/Ar-vr_v2/food-scanner/backend
source venv/bin/activate
export GEMINI_API_KEY="your_api_key_here"
python3 app.py
```

### Terminal 2: Frontend

```bash
cd /Users/ayushsrivastava/Projects/Ar-vr_v2/food-scanner/frontend
npm run dev
```

### Then Open:

```
http://localhost:5173
```

---

## 🔑 Get API Key (Required)

1. Go to: https://aistudio.google.com/app/apikey
2. Click "Create API Key"
3. Copy the key
4. Paste into `backend/.env` as `GEMINI_API_KEY=your_key`
5. Restart backend

---

## 📱 Using the App

1. **Allow Camera** - Browser asks for permission
2. **Capture** - Take photo of food
3. **Crop** - Drag to select food area
4. **Analyze** - Wait 2-5 seconds
5. **View Results** - See nutrition info
6. **Scan Again** - Or try another dish

---

## 🧪 Quick Tests

### Health Check

```bash
curl http://localhost:5000/api/health
```

Should return: `{"status":"ok","message":"Food Scanner Backend is running"}`

### Test Image Analysis

```bash
# Create sample base64 image (you need an actual image)
curl -X POST http://localhost:5000/api/analyze-food \
  -H "Content-Type: application/json" \
  -d '{"image_data":"data:image/jpeg;base64,..."}'
```

---

## 🔧 Common Troubleshooting

| Problem                  | Solution                          |
| ------------------------ | --------------------------------- |
| Backend won't start      | `source venv/bin/activate` first  |
| "GEMINI_API_KEY not set" | Update `.env` and restart backend |
| Frontend won't start     | Run `npm install` in `frontend/`  |
| Camera won't work        | Check browser permissions         |
| API connection fails     | Ensure both servers are running   |
| Slow analysis            | Wait 5+ seconds or check network  |

---

## 📂 Important Files

| File                                           | Purpose          |
| ---------------------------------------------- | ---------------- |
| `backend/app.py`                               | Flask server     |
| `backend/services/gemini_service.py`           | Gemini API calls |
| `frontend/src/pages/FoodScanner.tsx`           | Main UI          |
| `frontend/src/services/FoodAnalysisService.ts` | API client       |
| `backend/.env`                                 | API key config   |
| `frontend/.env`                                | Frontend config  |

---

## 📚 Documentation Files

| File                      | When to Read         |
| ------------------------- | -------------------- |
| `QUICKSTART.md`           | First time (5 min)   |
| `SETUP.md`                | Need help setting up |
| `TROUBLESHOOTING.md`      | Something's broken   |
| `API_DOCUMENTATION.md`    | Working with API     |
| `README.md`               | Full overview        |
| `DEPLOYMENT_CHECKLIST.md` | Before production    |

---

## 🌐 URLs (Development)

| Service           | URL                                         |
| ----------------- | ------------------------------------------- |
| Frontend          | http://localhost:5173                       |
| Backend           | http://localhost:5000                       |
| Health Check      | http://localhost:5000/api/health            |
| Analysis Endpoint | POST http://localhost:5000/api/analyze-food |

---

## 🛠️ Build & Deploy

### Build Frontend

```bash
cd frontend
npm run build
```

### Deploy Frontend

```bash
# Vercel
npm install -g vercel
vercel

# Or push to Netlify
```

### Deploy Backend

```bash
# Heroku
heroku create your-app-name
git push heroku main
heroku config:set GEMINI_API_KEY=your_key
```

---

## 🔒 Environment Variables

### Frontend `.env`

```
VITE_API_URL=http://localhost:5000
```

### Backend `.env`

```
GEMINI_API_KEY=your_actual_key_here
FLASK_ENV=development
FLASK_DEBUG=True
```

---

## 📊 Tech Stack

| Layer    | Tech          | Version    |
| -------- | ------------- | ---------- |
| Frontend | React + Vite  | 18.2 + 5.0 |
| Language | TypeScript    | 5.2        |
| HTTP     | Axios         | 1.6        |
| Backend  | Flask         | 3.0        |
| AI       | Google Gemini | Latest     |
| Runtime  | Python        | 3.13       |

---

## 🐛 Debug Tips

### Frontend Issues

- Open DevTools: `F12`
- Check Console for errors
- Network tab for API calls
- Look for red error messages

### Backend Issues

- Check terminal output where `python3 app.py` runs
- Add print statements for debugging
- Check `.env` file for API key
- Look for error stack traces

### Mobile Issues

- Use machine IP: `http://192.168.x.x:5173`
- Check Safari/Chrome permissions
- Clear browser cache
- Try different browser

---

## 📞 Emergency Commands

### Kill running processes

```bash
# Kill backend
pkill -f "python3 app.py"

# Kill frontend
pkill -f "vite"

# Kill everything
killall node
killall python3
```

### Fresh start

```bash
# Backend
cd backend
source venv/bin/activate
python3 app.py

# Frontend (new terminal)
cd frontend
npm run dev
```

### Clean reinstall

```bash
# Frontend
cd frontend
rm -rf node_modules
npm install
npm run dev

# Backend
cd backend
rm -rf venv
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python3 app.py
```

---

## 🎯 Success Checklist

- [ ] Backend running on port 5000
- [ ] Frontend running on port 5173
- [ ] API key added to `backend/.env`
- [ ] Health check returns OK
- [ ] Camera permission granted
- [ ] Can capture photo
- [ ] Can crop image
- [ ] Analysis completes
- [ ] Results display

---

## 📈 Performance Targets

| Metric        | Target | Actual |
| ------------- | ------ | ------ |
| Frontend load | <2s    | ✅     |
| Analysis time | 2-5s   | ✅     |
| API response  | <100ms | ✅     |
| Mobile FPS    | 30+    | ✅     |

---

## 🚀 Deployment Steps

1. Get API key (5 min)
2. Run servers locally (2 min)
3. Test app works (5 min)
4. Build frontend (2 min)
5. Deploy frontend (5 min)
6. Deploy backend (10 min)
7. Test production (5 min)

**Total: ~30 minutes**

---

## 💡 Pro Tips

✨ Use `npm run build -- --report` to analyze bundle size  
✨ Enable HTTPS for production camera access  
✨ Monitor Gemini API quota regularly  
✨ Keep `.env` files out of version control  
✨ Test on real mobile device before deployment  
✨ Set up error tracking (Sentry) early  
✨ Use production-grade database for scaling  
✨ Implement caching for frequently scanned foods

---

## 🆘 Get Help

1. Read `QUICKSTART.md` (fastest)
2. Check `TROUBLESHOOTING.md`
3. Review relevant README file
4. Check browser console (F12)
5. Check backend terminal output

---

## 📋 Pre-Launch Checklist

- [ ] All dependencies installed
- [ ] API key obtained
- [ ] Backend running
- [ ] Frontend running
- [ ] Camera working
- [ ] Image analysis working
- [ ] Results displaying
- [ ] Error handling working
- [ ] Mobile testing done
- [ ] Documentation reviewed

---

## 🎉 Success!

You now have a complete, working WebAR food scanning app!

**Next:** Deploy to production and celebrate! 🚀

---

**Last Updated:** May 2024  
**Version:** 1.0  
**Status:** Ready ✅

Print this page for quick reference! 📎

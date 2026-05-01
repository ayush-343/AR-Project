# 📚 Documentation Index

Welcome to the **Food Scanner** - A production-grade WebAR application for food analysis using Google Gemini AI.

This document serves as your central hub for navigating all project documentation.

---

## 🚀 Get Started (Choose Your Path)

### ⏱️ I Have 5 Minutes

→ Read: **[QUICKSTART.md](QUICKSTART.md)**

A super fast setup guide that gets you running in 5 minutes with just a few commands.

**Best for:** Developers who want to get the app running immediately

### ⏰ I Have 20 Minutes

→ Read: **[SETUP.md](SETUP.md)**

Comprehensive step-by-step setup guide with detailed explanations and troubleshooting for each step.

**Best for:** First-time setup, thorough understanding, mobile testing

### 📖 I Want Full Details

→ Read: **[README.md](README.md)**

Complete project documentation including architecture, features, and deployment guide.

**Best for:** Understanding the full project scope and making customizations

---

## 📋 All Documentation Files

### Quick Reference

| Document                                               | Purpose              | Reading Time | For Whom         |
| ------------------------------------------------------ | -------------------- | ------------ | ---------------- |
| [QUICKSTART.md](QUICKSTART.md)                         | 5-minute setup       | 5 min        | Developers       |
| [SETUP.md](SETUP.md)                                   | Detailed setup guide | 20 min       | First-time users |
| [README.md](README.md)                                 | Project overview     | 15 min       | Project leads    |
| [IMPLEMENTATION_SUMMARY.md](IMPLEMENTATION_SUMMARY.md) | What was built       | 10 min       | Code reviewers   |
| [API_DOCUMENTATION.md](API_DOCUMENTATION.md)           | API reference        | 15 min       | Backend devs     |
| [TROUBLESHOOTING.md](TROUBLESHOOTING.md)               | Problem solving      | As needed    | Everyone         |

### Component Documentation

| Document        | Location             | Purpose              |
| --------------- | -------------------- | -------------------- |
| Frontend README | `frontend/README.md` | React app details    |
| Backend README  | `backend/README.md`  | Flask server details |

---

## 🎯 Common Tasks

### Starting the Application

**Quick Start:**

```bash
# Terminal 1 - Backend
cd food-scanner/backend
source venv/bin/activate
export GEMINI_API_KEY="your_api_key"
python3 app.py

# Terminal 2 - Frontend
cd food-scanner/frontend
npm run dev
```

Then visit: `http://localhost:5173`

→ **Detailed Guide:** [SETUP.md - Step 4 & 5](SETUP.md#4-start-the-backend-server)

### Getting API Key

1. Visit: https://aistudio.google.com/app/apikey
2. Click "Create API Key"
3. Copy the key to `backend/.env`

→ **More Info:** [SETUP.md - Step 1](SETUP.md#1-get-google-gemini-api-key)

### Testing the API

**Health Check:**

```bash
curl http://localhost:5000/api/health
```

→ **Full API Reference:** [API_DOCUMENTATION.md](API_DOCUMENTATION.md)

### Fixing Common Issues

→ **Troubleshooting Guide:** [TROUBLESHOOTING.md](TROUBLESHOOTING.md)

Common issues covered:

- Backend won't start
- Camera permission denied
- API connection fails
- Frontend build errors

### Deploying to Production

→ **Deployment Guide:** [README.md - Deployment](README.md#deployment-guide)

Covers:

- Frontend to Vercel/Netlify
- Backend to Heroku/Railway
- Environment configuration
- HTTPS setup

---

## 📁 Project Structure

```
food-scanner/
├── 📚 Documentation
│   ├── README.md                 ← Start here for overview
│   ├── QUICKSTART.md             ← Fastest setup
│   ├── SETUP.md                  ← Detailed setup
│   ├── TROUBLESHOOTING.md        ← Problem solving
│   ├── API_DOCUMENTATION.md      ← API reference
│   └── IMPLEMENTATION_SUMMARY.md ← What was built
│
├── frontend/                     # React app
│   ├── README.md
│   ├── src/
│   │   ├── components/           # UI components
│   │   ├── hooks/                # Custom React hooks
│   │   ├── services/             # API client
│   │   ├── types/                # TypeScript types
│   │   └── pages/                # Page components
│   ├── package.json              # npm dependencies
│   └── vite.config.ts            # Build config
│
└── backend/                      # Flask server
    ├── README.md
    ├── app.py                    # Flask app
    ├── services/
    │   └── gemini_service.py     # Gemini integration
    ├── requirements.txt          # Python packages
    └── venv/                     # Virtual environment
```

---

## 🔑 Key Features

✅ **Camera Capture** - Real-time device camera access  
✅ **Image Cropping** - Interactive crop interface  
✅ **Gemini AI** - Google's vision model for food analysis  
✅ **Nutrition Data** - Calories, protein, carbs, fat extraction  
✅ **Mobile Ready** - Works on iOS Safari and Android Chrome  
✅ **Offline-Ready** - Frontend works without backend (gracefully)  
✅ **TypeScript** - Full type safety on frontend  
✅ **Production Ready** - Error handling, CORS, logging

---

## 🛠️ Technology Stack

### Frontend

- React 18.2 - UI framework
- Vite 5.0 - Build tool
- TypeScript 5.2 - Type safety
- Axios - HTTP client
- CSS Modules - Component styling

### Backend

- Python 3.13 - Runtime
- Flask 3.0 - Web framework
- Google Gemini API - AI model
- python-dotenv - Config management

---

## 📊 File Manifest

**Frontend Components:** 4  
**Frontend Hooks:** 3  
**Backend Routes:** 3  
**CSS Modules:** 5  
**TypeScript Files:** 11  
**Python Files:** 2  
**Configuration Files:** 7  
**Documentation Files:** 6

**Total:** ~50 files across frontend and backend

---

## 🎓 Learning Paths

### For Frontend Developers

1. Read: [QUICKSTART.md](QUICKSTART.md)
2. Start servers per [SETUP.md](SETUP.md)
3. Explore: `frontend/src/` structure
4. Read: `frontend/README.md`
5. Reference: [API_DOCUMENTATION.md](API_DOCUMENTATION.md)

### For Backend Developers

1. Read: [SETUP.md - Backend Setup](SETUP.md#2-backend-setup)
2. Review: `backend/app.py`
3. Review: `backend/services/gemini_service.py`
4. Read: `backend/README.md`
5. Reference: [API_DOCUMENTATION.md](API_DOCUMENTATION.md)

### For Full Stack

1. Start with [QUICKSTART.md](QUICKSTART.md)
2. Then [SETUP.md](SETUP.md)
3. Read both `frontend/README.md` and `backend/README.md`
4. Review [API_DOCUMENTATION.md](API_DOCUMENTATION.md)
5. Study [IMPLEMENTATION_SUMMARY.md](IMPLEMENTATION_SUMMARY.md)

### For DevOps/Deployment

1. Read: [README.md - Deployment Guide](README.md#deployment-guide)
2. Review: `.env` files for configuration
3. Check: Docker support (if needed)

---

## ❓ FAQ

**Q: What's the fastest way to get this running?**  
A: Follow [QUICKSTART.md](QUICKSTART.md) - takes 5 minutes

**Q: What API key do I need?**  
A: Google Gemini API key from https://aistudio.google.com/app/apikey

**Q: Does this work on mobile?**  
A: Yes! iOS Safari 14+ and Android Chrome

**Q: Can I use this without the Gemini API?**  
A: Frontend works, but image analysis won't work. You could swap Gemini for another vision API.

**Q: How do I deploy to production?**  
A: See [README.md - Deployment Guide](README.md#deployment-guide)

**Q: Something's broken, where do I start?**  
A: Check [TROUBLESHOOTING.md](TROUBLESHOOTING.md)

**Q: Can I customize the food analysis?**  
A: Yes! Edit the prompt in `backend/services/gemini_service.py`

**Q: How do I add new features?**  
A: See [README.md - Development](README.md#development-setup) for architecture

---

## 🚨 Common Issues Quick Links

- **Backend won't start** → [TROUBLESHOOTING - Backend Issues](TROUBLESHOOTING.md#backend-issues)
- **Camera won't work** → [TROUBLESHOOTING - Camera Issues](TROUBLESHOOTING.md#3-camera-wont-start---permission-denied)
- **API errors** → [TROUBLESHOOTING - Integration Issues](TROUBLESHOOTING.md#integration-issues)
- **Performance slow** → [TROUBLESHOOTING - Performance](TROUBLESHOOTING.md#performance-issues)
- **Need API help** → [API_DOCUMENTATION.md - Troubleshooting](API_DOCUMENTATION.md#troubleshooting-api-calls)

---

## 🔗 External Resources

- **Google Gemini API:** https://ai.google.dev/
- **React Documentation:** https://react.dev/
- **Flask Documentation:** https://flask.palletsprojects.com/
- **Vite Guide:** https://vitejs.dev/
- **TypeScript Handbook:** https://www.typescriptlang.org/

---

## 📞 Support Workflow

### When You Need Help:

1. **Check Documentation**
   - QUICKSTART.md for setup issues
   - TROUBLESHOOTING.md for runtime issues
   - API_DOCUMENTATION.md for API issues

2. **Check Browser Console**
   - Press F12
   - Look for JavaScript errors
   - Check Network tab for failed requests

3. **Check Backend Logs**
   - Look at terminal where `python3 app.py` is running
   - Check for error stack traces

4. **Try Clean Restart**

   ```bash
   # Kill processes
   pkill -f "python3 app.py"
   pkill -f "vite"

   # Start fresh per SETUP.md
   ```

---

## ✨ Next Steps

1. **First Time?** → Start with [QUICKSTART.md](QUICKSTART.md)
2. **Need Details?** → Read [SETUP.md](SETUP.md)
3. **Want Full Picture?** → Check [README.md](README.md)
4. **Having Issues?** → See [TROUBLESHOOTING.md](TROUBLESHOOTING.md)
5. **Integrating APIs?** → Review [API_DOCUMENTATION.md](API_DOCUMENTATION.md)
6. **Curious About Code?** → Explore [IMPLEMENTATION_SUMMARY.md](IMPLEMENTATION_SUMMARY.md)

---

## 📈 Project Status

✅ **Frontend** - Complete and tested  
✅ **Backend** - Complete and tested  
✅ **Documentation** - Complete  
✅ **Environment Setup** - Complete

**Ready for:** Development, Testing, and Deployment

---

**Version:** 1.0  
**Last Updated:** May 2024  
**Status:** Production Ready ✅

---

**Start with:** [QUICKSTART.md](QUICKSTART.md) or [SETUP.md](SETUP.md)

Choose one, follow the steps, and you'll be running the app in minutes! 🚀

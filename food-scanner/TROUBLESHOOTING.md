# Troubleshooting Guide

## Common Issues & Solutions

### Backend Issues

#### 1. "ModuleNotFoundError: No module named 'flask'"

**Problem:** Python packages not installed

**Solutions:**

```bash
cd backend
source venv/bin/activate  # Activate virtual env
pip install -r requirements.txt  # Install dependencies
python3 app.py  # Try again
```

#### 2. "GEMINI_API_KEY not set"

**Problem:** Missing or incorrect API key

**Solutions:**

1. Check `.env` file exists in `backend/` directory
2. Verify content:
   ```
   GEMINI_API_KEY=sk-your-actual-key-here
   FLASK_ENV=development
   FLASK_DEBUG=True
   ```
3. **Important:** No spaces around `=` sign
4. Restart backend after editing `.env`

**Verify it's working:**

```bash
# From backend directory (with venv activated)
python3 -c "import os; print(os.getenv('GEMINI_API_KEY'))"
# Should print your API key (not empty)
```

#### 3. "address already in use" on port 5000

**Problem:** Another process using Flask port

**Solutions:**

```bash
# Find and kill process on port 5000
lsof -ti:5000 | xargs kill -9

# Or use different port
python3 app.py --port 5001
# Then update frontend VITE_API_URL to http://localhost:5001
```

#### 4. Backend health check fails

**Problem:** Backend not accessible

**Try this:**

```bash
# Terminal 1 - Backend
cd backend
source venv/bin/activate
python3 app.py

# Terminal 2 - Test
curl http://localhost:5000/api/health
# Should return: {"status":"ok","message":"Food Scanner Backend is running"}
```

#### 5. "json.decoder.JSONDecodeError" in backend logs

**Problem:** Gemini API response not valid JSON

**Causes:**

- API rate limit exceeded (wait 60 seconds)
- Invalid image format (use JPEG/PNG)
- Gemini API quota exceeded

**Solutions:**

- Wait and retry
- Try with different food image
- Check Google Cloud Console for quota status

#### 6. Gemini API returns "429 Too Many Requests"

**Problem:** Rate limit exceeded

**Solutions:**

- Wait 60+ seconds before retrying
- Check API quotas: https://console.cloud.google.com
- Upgrade plan if needed

### Frontend Issues

#### 1. "Module not found" errors after npm install

**Problem:** Incomplete dependency installation

**Solutions:**

```bash
cd frontend
rm -rf node_modules package-lock.json
npm install  # Fresh install
npm run dev
```

#### 2. "VITE_API_URL is undefined"

**Problem:** .env file not loaded

**Solutions:**

1. Create `.env` file in `frontend/` directory
2. Add: `VITE_API_URL=http://localhost:5000`
3. Restart dev server (`npm run dev`)
4. **Note:** Frontend restarts when .env changes

#### 3. Camera won't start - "Permission denied"

**Problem:** Browser camera access not granted

**Solutions:**

**On Mobile:**

1. Settings → Browser → Permissions → Camera → Allow
2. Refresh the page
3. Click "Allow" when prompted
4. Clear browser cache if still failing

**On Desktop:**

1. Check address bar for camera icon
2. Click camera icon → "Always allow"
3. Refresh page
4. Try different browser (Chrome works best)

**Important:** HTTPS required for production camera access

#### 4. Frontend can't reach backend

**Problem:** Network connectivity

**Check:**

```bash
# Backend running?
curl http://localhost:5000/api/health

# Right API URL in .env?
cat frontend/.env | grep VITE_API_URL

# Both servers running?
ps aux | grep "python3 app.py"
ps aux | grep "vite"
```

**On Mobile:**

- Use machine IP instead of localhost
- Get IP: `ifconfig | grep inet`
- Access: `http://192.168.1.100:5173`
- Update .env: `VITE_API_URL=http://192.168.1.100:5000`

#### 5. Cropping image doesn't work

**Problem:** Canvas crop logic failing

**Solutions:**

```bash
# Check console for errors (F12)
# Look for messages like "Failed to crop image"

# Verify canvas support
# Open browser console and run:
document.createElement('canvas').getContext('2d')
# Should return an object, not null
```

#### 6. Image analysis button does nothing

**Problem:** API request failing silently

**Debug:**

1. Open Browser DevTools (F12)
2. Go to Network tab
3. Click "Analyze"
4. Look for failed requests to `http://localhost:5000/api/analyze-food`
5. Click on the request to see error details

**Common errors:**

- `CORS error` → Backend CORS not enabled
- `404 Not Found` → Backend not running
- `500 Internal Server Error` → Backend error (check terminal)

#### 7. "Cannot read property of undefined" errors

**Problem:** Component state not initialized

**Solutions:**

- Refresh the page
- Clear browser cache
- Check console for specific error
- Restart dev server: `npm run dev`

### Integration Issues

#### 1. Image sent but no results

**Problem:** Gemini API not responding

**Debug steps:**

1. Check backend logs for errors
2. Verify API key is correct
3. Try with different image
4. Check image size (should be <10MB)

#### 2. Results show but partially empty

**Problem:** Gemini parsed response but missing fields

**Possible causes:**

- Food item not recognized
- Low confidence in analysis
- Image quality too low

**Solution:**

- Try with clearer, better-lit food image
- Ensure crop includes entire food item

#### 3. Slow analysis (>10 seconds)

**Problem:** Network latency or Gemini processing

**Normal timing:**

- Image upload: 1-2s
- Gemini processing: 1-3s
- Response download: 0.5-1s
- Total: 3-5s (normal)

**If slower:**

- Check internet connection
- Check Google Cloud status
- Try different image
- Check CPU usage

### Development & Testing

#### 1. Hot reload not working in frontend

**Problem:** Changes not reflecting without refresh

**Solution:**

```bash
# Restart dev server
cd frontend
npm run dev  # Press Ctrl+C and run again
```

#### 2. Backend changes not taking effect

**Problem:** Flask debug mode not working

**Solution:**

```bash
# Restart backend with debug enabled
cd backend
source venv/bin/activate
export FLASK_ENV=development
export FLASK_DEBUG=True
python3 app.py
```

#### 3. Can't build for production

**Problem:** TypeScript errors in build

**Solution:**

```bash
# Check for errors
cd frontend
npm run build  # See full error output

# Common fix
npm update  # Update packages
npm run build  # Try again
```

### Mobile-Specific Issues

#### 1. App freezes on iOS Safari

**Problem:** Memory or performance issue

**Solutions:**

- Close other tabs/apps
- Use newer iOS version (14+)
- Try with smaller image
- Check Safari settings → Advanced → Disable JavaScript (temporarily to test)

#### 2. Camera very slow on Android

**Problem:** Device performance

**Solutions:**

- Close background apps
- Reduce image quality
- Clear app cache
- Restart device

#### 3. Touch events not working

**Problem:** Event handlers not firing

**Solutions:**

```bash
# Verify touch support
# In browser console:
document.addEventListener('touchstart', (e) => console.log('Touch works'))
# Then touch the screen
```

### Performance Issues

#### 1. App loads slowly

**Optimization:**

```bash
cd frontend
npm run build
npm run preview  # Test production build
# Should be much faster than dev mode
```

#### 2. Memory usage keeps growing

**Problem:** Memory leak (rare)

**Solutions:**

- Refresh page periodically
- Close unused tabs
- Restart browser
- Check for failed API requests in console

#### 3. Image crops blurry

**Problem:** Canvas scaling or quality

**Solution:**

- Ensure browser zoom is 100%
- Use high-resolution device (newer phones better)
- Try different lighting for clarity

### Environment Issues

#### 1. "python3: command not found"

**Problem:** Python not installed or not in PATH

**Install Python:**

- macOS: `brew install python3`
- Ubuntu: `sudo apt install python3`
- Windows: https://www.python.org/downloads/

#### 2. "npm: command not found"

**Problem:** Node.js not installed

**Install Node.js:**

- https://nodejs.org/ (LTS version recommended)

#### 3. "git: command not found"

**Problem:** Git not installed (optional, only for version control)

**Install Git:**

- macOS: `brew install git`
- Ubuntu: `sudo apt install git`
- Windows: https://git-scm.com/

---

## Getting Help

### Check Logs

**Frontend:**

- Browser Console (F12)
- Network tab for API calls

**Backend:**

- Terminal output (where you ran `python3 app.py`)
- Check for error stack traces

### Verify Setup

```bash
# Backend check
cd backend
source venv/bin/activate
python3 -c "import flask, google.generativeai; print('OK')"

# Frontend check
cd frontend
npm list react react-dom axios
```

### Test API Directly

```bash
# Health check
curl http://localhost:5000/api/health

# With actual image (base64 format)
curl -X POST http://localhost:5000/api/analyze-food \
  -H "Content-Type: application/json" \
  -d '{"image_data":"data:image/jpeg;base64,..."}'
```

### Common Error Messages Reference

| Error                   | Meaning                      | Fix                      |
| ----------------------- | ---------------------------- | ------------------------ |
| 404 Not Found           | Endpoint doesn't exist       | Check backend is running |
| 503 Service Unavailable | Backend down                 | Restart `python3 app.py` |
| CORS error              | Backend didn't allow request | Enable CORS in Flask     |
| 429 Too Many Requests   | Rate limited                 | Wait 60+ seconds         |
| 401 Unauthorized        | API key invalid              | Check .env file          |
| ECONNREFUSED            | Can't connect to backend     | Start backend server     |

---

## Still Having Issues?

1. **Read the docs:**
   - SETUP.md (detailed setup)
   - QUICKSTART.md (quick reference)
   - frontend/README.md
   - backend/README.md

2. **Check error details:**
   - Browser console (Ctrl+Shift+I)
   - Backend terminal output
   - Network requests (F12 → Network tab)

3. **Try clean restart:**

   ```bash
   # Kill all processes
   pkill -f "python3 app.py"
   pkill -f "vite"

   # Fresh start
   # Terminal 1
   cd backend
   source venv/bin/activate
   python3 app.py

   # Terminal 2
   cd frontend
   npm run dev
   ```

4. **Check requirements:**
   - Node.js 16+ installed
   - Python 3.8+ installed
   - Google API key obtained
   - Internet connection active

---

**Remember:** Most issues are configuration-related. Check .env files and ports first!

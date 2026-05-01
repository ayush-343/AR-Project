# Vercel Deployment Guide

## Prerequisites

1. ✅ GitHub account with repository pushed
2. ✅ Vercel account (free tier available)
3. ✅ Gemini API key

## Step 1: Create Vercel Account

1. Go to https://vercel.com/signup
2. Sign up with GitHub (easiest option)
3. Authorize Vercel to access your GitHub repositories

## Step 2: Deploy on Vercel

### Option A: Using Vercel CLI (Recommended)

```bash
# Login to Vercel
vercel login

# Deploy from project root
cd /Users/ayushsrivastava/Projects/Ar-vr_v2/food-scanner
vercel

# Follow prompts:
# - Link to existing project? → No (first time)
# - Project name → "food-scanner"
# - Which scope? → Your personal account
# - Detected framework → Vite
# - Build command → npm run build (in frontend folder)
# - Output directory → frontend/dist
# - Root directory → ./
```

### Option B: Using Vercel Dashboard

1. Go to https://vercel.com/dashboard
2. Click "Add New..." → "Project"
3. Select your GitHub repository: `ayush-343/AR-Project`
4. Configure build settings:
   - **Build Command**: `cd frontend && npm run build`
   - **Output Directory**: `frontend/dist`
   - **Root Directory**: `./` (leave default)
5. Click "Deploy"

## Step 3: Add Environment Variables

In Vercel Dashboard:

1. Go to your project settings
2. Click **"Environment Variables"**
3. Add these variables:

| Name             | Value                  | Comment                                         |
| ---------------- | ---------------------- | ----------------------------------------------- |
| `GEMINI_API_KEY` | `your-gemini-key-here` | Get from https://aistudio.google.com/app/apikey |
| `VITE_API_URL`   | `/`                    | Relative URL for same-origin requests           |

## Step 4: Verify Deployment

After deployment completes:

1. Visit your Vercel domain (e.g., `https://food-scanner.vercel.app`)
2. Test on mobile: Accept certificate warning (if any)
3. Click "🔐 Grant Camera Permission"
4. Try capturing and analyzing food
5. Test AR viewer with "🕶️ View in AR"

## Troubleshooting

### API Errors

**Problem**: "Failed to analyze image"

- Check GEMINI_API_KEY is set in Vercel environment
- Verify API key is active in Google Cloud Console

### Build Failures

**Problem**: "Command 'cd frontend && npm run build' failed"

- Ensure all dependencies are in `frontend/package.json`
- Check no local environment files are required

### Camera Not Working

**Problem**: "Camera permission denied" on mobile

- Use HTTPS (Vercel provides this automatically)
- Clear browser cache and try again

## Project URLs After Deployment

| Service      | URL                                          |
| ------------ | -------------------------------------------- |
| Frontend     | `https://food-scanner.vercel.app`            |
| Health Check | `https://food-scanner.vercel.app/api/health` |
| API          | `https://food-scanner.vercel.app/api/`       |

## Custom Domain (Optional)

1. In Vercel Dashboard → Settings → Domains
2. Add your custom domain
3. Follow DNS setup instructions
4. Domain will be active in ~24 hours

## Rollback to Previous Deployment

If something breaks:

1. Vercel Dashboard → Deployments tab
2. Find previous working deployment
3. Click "..." → "Promote to Production"

## Local Development After Deploy

Still run locally with:

```bash
# Terminal 1: Backend
cd backend && source venv/bin/activate && python3 app.py

# Terminal 2: Frontend
cd frontend && npm run dev -- --host
```

Then access at `http://192.168.1.5:5173` (local network)

## Push Updates to Vercel

Simply push to GitHub - Vercel automatically redeploys on every commit!

```bash
git add .
git commit -m "your message"
git push origin main
```

Vercel will automatically rebuild and deploy within 1-2 minutes.

---

## Next Steps

1. ✅ Deploy on Vercel
2. ✅ Test on mobile with Vercel URL
3. ✅ Add custom domain (optional)
4. ✅ Monitor analytics in Vercel dashboard
5. ✅ Set up automatic deployments from GitHub

**Questions?** Check Vercel docs: https://vercel.com/docs

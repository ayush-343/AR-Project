# 🚀 Deployment Checklist

Complete this checklist before deploying to production.

---

## ✅ Pre-Deployment Verification

### Environment & Dependencies

- [ ] Node.js 16+ installed and verified
- [ ] Python 3.8+ installed and verified
- [ ] All npm packages installed (frontend)
- [ ] All Python packages installed (backend)
- [ ] No build errors when running `npm run build`
- [ ] Backend tested locally with `python3 app.py`

### API Configuration

- [ ] Google Gemini API key obtained
- [ ] API key tested and confirmed working
- [ ] API key added to secure environment management
- [ ] API rate limits understood (60 requests/minute typical)
- [ ] Backup API key created (for emergency)

### Frontend Verification

- [ ] Camera permission flow tested on mobile
- [ ] Image capture working correctly
- [ ] Cropping functionality verified
- [ ] All UI components render properly
- [ ] Responsive design tested on various phones
- [ ] Offline fallback works
- [ ] Build artifacts are reasonable size (<5MB)

### Backend Verification

- [ ] Health check endpoint responds (`/api/health`)
- [ ] Image analysis endpoint works (`/api/analyze-food`)
- [ ] Error handling verified (try invalid image)
- [ ] CORS headers correct for production domain
- [ ] Rate limiting tested
- [ ] Timeout configuration appropriate (30s)
- [ ] Database connections (if any) configured

### Security Review

- [ ] No credentials in version control (check .env files)
- [ ] No API keys in frontend code
- [ ] Frontend has no hardcoded backend URLs
- [ ] HTTPS enabled for production
- [ ] CORS restricted to production domain only
- [ ] No debug logging in production
- [ ] Security headers added to Flask app
- [ ] Input validation on all endpoints

### Testing Completed

- [ ] Unit tests pass (if written)
- [ ] Integration tests between frontend and backend
- [ ] Mobile device testing (iOS and Android)
- [ ] Network latency testing (slow 3G simulation)
- [ ] Error scenario testing (no API key, timeout, etc.)
- [ ] High resolution image testing
- [ ] Multiple consecutive scans
- [ ] Camera permission denied scenario

---

## 🌐 Frontend Deployment (Vercel/Netlify)

### Before Deploying

- [ ] Create `.env.production` with production API URL
- [ ] Run `npm run build` and verify output
- [ ] Test production build: `npm run preview`
- [ ] All TypeScript errors resolved

### Vercel Deployment

```bash
npm install -g vercel
vercel
```

- [ ] Connect Git repository
- [ ] Set environment variables in Vercel dashboard:
  - [ ] `VITE_API_URL=https://your-backend.com`
- [ ] Configure build settings:
  - Build command: `npm run build`
  - Output directory: `dist`
- [ ] Test production URL
- [ ] Domain configured (if custom domain)
- [ ] SSL certificate active

### Netlify Deployment

```bash
npm run build  # Creates dist/
netlify deploy --prod --dir=dist
```

- [ ] Connect Git repository
- [ ] Environment variables configured:
  - [ ] `VITE_API_URL=https://your-backend.com`
- [ ] Build settings:
  - Build command: `npm run build`
  - Publish directory: `dist`
- [ ] Test production URL
- [ ] Custom domain setup
- [ ] HTTPS/SSL configured

### Post-Frontend Deployment

- [ ] Visit production URL
- [ ] Test full workflow (capture → crop → analyze)
- [ ] Check browser console for errors
- [ ] Test on mobile device
- [ ] Verify API calls going to production backend
- [ ] Monitor performance (Lighthouse score)

---

## 🐍 Backend Deployment (Heroku/Railway)

### Heroku Deployment

#### Preparation

- [ ] Create Procfile: `web: gunicorn app:app`
- [ ] Update `requirements.txt` with gunicorn
- [ ] Test locally: `gunicorn app:app --workers=2`
- [ ] Create Heroku account

#### Deployment

```bash
heroku login
heroku create your-app-name
git push heroku main
```

#### Configuration

- [ ] Set environment variables:
  ```bash
  heroku config:set GEMINI_API_KEY=your_key
  heroku config:set FLASK_ENV=production
  heroku config:set FLASK_DEBUG=False
  ```
- [ ] Verify: `heroku config`

#### Verification

- [ ] Check logs: `heroku logs --tail`
- [ ] Test health endpoint: `https://your-app.herokuapp.com/api/health`
- [ ] Test analysis endpoint with sample image
- [ ] Monitor resource usage

### Railway Deployment

#### Preparation

- [ ] Create Railway account (railway.app)
- [ ] Install Railway CLI
- [ ] Create `Procfile`: `web: gunicorn app:app`

#### Deployment

```bash
railway login
railway init
railway up
```

#### Configuration

- [ ] Environment variables in Railway dashboard:
  - [ ] `GEMINI_API_KEY`
  - [ ] `FLASK_ENV=production`
  - [ ] `FLASK_DEBUG=False`
- [ ] Configure custom domain

### Alternative: Docker Deployment

#### Create Dockerfile

```dockerfile
FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
CMD ["gunicorn", "app:app"]
```

- [ ] Build image: `docker build -t food-scanner .`
- [ ] Test locally: `docker run -p 5000:5000 food-scanner`
- [ ] Push to Docker Hub
- [ ] Deploy to cloud (GCP, AWS, Azure)

---

## 🔐 Security Hardening

### Frontend Security

- [ ] Remove console.log statements
- [ ] Implement Content Security Policy (CSP) headers
- [ ] Add X-Frame-Options header
- [ ] Enable HSTS
- [ ] Test XSS protection
- [ ] Input validation on all forms

### Backend Security

- [ ] Add security headers to Flask:
  ```python
  @app.after_request
  def set_security_headers(response):
      response.headers['X-Frame-Options'] = 'DENY'
      response.headers['X-Content-Type-Options'] = 'nosniff'
      return response
  ```
- [ ] Implement rate limiting
- [ ] Add request timeout
- [ ] Validate all image uploads
- [ ] Sanitize error messages
- [ ] Enable request logging for audit trail
- [ ] Use strong CORS policy (not wildcard)

### API Security

- [ ] Implement API key authentication (future)
- [ ] Add request signing
- [ ] Use HTTPS only
- [ ] Implement JWT tokens (if multiple users)
- [ ] Regular security audits

---

## 📊 Performance Optimization

### Frontend

- [ ] Minimize bundle size: `npm run build -- --report`
- [ ] Enable gzip compression in deployment
- [ ] Optimize images (crop before sending)
- [ ] Implement service workers (PWA)
- [ ] Lazy load non-critical components
- [ ] Monitor Core Web Vitals (Lighthouse)

### Backend

- [ ] Enable response compression
- [ ] Implement caching headers
- [ ] Optimize Gemini API calls
- [ ] Add database query optimization (if applicable)
- [ ] Monitor server resource usage
- [ ] Set appropriate timeouts

### Monitoring

- [ ] Set up error tracking (Sentry)
- [ ] Configure performance monitoring (New Relic)
- [ ] Monitor API response times
- [ ] Track user sessions
- [ ] Set up alerts for errors

---

## 📈 Production Monitoring

### Setup Monitoring

- [ ] Error tracking (Sentry, Rollbar, or similar)
- [ ] Performance monitoring (New Relic, DataDog)
- [ ] Uptime monitoring (Pingdom, Uptime Robot)
- [ ] Log aggregation (CloudWatch, Stackdriver)
- [ ] Analytics (Google Analytics)

### Daily Checks

- [ ] No spike in error rates
- [ ] API response times normal
- [ ] Backend uptime > 99.5%
- [ ] No unusual API quota usage
- [ ] User feedback/complaints

### Weekly Reviews

- [ ] Analysis of usage patterns
- [ ] Performance metrics review
- [ ] Security audit logs
- [ ] Cost analysis (API calls, hosting)

---

## 🔄 Rollback Plan

### Version Control

- [ ] Tag production releases: `git tag v1.0.0`
- [ ] Keep production branch separate
- [ ] Document all deployments

### Rollback Procedures

**Frontend (Vercel/Netlify):**

- [ ] Revert to previous deployment from dashboard
- [ ] Or: `git revert <commit>` and redeploy

**Backend (Heroku):**

- [ ] `heroku releases` to see history
- [ ] `heroku rollback` to previous version

**Database (if applicable):**

- [ ] Backup before each deployment
- [ ] Document migration procedures
- [ ] Test rollback scenarios

---

## 🧪 Production Testing After Deployment

### Functionality Tests

- [ ] Health check endpoint responds
- [ ] API accepts requests from production frontend
- [ ] Image analysis works end-to-end
- [ ] Results display correctly
- [ ] Error handling works

### Load Testing

- [ ] Simulate 100+ concurrent users
- [ ] Monitor performance under load
- [ ] Check for memory leaks
- [ ] Verify rate limiting

### Security Testing

- [ ] SQL injection attempts (if DB involved)
- [ ] XSS attack attempts
- [ ] CSRF protection verified
- [ ] Rate limiting protection works

### Mobile Testing

- [ ] iOS Safari on iPhone/iPad
- [ ] Android Chrome on various phones
- [ ] Tablet responsiveness
- [ ] Offline scenarios

---

## 📋 Post-Deployment

### Documentation Update

- [ ] Update README with production URLs
- [ ] Document deployment process
- [ ] Create runbook for common issues
- [ ] Update API documentation with production URLs

### Team Communication

- [ ] Notify team of deployment
- [ ] Share production URLs
- [ ] Document any deployment-specific configs
- [ ] Assign on-call support

### Monitoring Setup

- [ ] Verify all alerts working
- [ ] Test alert notifications
- [ ] Document escalation procedures
- [ ] Setup log aggregation

### Metrics Baseline

- [ ] Record baseline performance metrics
- [ ] Document normal resource usage
- [ ] Set alert thresholds
- [ ] Create dashboard

---

## 🎯 Final Sign-Off

Before marking as complete:

- [ ] All checklist items reviewed
- [ ] No outstanding issues
- [ ] Team lead approval obtained
- [ ] Production URL tested and working
- [ ] Monitoring alerts active
- [ ] Rollback plan documented
- [ ] Team trained on production systems
- [ ] On-call schedule established
- [ ] Customer notified (if applicable)

---

## 📞 Emergency Contacts

Add team contacts here:

```
Technical Lead: [Name] - [Phone/Email]
DevOps Engineer: [Name] - [Phone/Email]
Backup Support: [Name] - [Phone/Email]
Escalation Lead: [Name] - [Phone/Email]
```

---

## 🔗 Important Links

Update these with your actual production URLs:

- Frontend: `https://your-frontend-url.com`
- Backend: `https://your-backend-url.com`
- Monitoring Dashboard: [Link]
- Error Tracking: [Link]
- Logs: [Link]
- Database Admin: [Link]

---

## 📝 Deployment Notes

Use this section to document any deployment-specific information:

```
Deployment Date: _______________
Version: _______________
Deployed By: _______________
Notable Changes: _______________
Known Issues: _______________
Performance Baseline: _______________
```

---

## ✅ Approval Signature

| Role      | Name   | Date   | Signature |
| --------- | ------ | ------ | --------- |
| Developer | **\_** | **\_** | **\_**    |
| QA        | **\_** | **\_** | **\_**    |
| DevOps    | **\_** | **\_** | **\_**    |
| Lead      | **\_** | **\_** | **\_**    |

---

**Last Updated:** May 2024  
**Version:** 1.0  
**Status:** Ready for Deployment ✅

Good luck with your deployment! 🚀

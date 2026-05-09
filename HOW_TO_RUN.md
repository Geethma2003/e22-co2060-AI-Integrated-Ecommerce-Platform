# 🚀 How to Run the Main Platform - Complete Guide

> **Everything you need to know to start the entire ecommerce platform locally**

---

## 📋 Platform Overview

Your platform consists of:

```
Frontend (React + Vite)
Backend (Express + MongoDB)
N8N (Workflow Automation)
N8N Frontend (Dashboard)
Supporting Services (DMS, ML, etc.)
```

---

## 🎯 Quick Start (5 Minutes)

### Prerequisites
- ✅ Node.js (v18+)
- ✅ npm or yarn
- ✅ MongoDB (local or Atlas)
- ✅ 4 terminal windows

### 3 Commands to Start Everything

**Terminal 1: Backend**
```bash
cd Backend/backend-inter
npm install
npm run dev
# Backend running on http://localhost:3000
```

**Terminal 2: Main Frontend**
```bash
cd Frontend/my-react-app
npm install
npm run dev
# Frontend running on http://localhost:5173
```

**Terminal 3: N8N Instance**
```bash
# Option A: Using Docker (recommended)
docker run -it --rm -p 5678:5678 n8nio/n8n

# Option B: Using npm (if installed globally)
npm install -g n8n
n8n
# N8N running on http://localhost:5678
```

**Terminal 4: N8N Frontend Dashboard**
```bash
cd N8N/frontend
npm install
npm run dev
# N8N Dashboard running on http://localhost:5174
```

---

## 📚 Detailed Step-by-Step

### Step 1: Setup MongoDB

**Option A: Use MongoDB Atlas (Cloud)**
```
1. Go to https://www.mongodb.com/cloud/atlas
2. Create free account
3. Create new cluster
4. Get connection string
5. Update Backend/backend-inter/.env:
   MONGO_URI=mongodb+srv://user:pass@cluster.mongodb.net/ecommerce
```

**Option B: Local MongoDB**
```bash
# Windows: Download from https://www.mongodb.com/try/download/community
# Mac: brew install mongodb-community
# Linux: apt-get install mongodb

# Start MongoDB
mongod
```

---

### Step 2: Backend Setup

```bash
cd Backend/backend-inter

# Install dependencies
npm install

# Create .env file
copy .env.example .env
# (or on Mac/Linux: cp .env.example .env)

# Edit .env with your settings:
# - MONGO_URI (MongoDB connection)
# - JWT_SECRET (generate: openssl rand -hex 32)
# - FIREBASE_SERVICE_ACCOUNT (if using Firebase)
# - N8N_API_KEY (from N8N admin)

# Start backend
npm run dev
```

**Backend running on:** http://localhost:3000

---

### Step 3: Frontend Setup

```bash
cd Frontend/my-react-app

# Install dependencies
npm install

# Start frontend
npm run dev
```

**Frontend running on:** http://localhost:5173

---

### Step 4: N8N Setup

**Option A: Docker (Easiest)**
```bash
docker run -it --rm -p 5678:5678 n8nio/n8n
```

**Option B: npm**
```bash
npm install -g n8n
n8n
```

**N8N running on:** http://localhost:5678

1. First time: Create admin user
2. Go to Settings → API
3. Create API key
4. Copy to Backend/.env as N8N_API_KEY

---

### Step 5: N8N Frontend Dashboard

```bash
cd N8N/frontend

npm install
npm run dev
```

**N8N Dashboard on:** http://localhost:5174

---

## 📊 All URLs After Running

| Service | URL | Username |
|---------|-----|----------|
| **Main Frontend** | http://localhost:5173 | Any (Firebase) |
| **Backend API** | http://localhost:3000 | - |
| **N8N Instance** | http://localhost:5678 | Admin user |
| **N8N Dashboard** | http://localhost:5174 | - |
| **MongoDB** | localhost:27017 | - |

---

## 🔧 Environment Setup

### Backend/.env.example

Copy to `.env` and fill in:

```env
# Server
PORT=3000

# Database
MONGO_URI=mongodb+srv://user:pass@cluster.mongodb.net/ecommerce

# JWT
JWT_SECRET=your-secret-key

# Firebase
FIREBASE_SERVICE_ACCOUNT={"type":"service_account",...}

# Frontend URL
FRONTEND_URL=http://localhost:5173

# N8N Integration
N8N_API_URL=http://localhost:5678
N8N_WEBHOOK_URL=http://localhost:5678/webhook
N8N_API_KEY=your-api-key

# Facebook Auto-Posting
AUTO_POST_TO_FACEBOOK=false
FACEBOOK_PAGE_ACCESS_TOKEN=your-token
FACEBOOK_PAGE_ID=your-page-id

# Cloudinary (for images)
CLOUDINARY_CLOUD_NAME=your-cloud
CLOUDINARY_API_KEY=your-key
CLOUDINARY_API_SECRET=your-secret

# AI Services
GEMINI_API_KEY=your-key

# Feature Flags
ENABLE_FACEBOOK_MODULE=false
FACE_RECOGNITION_ENABLED=false
```

---

## ✅ Verify Everything is Running

### Test Backend
```bash
curl http://localhost:3000
# Response: "Backend is running 🚀"
```

### Test N8N Connection
```bash
curl http://localhost:3000/api/n8n/status
# Response: {"status":"connected",...}
```

### Test Frontend
Open http://localhost:5173 in browser
- Should see login page
- Dashboard should load

### Test N8N Dashboard
Open http://localhost:5174 in browser
- Should see social media dashboard
- Platform cards visible

---

## 🎯 First Steps After Running

### 1. Login to Main App
1. Open http://localhost:5173
2. Sign up or login with Firebase
3. You're now in the dashboard

### 2. Create a Product
1. Go to Admin Dashboard
2. Click "Add Product"
3. Fill in details (name, image, description, category)
4. Click Create
5. Product posted to Facebook (if enabled)

### 3. View N8N Dashboard
1. Open http://localhost:5174
2. See your platform cards (Facebook, Instagram, TikTok)
3. Click to view platform details

### 4. Monitor Backend Logs
1. Watch Terminal 1 for API calls
2. Watch for Facebook posting logs
3. Watch for N8N workflow triggers

---

## 🚀 Run Everything at Once (Advanced)

Create `run-all.sh` (Mac/Linux):

```bash
#!/bin/bash

# Start Backend
cd Backend/backend-inter
npm run dev &
BACKEND_PID=$!

# Start Frontend
cd Frontend/my-react-app
npm run dev &
FRONTEND_PID=$!

# Start N8N
docker run -it --rm -p 5678:5678 n8nio/n8n &
N8N_PID=$!

# Start N8N Frontend
cd N8N/frontend
npm run dev &
N8N_FRONTEND_PID=$!

echo "All services started!"
echo "Backend: http://localhost:3000"
echo "Frontend: http://localhost:5173"
echo "N8N: http://localhost:5678"
echo "N8N Dashboard: http://localhost:5174"

# Wait for all
wait $BACKEND_PID $FRONTEND_PID $N8N_PID $N8N_FRONTEND_PID
```

Or on Windows, create `run-all.bat`:

```batch
@echo off
start "Backend" cmd /k "cd Backend/backend-inter && npm run dev"
timeout /t 3
start "Frontend" cmd /k "cd Frontend/my-react-app && npm run dev"
timeout /t 3
start "N8N" cmd /k "docker run -it --rm -p 5678:5678 n8nio/n8n"
timeout /t 3
start "N8N Dashboard" cmd /k "cd N8N/frontend && npm run dev"

echo.
echo All services started!
echo Backend: http://localhost:3000
echo Frontend: http://localhost:5173
echo N8N: http://localhost:5678
echo N8N Dashboard: http://localhost:5174
```

---

## 🔍 Troubleshooting

### Port Already in Use

```bash
# Find what's using port 3000 (Windows)
netstat -ano | findstr :3000

# Kill process
taskkill /PID <PID> /F

# Mac/Linux
lsof -i :3000
kill -9 <PID>
```

### MongoDB Connection Error

```
Error: connect ECONNREFUSED 127.0.0.1:27017
```

**Solution:**
- Make sure MongoDB is running
- Check MONGO_URI in .env
- Verify connection string

### N8N Not Responding

```bash
# Check if Docker is running
docker ps

# Restart N8N
docker run -it --rm -p 5678:5678 n8nio/n8n
```

### Frontend Can't Connect to Backend

Check CORS in Backend/backend-inter/index.js
- Make sure frontend URL is in allowedOrigins
- Restart backend

---

## 📊 Service Dependencies

```
Main Frontend (5173)
    ↓
Backend API (3000)
    ↓ (uses)
    ├─ MongoDB (27017)
    ├─ N8N (5678)
    └─ External APIs (Firebase, Cloudinary, etc.)

N8N (5678)
    ↓
N8N Frontend (5174)
```

---

## 🎛️ What Each Service Does

| Service | Port | Purpose |
|---------|------|---------|
| **Frontend** | 5173 | User interface (React) |
| **Backend** | 3000 | API server (Express) |
| **MongoDB** | 27017 | Database |
| **N8N** | 5678 | Workflow automation |
| **N8N Frontend** | 5174 | Dashboard |

---

## 💡 Common Commands

### Backend
```bash
cd Backend/backend-inter
npm run dev          # Start dev server
npm run build        # Build for production
npm run test         # Run tests
npm run lint         # Run linter
```

### Frontend
```bash
cd Frontend/my-react-app
npm run dev          # Start dev server
npm run build        # Build for production
npm run preview      # Preview build
```

### N8N Frontend
```bash
cd N8N/frontend
npm run dev          # Start dev server
npm run build        # Build for production
```

---

## 🚢 Production Deployment

### Deploy to Railway

1. **Create Railway Account**: https://railway.app
2. **Connect GitHub**: Link your repo
3. **Deploy Backend**:
   - Select Backend/backend-inter
   - Set environment variables
   - Deploy
4. **Deploy Frontend**:
   - Select Frontend/my-react-app
   - Build command: `npm run build`
   - Start command: `npm run preview`
5. **Deploy N8N**:
   - Use N8N's Railway template
   - Or Docker deployment
6. **Update CORS**: Add production URLs to Backend

See RAILWAY_SETUP.md for detailed instructions

---

## 🔐 Security Checklist

Before going live:

- [ ] Change JWT_SECRET to strong random value
- [ ] Enable HTTPS for production
- [ ] Add authentication to all admin endpoints
- [ ] Set up proper Firebase authentication
- [ ] Secure MongoDB connection
- [ ] Enable CORS only for your domains
- [ ] Set up rate limiting
- [ ] Enable logging and monitoring
- [ ] Backup database regularly
- [ ] Update dependencies

---

## 📚 Related Documentation

- **Backend Setup**: Backend/README.md
- **Frontend Setup**: Frontend/README.md
- **N8N Integration**: N8N/N8N_INTEGRATION.md
- **Facebook Integration**: README_FACEBOOK_INTEGRATION.md
- **Railway Deployment**: RAILWAY_SETUP.md

---

## ✅ Verification Checklist

After running everything:

- [ ] Backend running on http://localhost:3000
- [ ] Frontend accessible on http://localhost:5173
- [ ] N8N running on http://localhost:5678
- [ ] N8N Dashboard on http://localhost:5174
- [ ] MongoDB connected
- [ ] Can login to frontend
- [ ] Can create products
- [ ] Backend logs show activity
- [ ] No CORS errors
- [ ] N8N workflows visible

---

## 🎉 You're Ready!

All services are running and connected.

**Next Steps:**
1. Create a test product
2. Check it posts to social media
3. View N8N dashboard
4. Monitor backend logs
5. Start building features!

---

## 📞 Need Help?

- **Frontend Issues**: Check Frontend/README.md
- **Backend Issues**: Check Backend/README.md
- **N8N Issues**: Check N8N/N8N_INTEGRATION.md
- **Database Issues**: Check MongoDB docs
- **Deployment Issues**: Check RAILWAY_SETUP.md

---

**Happy coding! 🚀**

All your services should now be running smoothly!

# 📚 Master Guide - How to Run the Complete Platform

> **Complete documentation for running the entire AI-Integrated Ecommerce Platform**

---

## 🎯 Choose Your Path

### ⚡ I Want to Start NOW (10 min)
→ Go to **QUICK_START.md**

### 📖 I Want Full Instructions (30 min)
→ Go to **HOW_TO_RUN.md**

### 🚢 I Want to Deploy to Production
→ Go to **RAILWAY_SETUP.md**

### 📱 I Want to Run N8N Only
→ Go to **N8N/N8N_SETUP_QUICK.md**

### 💬 I Want Facebook Integration Help
→ Go to **README_FACEBOOK_INTEGRATION.md**

---

## 🏗️ Platform Architecture

```
┌─────────────────────────────────────────────────────┐
│          AI-Integrated Ecommerce Platform           │
├─────────────────────────────────────────────────────┤
│                                                      │
│  Frontend (React + Vite)           Backend (Express)│
│  Port: 5173 ────────────────────→ Port: 3000       │
│                                       ↓             │
│                              MongoDB Database       │
│                              (Atlas or Local)       │
│                                                      │
│                         N8N Workflows               │
│  N8N Dashboard (React)          (Automation)        │
│  Port: 5174                    Port: 5678          │
│                                                      │
│              Social Media APIs                       │
│         (Facebook, Instagram, TikTok)               │
│                                                      │
└─────────────────────────────────────────────────────┘
```

---

## 📦 What Each Component Does

### Frontend (React)
- User interface
- Admin dashboard
- Product catalog
- Shopping cart & checkout
- User profile

**Location:** `Frontend/my-react-app/`  
**Port:** 5173  
**Tech:** React + Vite + TailwindCSS  

### Backend (Express)
- REST API
- Database operations
- Authentication
- N8N integration
- Facebook/Instagram/TikTok posting

**Location:** `Backend/backend-inter/`  
**Port:** 3000  
**Tech:** Express + MongoDB + Node.js  

### N8N
- Workflow automation
- Social media posting
- Scheduled tasks
- Email notifications
- Integration hub

**Location:** Docker container or local install  
**Port:** 5678  
**Tech:** Node-based workflow builder  

### N8N Dashboard
- Visual interface for N8N
- Social media management
- Platform monitoring

**Location:** `N8N/frontend/`  
**Port:** 5174  
**Tech:** React + Vite  

---

## 🚀 Running Everything

### Quick Method (4 Terminal Windows)

**Terminal 1 - Backend:**
```bash
cd Backend/backend-inter
npm install
npm run dev
# http://localhost:3000
```

**Terminal 2 - Frontend:**
```bash
cd Frontend/my-react-app
npm install
npm run dev
# http://localhost:5173
```

**Terminal 3 - N8N:**
```bash
docker run -it --rm -p 5678:5678 n8nio/n8n
# http://localhost:5678
```

**Terminal 4 - N8N Dashboard:**
```bash
cd N8N/frontend
npm install
npm run dev
# http://localhost:5174
```

### One-Command Method (Automated)

**Windows:**
```bash
# Create file: run-platform.bat
@echo off
start "Backend" cmd /k "cd Backend/backend-inter && npm install && npm run dev"
timeout /t 2
start "Frontend" cmd /k "cd Frontend/my-react-app && npm install && npm run dev"
timeout /t 2
start "N8N" cmd /k "docker run -it --rm -p 5678:5678 n8nio/n8n"
timeout /t 2
start "N8N Dashboard" cmd /k "cd N8N/frontend && npm install && npm run dev"
```

**Mac/Linux:**
```bash
# Create file: run-platform.sh
#!/bin/bash
cd Backend/backend-inter && npm install && npm run dev &
sleep 2
cd ../../Frontend/my-react-app && npm install && npm run dev &
sleep 2
docker run -it --rm -p 5678:5678 n8nio/n8n &
sleep 2
cd ../../N8N/frontend && npm install && npm run dev &
```

---

## ⚙️ Configuration

### 1. MongoDB Setup

**Option A: Cloud (MongoDB Atlas) - Easiest**
```
1. Go to https://mongodb.com/cloud/atlas
2. Create free account
3. Create cluster
4. Get connection string
5. Update .env: MONGO_URI=mongodb+srv://...
```

**Option B: Local MongoDB**
```
1. Install from https://www.mongodb.com/try/download/community
2. Start service (Windows: mongod / Mac: brew services start mongodb)
3. Update .env: MONGO_URI=mongodb://localhost:27017/ecommerce
```

### 2. Backend .env

Copy `Backend/backend-inter/.env.example` to `.env`:

```env
# ━━━ REQUIRED ━━━
PORT=3000
MONGO_URI=mongodb+srv://user:pass@cluster.mongodb.net/ecommerce
JWT_SECRET=your-random-secret-key
FRONTEND_URL=http://localhost:5173

# ━━━ N8N Integration ━━━
N8N_API_URL=http://localhost:5678
N8N_WEBHOOK_URL=http://localhost:5678/webhook
N8N_API_KEY=your-n8n-api-key

# ━━━ OPTIONAL ━━━
FIREBASE_SERVICE_ACCOUNT={...}  # For Firebase auth
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
AUTO_POST_TO_FACEBOOK=false
FACEBOOK_PAGE_ACCESS_TOKEN=...
FACEBOOK_PAGE_ID=...
```

### 3. Get N8N API Key

1. Start N8N: `docker run -it --rm -p 5678:5678 n8nio/n8n`
2. Open http://localhost:5678
3. Create admin user
4. Go to Settings → API
5. Create API Key
6. Copy to `.env`: `N8N_API_KEY=...`

---

## 🌐 Access Points

After everything is running:

| Service | URL | Purpose |
|---------|-----|---------|
| Frontend | http://localhost:5173 | Main app |
| Backend | http://localhost:3000 | REST API |
| N8N | http://localhost:5678 | Workflow builder |
| Dashboard | http://localhost:5174 | Social media management |

---

## 📱 First Time Usage

### 1. Login
- Open http://localhost:5173
- Sign up with email/password or Firebase
- Enter admin dashboard

### 2. Create Product
- Go to Admin → Products
- Click "Add Product"
- Fill: Name, Description, Image, Category
- Click Create
- Product appears in dashboard

### 3. Check N8N Dashboard
- Open http://localhost:5174
- See social media platform cards
- View workflows and executions

### 4. Verify Backend
- Check Terminal 1 logs
- Should see API requests
- Verify no errors

---

## 🔍 Verification Checklist

After running everything, verify:

```
Terminal 1 (Backend):
  [ ] "Express server listening on port 3000"
  [ ] "MongoDB connected"
  [ ] No error messages
  
Terminal 2 (Frontend):
  [ ] "Local: http://localhost:5173"
  [ ] Vite dev server ready
  
Terminal 3 (N8N):
  [ ] "N8N is ready to serve"
  [ ] WebSocket connected
  
Terminal 4 (N8N Dashboard):
  [ ] "Local: http://localhost:5174"
  [ ] Vite dev server ready

Browser:
  [ ] Frontend loads at http://localhost:5173
  [ ] Can login/sign up
  [ ] Backend API responsive at http://localhost:3000
  [ ] N8N accessible at http://localhost:5678
```

---

## 🆘 Troubleshooting

### Port Already in Use

```bash
# Find process on port
Windows: netstat -ano | findstr :3000
Mac/Linux: lsof -i :3000

# Kill process
Windows: taskkill /PID <PID> /F
Mac/Linux: kill -9 <PID>
```

### MongoDB Connection Failed

```
❌ Error: connect ECONNREFUSED

✅ Solution:
1. Verify MONGO_URI in .env
2. Check MongoDB is running
3. Verify username/password
4. For Atlas: check IP whitelist
```

### N8N API Key Not Working

```
❌ Error: Failed to fetch N8N workflows

✅ Solution:
1. Open http://localhost:5678
2. Go to Settings → API
3. Create new API key
4. Update .env: N8N_API_KEY=...
5. Restart backend
```

### Frontend Can't Connect to Backend

```
❌ Error: CORS policy blocked request

✅ Solution:
1. Check Backend/backend-inter/index.js CORS config
2. Verify http://localhost:5173 is in allowedOrigins
3. Restart backend
4. Clear browser cache
```

---

## 🎛️ Common Commands

### Backend
```bash
cd Backend/backend-inter
npm install         # Install dependencies
npm run dev         # Start dev server
npm run build       # Build for production
npm run test        # Run tests
npm audit fix       # Fix vulnerabilities
```

### Frontend
```bash
cd Frontend/my-react-app
npm install         # Install dependencies
npm run dev         # Start dev server
npm run build       # Build for production
npm run preview     # Preview build
```

### N8N Dashboard
```bash
cd N8N/frontend
npm install         # Install dependencies
npm run dev         # Start dev server
npm run build       # Build for production
```

---

## 🚀 Deployment

For production deployment to Railway:

1. **Read:** RAILWAY_SETUP.md
2. **Create:** Railway account at https://railway.app
3. **Deploy:** Backend, Frontend, N8N
4. **Configure:** Environment variables
5. **Monitor:** Logs and health

---

## 📚 Related Documentation

| Document | Purpose |
|----------|---------|
| **QUICK_START.md** | Get running in 10 minutes |
| **HOW_TO_RUN.md** | Detailed setup instructions |
| **RAILWAY_SETUP.md** | Production deployment |
| **N8N/N8N_INTEGRATION.md** | Workflow automation |
| **N8N/N8N_SETUP_QUICK.md** | N8N quick setup |
| **README_FACEBOOK_INTEGRATION.md** | Social media posting |
| **Backend/README.md** | Backend details |
| **Frontend/README.md** | Frontend details |

---

## 🎓 Learning Path

### Beginner (Get Running)
1. Read QUICK_START.md
2. Run all 4 terminals
3. Create test product
4. Check logs

### Intermediate (Understand)
1. Read HOW_TO_RUN.md
2. Read N8N_INTEGRATION.md
3. Create N8N workflow
4. Test social media posting

### Advanced (Customize)
1. Read Backend/README.md
2. Read Frontend/README.md
3. Modify code
4. Deploy to production

---

## ✅ Success Criteria

Your platform is working when:

✅ Frontend loads without errors  
✅ Can login to admin  
✅ Can create products  
✅ Backend logs show activity  
✅ N8N dashboard accessible  
✅ API endpoints respond  
✅ Database connected  
✅ No CORS errors  

---

## 🎉 You're Ready!

Everything is set up and ready to run.

### Next Steps:
1. Follow QUICK_START.md or HOW_TO_RUN.md
2. Get all 4 terminals running
3. Test by creating a product
4. Explore admin features
5. Configure social media (optional)
6. Deploy to production (optional)

---

## 📞 Help & Support

- **Issues?** Check troubleshooting section
- **Questions?** Read related documentation
- **Stuck?** Verify configuration files
- **Errors?** Check terminal logs

---

**Welcome! Your platform is ready to launch! 🚀**

Choose your starting point above and get running!

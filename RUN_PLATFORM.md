# 🎯 MAIN PLATFORM RUN GUIDE - Summary

## ⚡ Fastest Way (10 Minutes)

### Prerequisites
- Node.js v18+
- Docker (optional, for N8N)
- MongoDB Atlas free account

### 4 Terminal Commands

**Terminal 1:**
```bash
cd Backend/backend-inter
npm install && npm run dev
```

**Terminal 2:**
```bash
cd Frontend/my-react-app
npm install && npm run dev
```

**Terminal 3:**
```bash
docker run -it --rm -p 5678:5678 n8nio/n8n
```

**Terminal 4:**
```bash
cd N8N/frontend
npm install && npm run dev
```

### Open Browser

| What | URL |
|------|-----|
| **Main App** | http://localhost:5173 |
| **Backend** | http://localhost:3000 |
| **N8N** | http://localhost:5678 |
| **Dashboard** | http://localhost:5174 |

---

## 📋 One-Time Setup

### 1. Get MongoDB
- **Free Cloud:** https://mongodb.com/cloud/atlas
- **Local:** Download from mongodb.com
- Copy connection string to `.env`

### 2. Create .env
```bash
cd Backend/backend-inter
cp .env.example .env
# Edit .env and add:
# - MONGO_URI
# - JWT_SECRET (any 32 char string)
```

### 3. Get N8N API Key
1. Start N8N (Terminal 3)
2. Open http://localhost:5678
3. Create admin user
4. Settings → API → Create Key
5. Copy to `.env`: `N8N_API_KEY=...`

---

## 🎯 Platform Components

```
FRONTEND              BACKEND               DATABASE
React (5173) ←→ Express (3000) ←→ MongoDB
│
└─→ N8N Dashboard (5174)
    │
    └─→ N8N Workflows (5678)
        │
        ├─→ Facebook
        ├─→ Instagram
        └─→ TikTok
```

---

## ✅ Verify It Works

```bash
# Test backend
curl http://localhost:3000
# Response: "Backend is running 🚀"

# Test N8N connection
curl http://localhost:3000/api/n8n/status
# Response: {"status":"connected",...}

# Open frontend
# http://localhost:5173
# Should load without errors
```

---

## 📱 What You Can Do

✅ Create and manage products  
✅ View dashboard analytics  
✅ Manage orders  
✅ Track inventory  
✅ Create sellers  
✅ Auto-post to social media  
✅ View N8N workflows  
✅ Monitor workflow executions  

---

## 🎨 Example Flow

```
1. Open http://localhost:5173
2. Login (create account)
3. Go to Admin → Products
4. Click "Add Product"
5. Enter: Name, Description, Image, Category
6. Click Create
7. ✅ Product appears in dashboard!
```

---

## 🚀 Full Guides

| Need | Document |
|------|----------|
| Quick start | **QUICK_START.md** |
| Detailed setup | **HOW_TO_RUN.md** |
| Master guide | **GETTING_STARTED.md** |
| Deploy online | **RAILWAY_SETUP.md** |
| N8N workflows | **N8N/N8N_INTEGRATION.md** |
| Social media | **README_FACEBOOK_INTEGRATION.md** |

---

## 🆘 Quick Troubleshooting

| Problem | Solution |
|---------|----------|
| Port 3000 in use | Find & kill process: `netstat -ano \| findstr :3000` |
| MongoDB error | Check MONGO_URI in .env, verify MongoDB running |
| N8N not responding | Restart: `docker run -it --rm -p 5678:5678 n8nio/n8n` |
| Frontend blank | Clear cache, restart terminal, check backend |
| API 404 errors | Check backend route definitions |

---

## 📊 Service Status

After running everything:

```
✅ Frontend: http://localhost:5173
✅ Backend: http://localhost:3000
✅ N8N: http://localhost:5678
✅ Dashboard: http://localhost:5174
✅ MongoDB: Connected
```

---

## 🎯 Next Steps

1. **Start all 4 terminals** (see top of this guide)
2. **Setup .env** (copy from .example)
3. **Get N8N API key** (from N8N admin)
4. **Login to frontend**
5. **Create test product**
6. **Check N8N dashboard**
7. **Monitor backend logs**

---

## 📞 Need More Help?

- Stuck on setup? → **HOW_TO_RUN.md**
- Confused about structure? → **GETTING_STARTED.md**
- Want to deploy? → **RAILWAY_SETUP.md**
- N8N questions? → **N8N/N8N_INTEGRATION.md**
- Facebook integration? → **README_FACEBOOK_INTEGRATION.md**

---

## ✨ You're All Set!

Your complete ecommerce platform is ready to run.

**Start now:**
1. Open 4 terminals
2. Run commands above
3. Open http://localhost:5173
4. Login and start using!

**Happy coding! 🚀**

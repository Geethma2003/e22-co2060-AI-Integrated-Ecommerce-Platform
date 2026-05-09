# 🚀 QUICK START - Run Everything in 10 Minutes

> **Get the entire platform running locally - No configuration needed!**

---

## 📋 Prerequisites

✅ **Node.js** (v18+): https://nodejs.org/  
✅ **npm** (comes with Node)  
✅ **MongoDB Atlas** (free cloud): https://mongodb.com/cloud/atlas  
✅ **Docker** (for N8N): https://docker.com (optional but recommended)  

---

## 🎬 Run in 4 Terminal Windows

### Terminal 1: Backend
```bash
cd Backend/backend-inter
npm install
npm run dev
```
✅ Backend running on http://localhost:3000

### Terminal 2: Frontend  
```bash
cd Frontend/my-react-app
npm install
npm run dev
```
✅ Frontend running on http://localhost:5173

### Terminal 3: N8N
```bash
docker run -it --rm -p 5678:5678 n8nio/n8n
```
✅ N8N running on http://localhost:5678

### Terminal 4: N8N Dashboard
```bash
cd N8N/frontend
npm install
npm run dev
```
✅ N8N Dashboard running on http://localhost:5174

---

## 🌐 Open in Browser

| What | URL |
|------|-----|
| **Main App** | http://localhost:5173 |
| **Admin API** | http://localhost:3000 |
| **N8N** | http://localhost:5678 |
| **Dashboard** | http://localhost:5174 |

---

## ⚙️ Initial Setup (First Time Only)

### 1. Setup .env File

Go to `Backend/backend-inter/` and copy `.env.example` to `.env`:

```bash
cd Backend/backend-inter
copy .env.example .env
```

Edit `.env` and set:
```env
# MongoDB (get from https://mongodb.com/cloud/atlas)
MONGO_URI=mongodb+srv://user:password@cluster.mongodb.net/ecommerce

# Generate random secret: use openssl rand -hex 32 or any 32 char string
JWT_SECRET=your-random-secret-here

# Leave others as default for local development
```

### 2. Setup N8N API Key

1. Open http://localhost:5678 in browser
2. Create admin user (first time)
3. Go to Settings → API
4. Create API Key
5. Copy to `Backend/backend-inter/.env`:
```env
N8N_API_KEY=your-key-here
```

### 3. Restart Backend
```bash
# In Terminal 1, press Ctrl+C
# Then run: npm run dev
```

---

## 🎯 Test It Works

### Test 1: Check Backend
```bash
curl http://localhost:3000
# Should return: "Backend is running 🚀"
```

### Test 2: Check N8N
```bash
curl http://localhost:3000/api/n8n/status
# Should return: {"status":"connected",...}
```

### Test 3: Open Frontend
- Go to http://localhost:5173
- Should see login page
- Sign up and login

---

## 📱 Create Your First Product

1. Open http://localhost:5173
2. Login
3. Go to Admin → Products → Add Product
4. Fill in:
   - Product Name: "Cool Widget"
   - Description: "The best widget"
   - Category: "Electronics"
   - Image: Paste any image URL
5. Click Create
6. ✅ Product created!
7. Check backend logs for confirmation

---

## 🎨 Admin Features You Can Try

| Feature | Where | What It Does |
|---------|-------|-------------|
| **Add Product** | Admin → Products | Create new product |
| **View Dashboard** | Dashboard | See all analytics |
| **Manage Orders** | Admin → Orders | View/track orders |
| **Inventory** | Admin → Inventory | Check stock levels |
| **Create Seller** | Admin → Sellers | Add new seller |

---

## 🔄 How Social Media Works

```
1. You create product in Main App
   ↓
2. Backend saves to database
   ↓
3. Automatically triggers N8N workflow
   ↓
4. N8N posts to Facebook/Instagram/TikTok
   ↓
5. ✅ Product visible on social media!
```

*(Requires Facebook/Instagram/TikTok credentials configured)*

---

## 🛠️ If Something Goes Wrong

### Backend won't start?
```bash
# Check if port 3000 is free
# Windows: netstat -ano | findstr :3000
# Mac: lsof -i :3000

# If used: kill it or use different port
# Edit Backend/.env: PORT=3001
```

### MongoDB connection error?
- Verify MONGO_URI in `.env`
- Make sure it's a valid MongoDB Atlas connection
- Check your IP is whitelisted in MongoDB Atlas

### Frontend can't connect to backend?
- Make sure backend is running
- Check backend logs for errors
- Clear browser cache (Ctrl+Shift+Delete)

### N8N not working?
- Verify Docker is running: `docker ps`
- Restart N8N: Stop (Ctrl+C) and run again
- Check N8N logs for errors

---

## 📊 What's Running

```
Your Computer
├── Frontend (React)
│   └── Port 5173
├── Backend (Express)
│   └── Port 3000 → Connected to MongoDB
├── N8N (Workflows)
│   └── Port 5678
└── N8N Dashboard (React)
    └── Port 5174
```

---

## 🎓 Next Steps

### Learn the System
1. Read: **HOW_TO_RUN.md** (full guide)
2. Read: **N8N_INTEGRATION.md** (workflow automation)
3. Read: **README_FACEBOOK_INTEGRATION.md** (social media)

### Customize
1. Modify products/categories
2. Add your own workflows in N8N
3. Configure social media accounts
4. Customize frontend design

### Deploy to Production
1. Read: **RAILWAY_SETUP.md**
2. Get Railway account: https://railway.app
3. Deploy backend, frontend, N8N
4. Update environment variables

---

## ✅ Quick Verification

After running all 4 terminals, verify:

- [ ] Terminal 1: "Backend running on http://localhost:3000"
- [ ] Terminal 2: "Local: http://localhost:5173"
- [ ] Terminal 3: "N8N is ready to serve"
- [ ] Terminal 4: "Local: http://localhost:5174"
- [ ] Frontend loads at http://localhost:5173
- [ ] Can login to admin
- [ ] Backend API responds at http://localhost:3000

---

## 📱 Access Points

| Access | URL | Purpose |
|--------|-----|---------|
| Main App | http://localhost:5173 | User interface |
| Admin API | http://localhost:3000 | Backend API |
| N8N Admin | http://localhost:5678 | Workflow management |
| Dashboard | http://localhost:5174 | Social media dashboard |

---

## 🆘 Need Help?

- **Full Setup Guide**: HOW_TO_RUN.md
- **Deployment**: RAILWAY_SETUP.md
- **N8N Workflows**: N8N/N8N_INTEGRATION.md
- **Facebook Integration**: README_FACEBOOK_INTEGRATION.md
- **Backend Details**: Backend/README.md
- **Frontend Details**: Frontend/README.md

---

## 🎉 Success!

If all 4 terminals are running without errors, your platform is ready!

**Start testing:**
1. Create products
2. Monitor workflows
3. Explore admin features
4. Check social media posting
5. Build custom workflows

---

**Congratulations! Your platform is running! 🚀**

Next: Check **HOW_TO_RUN.md** for detailed instructions.

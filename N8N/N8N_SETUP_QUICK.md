# ⚡ N8N Integration - Quick Setup (5 Minutes)

> **Control N8N from your main platform - Everything automated!**

---

## 🎯 What You Get

The main app now **fully controls N8N**:
- ✅ Trigger workflows automatically
- ✅ Monitor workflow status
- ✅ Auto-post products to Facebook/Instagram/TikTok
- ✅ Enable/disable workflows
- ✅ View execution history

---

## 3️⃣ Setup Steps

### Step 1: Get N8N API Key (1 min)

1. Open N8N admin panel: `http://localhost:5678`
2. Go to **Settings** → **API**
3. Click **Create API Key**
4. Copy the key

### Step 2: Update .env (1 min)

Add to `Backend/backend-inter/.env`:

```env
N8N_API_URL=http://localhost:5678
N8N_WEBHOOK_URL=http://localhost:5678/webhook
N8N_API_KEY=your-key-here
```

### Step 3: Restart Backend (1 min)

```bash
cd Backend/backend-inter
npm run dev
```

---

## ✅ Test It

```bash
# Check connection
curl http://localhost:3000/api/n8n/status

# Get all workflows
curl http://localhost:3000/api/n8n/workflows

# Get dashboard info
curl http://localhost:3000/api/n8n/dashboard
```

---

## 📱 How It Works

```
Product Created
    ↓
Main App triggers N8N workflow
    ↓
N8N executes workflow
    ↓
Posts to Facebook/Instagram/TikTok
    ↓
✅ Done!
```

---

## 🔧 Key Endpoints

| Endpoint | Purpose |
|----------|---------|
| `GET /api/n8n/status` | Check N8N connection |
| `GET /api/n8n/workflows` | List all workflows |
| `POST /api/n8n/workflows/:id/trigger` | Trigger a workflow |
| `POST /api/n8n/products/:id/social-media` | Post to all platforms |

---

## 📚 Full Documentation

See: **N8N/N8N_INTEGRATION.md**

---

**Setup complete!** Your N8N is now controlled by the main app! 🚀

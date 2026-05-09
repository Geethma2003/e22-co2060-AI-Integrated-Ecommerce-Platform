# 🔄 N8N Integration - Main Platform Control

> **N8N is now fully integrated and controlled by the main ecommerce platform!**

The main app can now trigger, manage, and monitor N8N workflows automatically.

---

## 📋 Overview

N8N (No-code Workflow Automation) is now **controlled by the main platform** instead of being completely independent.

### What This Means
- ✅ Main app can trigger N8N workflows
- ✅ Main app can monitor workflow status
- ✅ Main app can enable/disable workflows
- ✅ Main app can view execution history
- ✅ Workflows trigger automatically on product creation
- ✅ All social media posting automated via N8N

---

## 🎯 Architecture

```
Main App
    ↓
Backend API (/api/n8n/...)
    ↓
N8N Service Layer
    ↓
N8N Instance (http://localhost:5678)
    ↓
Social Media APIs (Facebook, Instagram, TikTok)
```

---

## 🚀 Key Features

### 1. Workflow Management
- View all workflows
- Get workflow details
- Enable/disable workflows
- Trigger workflows manually

### 2. Execution Monitoring
- View execution history
- Get specific execution details
- Track success/failure status
- Monitor workflow logs

### 3. Automatic Triggers
- Facebook posting on product creation
- Instagram posting on product creation
- TikTok posting on product creation
- Bulk social media posting

### 4. Webhook Support
- Trigger workflows via webhooks
- Receive webhook notifications
- Custom webhook paths

---

## 📚 API Endpoints

### Status & Info
```
GET  /api/n8n/status          - Check N8N connection
GET  /api/n8n/dashboard       - Get dashboard info
```

### Workflow Management
```
GET    /api/n8n/workflows                  - List all workflows
GET    /api/n8n/workflows/:id              - Get workflow details
POST   /api/n8n/workflows/:id/trigger      - Trigger workflow
PATCH  /api/n8n/workflows/:id/status       - Enable/disable
```

### Execution Tracking
```
GET  /api/n8n/workflows/:id/executions     - Get execution history
GET  /api/n8n/executions/:id               - Get execution details
```

### Webhook Triggers
```
POST  /api/n8n/webhook/:path               - Generic webhook trigger
```

### Product-Specific Workflows
```
POST  /api/n8n/products/:id/social-media   - Post to all platforms
POST  /api/n8n/products/:id/facebook       - Post to Facebook
POST  /api/n8n/products/:id/instagram      - Post to Instagram
POST  /api/n8n/products/:id/tiktok         - Post to TikTok
```

---

## 🔧 Configuration

### Environment Variables

Add to your `.env` file:

```env
# N8N API Configuration
N8N_API_URL=http://localhost:5678
N8N_WEBHOOK_URL=http://localhost:5678/webhook
N8N_API_KEY=your-n8n-api-key
```

### Getting N8N API Key

1. Open N8N admin panel (http://localhost:5678)
2. Go to **Settings** → **API**
3. Create new API key
4. Copy and paste into `.env`

### For Railway Deployment

```env
# Use your Railway N8N service URL
N8N_API_URL=https://n8n-service.up.railway.app
N8N_WEBHOOK_URL=https://n8n-service.up.railway.app/webhook
N8N_API_KEY=your-api-key
```

---

## 💻 Usage Examples

### Example 1: Get N8N Status
```bash
curl http://localhost:3000/api/n8n/status
```

Response:
```json
{
  "status": "connected",
  "url": "http://localhost:5678",
  "connected": true
}
```

### Example 2: Get All Workflows
```bash
curl http://localhost:3000/api/n8n/workflows
```

Response:
```json
{
  "count": 3,
  "workflows": [
    { "id": "1", "name": "Facebook Product Posting", "active": true },
    { "id": "2", "name": "Instagram Product Posting", "active": true },
    { "id": "3", "name": "TikTok Product Posting", "active": true }
  ]
}
```

### Example 3: Trigger Social Media Posting
```bash
curl -X POST http://localhost:3000/api/n8n/products/123/social-media \
  -H "Content-Type: application/json" \
  -d '{
    "productName": "Cool Widget",
    "description": "The best widget ever",
    "image": "https://example.com/image.jpg",
    "category": "Electronics"
  }'
```

### Example 4: Enable/Disable Workflow
```bash
curl -X PATCH http://localhost:3000/api/n8n/workflows/1/status \
  -H "Content-Type: application/json" \
  -d '{"active": false}'
```

---

## 🔄 How It Works

### Automatic Flow: Product Creation → Social Media Posting

```
1. Seller creates product in admin dashboard
   ↓
2. POST /api/products endpoint receives request
   ↓
3. Product saved to database
   ↓
4. OPTION A: Direct Facebook API (facebookProductService.js)
   OR
5. OPTION B: Trigger N8N workflow (/api/n8n/products/:id/social-media)
   ↓
6. N8N triggers all configured social media workflows
   ├─ Facebook posting workflow
   ├─ Instagram posting workflow
   └─ TikTok posting workflow
   ↓
7. Posts appear on all platforms
   ↓
8. Product creation completes (non-blocking)
```

---

## 📊 Workflow Examples

### Facebook Posting Workflow (N8N)

```
Trigger: Webhook from Main App
  ↓
Extract product data (name, image, description)
  ↓
Format Facebook post message
  ↓
Call Facebook Graph API
  ↓
Post to BETA Products page
  ↓
Return success/error status
```

### Inventory Check Workflow (Example)

```
Trigger: Manual or Scheduled
  ↓
Query MongoDB inventory levels
  ↓
Check if any item is below threshold
  ↓
Send notification to admin
  ↓
Optionally create restock task
```

---

## 🎯 Integration Points

### Product Creation
When a product is created with an image:
```javascript
// File: productController.js
await triggerAllSocialMediaWorkflows(product);
```

### Manual Triggering
Admin can manually trigger any workflow:
```javascript
POST /api/n8n/products/:id/social-media
```

### Scheduled Workflows
N8N can run workflows on a schedule:
- Daily inventory checks
- Weekly analytics summaries
- Monthly reports

---

## 🔍 Monitoring

### View Dashboard
```bash
GET /api/n8n/dashboard
```

Shows:
- Connection status
- Number of workflows
- List of all workflows with status

### Check Execution History
```bash
GET /api/n8n/workflows/1/executions?limit=10
```

Shows last 10 executions of workflow 1

### Get Specific Execution
```bash
GET /api/n8n/executions/exec-123
```

Shows detailed information about execution

---

## ⚠️ Error Handling

### Facebook Posting Fails?
- N8N service logs the error
- Main app continues (non-blocking)
- Error logged in N8N dashboard
- Manually retry from admin panel

### N8N Connection Lost?
- Main app handles gracefully
- Returns error but doesn't crash
- Auto-reconnects when N8N is back
- Queue for offline processing (future feature)

---

## 🚀 Deployment

### Local Development
```bash
# Terminal 1: Start N8N
npm run n8n:start
# or: docker run -it --rm -p 5678:5678 n8nio/n8n

# Terminal 2: Start Backend
cd Backend/backend-inter
npm run dev
```

### Railway Deployment
1. Deploy N8N service to Railway
2. Deploy main backend to Railway
3. Set environment variables:
   ```env
   N8N_API_URL=https://n8n-service.up.railway.app
   N8N_WEBHOOK_URL=https://n8n-service.up.railway.app/webhook
   N8N_API_KEY=your-api-key
   ```
4. Restart backend service

---

## 🧪 Testing

### Test N8N Connection
```bash
curl http://localhost:3000/api/n8n/status
```

### Test Workflow Trigger
```bash
curl -X POST http://localhost:3000/api/n8n/workflows/1/trigger \
  -H "Content-Type: application/json" \
  -d '{"data": {"test": true}}'
```

### Test Product Social Media
```bash
curl -X POST http://localhost:3000/api/n8n/products/123/facebook \
  -H "Content-Type: application/json" \
  -d '{
    "productName": "Test",
    "description": "Test product",
    "image": "https://example.com/image.jpg"
  }'
```

---

## 📈 Next Steps

1. **Deploy N8N** - Set up N8N instance
2. **Create Workflows** - Build workflows for your needs
3. **Get API Key** - Create N8N API key
4. **Configure Backend** - Update `.env` with N8N details
5. **Test Triggers** - Test workflow triggering
6. **Monitor** - Use dashboard to monitor executions

---

## 💡 Workflow Ideas

### Already Implemented
- ✅ Facebook product posting
- ✅ Instagram product posting
- ✅ TikTok product posting

### Future Possibilities
- [ ] Email notifications (low inventory)
- [ ] Slack alerts (new orders)
- [ ] Customer review analysis
- [ ] Automated restock orders
- [ ] Weekly analytics reports
- [ ] Multi-language product descriptions
- [ ] Automated customer responses
- [ ] Inventory forecasting

---

## 🔐 Security

✅ API key stored in .env (never in code)  
✅ N8N runs on internal network (not exposed)  
✅ Webhook validation can be added  
✅ Rate limiting on webhook triggers  
✅ Audit logs for all triggers  

---

## 📞 Support

For N8N documentation: https://docs.n8n.io/  
For API questions: See Backend/.../n8nService.js code comments  
For workflow issues: Check N8N dashboard logs  

---

## ✅ Checklist for Setup

- [ ] N8N instance running
- [ ] N8N API key created
- [ ] `.env` file updated with N8N details
- [ ] Backend restarted
- [ ] N8N status endpoint tested
- [ ] Create N8N workflows
- [ ] Test workflow triggering
- [ ] Test product posting workflow
- [ ] Monitor in production

---

**N8N is now fully integrated with your main platform!** 🎉

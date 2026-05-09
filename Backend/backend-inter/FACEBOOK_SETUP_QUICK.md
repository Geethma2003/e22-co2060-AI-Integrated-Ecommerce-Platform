# Facebook Auto-Posting Setup - Quick Start

## 📋 Summary

When a seller creates a product, it automatically posts to the **BETA Products** Facebook page with:
- ✅ Product name
- ✅ Product description  
- ✅ Product image
- ✅ Category

---

## 🚀 Quick Setup (5 minutes)

### 1. Get Facebook Credentials

Go to: **https://developers.facebook.com/apps**

- Create a new app (if you don't have one)
- Go to **Messenger** → click **"Get Page Access Token"**
- Select your **BETA Products** page
- Copy the token

Get your Page ID:
- Visit your **BETA Products** Facebook page
- Go to **About** section
- Find your Page ID (usually a long number)

### 2. Update .env File

Edit `Backend/backend-inter/.env`:

```env
AUTO_POST_TO_FACEBOOK=true
FACEBOOK_PAGE_ACCESS_TOKEN=your-token-here
FACEBOOK_PAGE_ID=your-page-id-here
PRODUCT_LANDING_URL=https://your-site.com
```

### 3. Restart Backend

```bash
cd Backend/backend-inter
npm run dev
```

---

## ✅ Test It

1. Go to your admin dashboard
2. Create a new product with:
   - Product name
   - Description
   - Image URL
3. Check your **BETA Products** Facebook page
4. You should see the new product posted! 🎉

---

## 📖 Full Details

See `FACEBOOK_INTEGRATION.md` for detailed setup, troubleshooting, and security info.

---

## ❓ Common Questions

**Q: Will products still be created if Facebook posting fails?**
A: Yes! Facebook posting is non-blocking. Your product is saved to the database regardless.

**Q: Can sellers choose to post or not?**
A: Currently all products are auto-posted. Can be made optional later if needed.

**Q: Can I disable this temporarily?**
A: Yes, set `AUTO_POST_TO_FACEBOOK=false` in `.env`

**Q: Which page will products post to?**
A: The page you select when getting the access token (**BETA Products**)

# Facebook Auto-Posting Integration

This document explains how to set up automatic Facebook posting when sellers create products.

## What It Does

When a new product is created in the main app:
- ✅ Product name, description, and category are automatically posted to the **BETA Products** Facebook page
- ✅ Product image is included in the post
- ✅ Non-blocking: If Facebook posting fails, the product creation still succeeds

## Setup Instructions

### Step 1: Create a Facebook App

1. Go to [Facebook Developers](https://developers.facebook.com/)
2. Click "My Apps" → "Create App"
3. Choose "Business" as the app type
4. Fill in app details and create

### Step 2: Get Your Page Access Token

1. In your Facebook app, go to **Settings → Basic**
2. Copy your **App ID** and **App Secret**
3. Go to **Messenger** (in the left menu)
4. Under "Access Tokens", click **"Get Page Access Token"**
5. Select your **BETA Products** page
6. Copy the generated **Page Access Token**

### Step 3: Get Your Page ID

1. Go to your **BETA Products** Facebook page
2. Click **About** (or look at the page URL)
3. Find and copy your **Page ID** (usually a long number)

### Step 4: Configure Environment Variables

Add these to your `.env` file in `Backend/backend-inter/`:

```env
# Enable auto-posting
AUTO_POST_TO_FACEBOOK=true

# Facebook credentials (from steps above)
FACEBOOK_PAGE_ACCESS_TOKEN=your-page-access-token-here
FACEBOOK_PAGE_ID=your-page-id-here

# Optional: URL where customers can view products
PRODUCT_LANDING_URL=https://your-ecommerce-site.com/products
```

### Step 5: Test the Integration

1. Start your backend server
2. Create a new product via the admin dashboard or API
3. Check the **BETA Products** Facebook page - you should see the new post!

## Post Format

Products are posted to Facebook with this format:

```
🎉 NEW PRODUCT ALERT! 🎉

📦 [Product Name]

[Product Description]

Category: [Product Category]
Check it out now! 👇
```

The post includes:
- Product image
- Link to your product landing page
- Professional emoji formatting

## Troubleshooting

### ❌ Post doesn't appear on Facebook

**Problem:** Product created but post didn't show up

**Solutions:**
1. Check backend logs for Facebook API errors
2. Verify `AUTO_POST_TO_FACEBOOK=true` in `.env`
3. Verify `FACEBOOK_PAGE_ACCESS_TOKEN` and `FACEBOOK_PAGE_ID` are correct
4. Ensure the page access token hasn't expired

### ❌ "Invalid access token" error

**Problem:** Token expired or incorrect

**Solution:** 
1. Go back to [Facebook Developers](https://developers.facebook.com/)
2. Regenerate a fresh page access token
3. Update `.env` and restart backend

### ✅ Product created but Facebook posting is skipped

**Reason:** Product has no image

**Solution:** Include an image URL when creating the product

## Disabling Auto-Posting

To temporarily disable auto-posting without removing configuration:

```env
AUTO_POST_TO_FACEBOOK=false
```

Product creation will continue to work normally, but won't post to Facebook.

## Testing Without Live Facebook

During development, set `AUTO_POST_TO_FACEBOOK=false` to test product creation without posting to Facebook.

## API Reference

### POST /api/products (Create Product)

**Request:**
```json
{
  "productName": "Cool Widget",
  "description": "A description of the widget",
  "category": "Electronics",
  "image": "https://example.com/image.jpg",
  "brand": "WidgetCo",
  "specs": {}
}
```

**Response:**
```json
{
  "message": "Product created successfully",
  "product": {
    "_id": "123456",
    "productName": "Cool Widget",
    "image": "https://example.com/image.jpg",
    ...
  }
}
```

**Side Effect:** Product is automatically posted to BETA Products Facebook page (if enabled)

## Security Notes

⚠️ **Important:**
- Never commit `.env` with `FACEBOOK_PAGE_ACCESS_TOKEN` to git
- Use `.env.example` as a template
- Tokens should be rotated periodically
- For Railway deployment, set these vars in the Railway dashboard, not in `.env`

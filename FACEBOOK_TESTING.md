# 🧪 Testing Facebook Auto-Posting

## Quick Local Test (No Facebook Credentials Needed)

### Test 1: Disable Facebook Posting
```env
# .env
AUTO_POST_TO_FACEBOOK=false
```

```bash
# Create a test product
POST /api/products
{
  "productName": "Test Widget",
  "description": "Test description",
  "category": "Test",
  "image": "https://example.com/test.jpg"
}
```

**Expected Result:** Product created successfully, no Facebook posting attempted ✅

---

## Testing With Real Facebook Credentials

### Setup Steps

1. **Get Page Access Token**
   ```
   Go to: https://developers.facebook.com/apps
   → Select your app
   → Messenger
   → Get Page Access Token
   → Select BETA Products page
   → Copy token
   ```

2. **Get Page ID**
   ```
   Go to: Your BETA Products Facebook page
   → Click "About"
   → Find Page ID (usually under page name)
   ```

3. **Update .env**
   ```env
   AUTO_POST_TO_FACEBOOK=true
   FACEBOOK_PAGE_ACCESS_TOKEN=EAAB1234...xyz
   FACEBOOK_PAGE_ID=123456789
   PRODUCT_LANDING_URL=https://your-site.com
   ```

4. **Restart Backend**
   ```bash
   cd Backend/backend-inter
   npm run dev
   ```

### Test 2: Create Product with Image
```bash
POST /api/products
{
  "productName": "My First Product",
  "description": "This is a test product",
  "category": "Electronics",
  "image": "https://example.com/my-product.jpg",
  "brand": "TestBrand"
}
```

**Expected Result:**
- ✅ Product created in database
- ✅ Backend logs: `✅ Product posted to BETA Products: 123456789_987654321`
- ✅ Post appears on BETA Products Facebook page

---

## Testing Scenarios

### Scenario 1: Product Without Image
```bash
POST /api/products
{
  "productName": "No Image Product",
  "description": "This product has no image",
  "category": "Test"
  # Note: no "image" field
}
```

**Expected Result:**
- ✅ Product created
- ⏭️ Backend logs: `⚠️ No image provided for product. Skipping Facebook post.`
- ✅ No Facebook post (as expected)

---

### Scenario 2: Missing Facebook Credentials
```env
# .env (incomplete)
AUTO_POST_TO_FACEBOOK=true
# FACEBOOK_PAGE_ACCESS_TOKEN not set
# FACEBOOK_PAGE_ID not set
```

```bash
POST /api/products
{
  "productName": "Will This Work?",
  "description": "Testing...",
  "image": "https://example.com/test.jpg"
}
```

**Expected Result:**
- ✅ Product created
- ❌ Backend logs: `❌ Failed to post product to Facebook: Facebook configuration missing...`
- ⚠️ Error is logged but non-blocking

---

### Scenario 3: Invalid Access Token
```env
AUTO_POST_TO_FACEBOOK=true
FACEBOOK_PAGE_ACCESS_TOKEN=invalid_token_12345
FACEBOOK_PAGE_ID=123456789
```

```bash
POST /api/products
{
  "productName": "Bad Token Test",
  "description": "Using invalid token",
  "image": "https://example.com/test.jpg"
}
```

**Expected Result:**
- ✅ Product created
- ❌ Backend logs: `❌ Failed to post product to Facebook: Invalid access token`
- ⚠️ Error is logged, product still in database

---

## Debugging

### Check Backend Logs

When you run the backend:
```bash
npm run dev
```

Look for messages:
```
✅ Product posted to BETA Products: 123456789_987654321    ← Success
⚠️ No image provided for product. Skipping Facebook post. ← Skipped
❌ Failed to post product to Facebook: ...                ← Error
```

### Test via cURL

```bash
# Create a product
curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "productName": "Test Product",
    "description": "Test description",
    "image": "https://example.com/test.jpg",
    "category": "Test"
  }'
```

---

## Manual Facebook Post Testing

If you want to test the Facebook API manually:

```bash
# Get your page ID from: https://graph.facebook.com/v18.0/me/accounts
# (requires your page access token)

curl "https://graph.facebook.com/v18.0/YOUR_PAGE_ID/feed" \
  -F 'message=🎉 NEW PRODUCT ALERT! 🎉\n\n📦 Test Product\n\nThis is a test description\n\nCategory: Test\nCheck it out now! 👇' \
  -F 'picture=https://example.com/test.jpg' \
  -F 'link=https://your-site.com' \
  -F 'access_token=YOUR_PAGE_ACCESS_TOKEN'
```

---

## Test Checklist

- [ ] Backend starts without errors
- [ ] Create product without image → product created, Facebook skipped
- [ ] Create product with image → product created + Facebook post successful
- [ ] Check BETA Products page for new post
- [ ] Verify post includes product name, description, and image
- [ ] Test with `AUTO_POST_TO_FACEBOOK=false` → no Facebook post
- [ ] Test with invalid token → product created, error logged
- [ ] Check backend console for proper log messages

---

## Troubleshooting Tests

### Issue: No Facebook Post but No Error
```
Solution: Check if AUTO_POST_TO_FACEBOOK=true
Run: grep AUTO_POST_TO_FACEBOOK Backend/backend-inter/.env
```

### Issue: "ENOTFOUND" or Network Error
```
Solution: Check internet connection
Your Facebook token might also be invalid
```

### Issue: Post Doesn't Have Image
```
Solution: Verify image URL is accessible
Test: curl https://example.com/image.jpg
```

### Issue: Token Expired
```
Solution: Generate new page access token
Go to: https://developers.facebook.com/apps
Select your app → Messenger → Get Page Access Token (again)
Update .env with new token
Restart backend
```

---

## Production Testing

Before going live:

1. **Test with real products** (not test data)
2. **Monitor BETA Products page** for posts
3. **Check logs** for any errors
4. **Verify images** load correctly on Facebook
5. **Check message format** matches brand guidelines
6. **Test with multiple products** to ensure consistency
7. **Ask users** to verify posts look good

---

## Disabling After Test

To stop posting to Facebook:

```env
AUTO_POST_TO_FACEBOOK=false
```

Restart backend. Products will still be created, but won't post to Facebook.

---

**Questions?** Check **FACEBOOK_INTEGRATION.md** for more details.

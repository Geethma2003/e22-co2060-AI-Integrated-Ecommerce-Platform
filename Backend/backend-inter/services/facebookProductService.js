/**
 * Facebook Product Auto-Posting Service
 * Posts newly created products to the "BETA Products" Facebook page
 */

const FACEBOOK_PAGE_NAME = "BETA Products";
const FACEBOOK_API_VERSION = "v18.0";

/**
 * Post a product to Facebook page
 * @param {Object} product - Product object with productName, description, image
 * @returns {Promise<Object>} Facebook API response
 */
export async function postProductToFacebook(product) {
  if (!product || !product.productName) {
    throw new Error("Product name is required");
  }

  if (!product.image) {
    console.warn("⚠️ No image provided for product. Skipping Facebook post.");
    return { skipped: true, reason: "No image" };
  }

  const pageAccessToken = process.env.FACEBOOK_PAGE_ACCESS_TOKEN;
  const pageId = process.env.FACEBOOK_PAGE_ID;

  if (!pageAccessToken || !pageId) {
    throw new Error(
      "Facebook configuration missing. Set FACEBOOK_PAGE_ACCESS_TOKEN and FACEBOOK_PAGE_ID in .env"
    );
  }

  try {
    // Build the post message
    const message = buildPostMessage(product);

    // Post to Facebook Graph API
    const facebookUrl = `https://graph.facebook.com/${FACEBOOK_API_VERSION}/${pageId}/feed`;

    const response = await fetch(facebookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: new URLSearchParams({
        message: message,
        picture: product.image,
        link: process.env.PRODUCT_LANDING_URL || "https://example.com",
        access_token: pageAccessToken
      }).toString()
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error?.message || "Facebook API error");
    }

    console.log(`✅ Product posted to ${FACEBOOK_PAGE_NAME}:`, data.id);
    return data;
  } catch (error) {
    console.error(`❌ Failed to post product to Facebook:`, error.message);
    throw error;
  }
}

/**
 * Build the Facebook post message
 * @param {Object} product
 * @returns {string} Formatted message
 */
function buildPostMessage(product) {
  const name = product.productName || "New Product";
  const description = product.description || "";
  const category = product.category || "";

  return `🎉 NEW PRODUCT ALERT! 🎉

📦 ${name}

${description}

${category ? `Category: ${category}\n` : ""}
Check it out now! 👇`;
}

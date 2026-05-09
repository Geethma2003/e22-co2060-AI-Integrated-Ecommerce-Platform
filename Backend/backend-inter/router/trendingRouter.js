import express from "express";
import Product from "../models/products.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const trendingUrl = process.env.YOUTUBE_TRENDING_URL || "http://localhost:8003";
    const response = await fetch(`${trendingUrl}/trending`);
    
    if (!response.ok) {
      throw new Error(`Trending service responded with status: ${response.status}`);
    }
    
    const rawData = await response.json();
    const trendingItems = rawData.top3 || [];

    // Enrich with images from database
    const enrichedData = await Promise.all(
      trendingItems.map(async (item) => {
        try {
          // Search for a product that matches the keyword in name or description
          const product = await Product.findOne({
            $or: [
              { productName: { $regex: item.Keyword, $options: "i" } },
              { category: { $regex: item.Keyword, $options: "i" } }
            ]
          }).select("image productName");

          return {
            ...item,
            image: product ? product.image : null,
            matchedProductName: product ? product.productName : null
          };
        } catch (dbErr) {
          console.error(`DB lookup failed for ${item.Keyword}:`, dbErr.message);
          return item;
        }
      })
    );

    res.json(enrichedData);
  } catch (error) {
    console.error("⚠️ Graceful fallback: Trending service unavailable:", error.message);
    res.json([]);
  }
});

export default router;

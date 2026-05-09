import mongoose from "mongoose";
import Product from "./models/products.js";
import dotenv from "dotenv";

dotenv.config();

const mongoURI = process.env.MONGO_URI || "mongodb://localhost:27017/ecommerce";

const sampleProducts = [
  {
    productName: "Apple iPhone 15 Pro",
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=800&q=80",
    description: "The latest iPhone with Titanium design.",
    brand: "Apple"
  },
  {
    productName: "Gaming Laptop RTX 4080",
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=800&q=80",
    description: "High-performance gaming laptop.",
    brand: "Generic"
  },
  {
    productName: "Samsung Galaxy S24 Ultra",
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=800&q=80",
    description: "Premium Android smartphone with AI features.",
    brand: "Samsung"
  }
];

async function seed() {
  try {
    await mongoose.connect(mongoURI);
    console.log("Connected to MongoDB...");
    
    for (const p of sampleProducts) {
      await Product.findOneAndUpdate(
        { productName: p.productName },
        p,
        { upsert: true, new: true }
      );
      console.log(`Added/Updated product: ${p.productName}`);
    }
    
    console.log("Sample data added successfully!");
    process.exit();
  } catch (err) {
    console.error("Error seeding data:", err);
    process.exit(1);
  }
}

seed();

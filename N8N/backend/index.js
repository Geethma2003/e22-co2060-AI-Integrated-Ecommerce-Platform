import cors from "cors";
import dotenv from "dotenv";
import express from "express";

dotenv.config();

const app = express();
const port = Number(process.env.PORT || 8088);
const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5174";

app.use(express.json());
app.use(cors({ origin: frontendUrl }));

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.get("/api/platforms", (_req, res) => {
  res.json({
    platforms: [
      {
        id: "facebook",
        name: "Facebook",
        status: "live",
        route: "/facebook",
        description: "Manage publishing workflows and Facebook campaign performance."
      },
      {
        id: "instagram",
        name: "Instagram",
        status: "live",
        route: "/instagram",
        description: "Plan visual campaigns and coordinate content calendar execution."
      },
      {
        id: "tiktok",
        name: "TikTok",
        status: "live",
        route: "/tiktok",
        description: "Track trend ideas and organize short-form posting operations."
      }
    ]
  });
});

app.listen(port, () => {
  console.log(`N8N backend running on http://localhost:${port}`);
});

export async function getSellerMarketingPlatforms(req, res) {
  try {
    const isFacebookEnabled = (process.env.ENABLE_FACEBOOK_MODULE || "false").toLowerCase() === "true";
    const frontendBaseUrl = process.env.FRONTEND_URL || "http://localhost:5173";

    const platforms = [
      {
        id: "facebook",
        name: "Facebook",
        description: "Schedule and auto-publish Facebook page posts with queue tracking.",
        status: isFacebookEnabled ? "live" : "disabled",
        path: "/seller/marketing-scheduler",
        externalUrl: `${frontendBaseUrl}/seller/marketing-scheduler`
      },
      {
        id: "instagram",
        name: "Instagram",
        description: "Plan your visual campaign flow and maintain a consistent posting strategy.",
        status: "beta",
        path: "/seller/marketing/instagram",
        externalUrl: `${frontendBaseUrl}/seller/marketing/instagram`
      },
      {
        id: "tiktok",
        name: "TikTok",
        description: "Track short-form ideas, trends, and publishing rhythm from one place.",
        status: "beta",
        path: "/seller/marketing/tiktok",
        externalUrl: `${frontendBaseUrl}/seller/marketing/tiktok`
      }
    ];

    return res.status(200).json({ platforms });
  } catch (error) {
    return res.status(500).json({ message: "Failed to load marketing platforms", error: error.message });
  }
}

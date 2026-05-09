import React, { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getSocialMarketingPlatforms } from "../services/sellerSocialPlatformService";

const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #050B2E, #081A4A, #020617)",
    color: "#fff",
    fontFamily: "'Segoe UI', Arial, sans-serif",
  },
  container: {
    maxWidth: 1120,
    margin: "0 auto"
  },
  card: {
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.12)",
    borderRadius: 14,
    padding: 24
  },
  button: {
    borderRadius: 10,
    border: "none",
    padding: "10px 16px",
    fontWeight: 600,
    cursor: "pointer"
  }
};

const accentMap = {
  facebook: "linear-gradient(to right, #2563eb, #1d4ed8)",
  instagram: "linear-gradient(to right, #d946ef, #ec4899)",
  tiktok: "linear-gradient(to right, #06b6d4, #8b5cf6)"
};

const SellerSocialDashboard = () => {
  const navigate = useNavigate();
  const [platforms, setPlatforms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadPlatforms = async () => {
      setLoading(true);
      setError("");
      try {
        const data = await getSocialMarketingPlatforms();
        setPlatforms(data.platforms || []);
      } catch (err) {
        setError(err.message || "Unable to load social dashboard");
      } finally {
        setLoading(false);
      }
    };

    loadPlatforms();
  }, []);

  const totals = useMemo(() => {
    const live = platforms.filter((p) => p.status === "live").length;
    const beta = platforms.filter((p) => p.status === "beta").length;
    return { all: platforms.length, live, beta };
  }, [platforms]);

  return (
    <div className="p-4 md:p-[36px_20px]" style={styles.page}>
      <div style={styles.container}>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-5">
          <div>
            <h1 style={{ margin: 0, fontSize: 30 }}>Social Media Platform Dashboard</h1>
            <p style={{ margin: "8px 0 0", color: "#94a3b8" }}>
              Select a workspace to manage Facebook, Instagram, and TikTok from one control center.
            </p>
          </div>
          <Link
            to="/seller/dashboard"
            style={{
              ...styles.button,
              textDecoration: "none",
              background: "rgba(255,255,255,0.07)",
              color: "#fff",
              border: "1px solid rgba(255,255,255,0.12)"
            }}
          >
            Back to Seller Dashboard
          </Link>
        </div>

        {error ? (
          <div style={{ ...styles.card, borderColor: "rgba(239,68,68,0.35)", color: "#fecaca", marginBottom: 16 }}>
            {error}
          </div>
        ) : null}

        <div className="grid gap-4 md:grid-cols-3 mb-5">
          <div style={styles.card}>
            <p style={{ margin: 0, color: "#94a3b8", fontSize: 13 }}>Connected Platforms</p>
            <p style={{ margin: "8px 0 0", fontSize: 30, fontWeight: 700 }}>{totals.all}</p>
          </div>
          <div style={styles.card}>
            <p style={{ margin: 0, color: "#94a3b8", fontSize: 13 }}>Live Modules</p>
            <p style={{ margin: "8px 0 0", fontSize: 30, fontWeight: 700, color: "#4ade80" }}>{totals.live}</p>
          </div>
          <div style={styles.card}>
            <p style={{ margin: 0, color: "#94a3b8", fontSize: 13 }}>Beta Modules</p>
            <p style={{ margin: "8px 0 0", fontSize: 30, fontWeight: 700, color: "#7dd3fc" }}>{totals.beta}</p>
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {(loading ? [] : platforms).map((platform) => (
            <article key={platform.id} style={styles.card}>
              <div
                style={{
                  height: 8,
                  borderRadius: 999,
                  width: "100%",
                  background: accentMap[platform.id] || "linear-gradient(to right, #64748b, #334155)"
                }}
              />
              <h2 style={{ margin: "16px 0 8px", fontSize: 22 }}>{platform.name}</h2>
              <p style={{ margin: 0, color: "#cbd5e1", minHeight: 44 }}>{platform.description}</p>
              <div style={{ marginTop: 14 }}>
                <span
                  style={{
                    display: "inline-flex",
                    borderRadius: 999,
                    padding: "4px 10px",
                    fontSize: 12,
                    fontWeight: 700,
                    textTransform: "uppercase",
                    background: platform.status === "live" ? "rgba(34,197,94,0.18)" : "rgba(125,211,252,0.18)",
                    color: platform.status === "live" ? "#4ade80" : "#7dd3fc"
                  }}
                >
                  {platform.status}
                </span>
              </div>
              <button
                type="button"
                disabled={platform.status === "disabled"}
                onClick={() => navigate(platform.path)}
                style={{
                  ...styles.button,
                  marginTop: 18,
                  width: "100%",
                  background: platform.status === "disabled" ? "rgba(100,116,139,0.6)" : "#0f172a",
                  color: "#fff",
                  opacity: platform.status === "disabled" ? 0.7 : 1,
                  cursor: platform.status === "disabled" ? "not-allowed" : "pointer"
                }}
              >
                Open {platform.name} Workspace
              </button>
            </article>
          ))}
        </div>

        {loading ? (
          <div style={{ ...styles.card, marginTop: 18, color: "#94a3b8" }}>Loading social platform workspaces...</div>
        ) : null}
      </div>
    </div>
  );
};

export default SellerSocialDashboard;

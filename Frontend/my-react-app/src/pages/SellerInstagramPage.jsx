import React from "react";
import { Link } from "react-router-dom";

const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #050B2E, #081A4A, #020617)",
    color: "#fff",
    fontFamily: "'Segoe UI', Arial, sans-serif",
  },
  container: {
    maxWidth: 1080,
    margin: "0 auto"
  },
  card: {
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.12)",
    borderRadius: 14,
    padding: 24
  }
};

const SellerInstagramPage = () => {
  return (
    <div className="p-4 md:p-[36px_20px]" style={styles.page}>
      <div style={styles.container}>
        <div style={styles.card}>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h1 style={{ margin: 0, fontSize: 30 }}>Instagram Workspace</h1>
            <Link
              to="/seller/social-dashboard"
              style={{
                borderRadius: 10,
                border: "1px solid rgba(255,255,255,0.12)",
                padding: "10px 16px",
                color: "#fff",
                textDecoration: "none",
                background: "rgba(255,255,255,0.06)"
              }}
            >
              Back to Social Dashboard
            </Link>
          </div>
          <p style={{ color: "#cbd5e1", marginTop: 10 }}>
            Organize reels and feed campaigns, track content pipeline, and coordinate your Instagram publishing cadence.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3 mt-5">
          <div style={styles.card}>
            <p style={{ margin: 0, color: "#94a3b8" }}>Content Ideas</p>
            <p style={{ margin: "8px 0 0", fontSize: 28, fontWeight: 700 }}>24</p>
          </div>
          <div style={styles.card}>
            <p style={{ margin: 0, color: "#94a3b8" }}>Scheduled This Week</p>
            <p style={{ margin: "8px 0 0", fontSize: 28, fontWeight: 700 }}>9</p>
          </div>
          <div style={styles.card}>
            <p style={{ margin: 0, color: "#94a3b8" }}>Engagement Target</p>
            <p style={{ margin: "8px 0 0", fontSize: 28, fontWeight: 700 }}>+18%</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerInstagramPage;

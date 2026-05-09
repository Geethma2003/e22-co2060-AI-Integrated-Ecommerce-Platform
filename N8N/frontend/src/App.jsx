import { Link, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";

function PageLayout({ title, subtitle, children }) {
  return (
    <div className="page">
      <div className="container">
        <header className="hero card">
          <div>
            <span className="pill">N8N Social Workspace</span>
            <h1>{title}</h1>
            <p>{subtitle}</p>
          </div>
          <Link className="ghost-btn" to="/">
            Back to Dashboard
          </Link>
        </header>
        {children}
      </div>
    </div>
  );
}

function HomePage() {
  const [platforms, setPlatforms] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadPlatforms = async () => {
      setError("");
      try {
        const response = await fetch("/api/platforms");
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || "Failed to load platforms");
        setPlatforms(data.platforms || []);
      } catch (err) {
        setError(err.message || "Something went wrong");
      }
    };

    loadPlatforms();
  }, []);

  return (
    <div className="page">
      <div className="container">
        <header className="hero card">
          <span className="pill">N8N Social Media Dashboard</span>
          <h1>Manage all social platforms from one place</h1>
          <p>
            This separate N8N module lets you navigate quickly to Facebook, Instagram, and TikTok management views.
          </p>
        </header>

        {error ? <div className="card error">{error}</div> : null}

        <section className="grid">
          {platforms.map((platform) => (
            <article key={platform.id} className="card platform-card">
              <div className={`accent ${platform.id}`} />
              <h2>{platform.name}</h2>
              <p>{platform.description}</p>
              <span className={`status ${platform.status}`}>{platform.status}</span>
              <Link className="primary-btn" to={platform.route}>
                Open {platform.name}
              </Link>
            </article>
          ))}
        </section>
      </div>
    </div>
  );
}

function FacebookPage() {
  return (
    <PageLayout
      title="Facebook Workspace"
      subtitle="Control campaign publishing, scheduling, and page posting operations."
    >
      <section className="grid">
        <article className="card metric">
          <p>Scheduled Today</p>
          <strong>12 Posts</strong>
        </article>
        <article className="card metric">
          <p>Published</p>
          <strong>97%</strong>
        </article>
        <article className="card metric">
          <p>Queue Health</p>
          <strong>Stable</strong>
        </article>
      </section>
    </PageLayout>
  );
}

function InstagramPage() {
  return (
    <PageLayout
      title="Instagram Workspace"
      subtitle="Plan visual campaigns, reels timing, and content strategy execution."
    >
      <section className="grid">
        <article className="card metric">
          <p>Draft Concepts</p>
          <strong>24</strong>
        </article>
        <article className="card metric">
          <p>Scheduled This Week</p>
          <strong>9</strong>
        </article>
        <article className="card metric">
          <p>Engagement Goal</p>
          <strong>+18%</strong>
        </article>
      </section>
    </PageLayout>
  );
}

function TiktokPage() {
  return (
    <PageLayout
      title="TikTok Workspace"
      subtitle="Track trend opportunities and short-form campaign cadence."
    >
      <section className="grid">
        <article className="card metric">
          <p>Trend Watchlist</p>
          <strong>14</strong>
        </article>
        <article className="card metric">
          <p>Queued Videos</p>
          <strong>11</strong>
        </article>
        <article className="card metric">
          <p>Retention Target</p>
          <strong>40%+</strong>
        </article>
      </section>
    </PageLayout>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/facebook" element={<FacebookPage />} />
      <Route path="/instagram" element={<InstagramPage />} />
      <Route path="/tiktok" element={<TiktokPage />} />
    </Routes>
  );
}

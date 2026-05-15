const keyMetrics = [
  {
    label: "Posts Scheduled",
    value: "128",
    delta: "+12 this week",
    accent: "from-cyan-500 to-blue-500"
  },
  {
    label: "Published Today",
    value: "17",
    delta: "+5 vs yesterday",
    accent: "from-emerald-500 to-lime-500"
  },
  {
    label: "Avg. Engagement",
    value: "6.4%",
    delta: "+0.8% this month",
    accent: "from-orange-500 to-amber-500"
  },
  {
    label: "Active Pages",
    value: "7",
    delta: "1 needs re-auth",
    accent: "from-sky-600 to-cyan-500"
  }
];

const campaignTimeline = [
  {
    title: "Weekend Flash Sale",
    page: "AutoNew Store",
    slot: "Today, 7:30 PM",
    state: "Scheduled",
    color: "bg-emerald-100 text-emerald-700"
  },
  {
    title: "Top 5 Gadgets This Month",
    page: "Tech Trends Hub",
    slot: "Tomorrow, 10:00 AM",
    state: "Scheduled",
    color: "bg-emerald-100 text-emerald-700"
  },
  {
    title: "New Arrival Reel",
    page: "Fashion Loop",
    slot: "Tomorrow, 1:00 PM",
    state: "Needs Review",
    color: "bg-amber-100 text-amber-700"
  },
  {
    title: "Customer Story Carousel",
    page: "AutoNew Store",
    slot: "Sun, 6:00 PM",
    state: "Draft",
    color: "bg-slate-200 text-slate-700"
  }
];

const channelMix = [
  { name: "Image Posts", percent: 42, tone: "bg-blue-600" },
  { name: "Reels", percent: 31, tone: "bg-cyan-500" },
  { name: "Stories", percent: 19, tone: "bg-amber-500" },
  { name: "Text Updates", percent: 8, tone: "bg-slate-500" }
];

const activityFeed = [
  "AutoNew Store connected successfully",
  "Post 'Weekend Flash Sale' moved to queue",
  "Token refresh required for Page 'Vintage Finds'",
  "Campaign report exported by admin@autonew.lk"
];

export default function DashboardClient() {
  return (
    <main className="min-h-screen px-4 py-6 sm:px-6 lg:px-10">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6">
        <header className="animate-fade-slide-up rounded-3xl border border-blue-100 bg-white/90 p-6 shadow-[0_18px_50px_-30px_rgba(14,61,130,0.55)] backdrop-blur">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-700">Facebook Publishing Hub</p>
              <h1 className="mt-2 text-3xl font-bold text-slate-900 sm:text-4xl">Dashboard Overview</h1>
              <p className="mt-2 text-sm text-slate-600">
                Welcome back, <span className="font-semibold text-slate-900">autonew</span>. Your campaign health is looking strong.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                className="rounded-xl border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700 transition hover:bg-blue-100"
              >
                Connect Page
              </button>
              <button
                type="button"
                className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                Open Scheduler
              </button>
              <button
                type="button"
                className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
              >
                + New Campaign
              </button>
            </div>
          </div>
        </header>

        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {keyMetrics.map((metric, index) => (
            <article
              key={metric.label}
              className="animate-fade-slide-up rounded-2xl border border-slate-200 bg-white/90 p-5 shadow-[0_10px_30px_-22px_rgba(15,23,42,0.8)]"
              style={{ animationDelay: `${index * 70}ms` }}
            >
              <div className={`h-1.5 w-24 rounded-full bg-gradient-to-r ${metric.accent}`} />
              <p className="mt-4 text-sm font-medium text-slate-600">{metric.label}</p>
              <p className="mt-2 text-3xl font-bold text-slate-900">{metric.value}</p>
              <p className="mt-2 text-xs font-medium text-slate-500">{metric.delta}</p>
            </article>
          ))}
        </section>

        <section className="grid gap-4 xl:grid-cols-[1.5fr_1fr]">
          <article className="animate-fade-slide-up rounded-3xl border border-slate-200 bg-white/95 p-6 shadow-[0_12px_35px_-22px_rgba(15,23,42,0.75)]">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-slate-900">Campaign Timeline</h2>
              <span className="rounded-full bg-cyan-50 px-3 py-1 text-xs font-semibold text-cyan-700">Next 48 hours</span>
            </div>
            <div className="space-y-3">
              {campaignTimeline.map((post) => (
                <div
                  key={`${post.title}-${post.slot}`}
                  className="flex flex-col gap-3 rounded-2xl border border-slate-100 bg-slate-50/80 p-4 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div>
                    <p className="font-semibold text-slate-900">{post.title}</p>
                    <p className="text-sm text-slate-600">
                      {post.page} • {post.slot}
                    </p>
                  </div>
                  <span className={`inline-flex w-fit rounded-full px-3 py-1 text-xs font-semibold ${post.color}`}>{post.state}</span>
                </div>
              ))}
            </div>
          </article>

          <div className="grid gap-4">
            <article className="animate-fade-slide-up rounded-3xl border border-slate-200 bg-white/95 p-6 shadow-[0_12px_35px_-22px_rgba(15,23,42,0.75)]">
              <h3 className="text-xl font-bold text-slate-900">Content Mix</h3>
              <p className="mt-1 text-sm text-slate-600">Distribution across Facebook formats</p>
              <div className="mt-5 space-y-3">
                {channelMix.map((item) => (
                  <div key={item.name}>
                    <div className="mb-1 flex items-center justify-between text-sm">
                      <span className="font-medium text-slate-700">{item.name}</span>
                      <span className="font-semibold text-slate-900">{item.percent}%</span>
                    </div>
                    <div className="h-2 rounded-full bg-slate-100">
                      <div className={`h-2 rounded-full ${item.tone}`} style={{ width: `${item.percent}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </article>

            <article className="animate-fade-slide-up rounded-3xl border border-slate-200 bg-white/95 p-6 shadow-[0_12px_35px_-22px_rgba(15,23,42,0.75)]">
              <h3 className="text-xl font-bold text-slate-900">Live Activity</h3>
              <ul className="mt-4 space-y-3">
                {activityFeed.map((event) => (
                  <li key={event} className="rounded-xl border border-slate-100 bg-slate-50 px-3 py-2 text-sm text-slate-700">
                    {event}
                  </li>
                ))}
              </ul>
            </article>
          </div>
        </section>
      </div>
    </main>
  );
}

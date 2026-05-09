import Link from "next/link";

export default function DashboardPage() {
  const channels = [
    {
      name: "Facebook",
      href: "/dashboard/facebook",
      description: "Plan, schedule, and monitor your Facebook publishing pipeline.",
      accent: "from-blue-600 to-indigo-600"
    },
    {
      name: "Instagram",
      href: "/dashboard/instagram",
      description: "Manage visual campaigns, content ideas, and profile growth workflow.",
      accent: "from-fuchsia-600 to-rose-500"
    },
    {
      name: "TikTok",
      href: "/dashboard/tiktok",
      description: "Organize short-form campaigns and keep your posting rhythm consistent.",
      accent: "from-cyan-500 to-violet-600"
    }
  ];

  return (
    <main className="mx-auto min-h-screen w-full max-w-6xl p-6 md:p-10">
      <section className="rounded-2xl bg-white p-8 shadow-sm">
        <p className="mb-3 inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-600">
          Social Media Control Center
        </p>
        <h1 className="text-3xl font-bold text-slate-900 md:text-4xl">Manage every platform from one place</h1>
        <p className="mt-3 max-w-2xl text-slate-600">
          Choose a channel workspace to start publishing, tracking, and scaling your social media performance.
        </p>
      </section>

      <section className="mt-6 grid gap-5 md:grid-cols-3">
        {channels.map((channel) => (
          <Link
            key={channel.name}
            href={channel.href}
            className="group rounded-2xl bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
          >
            <div className={`h-2 w-full rounded-full bg-gradient-to-r ${channel.accent}`} />
            <h2 className="mt-5 text-xl font-semibold text-slate-900">{channel.name}</h2>
            <p className="mt-2 text-sm text-slate-600">{channel.description}</p>
            <span className="mt-5 inline-flex rounded-lg bg-slate-900 px-3 py-2 text-sm font-medium text-white transition group-hover:bg-slate-800">
              Open workspace
            </span>
          </Link>
        ))}
      </section>
    </main>
  );
}

import Link from "next/link";

export default function TikTokDashboardPage() {
  return (
    <main className="mx-auto min-h-screen w-full max-w-6xl p-6 md:p-10">
      <section className="rounded-2xl bg-white p-8 shadow-sm">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <p className="inline-flex rounded-full bg-cyan-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-cyan-700">
            TikTok Workspace
          </p>
          <Link href="/dashboard" className="rounded-lg border border-slate-300 px-3 py-2 text-sm">
            Back to Social Dashboard
          </Link>
        </div>
        <h1 className="text-3xl font-bold text-slate-900 md:text-4xl">TikTok growth dashboard</h1>
        <p className="mt-3 max-w-2xl text-slate-600">
          Coordinate short-form videos, trend timing, and campaign momentum from one operational view.
        </p>
      </section>

      <section className="mt-6 grid gap-5 md:grid-cols-3">
        <article className="rounded-2xl bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-500">Trend Watchlist</p>
          <p className="mt-2 text-2xl font-bold text-slate-900">14 Topics</p>
          <p className="mt-1 text-xs text-slate-500">High-potential sounds and formats to test</p>
        </article>
        <article className="rounded-2xl bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-500">Videos Queued</p>
          <p className="mt-2 text-2xl font-bold text-slate-900">11 Clips</p>
          <p className="mt-1 text-xs text-slate-500">Prepared and scheduled for publishing slots</p>
        </article>
        <article className="rounded-2xl bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-500">Completion Rate Goal</p>
          <p className="mt-2 text-2xl font-bold text-slate-900">40%+</p>
          <p className="mt-1 text-xs text-slate-500">Target for stronger video retention this month</p>
        </article>
      </section>
    </main>
  );
}

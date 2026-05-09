import Link from "next/link";

export default function InstagramDashboardPage() {
  return (
    <main className="mx-auto min-h-screen w-full max-w-6xl p-6 md:p-10">
      <section className="rounded-2xl bg-white p-8 shadow-sm">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <p className="inline-flex rounded-full bg-fuchsia-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-fuchsia-700">
            Instagram Workspace
          </p>
          <Link href="/dashboard" className="rounded-lg border border-slate-300 px-3 py-2 text-sm">
            Back to Social Dashboard
          </Link>
        </div>
        <h1 className="text-3xl font-bold text-slate-900 md:text-4xl">Instagram campaign dashboard</h1>
        <p className="mt-3 max-w-2xl text-slate-600">
          Build your visual brand story, plan reels and posts, and keep your content strategy organized.
        </p>
      </section>

      <section className="mt-6 grid gap-5 md:grid-cols-3">
        <article className="rounded-2xl bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-500">Content Pipeline</p>
          <p className="mt-2 text-2xl font-bold text-slate-900">24 Ideas</p>
          <p className="mt-1 text-xs text-slate-500">Draft captions and concepts ready to publish</p>
        </article>
        <article className="rounded-2xl bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-500">Scheduled This Week</p>
          <p className="mt-2 text-2xl font-bold text-slate-900">9 Posts</p>
          <p className="mt-1 text-xs text-slate-500">Mix of reels, stories, and feed posts</p>
        </article>
        <article className="rounded-2xl bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-500">Engagement Goal</p>
          <p className="mt-2 text-2xl font-bold text-slate-900">+18%</p>
          <p className="mt-1 text-xs text-slate-500">Target growth for the next campaign cycle</p>
        </article>
      </section>
    </main>
  );
}

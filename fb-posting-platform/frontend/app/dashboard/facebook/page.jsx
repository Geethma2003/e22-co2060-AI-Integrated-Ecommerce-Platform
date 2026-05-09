import Link from "next/link";
import DashboardClient from "../../../components/DashboardClient";

export default function FacebookDashboardPage() {
  return (
    <main className="min-h-screen">
      <div className="mx-auto max-w-6xl px-6 pt-6">
        <Link href="/dashboard" className="inline-flex rounded-lg border border-slate-300 px-3 py-2 text-sm">
          Back to Social Dashboard
        </Link>
      </div>
      <DashboardClient />
    </main>
  );
}

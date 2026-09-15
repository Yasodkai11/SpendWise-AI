import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function HomePage() {
  const session = await getServerSession(authOptions);

  if (session?.user?.id) {
    redirect("/dashboard");
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(37,99,235,0.14),_transparent_34%),radial-gradient(circle_at_top_right,_rgba(16,185,129,0.12),_transparent_28%),linear-gradient(180deg,_#f8fbff_0%,_#eef4fb_100%)]">
      {/* Navigation */}
      <header className="sticky top-0 z-50 border-b border-white/60 bg-white/75 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br from-primary-600 to-primary-700 shadow-lg shadow-primary-200/60">
              <span className="text-lg font-bold text-white">₹</span>
            </div>
            <span className="text-xl font-bold text-text-primary">
              SpendWise AI
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/login"
              className="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors"
            >
              Login
            </Link>
            <Link
              href="/register"
              className="px-4 py-2 rounded-xl bg-linear-to-r from-primary-600 to-primary-700 text-sm font-medium text-white shadow-lg shadow-primary-200/60 transition hover:from-primary-700 hover:to-primary-800"
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6">
        {/* Hero Section */}
        <section className="py-24 sm:py-28">
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.22em] text-primary-600">
              Personal finance, rethought
            </p>
            <h1 className="text-5xl sm:text-6xl font-bold text-text-primary mb-6">
              Take Control of Your Money
            </h1>
            <p className="text-xl text-text-secondary mb-8">
              SpendWise AI makes it easy to track spending, create budgets, and
              reach your financial goals. Powered by intelligent insights.
            </p>
            <div className="flex items-center justify-center gap-4">
              <Link
                href="/register"
                className="px-8 py-3 rounded-xl bg-linear-to-r from-primary-600 to-primary-700 text-white font-semibold shadow-xl shadow-primary-200/60 transition hover:from-primary-700 hover:to-primary-800"
              >
                Start Free Today
              </Link>
              <Link
                href="/login"
                className="px-8 py-3 rounded-xl border border-primary-200 bg-white/80 text-text-primary font-semibold shadow-sm transition hover:bg-primary-50"
              >
                Sign In
              </Link>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 grid gap-6 md:grid-cols-3">
          <div className="rounded-3xl bg-white/95 p-8 border border-border-light shadow-lg shadow-primary-100/40 hover:shadow-xl transition-shadow">
            <div className="h-12 w-12 rounded-lg bg-success-50 flex items-center justify-center mb-4">
              <svg
                className="h-6 w-6 text-success-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-text-primary mb-2">
              Smart Tracking
            </h3>
            <p className="text-text-secondary">
              Track every rupee with ease. Categorize transactions automatically
              and get instant insights.
            </p>
          </div>

          <div className="rounded-3xl bg-white/95 p-8 border border-border-light shadow-lg shadow-primary-100/40 hover:shadow-xl transition-shadow">
            <div className="h-12 w-12 rounded-lg bg-primary-50 flex items-center justify-center mb-4">
              <svg
                className="h-6 w-6 text-primary-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-text-primary mb-2">
              Visual Analytics
            </h3>
            <p className="text-text-secondary">
              Beautiful charts and reports help you understand your spending
              patterns at a glance.
            </p>
          </div>

          <div className="rounded-3xl bg-white/95 p-8 border border-border-light shadow-lg shadow-primary-100/40 hover:shadow-xl transition-shadow">
            <div className="h-12 w-12 rounded-lg bg-warning-50 flex items-center justify-center mb-4">
              <svg
                className="h-6 w-6 text-warning-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-text-primary mb-2">
              Smart Budgets
            </h3>
            <p className="text-text-secondary">
              Set spending limits by category and get alerts when you're
              approaching your budget.
            </p>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 text-center">
          <div className="rounded-[2rem] bg-linear-to-r from-primary-700 via-primary-600 to-primary-500 p-12 text-white shadow-2xl shadow-primary-200/60">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Master Your Finances?
            </h2>
            <p className="text-lg text-primary-100 mb-8 max-w-2xl mx-auto">
              Join thousands of users who are already taking control of their
              money with SpendWise AI.
            </p>
            <Link
              href="/register"
              className="inline-block px-8 py-3 rounded-xl bg-white text-primary-700 font-semibold shadow-lg transition hover:bg-primary-50"
            >
              Create Your Account
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/60 bg-white/75 py-8 mt-16 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 text-center text-sm text-text-secondary">
          <p>© 2024 SpendWise AI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

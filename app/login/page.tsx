"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (result?.error) {
        setError("Invalid email or password. Please try again.");
        return;
      }

      router.push("/dashboard");
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(37,99,235,0.12),_transparent_26%),linear-gradient(180deg,_#f8fbff_0%,_#eef4fb_100%)]">
      {/* Left Side - Branding */}
      <div className="hidden flex-col justify-between bg-linear-to-br from-primary-700 via-primary-600 to-emerald-600 p-12 text-white lg:flex lg:w-1/2">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-white/20">
              <span className="text-2xl font-bold">₹</span>
            </div>
            <span className="text-3xl font-bold">SpendWise AI</span>
          </div>
          <p className="text-primary-100 mt-2">Take control of your finances</p>
        </div>

        <div className="space-y-8">
          <div>
            <h3 className="text-2xl font-bold mb-2">
              Smart Financial Management
            </h3>
            <p className="text-primary-100">
              Track your spending, create budgets, and achieve your financial
              goals with AI-powered insights.
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="shrink-0">
                <svg
                  className="h-6 w-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <div>
                <p className="font-semibold mb-1">Instant Insights</p>
                <p className="text-primary-100 text-sm">
                  See your spending patterns at a glance
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="shrink-0">
                <svg
                  className="h-6 w-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <div>
                <p className="font-semibold mb-1">Smart Budgets</p>
                <p className="text-primary-100 text-sm">
                  Stay within your financial goals
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="shrink-0">
                <svg
                  className="h-6 w-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <div>
                <p className="font-semibold mb-1">AI Recommendations</p>
                <p className="text-primary-100 text-sm">
                  Get personalized financial advice
                </p>
              </div>
            </div>
          </div>
        </div>

        <p className="text-primary-100 text-sm">
          © 2024 SpendWise AI. All rights reserved.
        </p>
      </div>

      {/* Right Side - Login Form */}
      <div className="flex w-full flex-col justify-center px-6 py-12 lg:w-1/2 lg:px-12">
        <div className="mx-auto w-full max-w-md rounded-3xl border border-border-light bg-white/95 p-8 shadow-2xl shadow-primary-100/40">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-text-primary">
              Welcome Back
            </h2>
            <p className="mt-2 text-text-secondary">
              Sign in to your account to continue
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div>
              <Input
                type="email"
                name="email"
                placeholder="Email address"
                label="Email"
                required
              />
            </div>

            {/* Password */}
            <div>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  label="Password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-10 text-text-secondary hover:text-text-primary"
                >
                  {showPassword ? (
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="rounded-lg bg-danger-50 p-4 text-danger-700 text-sm">
                {error}
              </div>
            )}

            {/* Login Button */}
            <Button type="submit" isLoading={isLoading} fullWidth size="lg">
              Sign In
            </Button>

            {/* Forgot Password */}
            <div className="text-center">
              <Link
                href="#"
                className="text-sm text-primary-600 hover:text-primary-700 font-medium"
              >
                Forgot password?
              </Link>
            </div>
          </form>

          {/* Register Link */}
          <div className="mt-8 border-t border-border-light pt-8 text-center">
            <p className="text-text-secondary">
              Don't have an account?{" "}
              <Link
                href="/register"
                className="text-primary-600 hover:text-primary-700 font-semibold"
              >
                Create one
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

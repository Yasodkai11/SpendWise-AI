"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { registerUser } from "@/actions/auth";

function getPasswordStrength(password: string) {
  let strength = 0;
  if (password.length >= 8) strength++;
  if (password.match(/[a-z]/) && password.match(/[A-Z]/)) strength++;
  if (password.match(/[0-9]/)) strength++;
  if (password.match(/[^a-zA-Z0-9]/)) strength++;

  return {
    score: strength,
    label:
      strength < 2
        ? "Weak"
        : strength < 3
          ? "Fair"
          : strength < 4
            ? "Good"
            : "Strong",
    color:
      strength < 2
        ? "text-danger-600"
        : strength < 3
          ? "text-warning-600"
          : strength < 4
            ? "text-primary-600"
            : "text-success-600",
  };
}

export default function RegisterPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const passwordStrength = getPasswordStrength(password);
  const passwordsMatch =
    password && confirmPassword && password === confirmPassword;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const formData = new FormData(e.currentTarget);
      await registerUser(formData);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Registration failed");
      setIsLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(37,99,235,0.12),transparent_26%),linear-gradient(180deg,#f8fbff_0%,#eef4fb_100%)]">
      {/* Left Side - Branding */}
      <div className="hidden flex-col justify-between bg-linear-to-br from-primary-700 via-primary-600 to-emerald-600 p-12 text-white lg:flex lg:w-1/2">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-white/20">
              <span className="text-2xl font-bold">₹</span>
            </div>
            <span className="text-3xl font-bold">SpendWise AI</span>
          </div>
          <p className="text-primary-100 mt-2">
            Start managing your finances today
          </p>
        </div>

        <div className="space-y-8">
          <div>
            <h3 className="text-2xl font-bold mb-2">Join Thousands of Users</h3>
            <p className="text-primary-100">
              Get complete control over your finances with our AI-powered
              expense tracking and budgeting tools.
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
                <p className="font-semibold mb-1">Easy Setup</p>
                <p className="text-primary-100 text-sm">
                  Get started in less than 2 minutes
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
                <p className="font-semibold mb-1">No Credit Card</p>
                <p className="text-primary-100 text-sm">
                  Start free, no payment required
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
                <p className="font-semibold mb-1">Always Free</p>
                <p className="text-primary-100 text-sm">
                  Core features remain free forever
                </p>
              </div>
            </div>
          </div>
        </div>

        <p className="text-primary-100 text-sm">
          © 2024 SpendWise AI. All rights reserved.
        </p>
      </div>

      {/* Right Side - Register Form */}
      <div className="flex w-full flex-col justify-center px-6 py-12 lg:w-1/2 lg:px-12">
        <div className="mx-auto w-full max-w-md rounded-3xl border border-border-light bg-white/95 p-8 shadow-2xl shadow-primary-100/40">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-text-primary">
              Create Account
            </h2>
            <p className="mt-2 text-text-secondary">
              Join SpendWise AI and start managing your finances
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name */}
            <div>
              <Input
                type="text"
                name="name"
                placeholder="Full name"
                label="Full Name"
                required
              />
            </div>

            {/* Email */}
            <div>
              <Input
                type="email"
                name="email"
                placeholder="Email address"
                label="Email Address"
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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

              {/* Password Strength */}
              {password && (
                <div className="mt-2 space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-2 bg-neutral-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full transition-all ${
                          passwordStrength.score === 1
                            ? "bg-danger-500 w-1/4"
                            : passwordStrength.score === 2
                              ? "bg-warning-500 w-1/2"
                              : passwordStrength.score === 3
                                ? "bg-primary-500 w-3/4"
                                : "bg-success-500 w-full"
                        }`}
                      />
                    </div>
                    <span
                      className={`text-xs font-semibold ${passwordStrength.color}`}
                    >
                      {passwordStrength.label}
                    </span>
                  </div>
                  <p className="text-xs text-text-tertiary">
                    Use at least 8 characters, mix of letters, numbers, and
                    symbols.
                  </p>
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <div className="relative">
                <Input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Confirm password"
                  label="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  error={
                    confirmPassword && !passwordsMatch
                      ? "Passwords do not match"
                      : undefined
                  }
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-10 text-text-secondary hover:text-text-primary"
                >
                  {showConfirmPassword ? (
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

            {/* Register Button */}
            <Button
              type="submit"
              isLoading={isLoading}
              disabled={!passwordsMatch}
              fullWidth
              size="lg"
            >
              Create Account
            </Button>
          </form>

          {/* Login Link */}
          <div className="mt-8 border-t border-border-light pt-8 text-center">
            <p className="text-text-secondary">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-primary-600 hover:text-primary-700 font-semibold"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

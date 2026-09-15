"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { IconMenu, IconBell, IconX } from "@/components/ui/icons";

export function Header() {
  const { data: session } = useSession();
  const [showMenu, setShowMenu] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-white/70 bg-white/80 backdrop-blur-xl">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Left side - Logo/Title */}
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold text-text-primary">Dashboard</h1>
          </div>

          {/* Right side - Actions */}
          <div className="flex items-center gap-4">
            {/* Search (hidden on mobile) */}
            <div className="hidden items-center md:flex">
              <input
                type="text"
                placeholder="Search transactions..."
                className="rounded-xl border border-border-light bg-white px-4 py-2 text-sm text-text-primary shadow-sm placeholder:text-text-tertiary focus:border-primary-500 focus:outline-none focus:ring-4 focus:ring-primary-100"
              />
            </div>

            {/* Notifications */}
            <button className="relative rounded-xl p-2 transition-colors hover:bg-primary-50">
              <IconBell size={20} className="text-text-secondary" />
              <span className="absolute top-1 right-1 h-2 w-2 bg-danger-500 rounded-full" />
            </button>

            {/* User Menu */}
            <div className="relative">
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="flex items-center gap-2 rounded-xl p-2 transition-colors hover:bg-primary-50"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-linear-to-br from-primary-600 to-primary-700 text-sm font-bold text-white shadow-md shadow-primary-200/60">
                  {session?.user?.name
                    ? session.user.name[0].toUpperCase()
                    : "U"}
                </div>
                <span className="hidden sm:inline text-sm font-medium text-text-primary">
                  {session?.user?.name || "User"}
                </span>
              </button>

              {/* Dropdown Menu */}
              {showMenu && (
                <div className="absolute right-0 mt-2 w-48 rounded-2xl border border-border-light bg-white shadow-2xl shadow-primary-100/50">
                  <Link
                    href="/profile"
                    className="block w-full rounded-t-2xl px-4 py-3 text-left text-sm text-text-primary hover:bg-primary-50"
                  >
                    Profile
                  </Link>
                  <Link
                    href="/settings"
                    className="block w-full px-4 py-3 text-left text-sm text-text-primary hover:bg-primary-50"
                  >
                    Settings
                  </Link>
                  <button
                    onClick={() => signOut({ callbackUrl: "/login" })}
                    className="block w-full rounded-b-2xl border-t border-border-light px-4 py-3 text-left text-sm text-danger-600 hover:bg-danger-50"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;

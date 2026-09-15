"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import {
  IconDashboard,
  IconTransaction,
  IconBudget,
  IconSettings,
  IconProfile,
  IconLogout,
} from "@/components/ui/icons";

export function Sidebar() {
  const pathname = usePathname();

  const isActive = (href: string) => pathname === href;

  const navItems = [
    { href: "/dashboard", label: "Dashboard", icon: IconDashboard },
    { href: "/transactions", label: "Transactions", icon: IconTransaction },
    { href: "/settings", label: "Settings", icon: IconSettings },
  ];

  const bottomItems = [
    { href: "/profile", label: "Profile", icon: IconProfile },
  ];

  return (
    <aside className="sticky top-0 flex h-screen w-64 flex-col border-r border-white/70 bg-white/80 shadow-xl shadow-primary-100/40 backdrop-blur-xl">
      {/* Logo */}
      <div className="border-b border-border-light px-6 py-6">
        <Link href="/dashboard" className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br from-primary-600 to-primary-700 shadow-lg shadow-primary-200/60">
            <span className="text-lg font-bold text-white">₹</span>
          </div>
          <span className="text-xl font-bold text-text-primary">SpendWise</span>
        </Link>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-6">
        <div className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`
                  flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors duration-200
                  ${
                    active
                      ? "bg-primary-50 text-primary-700 shadow-sm"
                      : "text-text-secondary hover:bg-primary-50 hover:text-text-primary"
                  }
                `}
              >
                <Icon size={20} />
                {item.label}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Bottom Navigation */}
      <div className="border-t border-border-light px-3 py-6">
        <div className="space-y-2 mb-6">
          {bottomItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`
                  flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors duration-200
                  ${
                    active
                      ? "bg-primary-50 text-primary-700 shadow-sm"
                      : "text-text-secondary hover:bg-primary-50 hover:text-text-primary"
                  }
                `}
              >
                <Icon size={20} />
                {item.label}
              </Link>
            );
          })}
        </div>

        {/* Logout Button */}
        <button
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-text-secondary transition-colors duration-200 hover:bg-primary-50 hover:text-text-primary"
        >
          <IconLogout size={20} />
          Logout
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;

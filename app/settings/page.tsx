"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type Settings = {
  currency: string;
  defaultTransactionType: "INCOME" | "EXPENSE";
  monthStart: number;
  monthlyBudget?: number | null;
};

const STORAGE_KEY = "spendwise:settings";

const defaultSettings: Settings = {
  currency: "LKR",
  defaultTransactionType: "EXPENSE",
  monthStart: 1,
  monthlyBudget: null,
};

function readStoredSettings(): Settings {
  if (typeof window === "undefined") {
    return defaultSettings;
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultSettings;
    const parsed = JSON.parse(raw) as Partial<Settings>;
    return {
      ...defaultSettings,
      ...parsed,
    };
  } catch {
    return defaultSettings;
  }
}

export default function SettingsPage() {
  const [settings, setSettings] = useState<Settings>(readStoredSettings);
  const [message, setMessage] = useState<string | null>(null);

  function saveLocal(s: Settings) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(s));
      setMessage("Settings saved locally");
      setTimeout(() => setMessage(null), 3000);
    } catch {
      setMessage("Failed to save settings");
    }
  }

  function onChange<K extends keyof Settings>(key: K, value: Settings[K]) {
    const next = { ...settings, [key]: value } as Settings;
    setSettings(next);
  }

  function onReset() {
    setSettings(defaultSettings);
    saveLocal(defaultSettings);
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    saveLocal(settings);
  }

  return (
    <div className="mx-auto max-w-2xl rounded-3xl border border-border-light bg-white/95 p-6 shadow-xl shadow-primary-100/40 sm:p-8">
      <h1 className="mb-4 text-2xl font-semibold text-text-primary">
        Settings
      </h1>

      {message && (
        <div className="mb-4 inline-block rounded-xl bg-primary-600 px-3 py-2 text-sm text-white shadow-lg shadow-primary-200/60">
          {message}
        </div>
      )}

      <form onSubmit={onSubmit} className="space-y-6">
        <div>
          <label className="mb-1 block text-sm font-medium text-text-primary">
            Preferred Currency
          </label>
          <select
            value={settings.currency}
            onChange={(e) => onChange("currency", e.target.value)}
            className="w-full rounded-xl border border-border-light bg-white p-3 text-text-primary shadow-sm outline-none focus:border-primary-500 focus:ring-4 focus:ring-primary-100"
          >
            <option value="LKR">LKR (Rs.)</option>
            <option value="INR">INR (₹)</option>
            <option value="USD">USD ($)</option>
            <option value="EUR">EUR (€)</option>
          </select>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-text-primary">
            Default Transaction Type
          </label>
          <select
            value={settings.defaultTransactionType}
            onChange={(e) =>
              onChange(
                "defaultTransactionType",
                e.target.value as Settings["defaultTransactionType"],
              )
            }
            className="w-full rounded-xl border border-border-light bg-white p-3 text-text-primary shadow-sm outline-none focus:border-primary-500 focus:ring-4 focus:ring-primary-100"
          >
            <option value="EXPENSE">Expense</option>
            <option value="INCOME">Income</option>
          </select>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-text-primary">
            Month Start Day
          </label>
          <select
            value={settings.monthStart}
            onChange={(e) => onChange("monthStart", Number(e.target.value))}
            className="w-full rounded-xl border border-border-light bg-white p-3 text-text-primary shadow-sm outline-none focus:border-primary-500 focus:ring-4 focus:ring-primary-100"
          >
            {Array.from({ length: 28 }, (_, i) => i + 1).map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-text-primary">
            Monthly Budget (optional)
          </label>
          <Input
            type="number"
            min={0}
            value={settings.monthlyBudget ?? ""}
            onChange={(e) =>
              onChange(
                "monthlyBudget",
                e.target.value === "" ? null : Number(e.target.value),
              )
            }
            placeholder="e.g. 50000"
          />
        </div>

        <div className="flex items-center gap-3">
          <Button type="submit">Save Settings</Button>
          <Button type="button" variant="ghost" onClick={onReset}>
            Reset to Defaults
          </Button>
        </div>
      </form>

      <p className="mt-6 text-sm text-text-secondary">
        Settings are saved locally in your browser. To persist them per-user on
        the server, I can add a database-backed settings API (requires a small
        schema migration). Let me know if you want server persistence.
      </p>
    </div>
  );
}

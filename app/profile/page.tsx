"use client";

import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type Profile = {
  id: string;
  name?: string | null;
  email: string;
};

export default function ProfilePage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const res = await fetch("/api/profile");
        if (!res.ok) throw new Error("Failed to load profile");
        const data = (await res.json()) as Profile;
        setProfile(data);
        setName(data.name || "");
      } catch {
        setMessage("Unable to load profile");
      }
    };

    void loadProfile();
  }, []);

  async function onSave(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    try {
      const res = await fetch("/api/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });
      const data = (await res.json()) as { error?: string } & Profile;
      if (!res.ok) throw new Error(data?.error || "Update failed");
      setProfile(data);
      setMessage("Profile updated");
    } catch (error: unknown) {
      setMessage(error instanceof Error ? error.message : "Update failed");
    } finally {
      setLoading(false);
    }
  }

  async function onChangePassword(e: React.FormEvent) {
    e.preventDefault();
    setMessage(null);
    if (!currentPassword || !newPassword) {
      setMessage("Please fill both current and new password fields");
      return;
    }
    if (newPassword !== confirmPassword) {
      setMessage("New password and confirm do not match");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, newPassword }),
      });
      const data = (await res.json()) as { error?: string };
      if (!res.ok) throw new Error(data?.error || "Password change failed");
      setMessage("Password changed successfully");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error: unknown) {
      setMessage(
        error instanceof Error ? error.message : "Password change failed",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-2xl rounded-3xl border border-border-light bg-white/95 p-6 shadow-xl shadow-primary-100/40 sm:p-8">
      <h1 className="mb-4 text-2xl font-semibold text-text-primary">Profile</h1>

      {message && (
        <div className="mb-4 inline-block rounded-xl bg-danger-600 px-3 py-2 text-sm text-white shadow-lg shadow-danger-100/60">
          {message}
        </div>
      )}

      <form onSubmit={onSave} className="space-y-4 max-w-md">
        <div>
          <label className="mb-1 block text-sm font-medium text-text-primary">
            Name
          </label>
          <Input value={name} onChange={(e) => setName(e.target.value)} />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-text-primary">
            Email
          </label>
          <Input value={profile?.email || ""} disabled />
        </div>

        <div>
          <Button type="submit" disabled={loading}>
            {loading ? "Saving..." : "Save"}
          </Button>
        </div>
      </form>

      <hr className="my-8 border-border-light" />

      <h2 className="mb-3 text-lg font-medium text-text-primary">
        Change Password
      </h2>
      <form onSubmit={onChangePassword} className="space-y-4 max-w-md">
        <div>
          <label className="mb-1 block text-sm font-medium text-text-primary">
            Current Password
          </label>
          <Input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-text-primary">
            New Password
          </label>
          <Input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-text-primary">
            Confirm New Password
          </label>
          <Input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        <div>
          <Button type="submit" disabled={loading} variant="secondary">
            {loading ? "Updating..." : "Change Password"}
          </Button>
        </div>
      </form>
    </div>
  );
}

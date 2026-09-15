"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function DeleteTransactionButton({ id }: { id: string }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handle() {
    const ok = confirm("Delete this transaction?");
    if (!ok) return;
    setLoading(true);
    try {
      const res = await fetch("/api/transactions/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (!res.ok) {
        const err = await res.json();
        alert(err?.error || "Delete failed");
      } else {
        router.refresh();
      }
    } catch {
      alert("Delete failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handle}
      disabled={loading}
      className="rounded bg-red-600 text-white px-3 py-1"
    >
      {loading ? "Deleting..." : "Delete"}
    </button>
  );
}

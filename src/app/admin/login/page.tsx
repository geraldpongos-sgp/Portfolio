"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Login failed.");
        setLoading(false);
        return;
      }

      router.push("/admin");
      router.refresh();
    } catch {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#050403] px-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm gold-border rounded-2xl p-8 bg-[#0d0b09] space-y-6"
      >
        <div className="flex flex-col items-center gap-3 text-center">
          <span className="w-12 h-12 rounded-full gold-fill flex items-center justify-center">
            <Lock size={20} className="text-[#050403]" />
          </span>
          <h1 className="text-xl font-bold text-[#f5efe4]">Admin Login</h1>
          <p className="text-sm text-[#a89a83]">Sign in to edit your site content.</p>
        </div>

        <div>
          <label htmlFor="password" className="sr-only">
            Password
          </label>
          <input
            id="password"
            type="password"
            required
            autoFocus
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full px-4 py-3 rounded-lg bg-[#14100c] border border-[#2a231a] text-[#f5efe4] placeholder:text-[#5c5142] focus:outline-none focus:border-[#e8b654]/50 transition-colors"
          />
        </div>

        {error && <p className="text-sm text-red-400">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full gold-fill text-[#050403] font-bold py-3 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>
      </form>
    </div>
  );
}

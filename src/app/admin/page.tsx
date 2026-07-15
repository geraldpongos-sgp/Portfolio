"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, LogOut, Save, ExternalLink } from "lucide-react";
import { PortfolioData } from "@/data/portfolio";
import { PortfolioProvider } from "@/components/PortfolioProvider";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Services from "@/components/Services";
import Experience from "@/components/Experience";
import WhyChooseUs from "@/components/WhyChooseUs";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function AdminDashboard() {
  const router = useRouter();
  const [data, setData] = useState<PortfolioData | null>(null);
  const [blobConfigured, setBlobConfigured] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");

  useEffect(() => {
    Promise.all([
      fetch("/api/admin/content").then((res) => res.json()),
      fetch("/api/admin/status").then((res) => res.json()),
    ]).then(([content, status]) => {
      setData(content);
      setBlobConfigured(status.blobConfigured);
    });
  }, []);

  const handleUpdate = (updater: (data: PortfolioData) => PortfolioData) => {
    setData((prev) => (prev ? updater(prev) : prev));
  };

  const handleSave = async () => {
    if (!data) return;
    setSaving(true);
    setSaveMessage("");
    try {
      const res = await fetch("/api/admin/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Save failed");
      setSaveMessage("Saved.");
    } catch {
      setSaveMessage("Failed to save. Please try again.");
    } finally {
      setSaving(false);
      setTimeout(() => setSaveMessage(""), 3000);
    }
  };

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#050403]">
        <Loader2 size={28} className="animate-spin text-[#e8b654]" />
      </div>
    );
  }

  return (
    <PortfolioProvider data={data} isEditing blobConfigured={blobConfigured} onChange={handleUpdate}>
      <div className="fixed top-0 left-0 right-0 z-[60] h-10 bg-[#e8b654] text-[#050403] flex items-center justify-between px-4 shadow-md">
        <span className="text-xs font-bold uppercase tracking-wider">
          Editing Mode — click any text to edit
        </span>
        <div className="flex items-center gap-3">
          {saveMessage && <span className="text-xs font-semibold">{saveMessage}</span>}
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs font-semibold hover:opacity-70 transition-opacity"
          >
            View Site <ExternalLink size={12} />
          </a>
          <button
            onClick={handleSave}
            disabled={saving}
            className="inline-flex items-center gap-1.5 bg-[#050403] text-[#e8b654] text-xs font-bold px-3 py-1.5 rounded-full hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {saving ? <Loader2 size={12} className="animate-spin" /> : <Save size={12} />}
            Save
          </button>
          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-1 text-xs font-semibold hover:opacity-70 transition-opacity"
          >
            <LogOut size={12} /> Logout
          </button>
        </div>
      </div>

      <Navbar />
      <main className="flex-1 w-full">
        <Hero />
        <About />
        <Skills />
        <Services />
        <Experience />
        <WhyChooseUs />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </PortfolioProvider>
  );
}

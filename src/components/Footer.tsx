"use client";

import React from "react";
import { usePortfolioData } from "./PortfolioProvider";

export default function Footer() {
  const portfolioData = usePortfolioData();
  const currentYear = new Date().getFullYear();
  const { name } = portfolioData.personalInfo;
  const initials = name
    .split(" ")
    .map((part) => part[0])
    .join("");

  return (
    <footer className="bg-[#050403] border-t border-[#2a231a] py-12">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <span className="w-6 h-6 rounded-full gold-fill text-[#050403] flex items-center justify-center font-mono text-xs font-bold">
            {initials}
          </span>
          <p className="text-xs text-[#a89a83] font-mono">
            © {currentYear} {name.toUpperCase()}. ALL RIGHTS RESERVED.
          </p>
        </div>

        <div className="flex items-center gap-6">
          <p className="text-[10px] text-[#5c5142] font-mono tracking-widest uppercase">
            DESIGNED &amp; BUILT BY {name.split(" ")[0].toUpperCase()}
          </p>
          <a
            href="#hero"
            className="text-xs font-bold font-mono text-[#a89a83] hover:text-[#e8b654] transition-colors"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            BACK_TO_TOP ↑
          </a>
        </div>
      </div>
    </footer>
  );
}

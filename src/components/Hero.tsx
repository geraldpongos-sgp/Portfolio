"use client";

import React from "react";
import Image from "next/image";
import { motion, Variants } from "framer-motion";
import { ArrowRight, FileText } from "lucide-react";
import { usePortfolioData, useIsEditing, useUpdatePortfolioData, useBlobConfigured } from "./PortfolioProvider";
import { EditableText } from "./editing/EditableText";
import { EditableImage } from "./editing/EditableImage";

export default function Hero() {
  const portfolioData = usePortfolioData();
  const isEditing = useIsEditing();
  const update = useUpdatePortfolioData();
  const blobConfigured = useBlobConfigured();
  const { name, role, tagline, avatarUrl, resumeUrl, greeting, statusPill } = portfolioData.personalInfo;
  const firstName = name.split(" ")[0];
  const restName = name.split(" ").slice(1).join(" ");

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 18 },
    },
  };

  const imageVariants: Variants = {
    hidden: { opacity: 0, scale: 0.95, rotate: -2 },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: { type: "spring", stiffness: 60, damping: 15, delay: 0.4 },
    },
  };

  const handleCTAClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetElement = document.querySelector(href);
    if (targetElement) {
      const offsetTop = (targetElement as HTMLElement).offsetTop - 80;
      window.scrollTo({ top: offsetTop, behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-[92vh] flex items-center justify-center pt-32 pb-16 bg-[#050403] overflow-hidden"
    >
      {/* Topographic contour-line background texture */}
      <div className="absolute inset-0 topo-bg pointer-events-none z-0" />

      {/* Dot-grid corner accents */}
      <div className="absolute top-0 left-0 w-40 h-40 dot-grid opacity-60 pointer-events-none z-0 [mask-image:linear-gradient(135deg,black,transparent_70%)]" />
      <div className="absolute bottom-0 right-0 w-56 h-56 dot-grid opacity-60 pointer-events-none z-0 [mask-image:linear-gradient(-45deg,black,transparent_70%)]" />

      {/* Giant faint background word for editorial depth */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-[8%] flex justify-center pointer-events-none z-0 select-none"
      >
        <span className="font-[family-name:var(--font-display)] text-[16vw] leading-none text-transparent [-webkit-text-stroke:1px_rgba(232,182,84,0.12)] whitespace-nowrap">
          PORTFOLIO
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        {/* Left Column: Text & Content */}
        <motion.div
          className="lg:col-span-7 flex flex-col justify-center space-y-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Status Pill */}
          <motion.div variants={itemVariants} className="self-start">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#2a231a] bg-white/5 text-[10px] font-mono tracking-widest uppercase text-[#e8dcc4] font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              {isEditing ? (
                <EditableText
                  as="span"
                  value={statusPill}
                  onCommit={(v) => update((d) => ({ ...d, personalInfo: { ...d.personalInfo, statusPill: v } }))}
                />
              ) : (
                statusPill
              )}
            </span>
          </motion.div>

          {/* Heading */}
          <div className="space-y-3">
            <motion.p
              variants={itemVariants}
              className="text-sm font-mono tracking-wider uppercase text-[#a89a83]"
            >
              {isEditing ? (
                <EditableText
                  as="span"
                  value={greeting}
                  onCommit={(v) => update((d) => ({ ...d, personalInfo: { ...d.personalInfo, greeting: v } }))}
                />
              ) : (
                greeting
              )}
            </motion.p>
            <motion.h1
              variants={itemVariants}
              className="font-[family-name:var(--font-display)] text-5xl md:text-7xl tracking-tight leading-[0.95] text-[#f5efe4]"
            >
              {isEditing ? (
                <EditableText
                  value={firstName}
                  onCommit={(v) =>
                    update((d) => ({
                      ...d,
                      personalInfo: { ...d.personalInfo, name: `${v} ${restName}`.trim() },
                    }))
                  }
                />
              ) : (
                firstName
              )}{" "}
              <span className="font-[family-name:var(--font-script)] gold-text font-bold text-[1.15em] tracking-normal">
                {isEditing ? (
                  <EditableText
                    value={restName}
                    onCommit={(v) =>
                      update((d) => ({
                        ...d,
                        personalInfo: { ...d.personalInfo, name: `${firstName} ${v}`.trim() },
                      }))
                    }
                  />
                ) : (
                  restName
                )}
              </span>
            </motion.h1>
            <motion.h2
              variants={itemVariants}
              className="text-2xl md:text-3xl font-medium text-[#d8cbb2] tracking-tight"
            >
              {isEditing ? (
                <EditableText
                  value={role}
                  onCommit={(v) => update((d) => ({ ...d, personalInfo: { ...d.personalInfo, role: v } }))}
                />
              ) : (
                role
              )}
            </motion.h2>
          </div>

          {/* Tagline */}
          <motion.p
            variants={itemVariants}
            className="text-[#a89a83] text-lg md:text-xl max-w-xl font-normal leading-relaxed"
          >
            {isEditing ? (
              <EditableText
                as="span"
                multiline
                value={tagline}
                onCommit={(v) => update((d) => ({ ...d, personalInfo: { ...d.personalInfo, tagline: v } }))}
              />
            ) : (
              tagline
            )}
          </motion.p>

          {/* CTAs */}
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 pt-4">
            <a
              href="#services"
              onClick={(e) => handleCTAClick(e, "#services")}
              className="group gold-fill text-[#050403] hover:opacity-90 px-8 py-4 rounded-full font-bold text-sm inline-flex items-center justify-center gap-2 transition-all duration-300 shadow-md hover:shadow-[0_0_24px_rgba(232,182,84,0.35)]"
            >
              View Services
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </a>
            {isEditing ? (
              <div className="flex flex-col gap-1.5">
                <EditableImage
                  inline
                  accept="application/pdf"
                  label="Upload New Resume"
                  blobConfigured={blobConfigured}
                  onUploaded={(url) =>
                    update((d) => ({ ...d, personalInfo: { ...d.personalInfo, resumeUrl: url } }))
                  }
                />
                <EditableText
                  value={resumeUrl}
                  className="text-[10px] text-[#a89a83] font-mono text-center"
                  placeholder="...or paste a resume URL"
                  onCommit={(v) => update((d) => ({ ...d, personalInfo: { ...d.personalInfo, resumeUrl: v } }))}
                />
              </div>
            ) : (
              <a
                href={resumeUrl}
                className="group border border-[#e8b654]/40 text-[#e8dcc4] hover:bg-[#e8b654]/10 px-8 py-4 rounded-full font-semibold text-sm inline-flex items-center justify-center gap-2 transition-all duration-300"
              >
                <FileText size={16} />
                Read Resume
              </a>
            )}
          </motion.div>
        </motion.div>

        {/* Right Column: Creative Portrait Framing */}
        <div className="lg:col-span-5 flex justify-center lg:justify-end">
          <motion.div
            className="relative w-[280px] h-[350px] sm:w-[350px] sm:h-[430px]"
            variants={imageVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Background Gold Shadow Frame */}
            <div className="absolute inset-0 border border-[#e8b654]/50 translate-x-4 translate-y-4 rounded-2xl z-0 transition-transform duration-300 hover:translate-x-2 hover:translate-y-2" />

            {/* Inner Content Container */}
            <div className="absolute inset-0 bg-[#14100c] border border-[#2a231a] rounded-2xl overflow-hidden z-10 shadow-lg flex items-center justify-center group">
              <Image
                src={avatarUrl}
                alt={name}
                fill
                priority
                sizes="(max-w-768px) 100vw, 33vw"
                className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-70 pointer-events-none" />
              <div className="absolute top-4 left-4 font-mono text-[10px] text-[#e8dcc4] bg-black/50 px-2 py-0.5 rounded border border-[#e8b654]/30 backdrop-blur-sm z-20">
                BCD // 10.6765&deg; N
              </div>

              {isEditing && (
                <EditableImage
                  blobConfigured={blobConfigured}
                  onUploaded={(url) =>
                    update((d) => ({ ...d, personalInfo: { ...d.personalInfo, avatarUrl: url } }))
                  }
                />
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

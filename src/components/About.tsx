"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { usePortfolioData, useIsEditing, useUpdatePortfolioData } from "./PortfolioProvider";
import { EditableText } from "./editing/EditableText";
import { AddTile, RemoveButton } from "./editing/EditControls";

export default function About() {
  const portfolioData = usePortfolioData();
  const isEditing = useIsEditing();
  const update = useUpdatePortfolioData();
  const { bioFull, stats } = portfolioData.personalInfo;
  const heading = portfolioData.sectionHeadings.about;

  const updateHeading = (patch: Partial<typeof heading>) =>
    update((d) => ({
      ...d,
      sectionHeadings: { ...d.sectionHeadings, about: { ...d.sectionHeadings.about, ...patch } },
    }));

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 20 },
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
    <section id="about" className="relative py-24 bg-[#0d0b09] border-t border-b border-[#2a231a] overflow-hidden">
      <div className="absolute inset-0 topo-bg pointer-events-none z-0" />
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20"
          variants={containerVariants}
          initial={isEditing ? "visible" : "hidden"}
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Left Column: Heading & Editorial Biography */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            <div className="space-y-6">
              <motion.div variants={itemVariants} className="flex items-center gap-4">
                <span className="text-xs font-mono tracking-widest uppercase text-[#a89a83]">
                  01 // BACKGROUND
                </span>
                <div className="h-px bg-[#2a231a] flex-grow" />
              </motion.div>

              <motion.h3
                variants={itemVariants}
                className="font-[family-name:var(--font-display)] text-4xl md:text-5xl tracking-tight text-[#f5efe4]"
              >
                {isEditing ? (
                  <>
                    <EditableText as="span" value={heading.plain} onCommit={(v) => updateHeading({ plain: v })} />{" "}
                    <EditableText
                      as="span"
                      className="gold-text"
                      value={heading.accent}
                      onCommit={(v) => updateHeading({ accent: v })}
                    />
                  </>
                ) : (
                  <>
                    {heading.plain} <span className="gold-text">{heading.accent}</span>
                  </>
                )}
              </motion.h3>

              <motion.div
                variants={itemVariants}
                className="text-[#a89a83] text-lg md:text-xl font-normal leading-relaxed space-y-6 pt-4"
              >
                {isEditing ? (
                  <EditableText
                    as="p"
                    multiline
                    value={bioFull}
                    onCommit={(v) =>
                      update((d) => ({ ...d, personalInfo: { ...d.personalInfo, bioFull: v } }))
                    }
                  />
                ) : (
                  <p>{bioFull}</p>
                )}
              </motion.div>

              <motion.div variants={itemVariants}>
                <a
                  href="#contact"
                  onClick={(e) => handleCTAClick(e, "#contact")}
                  className="group gold-fill text-[#050403] hover:opacity-90 px-6 py-3 rounded-full font-bold text-sm inline-flex items-center justify-center gap-2 transition-all duration-300 shadow-md hover:shadow-[0_0_24px_rgba(232,182,84,0.35)]"
                >
                  Learn More
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </a>
              </motion.div>
            </div>
          </div>

          {/* Right Column: Stats */}
          <div className="lg:col-span-6 flex flex-col justify-center gap-4">
            <motion.div variants={itemVariants} className="grid grid-cols-3 gap-4 w-full">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  className="relative bg-[#14100c] border border-[#2a231a] p-6 rounded-2xl flex flex-col justify-between h-36 shadow-sm hover:border-[#e8b654]/50 transition-all duration-300 group"
                  whileHover={{ y: -4 }}
                >
                  {isEditing && (
                    <RemoveButton
                      className="absolute -top-2 -right-2 w-6 h-6"
                      onClick={() =>
                        update((d) => ({
                          ...d,
                          personalInfo: {
                            ...d.personalInfo,
                            stats: d.personalInfo.stats.filter((_, i) => i !== index),
                          },
                        }))
                      }
                    />
                  )}
                  {isEditing ? (
                    <EditableText
                      as="span"
                      value={stat.value}
                      className="text-3xl sm:text-4xl font-extrabold tracking-tight gold-text font-mono inline-block"
                      onCommit={(v) =>
                        update((d) => {
                          const next = [...d.personalInfo.stats];
                          next[index] = { ...next[index], value: v };
                          return { ...d, personalInfo: { ...d.personalInfo, stats: next } };
                        })
                      }
                    />
                  ) : (
                    <span className="text-3xl sm:text-4xl font-extrabold tracking-tight gold-text font-mono transition-transform duration-300 group-hover:scale-105 inline-block">
                      {stat.value}
                    </span>
                  )}
                  {isEditing ? (
                    <EditableText
                      as="span"
                      value={stat.label}
                      className="text-xs font-semibold text-[#a89a83] leading-snug"
                      onCommit={(v) =>
                        update((d) => {
                          const next = [...d.personalInfo.stats];
                          next[index] = { ...next[index], label: v };
                          return { ...d, personalInfo: { ...d.personalInfo, stats: next } };
                        })
                      }
                    />
                  ) : (
                    <span className="text-xs font-semibold text-[#a89a83] group-hover:text-[#e8dcc4] transition-colors duration-300 leading-snug">
                      {stat.label}
                    </span>
                  )}
                </motion.div>
              ))}
              {isEditing && (
                <AddTile
                  label="Add"
                  className="h-36"
                  onClick={() =>
                    update((d) => ({
                      ...d,
                      personalInfo: {
                        ...d.personalInfo,
                        stats: [...d.personalInfo.stats, { label: "New Stat", value: "0" }],
                      },
                    }))
                  }
                />
              )}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

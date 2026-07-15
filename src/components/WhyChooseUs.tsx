"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, Variants } from "framer-motion";
import { ImageIcon } from "lucide-react";
import { usePortfolioData, useIsEditing, useUpdatePortfolioData, useBlobConfigured } from "./PortfolioProvider";
import { WhyChooseUsItem } from "@/data/portfolio";
import { EditableText } from "./editing/EditableText";
import { EditableImage } from "./editing/EditableImage";
import { AddTile, RemoveButton } from "./editing/EditControls";

function getDescriptionBullets(description: string): string[] {
  const byNewline = description
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
  if (byNewline.length > 1) return byNewline;

  const byNumbering = description
    .split(/(?:^|\s)\d+\.\s+/)
    .map((part) => part.trim())
    .filter(Boolean);
  if (byNumbering.length > 1) return byNumbering;

  return description.trim() ? [description.trim()] : [];
}

export default function WhyChooseUs() {
  const portfolioData = usePortfolioData();
  const isEditing = useIsEditing();
  const update = useUpdatePortfolioData();
  const blobConfigured = useBlobConfigured();
  const { whyChooseUs, whyChooseUsSubtitle } = portfolioData;
  const [activeIndex, setActiveIndex] = useState(0);

  if (whyChooseUs.length === 0 && !isEditing) return null;

  const safeIndex = Math.min(activeIndex, whyChooseUs.length - 1);
  const active = whyChooseUs[safeIndex];

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 18 },
    },
  };

  const updateItem = (index: number, patch: Partial<WhyChooseUsItem>) => {
    update((d) => {
      const next = [...d.whyChooseUs];
      next[index] = { ...next[index], ...patch };
      return { ...d, whyChooseUs: next };
    });
  };

  return (
    <section id="highlights" className="relative py-24 bg-[#0d0b09] border-t border-b border-[#2a231a] overflow-hidden">
      <div className="absolute inset-0 topo-bg pointer-events-none z-0" />
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="mb-16">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-xs font-mono tracking-widest uppercase text-[#a89a83]">
              05 // PROJECTS
            </span>
            <div className="h-px bg-[#2a231a] flex-grow" />
          </div>
          <h3 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl tracking-tight text-[#f5efe4]">
            <span className="gold-text">Projects</span>
          </h3>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-6"
          initial={isEditing ? "visible" : "hidden"}
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={itemVariants}
        >
          {/* Tab List */}
          <div className="flex flex-col gap-2">
            {isEditing ? (
              <EditableText
                as="p"
                value={whyChooseUsSubtitle}
                className="font-bold text-sm text-[#f5efe4] mb-1"
                onCommit={(v) => update((d) => ({ ...d, whyChooseUsSubtitle: v }))}
              />
            ) : (
              whyChooseUsSubtitle && (
                <p className="font-bold text-sm text-[#f5efe4] mb-1">{whyChooseUsSubtitle}</p>
              )
            )}

            {whyChooseUs.map((item, index) => (
              <div key={index} className="relative">
                <button
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  className={`w-full text-left px-5 py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors border ${
                    index === safeIndex
                      ? "gold-fill text-[#050403] border-transparent"
                      : "bg-white/5 border-[#2a231a] text-[#a89a83] hover:text-[#f5efe4] hover:border-[#e8b654]/40"
                  }`}
                >
                  {isEditing ? (
                    <EditableText
                      as="span"
                      value={item.navLabel ?? item.title}
                      onCommit={(v) => updateItem(index, { navLabel: v })}
                    />
                  ) : (
                    item.navLabel ?? item.title
                  )}
                </button>
                {isEditing && (
                  <RemoveButton
                    className="absolute top-1.5 right-1.5 w-5 h-5"
                    size={10}
                    onClick={() => {
                      update((d) => ({ ...d, whyChooseUs: d.whyChooseUs.filter((_, i) => i !== index) }));
                      setActiveIndex((cur) => Math.max(0, Math.min(cur, whyChooseUs.length - 2)));
                    }}
                  />
                )}
              </div>
            ))}
            {isEditing && (
              <AddTile
                label="Add Tab"
                className="py-2.5 text-xs"
                onClick={() => {
                  update((d) => ({
                    ...d,
                    whyChooseUs: [...d.whyChooseUs, { title: "New Tab", description: "" }],
                  }));
                  setActiveIndex(whyChooseUs.length);
                }}
              />
            )}
          </div>

          {/* Content Panel */}
          <div className="gold-border rounded-2xl p-8 md:p-10 bg-[#14100c]">
            {active ? (
              <>
                <div className="flex items-start gap-4 mb-4">
                  <div className="relative w-16 h-16 rounded-full overflow-hidden shrink-0 bg-[#0d0b09] border-2 border-[#e8b654]/50 flex items-center justify-center">
                    {active.thumbnailUrl ? (
                      <Image src={active.thumbnailUrl} alt={active.title} fill className="object-cover" />
                    ) : (
                      <ImageIcon size={22} className="text-[#5c5142]" />
                    )}
                    {isEditing && (
                      <EditableImage
                        blobConfigured={blobConfigured}
                        label="Change Icon"
                        className="rounded-full"
                        onUploaded={(url) => updateItem(safeIndex, { thumbnailUrl: url })}
                      />
                    )}
                  </div>
                  <div className="flex-1 flex items-end justify-between gap-3">
                    <div className="flex flex-col gap-0.5">
                      {isEditing ? (
                        <EditableText
                          as="h4"
                          value={active.title}
                          className="text-2xl md:text-3xl font-bold tracking-tight text-[#f5efe4]"
                          onCommit={(v) => updateItem(safeIndex, { title: v })}
                        />
                      ) : (
                        <h4 className="text-2xl md:text-3xl font-bold tracking-tight text-[#f5efe4]">
                          {active.title}
                        </h4>
                      )}
                      {isEditing ? (
                        <EditableText
                          as="p"
                          value={active.subtitle || ""}
                          placeholder="Add a subtitle..."
                          className="text-sm text-[#a89a83]"
                          onCommit={(v) => updateItem(safeIndex, { subtitle: v })}
                        />
                      ) : (
                        active.subtitle && (
                          <p className="text-sm text-[#a89a83]">{active.subtitle}</p>
                        )
                      )}
                    </div>
                    {isEditing ? (
                      <EditableText
                        as="span"
                        value={active.sideText || ""}
                        placeholder="Add text..."
                        className="text-xs font-mono text-[#a89a83] shrink-0 text-right"
                        onCommit={(v) => updateItem(safeIndex, { sideText: v })}
                      />
                    ) : (
                      active.sideText && (
                        <span className="text-xs font-mono text-[#a89a83] shrink-0 text-right">
                          {active.sideText}
                        </span>
                      )
                    )}
                  </div>
                </div>
                {isEditing ? (
                  <div className="flex flex-col gap-1.5">
                    <ul className="space-y-1.5">
                      {getDescriptionBullets(active.description).map((bullet, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm md:text-base text-[#a89a83] leading-relaxed">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#e8b654] mt-2 flex-shrink-0" />
                          <EditableText
                            as="span"
                            value={bullet}
                            className="flex-1"
                            onCommit={(v) => {
                              const bullets = [...getDescriptionBullets(active.description)];
                              bullets[idx] = v;
                              updateItem(safeIndex, { description: bullets.join("\n") });
                            }}
                          />
                          <RemoveButton
                            size={9}
                            className="w-4 h-4 shrink-0"
                            onClick={() => {
                              const bullets = getDescriptionBullets(active.description).filter((_, i) => i !== idx);
                              updateItem(safeIndex, { description: bullets.join("\n") });
                            }}
                          />
                        </li>
                      ))}
                    </ul>
                    <AddTile
                      label="Add Bullet"
                      className="py-1.5 text-xs"
                      onClick={() => {
                        const bullets = [...getDescriptionBullets(active.description), "New point"];
                        updateItem(safeIndex, { description: bullets.join("\n") });
                      }}
                    />
                  </div>
                ) : (
                  <ul className="text-sm md:text-base text-[#a89a83] leading-relaxed list-disc pl-4 space-y-1.5">
                    {getDescriptionBullets(active.description).map((bullet, i) => (
                      <li key={i}>{bullet}</li>
                    ))}
                  </ul>
                )}
              </>
            ) : (
              isEditing && (
                <p className="text-sm text-[#a89a83]">No tabs yet — add one on the left.</p>
              )
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

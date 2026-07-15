"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { usePortfolioData, useIsEditing, useUpdatePortfolioData } from "./PortfolioProvider";
import { toolIconMap as iconMap, toolIconNames } from "@/lib/icons";
import { EditableText } from "./editing/EditableText";
import { AddTile, RemoveButton } from "./editing/EditControls";
import { IconPickerButton } from "./editing/IconPickerButton";

export default function Skills() {
  const portfolioData = usePortfolioData();
  const isEditing = useIsEditing();
  const update = useUpdatePortfolioData();
  const { toolCategories } = portfolioData;
  const heading = portfolioData.sectionHeadings.skills;

  const updateHeading = (patch: Partial<typeof heading>) =>
    update((d) => ({
      ...d,
      sectionHeadings: { ...d.sectionHeadings, skills: { ...d.sectionHeadings.skills, ...patch } },
    }));

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.06 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 15, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: "spring", stiffness: 120, damping: 18 },
    },
  };

  return (
    <section id="skills" className="relative py-24 bg-[#050403] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Section Header */}
        <div className="mb-16">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-xs font-mono tracking-widest uppercase text-[#a89a83]">
              02 // CAPABILITIES
            </span>
            <div className="h-px bg-[#2a231a] flex-grow" />
          </div>
          <h3 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl tracking-tight text-[#f5efe4]">
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
          </h3>
        </div>

        {/* Bordered showcase container, echoing the reference design's tools panel */}
        <div className="gold-border rounded-3xl p-6 md:p-10 bg-[#0d0b09] space-y-10">
          {toolCategories.map((category, catIndex) => (
            <div key={catIndex} className="relative">
              {isEditing && (
                <RemoveButton
                  className="absolute -top-2 -left-2 w-6 h-6"
                  onClick={() =>
                    update((d) => ({
                      ...d,
                      toolCategories: d.toolCategories.filter((_, i) => i !== catIndex),
                    }))
                  }
                />
              )}
              {isEditing ? (
                <EditableText
                  as="h4"
                  value={category.categoryName}
                  className="text-xs font-mono tracking-widest uppercase text-[#a89a83] mb-5 inline-block"
                  onCommit={(v) =>
                    update((d) => {
                      const next = [...d.toolCategories];
                      next[catIndex] = { ...next[catIndex], categoryName: v };
                      return { ...d, toolCategories: next };
                    })
                  }
                />
              ) : (
                <h4 className="text-xs font-mono tracking-widest uppercase text-[#a89a83] mb-5">
                  {category.categoryName}
                </h4>
              )}
              <motion.div
                className="flex flex-wrap gap-3"
                variants={containerVariants}
                initial={isEditing ? "visible" : "hidden"}
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
              >
                {category.tools.map((tool, toolIndex) => {
                  const IconComponent = iconMap[tool.icon];
                  return (
                    <motion.div
                      key={toolIndex}
                      variants={itemVariants}
                      className="relative flex items-center gap-2.5 bg-[#14100c] border border-[#2a231a] hover:border-[#e8b654]/50 rounded-xl px-4 py-3 transition-colors duration-300 group"
                    >
                      {isEditing && (
                        <RemoveButton
                          className="absolute -top-2 -right-2 w-5 h-5"
                          size={10}
                          onClick={() =>
                            update((d) => {
                              const next = [...d.toolCategories];
                              next[catIndex] = {
                                ...next[catIndex],
                                tools: next[catIndex].tools.filter((_, i) => i !== toolIndex),
                              };
                              return { ...d, toolCategories: next };
                            })
                          }
                        />
                      )}
                      {isEditing ? (
                        <IconPickerButton
                          value={tool.icon}
                          options={toolIconNames}
                          iconMap={iconMap}
                          size={18}
                          onChange={(icon) =>
                            update((d) => {
                              const next = [...d.toolCategories];
                              const tools = [...next[catIndex].tools];
                              tools[toolIndex] = { ...tools[toolIndex], icon };
                              next[catIndex] = { ...next[catIndex], tools };
                              return { ...d, toolCategories: next };
                            })
                          }
                        />
                      ) : (
                        IconComponent && (
                          <IconComponent size={18} className="text-[#e8b654] shrink-0" />
                        )
                      )}
                      {isEditing ? (
                        <EditableText
                          as="span"
                          value={tool.name}
                          className="text-sm font-semibold text-[#d8cbb2] whitespace-nowrap"
                          onCommit={(v) =>
                            update((d) => {
                              const next = [...d.toolCategories];
                              const tools = [...next[catIndex].tools];
                              tools[toolIndex] = { ...tools[toolIndex], name: v };
                              next[catIndex] = { ...next[catIndex], tools };
                              return { ...d, toolCategories: next };
                            })
                          }
                        />
                      ) : (
                        <span className="text-sm font-semibold text-[#d8cbb2] group-hover:text-[#f5efe4] transition-colors whitespace-nowrap">
                          {tool.name}
                        </span>
                      )}
                    </motion.div>
                  );
                })}
                {isEditing && (
                  <AddTile
                    label="Add Tool"
                    className="px-4 py-3"
                    onClick={() =>
                      update((d) => {
                        const next = [...d.toolCategories];
                        next[catIndex] = {
                          ...next[catIndex],
                          tools: [...next[catIndex].tools, { name: "New Tool", icon: toolIconNames[0] }],
                        };
                        return { ...d, toolCategories: next };
                      })
                    }
                  />
                )}
              </motion.div>
            </div>
          ))}
          {isEditing && (
            <AddTile
              label="Add Category"
              className="w-full py-4"
              onClick={() =>
                update((d) => ({
                  ...d,
                  toolCategories: [...d.toolCategories, { categoryName: "New Category", tools: [] }],
                }))
              }
            />
          )}
        </div>
      </div>
    </section>
  );
}

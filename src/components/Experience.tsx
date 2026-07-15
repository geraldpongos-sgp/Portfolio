"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { Calendar, MapPin } from "lucide-react";
import { usePortfolioData, useIsEditing, useUpdatePortfolioData } from "./PortfolioProvider";
import { EditableText } from "./editing/EditableText";
import { AddTile, RemoveButton } from "./editing/EditControls";

export default function Experience() {
  const portfolioData = usePortfolioData();
  const isEditing = useIsEditing();
  const update = useUpdatePortfolioData();
  const { experiences } = portfolioData;
  const heading = portfolioData.sectionHeadings.experience;

  const updateHeading = (patch: Partial<typeof heading>) =>
    update((d) => ({
      ...d,
      sectionHeadings: { ...d.sectionHeadings, experience: { ...d.sectionHeadings.experience, ...patch } },
    }));

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { type: "spring", stiffness: 100, damping: 20 },
    },
  };

  const updateExp = (index: number, patch: Partial<(typeof experiences)[number]>) => {
    update((d) => {
      const next = [...d.experiences];
      next[index] = { ...next[index], ...patch };
      return { ...d, experiences: next };
    });
  };

  return (
    <section id="experience" className="relative py-24 bg-[#0d0b09] border-t border-b border-[#2a231a] overflow-hidden">
      <div className="absolute inset-0 topo-bg pointer-events-none z-0" />
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Section Header */}
        <div className="mb-16">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-xs font-mono tracking-widest uppercase text-[#a89a83]">
              04 // HISTORY
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

        {/* Timeline Wrapper */}
        <div className="relative max-w-4xl mx-auto">
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[1px] bg-[#2a231a]" />

          <motion.div
            className="space-y-12"
            variants={containerVariants}
            initial={isEditing ? "visible" : "hidden"}
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {experiences.map((exp, index) => {
              const isEven = index % 2 === 0;

              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className={`flex flex-col md:flex-row relative items-stretch ${
                    isEven ? "md:flex-row-reverse" : ""
                  }`}
                >
                  {/* Timeline Dot Node */}
                  <div className="absolute left-4 md:left-1/2 w-4 h-4 bg-[#050403] border-2 border-[#e8b654] rounded-full transform -translate-x-[7px] md:-translate-x-2 top-6 z-10" />

                  {/* Left (Date / Placeholder for alignment) */}
                  <div
                    className={`hidden md:flex w-1/2 px-8 items-start pt-6 ${
                      isEven ? "justify-start" : "justify-end"
                    }`}
                  >
                    <div className={`text-xs font-mono text-[#a89a83] space-y-1 ${isEven ? "text-left" : "text-right"}`}>
                      {isEditing ? (
                        <EditableText
                          as="div"
                          value={exp.duration}
                          className="text-[#e8dcc4] font-semibold"
                          onCommit={(v) => updateExp(index, { duration: v })}
                        />
                      ) : (
                        <div className="text-[#e8dcc4] font-semibold">{exp.duration}</div>
                      )}
                      {isEditing ? (
                        <EditableText
                          as="div"
                          value={exp.location}
                          onCommit={(v) => updateExp(index, { location: v })}
                        />
                      ) : (
                        <div>{exp.location}</div>
                      )}
                    </div>
                  </div>

                  {/* Right (Content Block) */}
                  <div className={`w-full md:w-1/2 pl-12 md:pl-0 ${isEven ? "md:pr-8" : "md:pl-8"}`}>
                    <motion.div
                      className="bg-[#14100c] border border-[#2a231a] p-8 rounded-2xl shadow-sm hover:border-[#e8b654]/50 transition-all duration-300 relative"
                      whileHover={{ y: -4 }}
                    >
                      {isEditing && (
                        <RemoveButton
                          className="absolute -top-2 -right-2 w-6 h-6"
                          onClick={() =>
                            update((d) => ({
                              ...d,
                              experiences: d.experiences.filter((_, i) => i !== index),
                            }))
                          }
                        />
                      )}

                      <div className="md:hidden flex flex-wrap items-center gap-y-2 gap-x-4 text-xs font-semibold text-[#a89a83] font-mono mb-4">
                        <span className="flex items-center gap-1.5 bg-white/5 px-2.5 py-1 rounded-md text-[#e8dcc4]">
                          <Calendar size={12} />
                          {isEditing ? (
                            <EditableText
                              value={exp.duration}
                              onCommit={(v) => updateExp(index, { duration: v })}
                            />
                          ) : (
                            exp.duration
                          )}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <MapPin size={12} />
                          {isEditing ? (
                            <EditableText
                              value={exp.location}
                              onCommit={(v) => updateExp(index, { location: v })}
                            />
                          ) : (
                            exp.location
                          )}
                        </span>
                      </div>

                      {isEditing ? (
                        <EditableText
                          as="h4"
                          value={exp.role}
                          className="text-2xl font-bold tracking-tight text-[#f5efe4]"
                          onCommit={(v) => updateExp(index, { role: v })}
                        />
                      ) : (
                        <h4 className="text-2xl font-bold tracking-tight text-[#f5efe4]">{exp.role}</h4>
                      )}
                      {isEditing ? (
                        <EditableText
                          as="p"
                          value={exp.company}
                          className="text-lg font-semibold gold-text mb-4 font-mono"
                          onCommit={(v) => updateExp(index, { company: v })}
                        />
                      ) : (
                        <p className="text-lg font-semibold gold-text mb-4 font-mono">{exp.company}</p>
                      )}

                      {isEditing ? (
                        <EditableText
                          as="p"
                          multiline
                          value={exp.description}
                          className="text-[#a89a83] text-sm leading-relaxed mb-6"
                          onCommit={(v) => updateExp(index, { description: v })}
                        />
                      ) : (
                        <p className="text-[#a89a83] text-sm leading-relaxed mb-6">{exp.description}</p>
                      )}

                      <ul className="space-y-2 mb-6" aria-label="Key Accomplishments">
                        {exp.highlights.map((highlight, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-xs text-[#a89a83] leading-relaxed">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#e8b654] mt-1.5 flex-shrink-0" />
                            {isEditing ? (
                              <>
                                <EditableText
                                  as="span"
                                  multiline
                                  value={highlight}
                                  className="flex-1"
                                  onCommit={(v) => {
                                    const next = [...exp.highlights];
                                    next[idx] = v;
                                    updateExp(index, { highlights: next });
                                  }}
                                />
                                <RemoveButton
                                  size={9}
                                  className="w-4 h-4 shrink-0"
                                  onClick={() =>
                                    updateExp(index, {
                                      highlights: exp.highlights.filter((_, i) => i !== idx),
                                    })
                                  }
                                />
                              </>
                            ) : (
                              <span>{highlight}</span>
                            )}
                          </li>
                        ))}
                      </ul>
                      {isEditing && (
                        <AddTile
                          label="Add Highlight"
                          className="py-1.5 mb-6 text-xs"
                          onClick={() => updateExp(index, { highlights: [...exp.highlights, "New highlight"] })}
                        />
                      )}

                      <div className="flex flex-wrap gap-2">
                        {exp.tags.map((tag, idx) => (
                          <span
                            key={idx}
                            className="relative bg-white/5 border border-[#2a231a] text-[#d8cbb2] text-[10px] font-mono tracking-wider px-2.5 py-1 rounded-md flex items-center gap-1.5"
                          >
                            {isEditing ? (
                              <>
                                <EditableText
                                  as="span"
                                  value={tag}
                                  onCommit={(v) => {
                                    const next = [...exp.tags];
                                    next[idx] = v;
                                    updateExp(index, { tags: next });
                                  }}
                                />
                                <RemoveButton
                                  size={8}
                                  className="w-3.5 h-3.5 shrink-0"
                                  onClick={() => updateExp(index, { tags: exp.tags.filter((_, i) => i !== idx) })}
                                />
                              </>
                            ) : (
                              tag
                            )}
                          </span>
                        ))}
                        {isEditing && (
                          <button
                            type="button"
                            onClick={() => updateExp(index, { tags: [...exp.tags, "tag"] })}
                            className="text-[10px] font-mono tracking-wider px-2.5 py-1 rounded-md border border-dashed border-[#e8b654]/40 hover:border-[#e8b654] text-[#e8b654] transition-colors"
                          >
                            + Tag
                          </button>
                        )}
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {isEditing && (
            <AddTile
              label="Add Experience"
              className="mt-8 py-6 ml-12 md:ml-0"
              onClick={() =>
                update((d) => ({
                  ...d,
                  experiences: [
                    ...d.experiences,
                    {
                      company: "New Company",
                      role: "New Role",
                      duration: "",
                      location: "",
                      description: "",
                      highlights: [],
                      tags: [],
                    },
                  ],
                }))
              }
            />
          )}
        </div>
      </div>
    </section>
  );
}

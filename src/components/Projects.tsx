"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { Play, X, ImageIcon, Star } from "lucide-react";
import { usePortfolioData, useIsEditing, useUpdatePortfolioData, useBlobConfigured } from "./PortfolioProvider";
import { Project } from "@/data/portfolio";
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

export default function Projects() {
  const portfolioData = usePortfolioData();
  const isEditing = useIsEditing();
  const update = useUpdatePortfolioData();
  const blobConfigured = useBlobConfigured();
  const { projects } = portfolioData;
  const heading = portfolioData.sectionHeadings.projects;
  const [activeVideo, setActiveVideo] = useState<Project | null>(null);

  const updateHeading = (patch: Partial<typeof heading>) =>
    update((d) => ({
      ...d,
      sectionHeadings: { ...d.sectionHeadings, projects: { ...d.sectionHeadings.projects, ...patch } },
    }));

  if (projects.length === 0 && !isEditing) return null;

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 18 },
    },
  };

  const updateProject = (id: string, patch: Partial<Project>) => {
    update((d) => ({
      ...d,
      projects: d.projects.map((p) => (p.id === id ? { ...p, ...patch } : p)),
    }));
  };

  return (
    <section id="projects" className="relative py-24 bg-[#050403] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="mb-16">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-xs font-mono tracking-widest uppercase text-[#a89a83]">
              06 // SAMPLES
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
          {isEditing && projects.length === 0 && (
            <p className="text-sm text-[#a89a83] mt-3">
              No project samples yet — this section stays hidden on the live site until you add one.
            </p>
          )}
        </div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial={isEditing ? "visible" : "hidden"}
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {projects.map((project) => (
            <motion.div
              key={project.id}
              variants={itemVariants}
              className="group relative gold-border rounded-2xl overflow-hidden bg-[#0d0b09] flex flex-col"
            >
              {isEditing && (
                <RemoveButton
                  className="absolute top-2 right-2 !z-40 w-7 h-7"
                  onClick={() =>
                    update((d) => ({ ...d, projects: d.projects.filter((p) => p.id !== project.id) }))
                  }
                />
              )}
              <div className="relative aspect-video overflow-hidden bg-[#14100c]">
                {project.thumbnailUrl ? (
                  <Image
                    src={project.thumbnailUrl}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-[#5c5142]">
                    <ImageIcon size={28} />
                  </div>
                )}
                {project.videoUrl && !isEditing && (
                  <button
                    onClick={() => setActiveVideo(project)}
                    aria-label={`Play ${project.title} video`}
                    className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/50 transition-colors"
                  >
                    <span className="w-14 h-14 rounded-full gold-fill flex items-center justify-center shadow-lg">
                      <Play size={22} className="text-[#050403] ml-0.5" fill="currentColor" />
                    </span>
                  </button>
                )}
                {isEditing && (
                  <EditableImage
                    blobConfigured={blobConfigured}
                    label="Change Thumbnail"
                    onUploaded={(url) => updateProject(project.id, { thumbnailUrl: url })}
                  />
                )}
              </div>
              <div className="p-5 flex flex-col gap-2 flex-1">
             
                {isEditing ? (
                  <EditableText
                    as="h4"
                    value={project.title}
                    className="text-lg font-bold text-[#f5efe4] truncate block"
                    onCommit={(v) => updateProject(project.id, { title: v })}
                  />
                ) : (
                  <h4 className="text-lg font-bold text-[#f5efe4] truncate">{project.title}</h4>
                )}
                {isEditing ? (
                  <div className="flex flex-col gap-1.5 flex-1">
                    <ul className="space-y-1.5">
                      {getDescriptionBullets(project.description).map((bullet, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-[#a89a83] leading-relaxed">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#e8b654] mt-2 flex-shrink-0" />
                          <EditableText
                            as="span"
                            value={bullet}
                            className="flex-1"
                            onCommit={(v) => {
                              const bullets = [...getDescriptionBullets(project.description)];
                              bullets[idx] = v;
                              updateProject(project.id, { description: bullets.join("\n") });
                            }}
                          />
                          <RemoveButton
                            size={9}
                            className="w-4 h-4 shrink-0"
                            onClick={() => {
                              const bullets = getDescriptionBullets(project.description).filter((_, i) => i !== idx);
                              updateProject(project.id, { description: bullets.join("\n") });
                            }}
                          />
                        </li>
                      ))}
                    </ul>
                    <AddTile
                      label="Add Bullet"
                      className="py-1.5 text-xs"
                      onClick={() => {
                        const bullets = [...getDescriptionBullets(project.description), "New point"];
                        updateProject(project.id, { description: bullets.join("\n") });
                      }}
                    />
                  </div>
                ) : (
  <>
    <ul className="text-sm text-[#a89a83] leading-relaxed flex-1 list-disc pl-4 space-y-1">

      {getDescriptionBullets(project.description).map((bullet, i) => (        
        <li key={i}>{bullet}</li>
      ))}
    </ul>
   </>
              )}
                {isEditing && (
                  <div className="flex flex-col gap-2 mt-2 pt-2 border-t border-[#2a231a]">
                    <label className="text-[10px] font-mono uppercase tracking-wider text-[#5c5142]">
                      Video
                    </label>
                    <EditableImage
                      inline
                      blobConfigured={blobConfigured}
                      accept="video/*"
                      label={project.videoUrl ? "Replace Video" : "Upload Video"}
                      onUploaded={(url) => updateProject(project.id, { videoUrl: url })}
                    />
                  </div>
                )}

              </div>
            </motion.div>
          ))}

          {isEditing && (
            <AddTile
              label="Add Project"
              className="py-8 min-h-[240px]"
              onClick={() =>
                update((d) => ({
                  ...d,
                  projects: [
                    ...d.projects,
                    {
                     id: crypto.randomUUID(),
                     title: "New Project",
                     description: "",
                     thumbnailUrl: "",
                     videoUrl: "",

                    },
                  ],
                }))
              }
            />
          )}
        </motion.div>
      </div>

      <AnimatePresence>
        {activeVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/85 flex items-center justify-center p-6"
            onClick={() => setActiveVideo(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-3xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setActiveVideo(null)}
                aria-label="Close video"
                className="absolute -top-10 right-0 text-[#f5efe4] hover:text-[#e8b654] transition-colors"
              >
                <X size={24} />
              </button>
              <video
                src={activeVideo.videoUrl}
                controls
                autoPlay
                className="w-full rounded-xl border border-[#2a231a] bg-black"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

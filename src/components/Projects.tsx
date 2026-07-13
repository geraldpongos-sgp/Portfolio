"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { Play, X, ExternalLink, ImageIcon } from "lucide-react";
import { usePortfolioData, useIsEditing, useUpdatePortfolioData, useBlobConfigured } from "./PortfolioProvider";
import { Project } from "@/data/portfolio";
import { EditableText } from "./editing/EditableText";
import { EditableImage } from "./editing/EditableImage";
import { AddTile, RemoveButton } from "./editing/EditControls";

export default function Projects() {
  const portfolioData = usePortfolioData();
  const isEditing = useIsEditing();
  const update = useUpdatePortfolioData();
  const blobConfigured = useBlobConfigured();
  const { projects } = portfolioData;
  const [activeVideo, setActiveVideo] = useState<Project | null>(null);

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
              05 // SAMPLES
            </span>
            <div className="h-px bg-[#2a231a] flex-grow" />
          </div>
          <h3 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl tracking-tight text-[#f5efe4]">
            Work <span className="gold-text">Samples</span>
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
          initial="hidden"
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
                  className="absolute top-2 right-2 z-30 w-7 h-7"
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
                    className="text-lg font-bold text-[#f5efe4]"
                    onCommit={(v) => updateProject(project.id, { title: v })}
                  />
                ) : (
                  <h4 className="text-lg font-bold text-[#f5efe4]">{project.title}</h4>
                )}
                {isEditing ? (
                  <EditableText
                    as="p"
                    multiline
                    value={project.description}
                    className="text-sm text-[#a89a83] leading-relaxed flex-1"
                    onCommit={(v) => updateProject(project.id, { description: v })}
                  />
                ) : (
                  <p className="text-sm text-[#a89a83] leading-relaxed flex-1">{project.description}</p>
                )}

                {isEditing ? (
                  <div className="flex flex-col gap-2 mt-2 pt-2 border-t border-[#2a231a]">
                    <label className="text-[10px] font-mono uppercase tracking-wider text-[#5c5142]">
                      Link URL
                    </label>
                    <EditableText
                      value={project.link || ""}
                      placeholder="https://..."
                      className="text-xs text-[#e8b654] font-mono"
                      onCommit={(v) => updateProject(project.id, { link: v })}
                    />
                    <label className="text-[10px] font-mono uppercase tracking-wider text-[#5c5142] mt-1">
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
                ) : (
                  project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#e8b654] hover:text-[#f5efe4] transition-colors mt-2"
                    >
                      View <ExternalLink size={13} />
                    </a>
                  )
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
                      link: "",
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

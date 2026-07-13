"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { usePortfolioData, useIsEditing, useUpdatePortfolioData } from "./PortfolioProvider";
import { serviceIconMap as iconMap, serviceIconNames } from "@/lib/icons";
import { EditableText } from "./editing/EditableText";
import { AddTile, RemoveButton } from "./editing/EditControls";
import { IconPickerButton } from "./editing/IconPickerButton";

export default function Services() {
  const portfolioData = usePortfolioData();
  const isEditing = useIsEditing();
  const update = useUpdatePortfolioData();
  const { services, servicesQuote } = portfolioData;

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

  return (
    <section id="services" className="relative py-24 bg-[#0d0b09] border-t border-b border-[#2a231a] overflow-hidden">
      <div className="absolute inset-0 topo-bg pointer-events-none z-0" />
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Section Header */}
        <div className="mb-16">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-xs font-mono tracking-widest uppercase text-[#a89a83]">
              03 // SERVICES
            </span>
            <div className="h-px bg-[#2a231a] flex-grow" />
          </div>
          <h3 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl tracking-tight text-[#f5efe4]">
            Why Work <span className="gold-text">With Me?</span>
          </h3>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {services.map((service, index) => {
            const IconComponent = iconMap[service.icon];
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className="relative bg-[#14100c] border border-[#2a231a] p-8 rounded-2xl flex flex-col space-y-6 hover:border-[#e8b654]/50 transition-colors duration-300"
              >
                {isEditing && (
                  <RemoveButton
                    className="absolute -top-2 -right-2 w-6 h-6"
                    onClick={() =>
                      update((d) => ({ ...d, services: d.services.filter((_, i) => i !== index) }))
                    }
                  />
                )}
                <div className="flex items-center gap-3">
                  {isEditing ? (
                    <IconPickerButton
                      value={service.icon}
                      options={serviceIconNames}
                      iconMap={iconMap}
                      size={20}
                      onChange={(icon) =>
                        update((d) => {
                          const next = [...d.services];
                          next[index] = { ...next[index], icon };
                          return { ...d, services: next };
                        })
                      }
                    />
                  ) : (
                    IconComponent && (
                      <span className="w-10 h-10 rounded-lg gold-fill flex items-center justify-center text-[#050403] shrink-0">
                        <IconComponent size={20} />
                      </span>
                    )
                  )}
                  {isEditing ? (
                    <EditableText
                      as="h4"
                      value={service.title}
                      className="text-lg font-bold tracking-tight text-[#f5efe4]"
                      onCommit={(v) =>
                        update((d) => {
                          const next = [...d.services];
                          next[index] = { ...next[index], title: v };
                          return { ...d, services: next };
                        })
                      }
                    />
                  ) : (
                    <h4 className="text-lg font-bold tracking-tight text-[#f5efe4]">{service.title}</h4>
                  )}
                </div>
                <ul className="space-y-3">
                  {service.items.map((item, idx) => (
                    <li key={idx} className="relative flex items-center gap-2.5 text-sm text-[#d8cbb2]">
                      <CheckCircle2 size={16} className="text-[#e8b654] shrink-0" />
                      {isEditing ? (
                        <>
                          <EditableText
                            as="span"
                            value={item}
                            className="flex-1"
                            onCommit={(v) =>
                              update((d) => {
                                const next = [...d.services];
                                const items = [...next[index].items];
                                items[idx] = v;
                                next[index] = { ...next[index], items };
                                return { ...d, services: next };
                              })
                            }
                          />
                          <RemoveButton
                            className="static w-4 h-4 shrink-0"
                            size={9}
                            onClick={() =>
                              update((d) => {
                                const next = [...d.services];
                                next[index] = {
                                  ...next[index],
                                  items: next[index].items.filter((_, i) => i !== idx),
                                };
                                return { ...d, services: next };
                              })
                            }
                          />
                        </>
                      ) : (
                        <span>{item}</span>
                      )}
                    </li>
                  ))}
                </ul>
                {isEditing && (
                  <AddTile
                    label="Add Item"
                    className="py-2 text-xs"
                    onClick={() =>
                      update((d) => {
                        const next = [...d.services];
                        next[index] = { ...next[index], items: [...next[index].items, "New item"] };
                        return { ...d, services: next };
                      })
                    }
                  />
                )}
              </motion.div>
            );
          })}
          {isEditing && (
            <AddTile
              label="Add Service"
              className="py-8"
              onClick={() =>
                update((d) => ({
                  ...d,
                  services: [...d.services, { title: "New Service", icon: serviceIconNames[0], items: [] }],
                }))
              }
            />
          )}
        </motion.div>

        {/* Quote Strip */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="mt-12 text-center max-w-4xl mx-auto"
        >
          {isEditing ? (
            <EditableText
              as="p"
              multiline
              value={servicesQuote}
              className="italic text-[#a89a83] text-sm md:text-base leading-relaxed"
              onCommit={(v) => update((d) => ({ ...d, servicesQuote: v }))}
            />
          ) : (
            <p className="italic text-[#a89a83] text-sm md:text-base leading-relaxed">{servicesQuote}</p>
          )}
        </motion.div>
      </div>
    </section>
  );
}

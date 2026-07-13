"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Phone, MapPin, Send, CheckCircle2 } from "lucide-react";
import { usePortfolioData, useIsEditing, useUpdatePortfolioData } from "./PortfolioProvider";
import { EditableText } from "./editing/EditableText";

export default function Contact() {
  const portfolioData = usePortfolioData();
  const isEditing = useIsEditing();
  const update = useUpdatePortfolioData();
  const { email, phone, address, messagePlaceholder } = portfolioData.contact;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [formStatus, setFormStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setFormStatus("error");
      setErrorMessage("Please fill out all required fields.");
      return;
    }

    setFormStatus("sending");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to send.");
      }

      setFormStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (err: unknown) {
      setFormStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  };

  const updateContact = (patch: Partial<typeof portfolioData.contact>) => {
    update((d) => ({ ...d, contact: { ...d.contact, ...patch } }));
  };

  const Wrapper = (isEditing ? "div" : "a") as React.ElementType;

  return (
    <section id="contact" className="relative py-24 bg-[#0d0b09] border-t border-[#2a231a] overflow-hidden">
      <div className="absolute inset-0 topo-bg pointer-events-none z-0" />
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Section Header */}
        <div className="mb-16">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-xs font-mono tracking-widest uppercase text-[#a89a83]">
              {portfolioData.projects.length > 0 ? "06" : "05"} // COLLABORATE
            </span>
            <div className="h-px bg-[#2a231a] flex-grow" />
          </div>
          <h3 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl tracking-tight text-[#f5efe4]">
            Let&apos;s Talk <span className="gold-text">Shop</span>
          </h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          {/* Left Column: Contact details */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-12">
            <div className="space-y-6">
              <h4 className="text-2xl font-bold tracking-tight text-[#f5efe4]">
                Need help running your online store?
              </h4>
              <p className="text-[#a89a83] leading-relaxed text-base md:text-lg">
                I&apos;m currently accepting new eCommerce VA engagements, freelance contracts, and long-term store
                management roles. Drop a line, and let&apos;s get your store running smoothly.
              </p>
            </div>

            <div className="space-y-6">
              <Wrapper
                href={!isEditing ? `mailto:${email}` : undefined}
                className="flex items-center gap-4 p-4 bg-[#14100c] border border-[#2a231a] rounded-xl hover:border-[#e8b654]/50 transition-colors duration-300 group"
              >
                <div className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center border border-[#2a231a] text-[#a89a83] group-hover:text-[#e8b654] transition-colors shrink-0">
                  <Mail size={18} />
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] font-mono text-[#5c5142] uppercase tracking-wider">EMAIL_US</p>
                  {isEditing ? (
                    <EditableText
                      as="p"
                      value={email}
                      className="text-sm font-semibold text-[#f5efe4]"
                      onCommit={(v) => updateContact({ email: v })}
                    />
                  ) : (
                    <p className="text-sm font-semibold text-[#f5efe4]">{email}</p>
                  )}
                </div>
              </Wrapper>

              {(phone || isEditing) && (
                <Wrapper
                  href={!isEditing && phone ? `tel:${phone}` : undefined}
                  className="flex items-center gap-4 p-4 bg-[#14100c] border border-[#2a231a] rounded-xl hover:border-[#e8b654]/50 transition-colors duration-300 group"
                >
                  <div className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center border border-[#2a231a] text-[#a89a83] group-hover:text-[#e8b654] transition-colors shrink-0">
                    <Phone size={18} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] font-mono text-[#5c5142] uppercase tracking-wider">CALL_DIRECT</p>
                    {isEditing ? (
                      <EditableText
                        as="p"
                        value={phone || ""}
                        placeholder="Phone number..."
                        className="text-sm font-semibold text-[#f5efe4]"
                        onCommit={(v) => updateContact({ phone: v })}
                      />
                    ) : (
                      <p className="text-sm font-semibold text-[#f5efe4]">{phone}</p>
                    )}
                  </div>
                </Wrapper>
              )}

              {(address || isEditing) && (
                <div className="flex items-center gap-4 p-4 bg-[#14100c] border border-[#2a231a] rounded-xl">
                  <div className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center border border-[#2a231a] text-[#a89a83] shrink-0">
                    <MapPin size={18} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] font-mono text-[#5c5142] uppercase tracking-wider">LOCATION</p>
                    {isEditing ? (
                      <EditableText
                        as="p"
                        value={address || ""}
                        placeholder="Address..."
                        className="text-sm font-semibold text-[#f5efe4]"
                        onCommit={(v) => updateContact({ address: v })}
                      />
                    ) : (
                      <p className="text-sm font-semibold text-[#f5efe4]">{address}</p>
                    )}
                  </div>
                </div>
              )}

              {isEditing && (
                <div className="p-4 bg-[#14100c] border border-dashed border-[#e8b654]/30 rounded-xl">
                  <p className="text-[10px] font-mono text-[#5c5142] uppercase tracking-wider mb-1">
                    Message Field Placeholder
                  </p>
                  <EditableText
                    value={messagePlaceholder || ""}
                    placeholder="Share your vision..."
                    className="text-sm text-[#d8cbb2]"
                    onCommit={(v) => updateContact({ messagePlaceholder: v })}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Interactive Form */}
          <div className="lg:col-span-7">
            <div className="gold-border p-8 md:p-10 rounded-3xl bg-[#14100c] shadow-sm">
              <AnimatePresence mode="wait">
                {formStatus === "success" ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="flex flex-col items-center justify-center py-12 text-center space-y-4"
                  >
                    <CheckCircle2 size={48} className="text-[#e8b654]" />
                    <h5 className="text-2xl font-bold tracking-tight text-[#f5efe4]">Message Dispatched!</h5>
                    <p className="text-[#a89a83] text-sm max-w-sm">
                      Thank you for reaching out. I&apos;ve received your details and will get back to you within 24
                      hours.
                    </p>
                    <button
                      onClick={() => setFormStatus("idle")}
                      className="mt-6 border border-[#e8b654]/40 hover:bg-[#e8b654]/10 text-[#e8dcc4] font-semibold text-xs font-mono tracking-wider px-6 py-3 rounded-full transition-all duration-300"
                    >
                      SEND_ANOTHER_MESSAGE
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    onSubmit={handleSubmit}
                    className="space-y-6"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label htmlFor="name" className="block text-xs font-bold font-mono text-[#a89a83] uppercase">
                          Full Name <span className="text-[#e8b654]">*</span>
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="John Doe"
                          className="w-full bg-white/5 border border-[#2a231a] rounded-xl px-4 py-3 text-sm text-[#f5efe4] placeholder:text-[#5c5142] focus:outline-none focus:bg-white/10 focus:border-[#e8b654] transition-all duration-350"
                        />
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="email" className="block text-xs font-bold font-mono text-[#a89a83] uppercase">
                          Email Address <span className="text-[#e8b654]">*</span>
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="john@example.com"
                          className="w-full bg-white/5 border border-[#2a231a] rounded-xl px-4 py-3 text-sm text-[#f5efe4] placeholder:text-[#5c5142] focus:outline-none focus:bg-white/10 focus:border-[#e8b654] transition-all duration-350"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="subject" className="block text-xs font-bold font-mono text-[#a89a83] uppercase">
                        Subject
                      </label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder="Project Consultation / Contract Job"
                        className="w-full bg-white/5 border border-[#2a231a] rounded-xl px-4 py-3 text-sm text-[#f5efe4] placeholder:text-[#5c5142] focus:outline-none focus:bg-white/10 focus:border-[#e8b654] transition-all duration-350"
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="message" className="block text-xs font-bold font-mono text-[#a89a83] uppercase">
                        Your Message <span className="text-[#e8b654]">*</span>
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        rows={5}
                        value={formData.message}
                        onChange={handleChange}
                        placeholder={messagePlaceholder || "Share your vision..."}
                        className="w-full bg-white/5 border border-[#2a231a] rounded-xl px-4 py-3 text-sm text-[#f5efe4] placeholder:text-[#5c5142] focus:outline-none focus:bg-white/10 focus:border-[#e8b654] transition-all duration-350 resize-none"
                      />
                    </div>

                    {formStatus === "error" && (
                      <div className="p-4 bg-red-950/40 border border-red-900/60 text-red-300 text-xs rounded-xl font-mono">
                        {errorMessage}
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={formStatus === "sending"}
                      className="w-full group gold-fill hover:opacity-90 disabled:opacity-50 text-[#050403] py-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all duration-300 shadow-md hover:shadow-[0_0_24px_rgba(232,182,84,0.35)]"
                    >
                      {formStatus === "sending" ? (
                        <>
                          <span className="w-4 h-4 border-2 border-[#050403]/30 border-t-[#050403] rounded-full animate-spin" />
                          DISPATCHING_MESSAGE...
                        </>
                      ) : (
                        <>
                          <Send size={16} className="group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
                          SEND_MESSAGE
                        </>
                      )}
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

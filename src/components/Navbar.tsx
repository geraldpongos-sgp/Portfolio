"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Linkedin, Facebook, Instagram, Github } from "./icons";
import { usePortfolioData, useIsEditing, useUpdatePortfolioData } from "./PortfolioProvider";
import { EditableText } from "./editing/EditableText";

const baseNavLinks = [
  { name: "Home", href: "#hero" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Services", href: "#services" },
  { name: "Experience", href: "#experience" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const portfolioData = usePortfolioData();
  const isEditing = useIsEditing();
  const update = useUpdatePortfolioData();
  const navLinks = portfolioData.projects.length > 0
    ? [...baseNavLinks.slice(0, 4), { name: "Projects", href: "#projects" }, ...baseNavLinks.slice(4)]
    : baseNavLinks;

  const [activeSection, setActiveSection] = useState("hero");
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isScrolling = useRef(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -60% 0px",
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      if (isScrolling.current) return;
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    navLinks.forEach((link) => {
      const section = document.querySelector(link.href);
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, [navLinks]);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);

    const targetSection = href.substring(1);
    setActiveSection(targetSection);
    isScrolling.current = true;

    const targetElement = document.querySelector(href);
    if (targetElement) {
      const offsetTop = (targetElement as HTMLElement).offsetTop - 116;
      window.scrollTo({ top: offsetTop, behavior: "smooth" });
      setTimeout(() => {
        isScrolling.current = false;
      }, 800);
    }
  };

  return (
    <>
      <header
        className={`fixed ${isEditing ? "top-10" : "top-0"} left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "py-3 bg-[#050403]/80 backdrop-blur-md border-b border-[#2a231a]" : "py-5 bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Logo / Name */}
          <a
            href="#hero"
            onClick={(e) => handleLinkClick(e, "#hero")}
            className="flex items-center gap-1 whitespace-nowrap font-extrabold tracking-wider transition-opacity hover:opacity-90 font-mono text-sm md:text-lg shrink-0"
            aria-label="Back to top"
          >
            <span className="text-[#f5efe4]">GERALD VA</span>
            <span className="gold-text">.ECOM</span>
          </a>

          {/* Desktop Navigation Links */}
          <nav
            className="hidden md:flex items-center bg-white/5 border border-[#2a231a] rounded-full p-1 shadow-sm backdrop-blur-md"
            aria-label="Main Navigation"
          >
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className={`relative px-4 py-1.5 text-xs font-bold uppercase tracking-wider rounded-full transition-colors duration-300 z-10 ${
                    isActive ? "text-[#050403]" : "text-[#a89a83] hover:text-[#f5efe4]"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="activeNavIndicator"
                      className="absolute inset-0 gold-fill rounded-full -z-10 shadow-[0_0_16px_rgba(232,182,84,0.4)]"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  {link.name}
                </a>
              );
            })}
          </nav>

          {/* Socials / Action Button */}
          <div className="hidden md:flex items-center space-x-4">
            {isEditing ? (
              <>
                <div className="flex items-center gap-1.5">
                  <Linkedin size={14} className="text-[#a89a83] shrink-0" />
                  <EditableText
                    value={portfolioData.personalInfo.socials.linkedin || ""}
                    placeholder="LinkedIn URL"
                    className="text-[10px] font-mono text-[#a89a83] max-w-[160px] inline-block"
                    onCommit={(v) =>
                      update((d) => ({
                        ...d,
                        personalInfo: { ...d.personalInfo, socials: { ...d.personalInfo.socials, linkedin: v } },
                      }))
                    }
                  />
                </div>
                <div className="flex items-center gap-1.5">
                  <Github size={14} className="text-[#a89a83] shrink-0" />
                  <EditableText
                    value={portfolioData.personalInfo.socials.github || ""}
                    placeholder="GitHub URL"
                    className="text-[10px] font-mono text-[#a89a83] max-w-[160px] inline-block"
                    onCommit={(v) =>
                      update((d) => ({
                        ...d,
                        personalInfo: { ...d.personalInfo, socials: { ...d.personalInfo.socials, github: v } },
                      }))
                    }
                  />
                </div>
              </>
            ) : (
              <>
                {portfolioData.personalInfo.socials.linkedin && (
                  <a
                    href={portfolioData.personalInfo.socials.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#a89a83] hover:text-[#e8b654] transition-colors"
                    aria-label="LinkedIn Profile"
                  >
                    <Linkedin size={18} />
                  </a>
                )}
                {portfolioData.personalInfo.socials.github && (
                  <a
                    href={portfolioData.personalInfo.socials.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#a89a83] hover:text-[#e8b654] transition-colors"
                    aria-label="GitHub Profile"
                  >
                    <Github size={18} />
                  </a>
                )}
              </>
            )}
            <a
              href="#contact"
              onClick={(e) => handleLinkClick(e, "#contact")}
              className="gold-fill text-[#050403] hover:opacity-90 px-4.5 py-1.5 rounded-full text-[10px] font-bold tracking-wider uppercase transition-all duration-300 shadow-sm"
            >
              Let&apos;s Talk
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[#f5efe4] hover:bg-white/5 rounded-full transition-colors"
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-[#050403] pt-28 px-8 pb-12 flex flex-col justify-between md:hidden border-b border-[#2a231a]"
          >
            <nav className="flex flex-col space-y-6 text-left" aria-label="Mobile Navigation">
              {navLinks.map((link) => {
                const isActive = activeSection === link.href.substring(1);
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    className={`text-3xl font-bold tracking-tight transition-colors ${
                      isActive ? "gold-text translate-x-2" : "text-[#a89a83]"
                    } hover:text-[#e8b654] transform transition-transform`}
                  >
                    {link.name}
                  </a>
                );
              })}
            </nav>

            <div className="flex flex-col space-y-6">
              <div className="h-px bg-[#2a231a] w-full" />
              <div className="flex items-center space-x-6">
                {portfolioData.personalInfo.socials.linkedin && (
                  <a
                    href={portfolioData.personalInfo.socials.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#a89a83] hover:text-[#e8b654] transition-colors"
                    aria-label="LinkedIn Profile"
                  >
                    <Linkedin size={24} />
                  </a>
                )}
                {portfolioData.personalInfo.socials.facebook && (
                  <a
                    href={portfolioData.personalInfo.socials.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#a89a83] hover:text-[#e8b654] transition-colors"
                    aria-label="Facebook Profile"
                  >
                    <Facebook size={24} />
                  </a>
                )}
              </div>
              <p className="text-xs text-[#a89a83] font-mono">
                {portfolioData.personalInfo.socials.email}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Left Social Bar (Desktop Only) */}
      <div
        className={`fixed left-6 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col items-center select-none ${
          isEditing ? "gap-3 items-start" : "gap-4"
        }`}
      >
        {!isEditing && (
          <div className="w-1.5 h-1.5 rounded-full bg-[#e8b654] shadow-[0_0_8px_rgba(232,182,84,0.5)] animate-pulse" />
        )}

        {isEditing ? (
          <>
            {portfolioData.personalInfo.socials.linkedin && (
              <a
                href={portfolioData.personalInfo.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-7 h-7 rounded-full text-[#a89a83] hover:text-[#050403] hover:bg-[#e8b654] transition-all duration-200"
                aria-label="LinkedIn Profile (edit URL in the header above)"
              >
                <Linkedin size={14} />
              </a>
            )}
            <div className="flex items-center gap-1.5 bg-[#0d0b09] border border-[#2a231a] rounded-full pl-2 pr-3 py-1">
              <Facebook size={13} className="text-[#a89a83] shrink-0" />
              <EditableText
                value={portfolioData.personalInfo.socials.facebook || ""}
                placeholder="Facebook URL"
                className="text-[10px] font-mono text-[#a89a83] max-w-[140px] inline-block"
                onCommit={(v) =>
                  update((d) => ({
                    ...d,
                    personalInfo: { ...d.personalInfo, socials: { ...d.personalInfo.socials, facebook: v } },
                  }))
                }
              />
            </div>
            <div className="flex items-center gap-1.5 bg-[#0d0b09] border border-[#2a231a] rounded-full pl-2 pr-3 py-1">
              <Instagram size={13} className="text-[#a89a83] shrink-0" />
              <EditableText
                value={portfolioData.personalInfo.socials.instagram || ""}
                placeholder="Instagram URL"
                className="text-[10px] font-mono text-[#a89a83] max-w-[140px] inline-block"
                onCommit={(v) =>
                  update((d) => ({
                    ...d,
                    personalInfo: { ...d.personalInfo, socials: { ...d.personalInfo.socials, instagram: v } },
                  }))
                }
              />
            </div>
            <div className="flex items-center gap-1.5 bg-[#0d0b09] border border-[#2a231a] rounded-full pl-2 pr-3 py-1">
              <Github size={13} className="text-[#a89a83] shrink-0" />
              <EditableText
                value={portfolioData.personalInfo.socials.github || ""}
                placeholder="GitHub URL"
                className="text-[10px] font-mono text-[#a89a83] max-w-[140px] inline-block"
                onCommit={(v) =>
                  update((d) => ({
                    ...d,
                    personalInfo: { ...d.personalInfo, socials: { ...d.personalInfo.socials, github: v } },
                  }))
                }
              />
            </div>
          </>
        ) : (
          <>
            {portfolioData.personalInfo.socials.linkedin && (
              <a
                href={portfolioData.personalInfo.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex items-center justify-center w-7 h-7 rounded-full text-[#a89a83] hover:text-[#050403] hover:bg-[#e8b654] hover:scale-125 transition-all duration-200"
              >
                <Linkedin size={14} />
                <span className="absolute left-8 top-1/2 -translate-y-1/2 px-2 py-0.5 gold-fill text-[#050403] text-[9px] font-mono font-bold tracking-wider rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                  LinkedIn
                </span>
              </a>
            )}
            {portfolioData.personalInfo.socials.facebook && (
              <a
                href={portfolioData.personalInfo.socials.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex items-center justify-center w-7 h-7 rounded-full text-[#a89a83] hover:text-[#050403] hover:bg-[#e8b654] hover:scale-125 transition-all duration-200"
              >
                <Facebook size={14} />
                <span className="absolute left-8 top-1/2 -translate-y-1/2 px-2 py-0.5 gold-fill text-[#050403] text-[9px] font-mono font-bold tracking-wider rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                  Facebook
                </span>
              </a>
            )}
            {portfolioData.personalInfo.socials.instagram && (
              <a
                href={portfolioData.personalInfo.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex items-center justify-center w-7 h-7 rounded-full text-[#a89a83] hover:text-[#050403] hover:bg-[#e8b654] hover:scale-125 transition-all duration-200"
              >
                <Instagram size={14} />
                <span className="absolute left-8 top-1/2 -translate-y-1/2 px-2 py-0.5 gold-fill text-[#050403] text-[9px] font-mono font-bold tracking-wider rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                  Instagram
                </span>
              </a>
            )}
            {portfolioData.personalInfo.socials.github && (
              <a
                href={portfolioData.personalInfo.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex items-center justify-center w-7 h-7 rounded-full text-[#a89a83] hover:text-[#050403] hover:bg-[#e8b654] hover:scale-125 transition-all duration-200"
              >
                <Github size={14} />
                <span className="absolute left-8 top-1/2 -translate-y-1/2 px-2 py-0.5 gold-fill text-[#050403] text-[9px] font-mono font-bold tracking-wider rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                  GitHub
                </span>
              </a>
            )}
          </>
        )}

        <div className="w-px h-6 bg-[#2a231a]" />
        <span className="text-[9px] font-mono tracking-[0.2em] uppercase text-[#5c5142] hover:text-[#e8b654] -rotate-90 whitespace-nowrap mt-2 transition-colors duration-200 cursor-default">
          SOCIAL
        </span>
      </div>
    </>
  );
}

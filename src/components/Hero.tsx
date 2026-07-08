"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowDown, Mail, FileText } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./Icons";
import { SITE } from "@/config/site";

export default function Hero() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      const rect = heroRef.current?.getBoundingClientRect();
      if (!rect) return;
      setMousePos({
        x: ((e.clientX - rect.left) / rect.width - 0.5) * 20,
        y: ((e.clientY - rect.top) / rect.height - 0.5) * 20,
      });
    };

    window.addEventListener("mousemove", onMouseMove);
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center overflow-hidden pt-16"
    >
      {/* Background gradients */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full bg-[#6366F1]/10 blur-[120px] animate-pulse-glow"
          style={{
            transform: `translate(${mousePos.x * 0.5}px, ${mousePos.y * 0.5}px)`,
          }}
        />
        <div
          className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-[#06B6D4]/8 blur-[100px] animate-pulse-glow"
          style={{
            transform: `translate(${mousePos.x * -0.3}px, ${mousePos.y * -0.3}px)`,
          }}
        />
        <div className="absolute top-[40%] right-[20%] w-[30%] h-[30%] rounded-full bg-[#6366F1]/5 blur-[80px] animate-float" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.6 }}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[rgba(99,102,241,0.2)] bg-[#6366F1]/5 text-sm text-[#6366F1] mb-6"
              >
                <span className="w-2 h-2 rounded-full bg-[#22C55E] animate-pulse" />
                Available for opportunities
              </motion.div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.05]"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              <span className="text-[#FAFAFA]">{SITE.name}</span>
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6366F1] via-[#06B6D4] to-[#6366F1] animate-gradient">
                {SITE.role}
              </span>
              <br />
              <span className="text-[#94A3B8]">& {SITE.roleAlt}</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
              className="text-lg sm:text-xl text-[#94A3B8] max-w-xl leading-relaxed"
            >
              {SITE.tagline}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
              className="flex flex-wrap gap-4"
            >
              <a
                href="#projects"
                className="group relative px-6 py-3 bg-[#6366F1] text-[#FAFAFA] font-medium rounded-xl overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(99,102,241,0.3)]"
              >
                <span className="relative z-10">View Projects</span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-[#5354E0] to-[#7C3AED] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />
              </a>
              <a
                href={SITE.resumeUrl || "#"}
                className="group flex items-center gap-2 px-6 py-3 border border-[rgba(255,255,255,0.1)] text-[#FAFAFA] font-medium rounded-xl hover:bg-[rgba(255,255,255,0.05)] transition-all duration-300 hover:scale-105"
              >
                <FileText size={16} />
                Download Resume
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
              className="flex items-center gap-4 pt-2"
            >
              <a
                href={SITE.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 text-[#94A3B8] hover:text-[#FAFAFA] transition-all duration-300 hover:scale-110"
                aria-label="GitHub"
              >
                <GithubIcon size={20} />
              </a>
              <a
                href={SITE.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 text-[#94A3B8] hover:text-[#FAFAFA] transition-all duration-300 hover:scale-110"
                aria-label="LinkedIn"
              >
                <LinkedinIcon size={20} />
              </a>
              <a
                href={`mailto:${SITE.email}`}
                className="p-3 text-[#94A3B8] hover:text-[#FAFAFA] transition-all duration-300 hover:scale-110"
                aria-label="Email"
              >
                <Mail size={20} />
              </a>
            </motion.div>
          </div>

          {/* Right */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
            className="hidden lg:flex justify-center items-center"
            style={{
              transform: `perspective(1000px) rotateY(${mousePos.x * 0.3}deg) rotateX(${mousePos.y * -0.3}deg)`,
              transition: "transform 0.1s ease-out",
            }}
          >
            <div className="relative w-80">
              <div className="absolute inset-0 bg-gradient-to-br from-[#6366F1]/20 to-[#06B6D4]/20 rounded-3xl blur-3xl" />
              <div className="relative w-full rounded-3xl border border-[rgba(255,255,255,0.08)] bg-gradient-to-br from-[#18181B] to-[#111827] overflow-hidden">
                <div className="aspect-[4/5] w-full overflow-hidden bg-gradient-to-br from-[#6366F1]/10 to-transparent">
                  <img
                    src="/images/Profile.jpeg"
                    alt={SITE.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                </div>
                <div className="px-5 py-4 text-center border-t border-[rgba(255,255,255,0.06)]">
                  <h3 className="text-base font-semibold text-[#FAFAFA]">{SITE.name}</h3>
                  <p className="text-xs text-[#94A3B8] mt-0.5">{SITE.role}</p>
                  <div className="flex justify-center items-center gap-1.5 mt-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E]" />
                    <span className="text-[10px] text-[#94A3B8]">Open to work</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[#94A3B8] hover:text-[#FAFAFA] transition-colors"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown size={20} />
        </motion.div>
      </motion.a>
    </section>
  );
}

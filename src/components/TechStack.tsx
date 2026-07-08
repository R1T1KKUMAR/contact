"use client";

import { motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";
import { SITE } from "@/config/site";

const categoryColors: Record<string, string> = {
  Frontend: "#6366F1",
  Backend: "#06B6D4",
  Language: "#22C55E",
  Database: "#EAB308",
  DevOps: "#F97316",
  Cloud: "#8B5CF6",
  AI: "#EC4899",
};

export default function TechStack() {
  return (
    <section className="relative py-16 md:py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <ScrollReveal>
          <div className="mb-16">
            <span className="text-xs font-mono tracking-widest text-[#6366F1] uppercase">
              Tech Stack
            </span>
            <h2
              className="text-4xl sm:text-5xl font-bold text-[#FAFAFA] mt-4 tracking-tight"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Technologies I Use
            </h2>
            <p className="text-lg text-[#94A3B8] mt-4 max-w-2xl leading-relaxed">
              A comprehensive overview of the tools and technologies in my arsenal.
            </p>
          </div>
        </ScrollReveal>

        <div className="flex flex-wrap justify-center gap-3">
          {SITE.techStack.map((tech, i) => (
            <ScrollReveal key={tech.name} delay={i * 0.02}>
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                className="group relative px-4 py-2.5 rounded-lg border border-[rgba(255,255,255,0.06)] bg-[#111827]/50 cursor-default transition-all duration-300"
              >
                <div
                  className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: `linear-gradient(135deg, ${categoryColors[tech.category] || "#6366F1"}10, transparent)`,
                  }}
                />
                <div className="relative flex items-center gap-2">
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: categoryColors[tech.category] || "#6366F1" }}
                  />
                  <span className="text-sm font-medium text-[#FAFAFA] group-hover:text-white transition-colors">
                    {tech.name}
                  </span>
                  <span className="text-xs text-[#6366F1]/40 font-mono">({tech.category})</span>
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

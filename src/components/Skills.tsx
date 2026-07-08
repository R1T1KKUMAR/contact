"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Code2,
  Server,
  Brain,
  Cloud,
  Database,
  Terminal,
  Code,
  ChevronRight,
} from "lucide-react";
import ScrollReveal from "./ScrollReveal";
import { SITE } from "@/config/site";

const iconMap: Record<string, React.ElementType> = {
  Code2,
  Server,
  Brain,
  Cloud,
  Database,
  Terminal,
  Code,
};

export default function Skills() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section className="relative py-32">
      <div className="mx-auto max-w-7xl px-6">
        <ScrollReveal>
          <div className="mb-16">
            <span className="text-xs font-mono tracking-widest text-[#6366F1] uppercase">
              Skills
            </span>
            <h2
              className="text-4xl sm:text-5xl font-bold text-[#FAFAFA] mt-4 tracking-tight"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Skills & Expertise
            </h2>
            <p className="text-lg text-[#94A3B8] mt-4 max-w-2xl leading-relaxed">
              Technologies and tools I work with to build exceptional digital experiences.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {SITE.skills.map((skill, i) => {
            const Icon = iconMap[skill.icon] || Code2;

            return (
              <ScrollReveal key={skill.category} delay={i * 0.05}>
                <motion.div
                  onMouseEnter={() => setActiveIndex(i)}
                  onMouseLeave={() => setActiveIndex(null)}
                  whileHover={{ scale: 1.02 }}
                  className="group relative p-6 rounded-xl border border-[rgba(255,255,255,0.06)] bg-[#111827]/50 cursor-default transition-all duration-500"
                >
                  <div
                    className={`absolute inset-0 rounded-xl bg-gradient-to-br from-[#6366F1]/10 to-transparent transition-opacity duration-500 ${
                      activeIndex === i ? "opacity-100" : "opacity-0"
                    }`}
                  />
                  <div className="relative">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-lg bg-[#6366F1]/10 flex items-center justify-center">
                        <Icon className="w-5 h-5 text-[#6366F1]" />
                      </div>
                      <h3 className="text-sm font-semibold text-[#FAFAFA]">{skill.category}</h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {skill.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 text-xs font-mono text-[#94A3B8] bg-[#09090B] rounded-md border border-[rgba(255,255,255,0.06)]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    <motion.div
                      initial={false}
                      animate={{ x: activeIndex === i ? 5 : 0 }}
                      className="flex items-center gap-1 mt-4 text-xs text-[#6366F1]"
                    >
                      <span>Explore</span>
                      <ChevronRight size={12} />
                    </motion.div>
                  </div>
                </motion.div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

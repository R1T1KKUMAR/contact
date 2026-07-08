"use client";

import { motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";
import { SITE } from "@/config/site";

export default function Experience() {
  return (
    <section id="experience" className="relative py-32">
      <div className="mx-auto max-w-7xl px-6">
        <ScrollReveal>
          <div className="mb-16">
            <span className="text-xs font-mono tracking-widest text-[#6366F1] uppercase">
              Experience
            </span>
            <h2
              className="text-4xl sm:text-5xl font-bold text-[#FAFAFA] mt-4 tracking-tight"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Work Experience
            </h2>
            <p className="text-lg text-[#94A3B8] mt-4 max-w-2xl leading-relaxed">
              My professional journey building products and solving problems.
            </p>
          </div>
        </ScrollReveal>

        <div className="relative">
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[#6366F1] via-[#6366F1]/30 to-transparent md:-translate-x-px" />

          <div className="space-y-16">
            {SITE.experience.map((exp, i) => (
              <ScrollReveal key={i} delay={i * 0.2}>
                <div
                  className={`relative flex flex-col md:flex-row gap-8 ${
                    i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  <div className="hidden md:block w-1/2" />

                  <div className="absolute left-0 md:left-1/2 top-0 w-4 h-4 -translate-x-[7px] md:-translate-x-2 rounded-full border-2 border-[#6366F1] bg-[#09090B] z-10" />

                  <div className="md:w-1/2 pl-8 md:pl-0 md:px-8">
                    <motion.div
                      whileHover={{ y: -4 }}
                      className="p-6 rounded-xl border border-[rgba(255,255,255,0.06)] bg-[#111827]/50 hover:bg-[#111827]/80 transition-all duration-500"
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-xs font-mono text-[#6366F1] tracking-wider">
                          {exp.period}
                        </span>
                      </div>
                      <h3 className="text-lg font-semibold text-[#FAFAFA]">
                        {exp.role}
                      </h3>
                      <p className="text-sm text-[#6366F1] mb-3">{exp.company}</p>
                      <p className="text-sm text-[#94A3B8] leading-relaxed mb-4">
                        {exp.description}
                      </p>
                      <ul className="space-y-2">
                        {exp.highlights.map((h, j) => (
                          <li key={j} className="flex items-start gap-2 text-sm text-[#94A3B8]">
                            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#6366F1] flex-shrink-0" />
                            {h}
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

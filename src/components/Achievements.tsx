"use client";

import { motion } from "framer-motion";
import { Award, GitFork, Trophy, GitCommit, Star, Zap } from "lucide-react";
import ScrollReveal from "./ScrollReveal";
import { SITE } from "@/config/site";

const iconMap: Record<string, React.ElementType> = {
  Award,
  GitFork,
  Trophy,
  GitCommit,
  Star,
  Zap,
};

export default function Achievements() {
  return (
    <section className="relative py-16 md:py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <ScrollReveal>
          <div className="mb-16">
            <span className="text-xs font-mono tracking-widest text-[#6366F1] uppercase">
              Achievements
            </span>
            <h2
              className="text-4xl sm:text-5xl font-bold text-[#FAFAFA] mt-4 tracking-tight"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Milestones & Achievements
            </h2>
            <p className="text-lg text-[#94A3B8] mt-4 max-w-2xl leading-relaxed">
              Key accomplishments that highlight my journey and impact.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {SITE.achievements.map((achievement, i) => {
            const Icon = iconMap[achievement.icon] || Award;

            return (
              <ScrollReveal key={achievement.title} delay={i * 0.1}>
                <motion.div
                  whileHover={{ y: -6 }}
                  className="group relative p-6 rounded-xl border border-[rgba(255,255,255,0.06)] bg-[#111827]/50 text-center transition-all duration-500"
                >
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-b from-[#6366F1]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative">
                    <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-gradient-to-br from-[#6366F1]/20 to-[#06B6D4]/20 flex items-center justify-center">
                      <Icon className="w-6 h-6 text-[#6366F1]" />
                    </div>
                    <h3 className="text-base font-semibold text-[#FAFAFA] mb-2">{achievement.title}</h3>
                    <p className="text-sm text-[#94A3B8] leading-relaxed">{achievement.description}</p>
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

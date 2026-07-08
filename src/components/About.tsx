"use client";

import { motion } from "framer-motion";
import { MapPin, GraduationCap, Briefcase, Target, Heart } from "lucide-react";
import ScrollReveal from "./ScrollReveal";
import { SITE } from "@/config/site";

const cards = [
  {
    icon: GraduationCap,
    title: "Education",
    content: SITE.education.degree,
    subtitle: `${SITE.education.university}, ${SITE.education.location}`,
    meta: SITE.education.period,
  },
  {
    icon: MapPin,
    title: "Location",
    content: SITE.about.location,
    subtitle: "Available for remote work",
  },
  {
    icon: Briefcase,
    title: "Experience",
    content: "Building production apps",
    subtitle: "Full-stack & AI development",
  },
  {
    icon: Target,
    title: "Current Focus",
    content: SITE.about.focus,
    subtitle: "Exploring cutting-edge AI technologies",
  },
  {
    icon: Heart,
    title: "Values",
    content: SITE.about.values.join(" · "),
    subtitle: "Engineering excellence",
  },
];

export default function About() {
  return (
    <section id="about" className="relative py-16 md:py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <ScrollReveal>
          <div className="mb-16">
            <span className="text-xs font-mono tracking-widest text-[#6366F1] uppercase">
              About
            </span>
            <h2
              className="text-4xl sm:text-5xl font-bold text-[#FAFAFA] mt-4 tracking-tight"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              About Me
            </h2>
            <p className="text-lg text-[#94A3B8] mt-4 max-w-2xl leading-relaxed">
              {SITE.about.bio}
            </p>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {cards.map((card, i) => (
            <ScrollReveal key={card.title} delay={i * 0.1}>
              <motion.div
                whileHover={{ y: -4 }}
                className="group relative p-6 rounded-xl border border-[rgba(255,255,255,0.06)] bg-[#111827]/50 hover:bg-[#111827]/80 transition-all duration-500"
              >
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-[#6366F1]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative">
                  <card.icon className="w-5 h-5 text-[#6366F1] mb-4" />
                  <h3 className="text-xs font-mono tracking-widest text-[#6366F1] uppercase mb-2">
                    {card.title}
                  </h3>
                  <p className="text-base font-medium text-[#FAFAFA] break-words">{card.content}</p>
                  <p className="text-sm text-[#94A3B8] mt-1 break-words">{card.subtitle}</p>
                  {"meta" in card && card.meta && (
                    <p className="text-xs text-[#6366F1]/60 mt-2 font-mono">{card.meta}</p>
                  )}
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

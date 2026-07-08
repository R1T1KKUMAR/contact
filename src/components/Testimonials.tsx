"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import ScrollReveal from "./ScrollReveal";
import { SITE } from "@/config/site";

export default function Testimonials() {
  return (
    <section className="relative py-16 md:py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <ScrollReveal>
          <div className="mb-16">
            <span className="text-xs font-mono tracking-widest text-[#6366F1] uppercase">
              Testimonials
            </span>
            <h2
              className="text-4xl sm:text-5xl font-bold text-[#FAFAFA] mt-4 tracking-tight"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              What People Say
            </h2>
            <p className="text-lg text-[#94A3B8] mt-4 max-w-2xl leading-relaxed">
              Feedback from people I&apos;ve worked with.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-6">
          {SITE.testimonials.map((testimonial, i) => (
            <ScrollReveal key={i} delay={i * 0.15}>
              <motion.div
                whileHover={{ y: -4 }}
                className="relative p-6 rounded-xl border border-[rgba(255,255,255,0.06)] bg-[#111827]/50 transition-all duration-500"
              >
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star key={j} size={14} className="fill-[#6366F1] text-[#6366F1]" />
                  ))}
                </div>
                <p className="text-sm text-[#94A3B8] leading-relaxed mb-4 italic">
                  &ldquo;{testimonial.content}&rdquo;
                </p>
                <div>
                  <p className="text-sm font-medium text-[#FAFAFA]">{testimonial.name}</p>
                  <p className="text-xs text-[#94A3B8]">{testimonial.role}</p>
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

import { SheetHeader } from "./Sheet";
import ScrollReveal from "./ScrollReveal";
import { useSite } from "@/components/site-context";

export default function Experience() {
  const SITE = useSite();

  return (
    <section id="experience" className="relative scroll-mt-20 py-16 md:py-24">
      <div className="mx-auto max-w-5xl px-6">
        <ScrollReveal>
          <SheetHeader
            no="05"
            title="Revision history"
            blurb="Every build has a changelog. This one is mine."
          />
        </ScrollReveal>

        <ScrollReveal>
          <ol className="relative border-l border-[var(--bp-line)]">
            {SITE.experience.map((exp, i) => (
              <li key={i} className="relative pb-12 pl-8 last:pb-0">
                {/* Revision node */}
                <span
                  aria-hidden="true"
                  className="absolute -left-[5px] top-1.5 h-2.5 w-2.5 border border-[var(--bp-cyan)] bg-[var(--bp-ink)]"
                />
                <p className="font-mono text-[11px] text-[var(--bp-cyan)]">
                  REV {exp.period}
                </p>
                <h3 className="mt-2 text-lg font-semibold text-[var(--bp-white)]">
                  {exp.role}
                  <span className="text-[var(--bp-graphite)]"> — {exp.company}</span>
                </h3>
                <p className="mt-2 max-w-[65ch] text-sm leading-relaxed text-[var(--bp-graphite)]">
                  {exp.description}
                </p>
                <ul className="mt-3 space-y-1.5">
                  {exp.highlights.map((h) => (
                    <li key={h} className="flex items-baseline gap-2.5 text-sm text-[var(--bp-graphite)]">
                      <span className="font-mono text-[var(--bp-cyan)]">+</span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </ScrollReveal>
      </div>
    </section>
  );
}

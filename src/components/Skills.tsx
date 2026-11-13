"use client";

import { SheetHeader } from "./Sheet";
import ScrollReveal from "./ScrollReveal";
import { useSite } from "@/components/site-context";

export default function Skills() {
  const SITE = useSite();

  return (
    <section id="skills" className="relative scroll-mt-20 py-16 md:py-24">
      <div className="mx-auto max-w-5xl px-6">
        <ScrollReveal>
          <SheetHeader
            no="03"
            title="Parts list"
            blurb="Technologies and tools that go into the builds."
          />
        </ScrollReveal>

        <ScrollReveal>
          <div className="border border-[var(--bp-line)] bg-[var(--bp-panel)]">
            <div className="hidden grid-cols-[72px_160px_1fr] gap-4 border-b border-[var(--bp-line)] px-4 py-2.5 font-mono text-[9px] tracking-[0.2em] text-[var(--bp-cyan)] sm:grid">
              <span>PART NO.</span>
              <span>CATEGORY</span>
              <span>PARTS</span>
            </div>
            {SITE.skills.map((skill, i) => (
              <div
                key={skill.category}
                className="group grid gap-1 border-b border-[var(--bp-line-soft)] px-4 py-4 transition-colors last:border-b-0 hover:bg-[rgba(127,209,232,0.04)] sm:grid-cols-[72px_160px_1fr] sm:items-baseline sm:gap-4"
              >
                <span className="font-mono text-[11px] text-[var(--bp-graphite)]">
                  P-{String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-sm font-semibold text-[var(--bp-white)]">
                  {skill.category}
                </span>
                <p className="text-sm leading-relaxed text-[var(--bp-graphite)] group-hover:text-[var(--bp-white)]">
                  {skill.technologies.join(", ")}
                </p>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

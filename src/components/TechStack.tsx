"use client";

import { SheetHeader } from "./Sheet";
import ScrollReveal from "./ScrollReveal";
import { useSite } from "@/components/site-context";

export default function TechStack() {
  const SITE = useSite();
  const sorted = [...SITE.techStack].sort((a, b) =>
    a.category === b.category ? a.name.localeCompare(b.name) : a.category.localeCompare(b.category)
  );

  return (
    <section id="stack" className="relative scroll-mt-20 py-16 md:py-24">
      <div className="mx-auto max-w-5xl px-6">
        <ScrollReveal>
          <SheetHeader no="06" title="Materials index" blurb="The full inventory, grouped by trade." />
        </ScrollReveal>

        <ScrollReveal>
          <div className="grid sm:grid-cols-2">
            {sorted.map((tech, i) => (
              <div
                key={tech.name}
                className={`flex items-baseline justify-between gap-4 border-b border-[var(--bp-line-soft)] px-4 py-3 ${
                  i % 2 === 1 ? "sm:border-l" : ""
                }`}
              >
                <span className="text-sm text-[var(--bp-white)]">{tech.name}</span>
                <span className="font-mono text-[10px] tracking-[0.15em] text-[var(--bp-graphite)]">
                  {tech.category.toUpperCase()}
                </span>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

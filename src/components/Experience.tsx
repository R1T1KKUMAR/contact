"use client";

import { SectionHeader } from "./Sheet";
import ScrollReveal from "./ScrollReveal";
import { useSite } from "@/components/site-context";

export default function Experience() {
  const SITE = useSite();

  return (
    <section id="experience" className="relative scroll-mt-20 py-14 md:py-20">
      <div className="mx-auto max-w-6xl px-6">
        <ScrollReveal>
          <SectionHeader title="Experience" blurb="Where the work has happened." />
        </ScrollReveal>

        <ScrollReveal>
          <div className="divide-y divide-[var(--hairline)] border-y border-[var(--hairline)]">
            {SITE.experience.map((exp, i) => (
              <div key={i} className="grid gap-3 py-8 sm:grid-cols-[200px_1fr] sm:gap-8">
                <p className="text-sm text-[var(--graphite)]">{exp.period}</p>
                <div>
                  <h3 className="text-lg font-medium text-[var(--ink)]">
                    {exp.role}
                    <span className="text-[var(--graphite)]"> at {exp.company}</span>
                  </h3>
                  <p className="mt-2 max-w-[65ch] text-[15px] leading-relaxed text-[var(--graphite)]">
                    {exp.description}
                  </p>
                  <ul className="mt-4 space-y-2">
                    {exp.highlights.map((h) => (
                      <li key={h} className="flex items-baseline gap-3 text-sm text-[var(--graphite)]">
                        <span className="text-[var(--ultra)]">+</span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

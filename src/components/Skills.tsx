"use client";

import { SectionHeader } from "./Sheet";
import ScrollReveal from "./ScrollReveal";
import { useSite } from "@/components/site-context";

export default function Skills() {
  const SITE = useSite();

  return (
    <section id="skills" className="relative scroll-mt-20 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <ScrollReveal>
          <SectionHeader title="What I work with" blurb="Tools and technologies, grouped by craft." />
        </ScrollReveal>

        <ScrollReveal>
          <div className="divide-y divide-[var(--hairline)] border-y border-[var(--hairline)]">
            {SITE.skills.map((skill) => (
              <div
                key={skill.category}
                className="group grid gap-2 py-6 sm:grid-cols-[200px_1fr] sm:items-baseline sm:gap-8"
              >
                <h3 className="text-base font-medium text-[var(--ink)] transition-colors group-hover:text-[var(--ultra)]">
                  {skill.category}
                </h3>
                <p className="text-[15px] leading-relaxed text-[var(--graphite)]">
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

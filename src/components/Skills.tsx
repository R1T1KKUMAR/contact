"use client";

import { SectionHeader } from "./Sheet";
import ScrollReveal from "./ScrollReveal";
import { useSite } from "@/components/site-context";

const categoryColors = ["var(--butter)", "var(--pink)", "var(--violet)", "var(--orange)"];

export default function Skills() {
  const SITE = useSite();

  return (
    <section id="skills" className="relative scroll-mt-20 py-14 md:py-20">
      <div className="mx-auto max-w-6xl px-6">
        <ScrollReveal>
          <SectionHeader title="What I work with" blurb="Tools and technologies, grouped by craft." />
        </ScrollReveal>

        <ScrollReveal>
          <div className="grid gap-5 sm:grid-cols-2">
            {SITE.skills.map((skill, i) => (
              <div
                key={skill.category}
                className="hard-shadow-sm lift rounded-2xl border-2 border-[var(--ink)] bg-[var(--card)] p-5"
              >
                <div className="flex items-center gap-2.5">
                  <span
                    className="h-3 w-3 rounded-full border-2 border-[var(--ink)]"
                    style={{ backgroundColor: categoryColors[i % 4] }}
                  />
                  <h3 className="text-base font-bold" style={{ fontFamily: "var(--font-heading)" }}>
                    {skill.category}
                  </h3>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {skill.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-[var(--hairline)] bg-[var(--paper)] px-2.5 py-1 text-xs font-medium text-[var(--ink)]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

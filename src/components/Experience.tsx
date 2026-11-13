"use client";

import { SectionHeader } from "./Sheet";
import ScrollReveal from "./ScrollReveal";
import { useSite } from "@/components/site-context";

const dotColors = ["var(--orange)", "var(--violet)", "var(--pink)"];

export default function Experience() {
  const SITE = useSite();

  return (
    <section id="experience" className="relative scroll-mt-20 py-14 md:py-20">
      <div className="mx-auto max-w-6xl px-6">
        <ScrollReveal>
          <SectionHeader title="Experience" blurb="Where the work has happened." />
        </ScrollReveal>

        <ScrollReveal>
          <ol className="relative space-y-10 border-l-2 border-dashed border-[var(--hairline)] pl-8">
            {SITE.experience.map((exp, i) => (
              <li key={i} className="relative">
                <span
                  aria-hidden="true"
                  className="absolute -left-[42px] top-1 h-4 w-4 rounded-full border-2 border-[var(--ink)]"
                  style={{ backgroundColor: dotColors[i % 3] }}
                />
                <p className="inline-block rounded-full border border-[var(--hairline)] bg-[var(--card)] px-3 py-1 text-xs font-semibold text-[var(--graphite)]">
                  {exp.period}
                </p>
                <h3
                  className="mt-3 text-xl font-bold"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {exp.role}{" "}
                  <span className="font-medium text-[var(--graphite)]">at {exp.company}</span>
                </h3>
                <p className="mt-2 max-w-[65ch] text-[15px] leading-relaxed text-[var(--graphite)]">
                  {exp.description}
                </p>
                <ul className="mt-3 space-y-2">
                  {exp.highlights.map((h) => (
                    <li
                      key={h}
                      className="flex items-baseline gap-2.5 text-sm text-[var(--graphite)]"
                    >
                      <span className="font-bold text-[var(--orange)]">+</span>
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

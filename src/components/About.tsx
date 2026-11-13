"use client";

import { GraduationCap } from "lucide-react";
import { SectionHeader } from "./Sheet";
import ScrollReveal from "./ScrollReveal";
import { useSite } from "@/components/site-context";

export default function About() {
  const SITE = useSite();

  const facts: [string, string][] = [
    ["Degree", SITE.education.degree],
    ["University", `${SITE.education.university}, ${SITE.education.location}`],
    ["Years", SITE.education.period],
    ["Based in", SITE.about.location],
    ["Current focus", SITE.about.focus],
  ];

  return (
    <section id="about" className="relative scroll-mt-20 py-14 md:py-20">
      <div className="mx-auto max-w-6xl px-6">
        <ScrollReveal>
          <SectionHeader title="About" blurb="A short introduction." />
        </ScrollReveal>

        <ScrollReveal>
          <div className="grid gap-12 lg:grid-cols-[1fr_340px] lg:gap-20">
            <div className="space-y-6">
              <p
                className="text-xl leading-snug text-[var(--ink)] sm:text-2xl"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {SITE.about.bio}
              </p>
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-[var(--graphite)]">
                  What I value
                </p>
                <p className="mt-3 text-[15px] leading-relaxed text-[var(--graphite)]">
                  {SITE.about.values.join(", ")}.
                </p>
              </div>
            </div>

            <dl className="h-fit divide-y divide-[var(--hairline)] rounded-2xl border border-[var(--hairline)] bg-[var(--card)] px-5">
              <div className="flex items-center gap-2 py-3.5">
                <GraduationCap size={15} className="text-[var(--ultra)]" />
                <p className="text-xs font-medium uppercase tracking-wider text-[var(--graphite)]">
                  At a glance
                </p>
              </div>
              {facts.map(([term, value]) => (
                <div key={term} className="py-3.5">
                  <dt className="text-xs text-[var(--graphite)]">{term}</dt>
                  <dd className="mt-0.5 text-sm font-medium text-[var(--ink)]">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

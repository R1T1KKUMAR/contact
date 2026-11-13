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
          <SectionHeader title="Hey, I'm Ritik" blurb="A short introduction." />
        </ScrollReveal>

        <ScrollReveal>
          <div className="grid gap-10 lg:grid-cols-[1fr_340px] lg:gap-16">
            <div className="space-y-6">
              <p
                className="text-xl font-medium leading-snug sm:text-2xl"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {SITE.about.bio}
              </p>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-[var(--violet)]">
                  What I value
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {SITE.about.values.map((value, i) => (
                    <span
                      key={value}
                      className="rounded-full border-2 border-[var(--ink)] px-3 py-1 text-xs font-semibold"
                      style={{
                        backgroundColor: [
                          "var(--butter)",
                          "var(--pink)",
                          "var(--violet)",
                          "var(--orange)",
                        ][i % 4],
                        color: i % 4 === 2 ? "var(--card)" : "var(--ink)",
                      }}
                    >
                      {value}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <dl className="hard-shadow h-fit divide-y-2 divide-[var(--hairline)] rounded-2xl border-2 border-[var(--ink)] bg-[var(--card)] px-5">
              <div className="flex items-center gap-2 py-3.5">
                <GraduationCap size={15} className="text-[var(--orange)]" />
                <p className="text-xs font-bold uppercase tracking-wider text-[var(--graphite)]">
                  At a glance
                </p>
              </div>
              {facts.map(([term, value]) => (
                <div key={term} className="py-3">
                  <dt className="text-xs text-[var(--graphite)]">{term}</dt>
                  <dd className="mt-0.5 text-sm font-semibold text-[var(--ink)]">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

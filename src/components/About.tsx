"use client";

import { GraduationCap } from "lucide-react";
import { SheetHeader } from "./Sheet";
import ScrollReveal from "./ScrollReveal";
import { useSite } from "@/components/site-context";

export default function About() {
  const SITE = useSite();

  const specs: [string, string][] = [
    ["EDUCATION", SITE.education.degree],
    ["INSTITUTION", `${SITE.education.university}, ${SITE.education.location}`],
    ["PERIOD", SITE.education.period],
    ["BASED IN", SITE.about.location],
    ["FOCUS", SITE.about.focus],
  ];

  return (
    <section id="about" className="relative scroll-mt-20 py-16 md:py-24">
      <div className="mx-auto max-w-5xl px-6">
        <ScrollReveal>
          <SheetHeader
            no="02"
            title="About the engineer"
            blurb={SITE.about.bio}
          />
        </ScrollReveal>

        <ScrollReveal>
          <div className="grid gap-10 md:grid-cols-[1fr_320px]">
            {/* Working notes */}
            <div className="space-y-6 text-[15px] leading-relaxed text-[var(--bp-graphite)]">
              <p>
                I build full-stack products end to end — web frontends, APIs, and the
                AI systems that sit behind them. The work I care most about is taking
                something from a rough idea to software that real people rely on.
              </p>
              <p>
                Currently a {SITE.education.degree.toLowerCase()} student at{" "}
                {SITE.education.university}, working on production applications and
                AI integrations alongside my studies.
              </p>
              <div>
                <p className="font-mono text-[10px] tracking-[0.2em] text-[var(--bp-cyan)]">
                  WORKING VALUES
                </p>
                <ul className="mt-3 space-y-2">
                  {SITE.about.values.map((value) => (
                    <li key={value} className="flex items-baseline gap-3">
                      <span className="font-mono text-[var(--bp-red)]">—</span>
                      <span>{value}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Spec panel */}
            <dl className="h-fit border border-[var(--bp-line)] bg-[var(--bp-panel)]">
              <div className="flex items-center gap-2 border-b border-[var(--bp-line)] px-4 py-3">
                <GraduationCap size={14} className="text-[var(--bp-cyan)]" />
                <p className="font-mono text-[10px] tracking-[0.2em] text-[var(--bp-cyan)]">
                  SPECIFICATIONS
                </p>
              </div>
              {specs.map(([term, value]) => (
                <div key={term} className="border-b border-[var(--bp-line-soft)] px-4 py-3 last:border-b-0">
                  <dt className="font-mono text-[9px] tracking-[0.2em] text-[var(--bp-graphite)]">
                    {term}
                  </dt>
                  <dd className="mt-1 text-sm text-[var(--bp-white)]">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

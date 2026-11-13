"use client";

import { SectionHeader } from "./Sheet";
import ScrollReveal from "./ScrollReveal";
import { useSite } from "@/components/site-context";

export default function TechStack() {
  const SITE = useSite();

  const groups: { category: string; names: string[] }[] = [];
  for (const tech of SITE.techStack) {
    const existing = groups.find((g) => g.category === tech.category);
    if (existing) existing.names.push(tech.name);
    else groups.push({ category: tech.category, names: [tech.name] });
  }

  return (
    <section className="relative py-14 md:py-20">
      <div className="mx-auto max-w-6xl px-6">
        <ScrollReveal>
          <SectionHeader title="Daily toolbox" blurb="The short list of what sees regular use." />
        </ScrollReveal>

        <ScrollReveal>
          <div className="grid gap-x-12 gap-y-7 sm:grid-cols-2">
            {groups.map((group, i) => (
              <div key={group.category}>
                <p
                  className="text-xs font-bold uppercase tracking-wider"
                  style={{ color: ["var(--orange)", "var(--violet)", "var(--pink)"][i % 3] }}
                >
                  {group.category}
                </p>
                <p className="mt-2 text-[15px] font-medium leading-relaxed text-[var(--ink)]">
                  {group.names.join(", ")}
                </p>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

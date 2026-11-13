"use client";

import { SectionHeader } from "./Sheet";
import ScrollReveal from "./ScrollReveal";
import { useSite } from "@/components/site-context";

export default function TechStack() {
  const SITE = useSite();

  // Group by category, keep config order
  const groups: { category: string; names: string[] }[] = [];
  for (const tech of SITE.techStack) {
    const existing = groups.find((g) => g.category === tech.category);
    if (existing) existing.names.push(tech.name);
    else groups.push({ category: tech.category, names: [tech.name] });
  }

  return (
    <section className="relative py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <ScrollReveal>
          <SectionHeader title="Daily toolbox" blurb="The short list of what sees regular use." />
        </ScrollReveal>

        <ScrollReveal>
          <div className="grid gap-x-14 gap-y-8 sm:grid-cols-2">
            {groups.map((group) => (
              <div key={group.category}>
                <p className="text-xs font-medium uppercase tracking-wider text-[var(--graphite)]">
                  {group.category}
                </p>
                <p className="mt-2.5 text-[15px] leading-relaxed text-[var(--ink)]">
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

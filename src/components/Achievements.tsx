"use client";

import { Award, GitFork, Trophy, GitCommit, Star, Zap } from "lucide-react";
import { SheetHeader } from "./Sheet";
import ScrollReveal from "./ScrollReveal";
import { useSite } from "@/components/site-context";

const iconMap: Record<string, React.ElementType> = {
  Award,
  GitFork,
  Trophy,
  GitCommit,
  Star,
  Zap,
};

export default function Achievements() {
  const SITE = useSite();

  return (
    <section id="achievements" className="relative scroll-mt-20 py-16 md:py-24">
      <div className="mx-auto max-w-5xl px-6">
        <ScrollReveal>
          <SheetHeader no="07" title="Inspection records" blurb="Checks the work has passed." />
        </ScrollReveal>

        <ScrollReveal>
          <div className="grid gap-px border border-[var(--bp-line)] bg-[var(--bp-line)] sm:grid-cols-2 lg:grid-cols-4">
            {SITE.achievements.map((achievement) => {
              const Icon = iconMap[achievement.icon] || Award;
              return (
                <div
                  key={achievement.title}
                  className="relative bg-[var(--bp-ink)] p-6"
                >
                  {/* Stamp corners */}
                  <span aria-hidden="true" className="absolute left-1.5 top-1.5 h-2 w-2 border-l border-t border-[var(--bp-cyan)]" />
                  <span aria-hidden="true" className="absolute right-1.5 top-1.5 h-2 w-2 border-r border-t border-[var(--bp-cyan)]" />
                  <span aria-hidden="true" className="absolute bottom-1.5 left-1.5 h-2 w-2 border-b border-l border-[var(--bp-cyan)]" />
                  <span aria-hidden="true" className="absolute bottom-1.5 right-1.5 h-2 w-2 border-b border-r border-[var(--bp-cyan)]" />
                  <Icon size={18} className="text-[var(--bp-cyan)]" />
                  <h3 className="mt-4 text-base font-semibold leading-snug text-[var(--bp-white)]">
                    {achievement.title}
                  </h3>
                  <p className="mt-2 text-[13px] leading-relaxed text-[var(--bp-graphite)]">
                    {achievement.description}
                  </p>
                </div>
              );
            })}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

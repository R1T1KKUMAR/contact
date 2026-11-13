"use client";

import { Award, GitFork, Trophy, GitCommit, Star, Zap } from "lucide-react";
import { SectionHeader } from "./Sheet";
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

const cardColors = ["var(--butter)", "var(--pink)", "var(--violet)", "var(--orange)"];

export default function Achievements() {
  const SITE = useSite();

  return (
    <section id="achievements" className="relative scroll-mt-20 py-14 md:py-20">
      <div className="mx-auto max-w-6xl px-6">
        <ScrollReveal>
          <SectionHeader title="Highlights" blurb="Moments worth noting." />
        </ScrollReveal>

        <ScrollReveal>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {SITE.achievements.map((achievement, i) => {
              const Icon = iconMap[achievement.icon] || Award;
              return (
                <div
                  key={achievement.title}
                  className="hard-shadow-sm lift rounded-2xl border-2 border-[var(--ink)] p-5"
                  style={{ backgroundColor: cardColors[i % 4] }}
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl border-2 border-[var(--ink)] bg-[var(--card)]">
                    <Icon size={15} />
                  </div>
                  <h3
                    className="mt-4 text-base font-bold leading-snug"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    {achievement.title}
                  </h3>
                  <p className="mt-1.5 text-[13px] leading-relaxed text-[var(--ink)]/70">
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

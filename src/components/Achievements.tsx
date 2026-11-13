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

export default function Achievements() {
  const SITE = useSite();

  return (
    <section id="achievements" className="relative scroll-mt-20 py-14 md:py-20">
      <div className="mx-auto max-w-6xl px-6">
        <ScrollReveal>
          <SectionHeader title="Highlights" blurb="Moments worth noting." />
        </ScrollReveal>

        <ScrollReveal>
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {SITE.achievements.map((achievement) => {
              const Icon = iconMap[achievement.icon] || Award;
              return (
                <div key={achievement.title} className="border-t-2 border-[var(--ink)] pt-5">
                  <Icon size={17} className="text-[var(--ultra)]" />
                  <h3
                    className="mt-4 text-lg font-medium leading-snug text-[var(--ink)]"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    {achievement.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--graphite)]">
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

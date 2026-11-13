"use client";

import { useEffect, useState } from "react";
import { ExternalLink } from "lucide-react";
import { GithubIcon } from "./Icons";
import { SheetHeader } from "./Sheet";
import ScrollReveal from "./ScrollReveal";
import { useSite } from "@/components/site-context";

type ContributionDay = {
  date: string;
  count: number;
  level: number;
};

const levels = ["rgba(127,209,232,0.08)", "rgba(127,209,232,0.28)", "rgba(127,209,232,0.5)", "rgba(127,209,232,0.75)", "#7FD1E8"];

function groupByWeek(contributions: ContributionDay[]) {
  const weeks: ContributionDay[][] = [];
  let current: ContributionDay[] = [];
  const sorted = [...contributions].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  const first = new Date(sorted[0]?.date || Date.now());
  const padStart = first.getDay();

  for (let i = 0; i < padStart; i++) {
    current.push({ date: "", count: 0, level: 0 });
  }

  for (const day of sorted) {
    current.push(day);
    if (current.length === 7) {
      weeks.push(current);
      current = [];
    }
  }
  if (current.length > 0) weeks.push(current);
  return weeks;
}

export default function GitHubActivity() {
  const SITE = useSite();
  const [contributions, setContributions] = useState<ContributionDay[]>([]);
  const [totalContributions, setTotalContributions] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/contributions")
      .then((r) => r.json())
      .then((data) => {
        if (data.contributions) {
          setContributions(data.contributions);
          setTotalContributions(data.total || 0);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const weeks = groupByWeek(contributions);

  return (
    <section id="github" className="relative scroll-mt-20 py-16 md:py-24">
      <div className="mx-auto max-w-5xl px-6">
        <ScrollReveal>
          <SheetHeader no="08" title="Activity plot" blurb="Contribution activity from the public record." />
        </ScrollReveal>

        <ScrollReveal>
          {/* The plot */}
          <figure className="border border-[var(--bp-line)] bg-[var(--bp-panel)] p-5">
            <figcaption className="mb-4 flex flex-wrap items-baseline justify-between gap-2 font-mono text-[10px] tracking-[0.15em] text-[var(--bp-graphite)]">
              <span className="flex items-center gap-2">
                <GithubIcon size={13} className="text-[var(--bp-cyan)]" />
                {loading
                  ? "PLOTTING…"
                  : `${totalContributions.toLocaleString()} CONTRIBUTIONS / LAST 365 DAYS`}
              </span>
              <span className="flex items-center gap-1.5">
                LOW
                {levels.map((c) => (
                  <span key={c} className="h-2.5 w-2.5 rounded-[2px]" style={{ backgroundColor: c }} />
                ))}
                HIGH
              </span>
            </figcaption>
            <div className="overflow-x-auto pb-1">
              {loading ? (
                <div className="flex gap-[3px]" aria-hidden="true">
                  {Array.from({ length: 52 }).map((_, week) => (
                    <div key={week} className="flex flex-col gap-[3px]">
                      {Array.from({ length: 7 }).map((_, day) => (
                        <div key={day} className="h-[11px] w-[11px] rounded-[2px] bg-[rgba(127,209,232,0.06)]" />
                      ))}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex gap-[3px]">
                  {weeks.map((week, wi) => (
                    <div key={wi} className="flex flex-col gap-[3px]">
                      {week.map((day, di) => (
                        <div
                          key={di}
                          className="h-[11px] w-[11px] rounded-[2px]"
                          style={{ backgroundColor: levels[day.level] || levels[0] }}
                          title={day.date ? `${day.date}: ${day.count} contributions` : undefined}
                        />
                      ))}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </figure>
        </ScrollReveal>

        {/* Reference drawings: repositories */}
        <ScrollReveal>
          <div className="mt-10">
            <p className="mb-3 font-mono text-[10px] tracking-[0.2em] text-[var(--bp-graphite)]">
              REFERENCE DRAWINGS — REPOSITORIES
            </p>
            <div className="border border-[var(--bp-line)] bg-[var(--bp-panel)]">
              {SITE.repos.map((repo) => (
                <a
                  key={repo.name}
                  href={`${SITE.github}/${repo.name}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group grid gap-1 border-b border-[var(--bp-line-soft)] px-4 py-3.5 transition-colors last:border-b-0 hover:bg-[rgba(127,209,232,0.04)] sm:grid-cols-[180px_1fr_auto] sm:items-baseline sm:gap-4"
                >
                  <span className="text-sm text-[var(--bp-white)] group-hover:text-[var(--bp-cyan)]">
                    {repo.name}
                  </span>
                  <span className="text-[13px] text-[var(--bp-graphite)]">{repo.description}</span>
                  <span className="flex items-center gap-4 font-mono text-[11px] text-[var(--bp-graphite)]">
                    <span>★{repo.stars}</span>
                    <span>⑂{repo.forks}</span>
                    <span className="text-[var(--bp-cyan)]">{repo.language}</span>
                    <ExternalLink size={11} className="opacity-0 transition-opacity group-hover:opacity-100" />
                  </span>
                </a>
              ))}
            </div>
            <p className="mt-4">
              <a href={SITE.github} target="_blank" rel="noopener noreferrer" className="mark-link font-mono text-xs text-[var(--bp-graphite)]">
                Full index on GitHub
              </a>
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

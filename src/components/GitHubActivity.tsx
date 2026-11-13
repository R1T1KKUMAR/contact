"use client";

import { useEffect, useState } from "react";
import { ExternalLink } from "lucide-react";
import { GithubIcon } from "./Icons";
import { SectionHeader } from "./Sheet";
import ScrollReveal from "./ScrollReveal";
import { useSite } from "@/components/site-context";

type ContributionDay = {
  date: string;
  count: number;
  level: number;
};

const levels = ["#EBEDF0", "#9BE9A8", "#40C463", "#30A14E", "#216E39"];

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
    <section id="github" className="relative scroll-mt-20 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <ScrollReveal>
          <SectionHeader
            title="Open source activity"
            blurb="Contribution history and public repositories."
          />
        </ScrollReveal>

        <ScrollReveal>
          <figure className="overflow-x-auto rounded-2xl border border-[var(--hairline)] bg-white p-5">
            <figcaption className="mb-4 flex flex-wrap items-center justify-between gap-2 text-xs text-[var(--graphite)]">
              <span className="inline-flex items-center gap-2">
                <GithubIcon size={14} className="text-[var(--ink)]" />
                {loading
                  ? "Loading activity…"
                  : `${totalContributions.toLocaleString()} contributions in the last year`}
              </span>
              <span className="flex items-center gap-1">
                Less
                {levels.map((c) => (
                  <span key={c} className="h-3 w-3 rounded-[3px]" style={{ backgroundColor: c }} />
                ))}
                More
              </span>
            </figcaption>
            <div className="w-fit">
              {loading ? (
                <div className="flex gap-[3px]" aria-hidden="true">
                  {Array.from({ length: 52 }).map((_, week) => (
                    <div key={week} className="flex flex-col gap-[3px]">
                      {Array.from({ length: 7 }).map((_, day) => (
                        <div key={day} className="h-[11px] w-[11px] rounded-[2px] bg-[#EBEDF0]" />
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

        <ScrollReveal>
          <div className="mt-10 divide-y divide-[var(--hairline)] overflow-hidden rounded-2xl border border-[var(--hairline)] bg-white">
            {SITE.repos.map((repo) => (
              <a
                key={repo.name}
                href={`${SITE.github}/${repo.name}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group grid gap-1 px-5 py-4 transition-colors hover:bg-[rgba(33,64,219,0.03)] sm:grid-cols-[180px_1fr_auto] sm:items-baseline sm:gap-6"
              >
                <span className="text-sm font-medium text-[var(--ink)] group-hover:text-[var(--ultra)]">
                  {repo.name}
                </span>
                <span className="text-sm text-[var(--graphite)]">{repo.description}</span>
                <span className="flex items-center gap-4 text-xs text-[var(--graphite)]">
                  <span>★ {repo.stars}</span>
                  <span>⑂ {repo.forks}</span>
                  <span>{repo.language}</span>
                  <ExternalLink size={12} className="opacity-0 transition-opacity group-hover:opacity-100" />
                </span>
              </a>
            ))}
          </div>
          <p className="mt-5">
            <a
              href={SITE.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-[var(--ultra)] underline decoration-[rgba(33,64,219,0.3)] underline-offset-8 transition-colors hover:decoration-[var(--ultra)]"
            >
              See all repositories on GitHub
            </a>
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}

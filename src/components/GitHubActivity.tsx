"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Star, GitFork, ExternalLink } from "lucide-react";
import { GithubIcon } from "./Icons";
import ScrollReveal from "./ScrollReveal";
import { SITE } from "@/config/site";

type ContributionDay = {
  date: string;
  count: number;
  level: number;
};

const repos = [
  { name: "blog-writer-ai", stars: 0, forks: 0, language: "TypeScript", description: "AI-powered blog writing tool" },
  { name: "jolt", stars: 0, forks: 0, language: "TypeScript", description: "Full-stack application" },
  { name: "MacQuiz", stars: 0, forks: 3, language: "JavaScript", description: "macOS quiz application" },
  { name: "voice_agent", stars: 0, forks: 0, language: "Python", description: "Voice AI agent" },
  { name: "NIDS", stars: 0, forks: 0, language: "Python", description: "Network Intrusion Detection System" },
  { name: "LMS", stars: 0, forks: 0, language: "HTML", description: "Learning Management System for Harrow School" },
];

const levels = ["#1C1C1C", "#0E4429", "#006D32", "#26A641", "#39D353"];

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
    <section className="relative py-16 md:py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <ScrollReveal>
          <div className="mb-16">
            <span className="text-xs font-mono tracking-widest text-[#6366F1] uppercase">
              GitHub
            </span>
            <h2
              className="text-4xl sm:text-5xl font-bold text-[#FAFAFA] mt-4 tracking-tight"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              GitHub Activity
            </h2>
            <p className="text-lg text-[#94A3B8] mt-4 max-w-2xl leading-relaxed">
              Open source contributions and personal projects.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div className="p-6 rounded-xl border border-[rgba(255,255,255,0.06)] bg-[#111827]/50 mb-8 overflow-x-auto">
            <h3 className="text-sm font-semibold text-[#FAFAFA] mb-4 flex items-center gap-2">
              <GithubIcon size={16} className="text-[#6366F1]" />
              {loading ? "Contribution Activity" : `${totalContributions.toLocaleString()} contributions in the last year`}
            </h3>
            {loading ? (
              <div className="flex gap-[3px] opacity-30">
                {Array.from({ length: 51 }).map((_, week) => (
                  <div key={week} className="flex flex-col gap-[3px]">
                    {Array.from({ length: 7 }).map((_, day) => (
                      <div key={day} className="w-[10px] h-[10px] rounded-[2px] bg-[#1C1C1C]" />
                    ))}
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex gap-[3px]">
                <div className="flex flex-col gap-[3px] mr-[3px]">
                  {["Mon", "", "Wed", "", "Fri", "", ""].map((d, i) => (
                    <div key={i} className="w-[10px] h-[10px] text-[6px] text-[#94A3B8] leading-[10px] text-center">
                      {d}
                    </div>
                  ))}
                </div>
                {weeks.map((week, wi) => (
                  <div key={wi} className="flex flex-col gap-[3px]">
                    {week.map((day, di) => (
                      <div
                        key={di}
                        className="w-[10px] h-[10px] rounded-[2px]"
                        style={{ backgroundColor: levels[day.level] || levels[0] }}
                        title={day.date ? `${day.date}: ${day.count} contributions` : ""}
                      />
                    ))}
                  </div>
                ))}
              </div>
            )}
          </div>
        </ScrollReveal>

        <div className="space-y-3">
          {repos.map((repo, i) => (
            <ScrollReveal key={repo.name} delay={i * 0.08}>
              <motion.a
                href={`${SITE.github}/${repo.name}`}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ x: 4 }}
                className="group flex flex-wrap sm:flex-nowrap items-center justify-between gap-2 p-4 rounded-lg border border-[rgba(255,255,255,0.06)] bg-[#111827]/30 hover:bg-[#111827]/60 transition-all duration-300"
              >
                <div className="flex items-center gap-4 min-w-0 flex-1">
                  <GithubIcon size={18} className="text-[#6366F1] flex-shrink-0" />
                  <div className="min-w-0">
                    <h4 className="text-sm font-medium text-[#FAFAFA] group-hover:text-[#6366F1] transition-colors truncate">
                      {repo.name}
                    </h4>
                    <p className="text-xs text-[#94A3B8] mt-0.5 truncate">{repo.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-xs text-[#94A3B8]">
                  <span className="flex items-center gap-1">
                    <Star size={12} /> {repo.stars}
                  </span>
                  <span className="flex items-center gap-1">
                    <GitFork size={12} /> {repo.forks}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-[#6366F1]/10 text-[#6366F1] font-mono text-[10px]">
                    {repo.language}
                  </span>
                  <ExternalLink size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </motion.a>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={0.3}>
          <motion.a
            href={SITE.github}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.02 }}
            className="mt-6 flex items-center justify-center gap-2 w-full py-3 text-sm text-[#94A3B8] border border-[rgba(255,255,255,0.06)] rounded-lg hover:text-[#FAFAFA] hover:bg-[#111827]/50 transition-all duration-300"
          >
            <GithubIcon size={16} />
            View all repositories on GitHub
            <ExternalLink size={14} />
          </motion.a>
        </ScrollReveal>
      </div>
    </section>
  );
}

"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink } from "lucide-react";
import { GithubIcon } from "./Icons";
import { SectionHeader } from "./Sheet";
import ScrollReveal from "./ScrollReveal";
import { useSite } from "@/components/site-context";
import type { SiteData } from "@/config/site";

type Project = SiteData["projects"][0];

const tagColors = ["var(--butter)", "var(--pink)", "var(--violet)", "var(--orange)"];

function DetailModal({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  const sections: [string, string][] = [
    ["Problem", project.problem],
    ["Solution", project.solution],
    ["Architecture", project.architecture],
    ["Challenges", project.challenges],
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[60] flex items-center justify-center bg-[rgba(34,29,36,0.45)] p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 28, rotate: 1 }}
        animate={{ opacity: 1, y: 0, rotate: 0 }}
        exit={{ opacity: 0, y: 28, rotate: 1 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={`${project.title} case study`}
        className="hard-shadow max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-3xl border-2 border-[var(--ink)] bg-[var(--card)]"
      >
        <div className="sticky top-0 flex items-center justify-between border-b-2 border-[var(--ink)] bg-[var(--butter)] px-6 py-3.5">
          <p className="text-xs font-bold uppercase tracking-wider text-[var(--ink)]">
            Case study
          </p>
          <button
            onClick={onClose}
            aria-label="Close case study"
            className="text-[var(--ink)]"
          >
            <X size={18} />
          </button>
        </div>
        <div className="p-6 sm:p-8">
          <h3
            className="text-2xl font-extrabold tracking-tight"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            {project.title}
          </h3>
          <p className="mt-2 text-sm text-[var(--graphite)]">{project.techStack.join(", ")}</p>

          <div className="mt-8 space-y-7">
            {sections.map(([label, text]) => (
              <div key={label}>
                <p className="text-xs font-bold uppercase tracking-wider text-[var(--violet)]">
                  {label}
                </p>
                <p className="mt-2 text-[15px] leading-relaxed text-[var(--graphite)]">{text}</p>
              </div>
            ))}
          </div>

          {project.metrics.length > 0 && (
            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {project.metrics.map((metric, i) => (
                <p
                  key={metric}
                  className="hard-shadow-sm rounded-xl border-2 border-[var(--ink)] px-4 py-3 text-sm font-semibold"
                  style={{ backgroundColor: tagColors[i % 4] }}
                >
                  {metric}
                </p>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Projects() {
  const SITE = useSite();
  const [detail, setDetail] = useState<Project | null>(null);

  return (
    <section id="projects" className="relative scroll-mt-20 py-14 md:py-20">
      <div className="mx-auto max-w-6xl px-6">
        <ScrollReveal>
          <SectionHeader
            title="Projects"
            blurb="Selected work. Open a case study for the full story behind each build."
          />
        </ScrollReveal>

        <div className="space-y-14">
          {SITE.projects.map((project, i) => (
            <ScrollReveal key={project.title}>
              <article
                className={`grid items-center gap-8 lg:grid-cols-2 lg:gap-12 ${
                  i % 2 === 1 ? "lg:[&>figure]:order-2" : ""
                }`}
              >
                <figure className="hard-shadow relative overflow-hidden rounded-2xl border-2 border-[var(--ink)] transition-transform duration-300 hover:-translate-y-1">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={project.image}
                    alt={project.title}
                    loading="lazy"
                    className="aspect-[3/2] w-full object-cover"
                  />
                  <span
                    className="absolute left-4 top-4 -rotate-2 rounded-full border-2 border-[var(--ink)] px-3 py-1 text-xs font-bold"
                    style={{ backgroundColor: tagColors[i % 4] }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </figure>

                <div>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, ti) => (
                      <span
                        key={tag}
                        className="rounded-full border border-[var(--hairline)] bg-[var(--card)] px-2.5 py-1 text-xs font-medium text-[var(--ink)]"
                        style={
                          ti % 2 === 0
                            ? { backgroundColor: "var(--paper)" }
                            : { backgroundColor: "var(--butter)" }
                        }
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3
                    className="mt-4 text-2xl font-extrabold tracking-tight sm:text-3xl"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    {project.title}
                  </h3>
                  <p className="mt-4 max-w-[60ch] text-[15px] leading-relaxed text-[var(--graphite)]">
                    {project.description}
                  </p>
                  <div className="mt-6 flex flex-wrap items-center gap-5">
                    <button
                      onClick={() => setDetail(project)}
                      className="hard-shadow-sm rounded-full border-2 border-[var(--ink)] bg-[var(--violet)] px-5 py-2 text-sm font-bold text-[var(--card)] transition-transform hover:-translate-y-0.5"
                    >
                      Read case study
                    </button>
                    {project.liveUrl && project.liveUrl !== "#" && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--ink)] underline decoration-[var(--orange)] decoration-2 underline-offset-8"
                      >
                        Live demo <ExternalLink size={13} />
                      </a>
                    )}
                    {project.githubUrl && project.githubUrl !== "#" && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--graphite)] transition-colors hover:text-[var(--ink)]"
                      >
                        <GithubIcon size={14} /> GitHub
                      </a>
                    )}
                  </div>
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {detail && <DetailModal project={detail} onClose={() => setDetail(null)} />}
      </AnimatePresence>
    </section>
  );
}

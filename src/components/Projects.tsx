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
      className="fixed inset-0 z-[60] flex items-center justify-center bg-[rgba(27,27,31,0.4)] p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 24, scale: 0.98 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={`${project.title} case study`}
        className="max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-[var(--paper)] shadow-2xl shadow-black/20 ring-1 ring-black/5"
      >
        <div className="sticky top-0 flex items-center justify-between border-b border-[var(--hairline)] bg-[var(--paper)] px-6 py-4">
          <p className="text-xs font-medium uppercase tracking-wider text-[var(--graphite)]">
            Case study
          </p>
          <button
            onClick={onClose}
            aria-label="Close case study"
            className="text-[var(--graphite)] transition-colors hover:text-[var(--ink)]"
          >
            <X size={18} />
          </button>
        </div>
        <div className="p-6 sm:p-8">
          <h3
            className="text-2xl font-medium tracking-tight text-[var(--ink)]"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            {project.title}
          </h3>
          <p className="mt-2 text-sm text-[var(--graphite)]">
            {project.techStack.join(", ")}
          </p>

          <div className="mt-8 space-y-7">
            {sections.map(([label, text]) => (
              <div key={label}>
                <p className="text-xs font-medium uppercase tracking-wider text-[var(--ultra)]">
                  {label}
                </p>
                <p className="mt-2 text-[15px] leading-relaxed text-[var(--graphite)]">{text}</p>
              </div>
            ))}
          </div>

          {project.metrics.length > 0 && (
            <div className="mt-8 grid gap-px overflow-hidden rounded-2xl bg-[var(--hairline)] sm:grid-cols-3">
              {project.metrics.map((metric) => (
                <p key={metric} className="bg-white px-5 py-4 text-sm font-medium text-[var(--ink)]">
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
    <section id="projects" className="relative scroll-mt-20 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <ScrollReveal>
          <SectionHeader
            title="Projects"
            blurb="Selected work. Open a case study for the full story behind each build."
          />
        </ScrollReveal>

        <div className="space-y-16">
          {SITE.projects.map((project, i) => (
            <ScrollReveal key={project.title}>
              <article
                className={`grid items-center gap-8 lg:grid-cols-2 lg:gap-14 ${
                  i % 2 === 1 ? "lg:[&>figure]:order-2" : ""
                }`}
              >
                <figure className="overflow-hidden rounded-3xl ring-1 ring-black/5">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={project.image}
                    alt={project.title}
                    loading="lazy"
                    className="aspect-[3/2] w-full object-cover transition-transform duration-700 hover:scale-[1.02]"
                  />
                </figure>

                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-[var(--graphite)]">
                    {String(i + 1).padStart(2, "0")} — {project.tags.join(", ")}
                  </p>
                  <h3
                    className="mt-3 text-2xl font-medium tracking-tight text-[var(--ink)] sm:text-3xl"
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
                      className="text-sm font-medium text-[var(--ultra)] underline decoration-[rgba(33,64,219,0.3)] underline-offset-8 transition-colors hover:decoration-[var(--ultra)]"
                    >
                      Read case study
                    </button>
                    {project.liveUrl && project.liveUrl !== "#" && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-sm text-[var(--graphite)] transition-colors hover:text-[var(--ink)]"
                      >
                        Live demo <ExternalLink size={13} />
                      </a>
                    )}
                    {project.githubUrl && project.githubUrl !== "#" && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-sm text-[var(--graphite)] transition-colors hover:text-[var(--ink)]"
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

"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink } from "lucide-react";
import { GithubIcon } from "./Icons";
import { SheetHeader } from "./Sheet";
import ScrollReveal from "./ScrollReveal";
import { useSite } from "@/components/site-context";
import type { SiteData } from "@/config/site";

type Project = SiteData["projects"][0];

function TitleBlockButton({
  href,
  children,
  external = false,
}: {
  href: string;
  children: React.ReactNode;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="border border-[var(--bp-line)] px-4 py-2 font-mono text-xs text-[var(--bp-white)] transition-colors hover:border-[var(--bp-cyan)] hover:text-[var(--bp-cyan)]"
    >
      {children}
    </a>
  );
}

function ProjectSheet({
  project,
  index,
  onDetail,
}: {
  project: Project;
  index: number;
  onDetail: () => void;
}) {
  return (
    <article className="border border-[var(--bp-line)] bg-[var(--bp-panel)]">
      {/* Drawing area */}
      <div className="relative aspect-[16/9] overflow-hidden border-b border-[var(--bp-line)] bg-[var(--bp-ink)]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={project.image}
          alt={project.title}
          loading="lazy"
          className="h-full w-full object-cover opacity-80 transition-opacity duration-500 hover:opacity-100"
        />
        <span className="absolute left-4 top-4 border border-[var(--bp-line)] bg-[rgba(10,32,56,0.85)] px-2.5 py-1 font-mono text-[10px] tracking-[0.2em] text-[var(--bp-cyan)]">
          DWG {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      {/* Title block */}
      <div className="p-6">
        <h3 className="text-xl font-semibold tracking-tight text-[var(--bp-white)] sm:text-2xl">
          {project.title}
        </h3>
        <p className="mt-3 max-w-[65ch] text-sm leading-relaxed text-[var(--bp-graphite)]">
          {project.description}
        </p>
        <p className="mt-4 font-mono text-[11px] text-[var(--bp-cyan)]">
          {project.tags.join(" · ")}
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <button
            onClick={onDetail}
            className="cursor-pointer border border-[var(--bp-cyan)] px-4 py-2 font-mono text-xs text-[var(--bp-cyan)] transition-colors hover:bg-[rgba(127,209,232,0.08)]"
          >
            Detail sheet
          </button>
          {project.liveUrl && project.liveUrl !== "#" && (
            <TitleBlockButton href={project.liveUrl} external>
              <span className="inline-flex items-center gap-1.5">
                Live demo <ExternalLink size={12} />
              </span>
            </TitleBlockButton>
          )}
          {project.githubUrl && project.githubUrl !== "#" && (
            <TitleBlockButton href={project.githubUrl} external>
              <span className="inline-flex items-center gap-1.5">
                <GithubIcon size={12} /> GitHub
              </span>
            </TitleBlockButton>
          )}
        </div>
      </div>
    </article>
  );
}

function DetailModal({
  project,
  index,
  onClose,
}: {
  project: Project;
  index: number;
  onClose: () => void;
}) {
  const sections: [string, string][] = [
    ["PROBLEM", project.problem],
    ["SOLUTION", project.solution],
    ["ARCHITECTURE", project.architecture],
    ["CHALLENGES", project.challenges],
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[60] flex items-center justify-center bg-[rgba(7,22,38,0.85)] p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.25 }}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={`${project.title} detail sheet`}
        className="max-h-[85vh] w-full max-w-2xl overflow-y-auto border border-[var(--bp-line)] bg-[var(--bp-ink-deep)]"
      >
        <div className="sticky top-0 flex items-center justify-between border-b border-[var(--bp-line)] bg-[var(--bp-ink-deep)] px-5 py-3">
          <p className="font-mono text-[10px] tracking-[0.2em] text-[var(--bp-cyan)]">
            DETAIL SHEET — DWG {String(index + 1).padStart(2, "0")}
          </p>
          <button
            onClick={onClose}
            aria-label="Close detail sheet"
            className="text-[var(--bp-graphite)] transition-colors hover:text-[var(--bp-white)]"
          >
            <X size={16} />
          </button>
        </div>
        <div className="p-5">
          <h3 className="text-xl font-semibold text-[var(--bp-white)]">{project.title}</h3>
          <p className="mt-1 font-mono text-[11px] text-[var(--bp-cyan)]">
            {project.techStack.join(" · ")}
          </p>

          <div className="mt-6 space-y-5">
            {sections.map(([label, text]) => (
              <div key={label} className="border-l-2 border-[var(--bp-line)] pl-4">
                <p className="font-mono text-[9px] tracking-[0.2em] text-[var(--bp-graphite)]">
                  {label}
                </p>
                <p className="mt-1.5 text-sm leading-relaxed text-[var(--bp-graphite)]">{text}</p>
              </div>
            ))}
          </div>

          {project.metrics.length > 0 && (
            <div className="mt-6 border border-[var(--bp-line)]">
              <p className="border-b border-[var(--bp-line-soft)] px-4 py-2 font-mono text-[9px] tracking-[0.2em] text-[var(--bp-cyan)]">
                MEASURED RESULTS
              </p>
              <div className="grid sm:grid-cols-3">
                {project.metrics.map((metric, i) => (
                  <p
                    key={metric}
                    className={`px-4 py-3 text-sm text-[var(--bp-white)] ${
                      i < project.metrics.length - 1
                        ? "border-b border-[var(--bp-line-soft)] sm:border-b-0 sm:border-r"
                        : ""
                    }`}
                  >
                    {metric}
                  </p>
                ))}
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Projects() {
  const SITE = useSite();
  const [detailIndex, setDetailIndex] = useState<number | null>(null);

  return (
    <section id="projects" className="relative scroll-mt-20 py-16 md:py-24">
      <div className="mx-auto max-w-5xl px-6">
        <ScrollReveal>
          <SheetHeader
            no="04"
            title="Assembly drawings"
            blurb="Selected builds, drawn to scale. Open the detail sheet for how each one works."
          />
        </ScrollReveal>

        <div className="space-y-10">
          {SITE.projects.map((project, i) => (
            <ScrollReveal key={project.title}>
              <ProjectSheet project={project} index={i} onDetail={() => setDetailIndex(i)} />
            </ScrollReveal>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {detailIndex !== null && (
          <DetailModal
            project={SITE.projects[detailIndex]}
            index={detailIndex}
            onClose={() => setDetailIndex(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

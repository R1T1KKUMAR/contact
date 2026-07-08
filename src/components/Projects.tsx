"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, BookOpen, BarChart3, Cpu, Trophy } from "lucide-react";
import { GithubIcon } from "./Icons";
import ScrollReveal from "./ScrollReveal";
import { SITE } from "@/config/site";

interface ProjectModalProps {
  project: (typeof SITE.projects)[0];
  onClose: () => void;
}

function ProjectModal({ project, onClose }: ProjectModalProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[#111827] p-8"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-lg text-[#94A3B8] hover:text-[#FAFAFA] hover:bg-[rgba(255,255,255,0.05)] transition-all"
          aria-label="Close modal"
        >
          <X size={18} />
        </button>

        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-bold text-[#FAFAFA] mb-2">{project.title}</h2>
            <p className="text-[#94A3B8]">{project.description}</p>
          </div>

          <div>
            <h3 className="text-xs font-mono tracking-widest text-[#6366F1] uppercase mb-3 flex items-center gap-2">
              <BarChart3 size={14} /> Problem
            </h3>
            <p className="text-sm text-[#94A3B8] leading-relaxed">{project.problem}</p>
          </div>

          <div>
            <h3 className="text-xs font-mono tracking-widest text-[#6366F1] uppercase mb-3 flex items-center gap-2">
              <Cpu size={14} /> Solution
            </h3>
            <p className="text-sm text-[#94A3B8] leading-relaxed">{project.solution}</p>
          </div>

          <div>
            <h3 className="text-xs font-mono tracking-widest text-[#6366F1] uppercase mb-3 flex items-center gap-2">
              <BookOpen size={14} /> Architecture
            </h3>
            <p className="text-sm text-[#94A3B8] leading-relaxed">{project.architecture}</p>
          </div>

          <div>
            <h3 className="text-xs font-mono tracking-widest text-[#6366F1] uppercase mb-3">Tech Stack</h3>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 text-xs font-mono text-[#94A3B8] bg-[#09090B] rounded-md border border-[rgba(255,255,255,0.06)]"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xs font-mono tracking-widest text-[#6366F1] uppercase mb-3">Challenges</h3>
            <p className="text-sm text-[#94A3B8] leading-relaxed">{project.challenges}</p>
          </div>

          <div>
            <h3 className="text-xs font-mono tracking-widest text-[#6366F1] uppercase mb-3 flex items-center gap-2">
              <Trophy size={14} /> Metrics
            </h3>
            <div className="grid grid-cols-3 gap-4">
              {project.metrics.map((metric) => (
                <div
                  key={metric}
                  className="p-3 rounded-lg border border-[rgba(255,255,255,0.06)] bg-[#09090B] text-center"
                >
                  <span className="text-xs text-[#94A3B8]">{metric}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <a
              href={project.liveUrl}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-[#FAFAFA] bg-[#6366F1] rounded-lg hover:bg-[#5354E0] transition-all"
            >
              <ExternalLink size={14} /> Live Demo
            </a>
            <a
              href={project.githubUrl}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-[#94A3B8] border border-[rgba(255,255,255,0.1)] rounded-lg hover:text-[#FAFAFA] hover:bg-[rgba(255,255,255,0.05)] transition-all"
            >
              <GithubIcon size={14} /> GitHub
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<typeof SITE.projects[0] | null>(null);

  return (
    <section id="projects" className="relative py-32">
      <div className="mx-auto max-w-7xl px-6">
        <ScrollReveal>
          <div className="mb-16">
            <span className="text-xs font-mono tracking-widest text-[#6366F1] uppercase">
              Projects
            </span>
            <h2
              className="text-4xl sm:text-5xl font-bold text-[#FAFAFA] mt-4 tracking-tight"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Featured Projects
            </h2>
            <p className="text-lg text-[#94A3B8] mt-4 max-w-2xl leading-relaxed">
              A selection of projects that showcase my skills and passion for building great software.
            </p>
          </div>
        </ScrollReveal>

        <div className="space-y-20">
          {SITE.projects.map((project, i) => (
            <ScrollReveal key={project.title} delay={i * 0.15}>
              <motion.div
                whileHover={{ y: -8 }}
                className={`group relative grid md:grid-cols-2 gap-8 items-center ${
                  i % 2 === 1 ? "md:grid-flow-dense" : ""
                }`}
              >
                <div
                  className={`relative ${
                    i % 2 === 1 ? "md:col-start-2" : ""
                  }`}
                >
                  <div className="relative aspect-[16/10] rounded-xl overflow-hidden border border-[rgba(255,255,255,0.06)] bg-[#111827]">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#6366F1]/10 to-[#06B6D4]/5" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center p-8">
                        <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-gradient-to-br from-[#6366F1] to-[#06B6D4] flex items-center justify-center">
                          <Cpu className="w-8 h-8 text-white" />
                        </div>
                        <p className="text-sm text-[#94A3B8] font-mono">{project.title}</p>
                      </div>
                    </div>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="absolute inset-0 bg-[#6366F1]/0 group-hover:bg-[#6366F1]/5 transition-all duration-700"
                    />
                  </div>
                </div>

                <div className={i % 2 === 1 ? "md:col-start-1 md:row-start-1" : ""}>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 text-xs font-mono text-[#6366F1] bg-[#6366F1]/5 rounded-md border border-[rgba(99,102,241,0.15)]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-2xl font-bold text-[#FAFAFA] mb-3">{project.title}</h3>
                  <p className="text-sm text-[#94A3B8] leading-relaxed mb-6">{project.description}</p>

                  <div className="flex flex-wrap gap-3">
                    <button
                      onClick={() => setSelectedProject(project)}
                      className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-[#FAFAFA] bg-[#6366F1] rounded-lg hover:bg-[#5354E0] transition-all duration-300 hover:scale-105"
                    >
                      <BookOpen size={14} /> Case Study
                    </button>
                    <a
                      href={project.liveUrl}
                      className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-[#94A3B8] border border-[rgba(255,255,255,0.1)] rounded-lg hover:text-[#FAFAFA] hover:bg-[rgba(255,255,255,0.05)] transition-all duration-300 hover:scale-105"
                    >
                      <ExternalLink size={14} /> Live Demo
                    </a>
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-[#94A3B8] border border-[rgba(255,255,255,0.1)] rounded-lg hover:text-[#FAFAFA] hover:bg-[rgba(255,255,255,0.05)] transition-all duration-300 hover:scale-105"
                    >
                      <GithubIcon size={14} /> GitHub
                    </a>
                  </div>
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

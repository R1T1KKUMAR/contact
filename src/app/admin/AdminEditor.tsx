"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Save,
  Trash2,
  Plus,
  ArrowUp,
  ArrowDown,
  ChevronDown,
  ChevronRight,
  CheckCircle2,
  AlertCircle,
  Loader2,
  RotateCcw,
} from "lucide-react";
import { saveSiteAction } from "./actions";
import type { SiteData } from "@/config/site";

type Json = string | number | boolean | null | Json[] | { [key: string]: Json };
type Path = (string | number)[];

const LONG_KEYS = new Set([
  "bio",
  "description",
  "problem",
  "solution",
  "architecture",
  "challenges",
  "tagline",
]);

const SECTION_LABELS: Record<string, string> = {
  name: "Identity",
  role: "Role / Title",
  roleAlt: "Secondary Role",
  tagline: "Tagline",
  email: "Email",
  phone: "Phone",
  location: "Location",
  resumeUrl: "Resume URL",
  github: "GitHub URL",
  linkedin: "LinkedIn URL",
  socialLinks: "Social Links",
  education: "Education",
  about: "About Section",
  experience: "Work Experience",
  skills: "Skills Categories",
  projects: "Projects",
  achievements: "Achievements",
  techStack: "Tech Stack",
  repos: "GitHub Repositories",
};

function label(key: string): string {
  if (SECTION_LABELS[key]) return SECTION_LABELS[key];
  return key
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (c) => c.toUpperCase())
    .trim();
}

const inputClass =
  "w-full px-3 py-2 text-sm bg-[#09090B] border border-[rgba(255,255,255,0.08)] rounded-lg text-[#FAFAFA] placeholder-[#94A3B8]/50 focus:outline-none focus:border-[#6366F1] focus:ring-1 focus:ring-[#6366F1]/30 transition-all";

function isLongText(key: string, value: string): boolean {
  return LONG_KEYS.has(key) || value.length > 90;
}

/** Immutable update at a path. */
function setPath(obj: Json, path: Path, value: Json): Json {
  if (path.length === 0) return value;
  const [head, ...rest] = path;
  if (Array.isArray(obj)) {
    const copy = [...obj];
    copy[head as number] = setPath(copy[head as number] ?? null, rest, value);
    return copy;
  }
  if (obj && typeof obj === "object") {
    return { ...obj, [head]: setPath(obj[head] ?? null, rest, value) };
  }
  return { [head]: setPath(null, rest, value) } as { [key: string]: Json };
}

function emptyValueFor(template: Json): Json {
  if (typeof template === "string") return "";
  if (typeof template === "number") return 0;
  if (typeof template === "boolean") return false;
  if (Array.isArray(template)) return [];
  if (template && typeof template === "object") {
    const out: { [key: string]: Json } = {};
    for (const [k, v] of Object.entries(template)) out[k] = emptyValueFor(v);
    return out;
  }
  return "";
}

function ValueEditor({
  fieldKey,
  path,
  value,
  onChange,
}: {
  fieldKey: string;
  path: Path;
  value: Json;
  onChange: (path: Path, value: Json) => void;
}) {
  if (typeof value === "boolean") {
    return (
      <label className="flex items-center gap-2 text-sm text-[#94A3B8] cursor-pointer select-none">
        <input
          type="checkbox"
          checked={value}
          onChange={(e) => onChange(path, e.target.checked)}
          className="w-4 h-4 accent-[#6366F1]"
        />
        {label(fieldKey)}
      </label>
    );
  }

  if (typeof value === "number") {
    return (
      <div className="space-y-1">
        <label className="text-xs font-mono tracking-wider text-[#94A3B8]">{label(fieldKey)}</label>
        <input
          type="number"
          value={value}
          onChange={(e) => onChange(path, Number(e.target.value))}
          className={inputClass}
        />
      </div>
    );
  }

  if (typeof value === "string" || value === null) {
    const text = value ?? "";
    if (isLongText(fieldKey, text)) {
      return (
        <div className="space-y-1">
          <label className="text-xs font-mono tracking-wider text-[#94A3B8]">{label(fieldKey)}</label>
          <textarea
            rows={Math.min(8, Math.max(3, Math.ceil(text.length / 80)))}
            value={text}
            onChange={(e) => onChange(path, e.target.value)}
            className={`${inputClass} resize-y`}
          />
        </div>
      );
    }
    return (
      <div className="space-y-1">
        <label className="text-xs font-mono tracking-wider text-[#94A3B8]">{label(fieldKey)}</label>
        <input
          type="text"
          value={text}
          onChange={(e) => onChange(path, e.target.value)}
          className={inputClass}
        />
      </div>
    );
  }

  if (Array.isArray(value)) {
    const template: Json = value.length > 0 ? value[0] : "";
    return (
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-xs font-mono tracking-wider text-[#6366F1] uppercase">
            {label(fieldKey)} ({value.length})
          </label>
          <button
            type="button"
            onClick={() => onChange(path, [...value, emptyValueFor(template)])}
            className="flex items-center gap-1 text-xs text-[#6366F1] hover:text-[#818CF8] transition-colors"
          >
            <Plus size={12} /> Add
          </button>
        </div>
        {value.map((item, i) => (
          <div
            key={i}
            className="relative p-4 rounded-lg border border-[rgba(255,255,255,0.06)] bg-[#09090B]/60 space-y-3"
          >
            <div className="absolute top-2 right-2 flex items-center gap-1">
              <button
                type="button"
                disabled={i === 0}
                onClick={() => {
                  const copy = [...value];
                  [copy[i - 1], copy[i]] = [copy[i], copy[i - 1]];
                  onChange(path, copy);
                }}
                className="p-1 text-[#94A3B8] hover:text-[#FAFAFA] disabled:opacity-20"
                aria-label="Move up"
              >
                <ArrowUp size={12} />
              </button>
              <button
                type="button"
                disabled={i === value.length - 1}
                onClick={() => {
                  const copy = [...value];
                  [copy[i + 1], copy[i]] = [copy[i], copy[i + 1]];
                  onChange(path, copy);
                }}
                className="p-1 text-[#94A3B8] hover:text-[#FAFAFA] disabled:opacity-20"
                aria-label="Move down"
              >
                <ArrowDown size={12} />
              </button>
              <button
                type="button"
                onClick={() => onChange(path, value.filter((_, j) => j !== i))}
                className="p-1 text-[#94A3B8] hover:text-[#EF4444]"
                aria-label="Remove"
              >
                <Trash2 size={12} />
              </button>
            </div>
            {typeof item === "object" && item !== null && !Array.isArray(item) ? (
              <div className="pt-4">
                <ObjectEditor
                  path={[...path, i]}
                  value={item}
                  onChange={onChange}
                />
              </div>
            ) : Array.isArray(item) ? (
              <ValueEditor
                fieldKey={fieldKey}
                path={[...path, i]}
                value={item}
                onChange={onChange}
              />
            ) : (
              <ValueEditor
                fieldKey={fieldKey}
                path={[...path, i]}
                value={item as Json}
                onChange={onChange}
              />
            )}
          </div>
        ))}
        {value.length === 0 && (
          <p className="text-xs text-[#94A3B8]/50 italic">No items yet — click Add.</p>
        )}
      </div>
    );
  }

  // Plain object (e.g. education, about)
  return (
    <div className="rounded-lg border border-[rgba(255,255,255,0.08)] bg-[#09090B]/40 p-4 space-y-4">
      <p className="text-xs font-mono tracking-wider text-[#6366F1] uppercase">{label(fieldKey)}</p>
      <ObjectEditor path={path} value={value} onChange={onChange} />
    </div>
  );
}

function ObjectEditor({
  path,
  value,
  onChange,
}: {
  path: Path;
  value: { [key: string]: Json };
  onChange: (path: Path, value: Json) => void;
}) {
  const entries = Object.entries(value);
  return (
    <div className="grid sm:grid-cols-2 gap-4">
      {entries.map(([k, v]) => {
        // Render long text and arrays/nested objects full-width
        const wide =
          (typeof v === "string" && isLongText(k, v)) ||
          Array.isArray(v) ||
          (v !== null && typeof v === "object");
        return (
          <div key={k} className={wide ? "sm:col-span-2" : ""}>
            <ValueEditor fieldKey={k} path={[...path, k]} value={v} onChange={onChange} />
          </div>
        );
      })}
    </div>
  );
}

function Section({
  title,
  children,
  defaultOpen = false,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="rounded-xl border border-[rgba(255,255,255,0.08)] bg-[#111827]/60 overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-[rgba(255,255,255,0.02)] transition-colors"
      >
        <span className="text-sm font-semibold text-[#FAFAFA]">{title}</span>
        {open ? (
          <ChevronDown size={16} className="text-[#94A3B8]" />
        ) : (
          <ChevronRight size={16} className="text-[#94A3B8]" />
        )}
      </button>
      {open && <div className="px-5 pb-5 pt-1 space-y-4">{children}</div>}
    </div>
  );
}

export default function AdminEditor({ initialSite }: { initialSite: SiteData }) {
  const router = useRouter();
  const [editing, setEditing] = useState<SiteData>(() => JSON.parse(JSON.stringify(initialSite)));
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<{ ok: boolean; message: string } | null>(null);

  const handleChange = (path: Path, value: Json) => {
    setEditing((prev) => setPath(prev as unknown as Json, path, value) as unknown as SiteData);
  };

  const handleSave = async () => {
    setSaving(true);
    setStatus(null);
    try {
      const result = await saveSiteAction(JSON.parse(JSON.stringify(editing)));
      if (result.ok) {
        setStatus({ ok: true, message: "Saved! Live on the site within a minute." });
        router.refresh();
      } else {
        setStatus({ ok: false, message: result.error || "Failed to save." });
      }
    } catch {
      setStatus({ ok: false, message: "Something went wrong while saving." });
    } finally {
      setSaving(false);
    }
  };

  const handleReset = () => {
    setEditing(JSON.parse(JSON.stringify(initialSite)));
    setStatus({ ok: true, message: "Reset to last saved version." });
  };

  const keys = Object.keys(editing);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-3 sticky top-20 z-40 p-4 rounded-xl border border-[rgba(255,255,255,0.08)] bg-[#09090B]/90 backdrop-blur-xl">
        <button
          type="button"
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 px-6 py-2.5 text-sm font-medium bg-[#6366F1] text-[#FAFAFA] rounded-lg hover:bg-[#5354E0] transition-all disabled:opacity-60"
        >
          {saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
          {saving ? "Saving..." : "Save changes"}
        </button>
        <button
          type="button"
          onClick={handleReset}
          className="flex items-center gap-2 px-4 py-2.5 text-sm text-[#94A3B8] border border-[rgba(255,255,255,0.1)] rounded-lg hover:text-[#FAFAFA] transition-all"
        >
          <RotateCcw size={14} /> Reset
        </button>
        {status && (
          <span
            className={`flex items-center gap-1.5 text-sm ${
              status.ok ? "text-[#22C55E]" : "text-[#EF4444]"
            }`}
          >
            {status.ok ? <CheckCircle2 size={14} /> : <AlertCircle size={14} />}
            {status.message}
          </span>
        )}
      </div>

      {keys.map((key, i) => (
        <Section key={key} title={label(key)} defaultOpen={i < 3}>
          <ValueEditor
            fieldKey={key}
            path={[key]}
            value={(editing as unknown as { [k: string]: Json })[key]}
            onChange={handleChange}
          />
        </Section>
      ))}
    </div>
  );
}

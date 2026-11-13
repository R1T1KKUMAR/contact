"use client";

import { useState } from "react";
import { Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { SheetHeader } from "./Sheet";
import ScrollReveal from "./ScrollReveal";
import emailjs from "@emailjs/browser";
import { useSite } from "@/components/site-context";

const inputClass =
  "w-full border-b border-[var(--bp-line)] bg-transparent px-1 py-2.5 text-sm text-[var(--bp-white)] placeholder-[var(--bp-graphite)]/50 transition-colors focus:border-[var(--bp-red)] focus:outline-none";

const labelClass = "font-mono text-[9px] tracking-[0.2em] text-[var(--bp-graphite)]";

export default function Contact() {
  const SITE = useSite();
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    company: "",
    topic: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSending(true);

    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      setError("Email service is not configured.");
      setSending(false);
      return;
    }

    const params = {
      from_name: formState.name,
      name: formState.name,
      reply_to: formState.email,
      email: formState.email,
      company: formState.company || "—",
      topic: formState.topic,
      message: formState.message,
      consent: "Yes",
      website: "—",
      submitted_at: new Date().toLocaleString(),
    };

    try {
      await Promise.all([
        emailjs.send(serviceId, templateId, { ...params, to_email: SITE.email }, publicKey),
        emailjs.send(serviceId, templateId, { ...params, to_email: formState.email }, publicKey),
      ]);
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setFormState({ name: "", email: "", company: "", topic: "", message: "" });
      }, 3000);
    } catch {
      setError("Failed to send message. Please try again later.");
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" className="relative scroll-mt-20 py-16 md:py-24">
      <div className="mx-auto max-w-5xl px-6">
        <ScrollReveal>
          <SheetHeader
            no="09"
            title="Request a build"
            blurb={`Have a project in mind? Write to ${SITE.email} or use the requisition below.`}
          />
        </ScrollReveal>

        <ScrollReveal>
          <div className="max-w-2xl border border-[var(--bp-line)] bg-[var(--bp-panel)] p-6 sm:p-8">
            {submitted ? (
              <div className="flex flex-col items-center justify-center py-12">
                <CheckCircle2 className="h-12 w-12 text-[var(--bp-cyan)]" />
                <h3 className="mt-5 text-lg font-semibold text-[var(--bp-white)]">
                  Requisition received
                </h3>
                <p className="mt-2 text-sm text-[var(--bp-graphite)]">
                  I&apos;ll get back to you soon.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-7">
                <div className="grid gap-7 sm:grid-cols-2">
                  <div className="space-y-1">
                    <label htmlFor="cf-name" className={labelClass}>NAME</label>
                    <input
                      id="cf-name"
                      type="text"
                      required
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      className={inputClass}
                      placeholder="Your name"
                    />
                  </div>
                  <div className="space-y-1">
                    <label htmlFor="cf-email" className={labelClass}>EMAIL</label>
                    <input
                      id="cf-email"
                      type="email"
                      required
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      className={inputClass}
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div className="grid gap-7 sm:grid-cols-2">
                  <div className="space-y-1">
                    <label htmlFor="cf-company" className={labelClass}>COMPANY</label>
                    <input
                      id="cf-company"
                      type="text"
                      value={formState.company}
                      onChange={(e) => setFormState({ ...formState, company: e.target.value })}
                      className={inputClass}
                      placeholder="Optional"
                    />
                  </div>
                  <div className="space-y-1">
                    <label htmlFor="cf-topic" className={labelClass}>BUILD TYPE</label>
                    <select
                      id="cf-topic"
                      value={formState.topic}
                      onChange={(e) => setFormState({ ...formState, topic: e.target.value })}
                      className={`${inputClass} [&>option]:bg-[var(--bp-ink-deep)]`}
                    >
                      <option value="">Select a topic</option>
                      <option value="project">Project collaboration</option>
                      <option value="freelance">Freelance work</option>
                      <option value="internship">Internship opportunity</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label htmlFor="cf-message" className={labelClass}>SPECIFICATION</label>
                  <textarea
                    id="cf-message"
                    required
                    rows={5}
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    className={`${inputClass} resize-none`}
                    placeholder="Tell me about the project…"
                  />
                </div>

                {error && (
                  <p className="flex items-center gap-2 border-l-2 border-[var(--bp-red)] bg-[rgba(255,107,87,0.08)] px-4 py-2.5 text-sm text-[var(--bp-red)]">
                    <AlertCircle size={14} />
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={sending}
                  className="flex w-full items-center justify-center gap-2 border border-[var(--bp-cyan)] py-3.5 font-mono text-sm text-[var(--bp-cyan)] transition-colors hover:bg-[rgba(127,209,232,0.08)] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {sending ? (
                    <>
                      <Loader2 size={14} className="animate-spin" />
                      Sending…
                    </>
                  ) : (
                    <>
                      Send request
                      <Send size={13} />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

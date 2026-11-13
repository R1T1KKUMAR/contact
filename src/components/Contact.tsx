"use client";

import { useState } from "react";
import { Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { SectionHeader } from "./Sheet";
import ScrollReveal from "./ScrollReveal";
import emailjs from "@emailjs/browser";
import { useSite } from "@/components/site-context";

const inputClass =
  "w-full border-b border-[var(--hairline)] bg-transparent px-0 py-2.5 text-[15px] text-[var(--ink)] placeholder-[var(--graphite)]/50 transition-colors focus:border-[var(--ultra)] focus:outline-none";

const labelClass = "text-xs font-medium uppercase tracking-wider text-[var(--graphite)]";

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
    <section id="contact" className="relative scroll-mt-20 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <ScrollReveal>
          <SectionHeader
            title="Get in touch"
            blurb={`Have a project in mind? Write to ${SITE.email} or use the form below.`}
          />
        </ScrollReveal>

        <ScrollReveal>
          <div className="max-w-2xl rounded-3xl border border-[var(--hairline)] bg-white p-7 sm:p-10">
            {submitted ? (
              <div className="flex flex-col items-center justify-center py-14">
                <CheckCircle2 className="h-12 w-12 text-[var(--grow)]" />
                <h3
                  className="mt-5 text-2xl font-medium text-[var(--ink)]"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  Message sent
                </h3>
                <p className="mt-2 text-sm text-[var(--graphite)]">
                  Thanks — I&apos;ll get back to you soon.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid gap-8 sm:grid-cols-2">
                  <div className="space-y-1">
                    <label htmlFor="cf-name" className={labelClass}>Name</label>
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
                    <label htmlFor="cf-email" className={labelClass}>Email</label>
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

                <div className="grid gap-8 sm:grid-cols-2">
                  <div className="space-y-1">
                    <label htmlFor="cf-company" className={labelClass}>Company</label>
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
                    <label htmlFor="cf-topic" className={labelClass}>Topic</label>
                    <select
                      id="cf-topic"
                      value={formState.topic}
                      onChange={(e) => setFormState({ ...formState, topic: e.target.value })}
                      className={inputClass}
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
                  <label htmlFor="cf-message" className={labelClass}>Message</label>
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
                  <p className="flex items-center gap-2 rounded-xl bg-[rgba(220,38,38,0.06)] px-4 py-2.5 text-sm text-[#DC2626]">
                    <AlertCircle size={14} />
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={sending}
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-[var(--ink)] py-3.5 text-sm font-medium text-[var(--paper)] transition-colors hover:bg-[var(--ultra-deep)] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {sending ? (
                    <>
                      <Loader2 size={14} className="animate-spin" />
                      Sending…
                    </>
                  ) : (
                    <>
                      Send message
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

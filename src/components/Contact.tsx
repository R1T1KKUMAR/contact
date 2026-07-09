"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import ScrollReveal from "./ScrollReveal";
import emailjs from "@emailjs/browser";

export default function Contact() {
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
        emailjs.send(serviceId, templateId, { ...params, to_email: "ritikkumar12bicbly@gmail.com" }, publicKey),
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
    <section id="contact" className="relative py-16 md:py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <ScrollReveal>
          <div className="mb-16">
            <span className="text-xs font-mono tracking-widest text-[#6366F1] uppercase">
              Contact
            </span>
            <h2
              className="text-4xl sm:text-5xl font-bold text-[#FAFAFA] mt-4 tracking-tight"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Get in Touch
            </h2>
            <p className="text-lg text-[#94A3B8] mt-4 max-w-2xl leading-relaxed">
              Have a project in mind? Let&apos;s build something extraordinary together.
            </p>
          </div>
        </ScrollReveal>

        <div className="max-w-2xl mx-auto">
          <ScrollReveal>
            <div className="relative p-6 sm:p-8 rounded-2xl border border-[rgba(255,255,255,0.08)] bg-gradient-to-br from-[#111827]/80 to-[#09090B]/80 backdrop-blur-xl">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#6366F1]/5 to-transparent pointer-events-none" />

              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="relative flex flex-col items-center justify-center py-12"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200, damping: 15 }}
                    >
                      <CheckCircle2 className="w-16 h-16 text-[#22C55E]" />
                    </motion.div>
                    <h3 className="text-xl font-semibold text-[#FAFAFA] mt-6">Message Sent!</h3>
                    <p className="text-sm text-[#94A3B8] mt-2">
                      Thank you! I&apos;ll get back to you soon.
                    </p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="relative space-y-5"
                  >
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div className="space-y-2">
                        <label className="text-xs font-mono tracking-wider text-[#94A3B8]">
                          Name
                        </label>
                        <input
                          type="text"
                          required
                          value={formState.name}
                          onChange={(e) =>
                            setFormState({ ...formState, name: e.target.value })
                          }
                          className="w-full px-4 py-3 text-sm bg-[#09090B] border border-[rgba(255,255,255,0.08)] rounded-lg text-[#FAFAFA] placeholder-[#94A3B8]/50 focus:outline-none focus:border-[#6366F1] focus:ring-1 focus:ring-[#6366F1]/30 transition-all"
                          placeholder="Your name"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-mono tracking-wider text-[#94A3B8]">
                          Email
                        </label>
                        <input
                          type="email"
                          required
                          value={formState.email}
                          onChange={(e) =>
                            setFormState({ ...formState, email: e.target.value })
                          }
                          className="w-full px-4 py-3 text-sm bg-[#09090B] border border-[rgba(255,255,255,0.08)] rounded-lg text-[#FAFAFA] placeholder-[#94A3B8]/50 focus:outline-none focus:border-[#6366F1] focus:ring-1 focus:ring-[#6366F1]/30 transition-all"
                          placeholder="your@email.com"
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-5">
                      <div className="space-y-2">
                        <label className="text-xs font-mono tracking-wider text-[#94A3B8]">
                          Company
                        </label>
                        <input
                          type="text"
                          value={formState.company}
                          onChange={(e) =>
                            setFormState({ ...formState, company: e.target.value })
                          }
                          className="w-full px-4 py-3 text-sm bg-[#09090B] border border-[rgba(255,255,255,0.08)] rounded-lg text-[#FAFAFA] placeholder-[#94A3B8]/50 focus:outline-none focus:border-[#6366F1] focus:ring-1 focus:ring-[#6366F1]/30 transition-all"
                          placeholder="Company (optional)"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-mono tracking-wider text-[#94A3B8]">
                          Topic
                        </label>
                        <select
                          value={formState.topic}
                          onChange={(e) =>
                            setFormState({ ...formState, topic: e.target.value })
                          }
                          className="w-full px-4 py-3 text-sm bg-[#09090B] border border-[rgba(255,255,255,0.08)] rounded-lg text-[#FAFAFA] focus:outline-none focus:border-[#6366F1] focus:ring-1 focus:ring-[#6366F1]/30 transition-all"
                        >
                          <option value="">Select a topic</option>
                          <option value="project">Project Collaboration</option>
                          <option value="freelance">Freelance Work</option>
                          <option value="internship">Internship Opportunity</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-mono tracking-wider text-[#94A3B8]">
                        Message
                      </label>
                      <textarea
                        required
                        rows={5}
                        value={formState.message}
                        onChange={(e) =>
                          setFormState({ ...formState, message: e.target.value })
                        }
                        className="w-full px-4 py-3 text-sm bg-[#09090B] border border-[rgba(255,255,255,0.08)] rounded-lg text-[#FAFAFA] placeholder-[#94A3B8]/50 focus:outline-none focus:border-[#6366F1] focus:ring-1 focus:ring-[#6366F1]/30 transition-all resize-none"
                        placeholder="Tell me about your project..."
                      />
                    </div>

                    {error && (
                      <div className="flex items-center gap-2 text-sm text-[#EF4444] bg-[#EF4444]/10 px-4 py-2 rounded-lg">
                        <AlertCircle size={14} />
                        {error}
                      </div>
                    )}
                    <motion.button
                      type="submit"
                      disabled={sending}
                      whileHover={{ scale: sending ? 1 : 1.02 }}
                      whileTap={{ scale: sending ? 1 : 0.98 }}
                      className="group relative w-full py-3.5 bg-[#6366F1] text-[#FAFAFA] font-medium rounded-lg overflow-hidden transition-all duration-300 hover:shadow-[0_0_30px_rgba(99,102,241,0.3)] flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      <span className="relative z-10 flex items-center gap-2">
                        {sending ? (
                          <>
                            <Loader2 size={14} className="animate-spin" />
                            Sending...
                          </>
                        ) : (
                          <>
                            Send Message
                            <Send size={14} className="group-hover:translate-x-1 transition-transform" />
                          </>
                        )}
                      </span>
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-[#5354E0] to-[#7C3AED] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      />
                    </motion.button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

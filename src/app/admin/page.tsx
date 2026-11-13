import type { Metadata } from "next";
import Link from "next/link";
import { Lock, LogOut, Database } from "lucide-react";
import { isAuthed } from "./actions";
import { logoutAction } from "./actions";
import LoginForm from "./LoginForm";
import AdminEditor from "./AdminEditor";
import { getSiteContent } from "@/lib/site-data";
import { supabaseConfigured } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Admin | Ritik Kumar",
  robots: { index: false, follow: false },
};

export default async function AdminPage() {
  if (!supabaseConfigured) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <div className="max-w-lg w-full p-8 rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[#111827]/80 space-y-4">
          <div className="flex items-center gap-2 text-[#F59E0B]">
            <Database size={20} />
            <h1 className="text-lg font-semibold">Supabase not configured</h1>
          </div>
          <p className="text-sm text-[#94A3B8] leading-relaxed">
            The admin editor stores content in Supabase. To enable it:
          </p>
          <ol className="text-sm text-[#94A3B8] space-y-2 list-decimal list-inside">
            <li>Create a free project at supabase.com</li>
            <li>
              Run the SQL below in the Supabase SQL editor
            </li>
            <li>
              Set <code className="text-[#6366F1]">SUPABASE_URL</code>,{" "}
              <code className="text-[#6366F1]">SUPABASE_SERVICE_ROLE_KEY</code> and{" "}
              <code className="text-[#6366F1]">ADMIN_PASSWORD</code> in your environment (Vercel →
              Settings → Environment Variables)
            </li>
            <li>Redeploy</li>
          </ol>
          <pre className="text-xs bg-[#09090B] border border-[rgba(255,255,255,0.08)] rounded-lg p-4 overflow-x-auto text-[#94A3B8]">
{`create table if not exists site_content (
  id text primary key default 'site',
  data jsonb not null,
  updated_at timestamptz not null default now()
);`}
          </pre>
          <Link href="/" className="block text-sm text-[#6366F1] hover:underline">
            ← Back to site
          </Link>
        </div>
      </div>
    );
  }

  if (!(await isAuthed())) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <LoginForm />
      </div>
    );
  }

  const site = await getSiteContent();

  return (
    <div className="min-h-screen px-6 pt-28 pb-16">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-[#FAFAFA] flex items-center gap-2">
              <Lock size={20} className="text-[#6366F1]" /> Site Editor
            </h1>
            <p className="text-sm text-[#94A3B8] mt-1">
              Every change here goes live on the site within a minute — no redeploy needed.
            </p>
          </div>
          <form action={logoutAction}>
            <button
              type="submit"
              className="flex items-center gap-2 px-4 py-2 text-sm text-[#94A3B8] border border-[rgba(255,255,255,0.1)] rounded-lg hover:text-[#FAFAFA] hover:bg-[rgba(255,255,255,0.05)] transition-all"
            >
              <LogOut size={14} /> Log out
            </button>
          </form>
        </div>
        <AdminEditor initialSite={site} />
      </div>
    </div>
  );
}

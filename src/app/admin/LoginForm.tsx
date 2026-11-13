"use client";

import { useActionState } from "react";
import { Lock } from "lucide-react";
import { loginAction } from "./actions";

export default function LoginForm() {
  const [state, formAction, pending] = useActionState(loginAction, {});

  return (
    <form
      action={formAction}
      className="max-w-sm w-full p-8 rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[#111827]/80 space-y-4"
    >
      <div className="flex items-center gap-2 text-[#FAFAFA]">
        <Lock size={18} className="text-[#6366F1]" />
        <h1 className="text-lg font-semibold">Admin Login</h1>
      </div>
      <input
        type="password"
        name="password"
        required
        autoFocus
        placeholder="Admin password"
        className="w-full px-4 py-3 text-sm bg-[#09090B] border border-[rgba(255,255,255,0.08)] rounded-lg text-[#FAFAFA] placeholder-[#94A3B8]/50 focus:outline-none focus:border-[#6366F1] focus:ring-1 focus:ring-[#6366F1]/30 transition-all"
      />
      {state?.error && (
        <p className="text-sm text-[#EF4444] bg-[#EF4444]/10 px-4 py-2 rounded-lg">{state.error}</p>
      )}
      <button
        type="submit"
        disabled={pending}
        className="w-full py-3 bg-[#6366F1] text-[#FAFAFA] font-medium rounded-lg hover:bg-[#5354E0] transition-all disabled:opacity-60"
      >
        {pending ? "Signing in..." : "Sign in"}
      </button>
    </form>
  );
}

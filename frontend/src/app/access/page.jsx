'use client';

import Link from 'next/link';
import { ArrowLeft, ArrowRight, ShieldCheck, Users, UserRound } from 'lucide-react';

const roles = [
  { name: 'Admin', description: 'Sign in to your company workspace', icon: ShieldCheck, initial: 'A' },
  { name: 'HR', description: 'Sign in to people operations', icon: Users, initial: 'H' },
  { name: 'Employee', description: 'Sign in to your employee workspace', icon: UserRound, initial: 'E' }
];

export default function AccessPage() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#050b0d] px-4 py-12 text-slate-100">
      <div className="pointer-events-none absolute -right-32 -top-32 h-[460px] w-[460px] rounded-full bg-teal-400/10 blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-40 -left-32 h-[400px] w-[400px] rounded-full bg-cyan-500/[0.07] blur-[120px]" />
      <section className="relative w-full max-w-xl rounded-[2rem] border border-teal-100/10 bg-[#0a1517]/95 p-7 shadow-2xl shadow-black/40 sm:p-10">
        <Link href="/" className="mb-10 inline-flex items-center gap-2 text-xs font-semibold text-slate-400 transition hover:text-teal-200">
          <ArrowLeft size={15} /> Back to home
        </Link>

        <div className="mb-12 flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-2xl border border-teal-200/25 bg-gradient-to-br from-teal-300 to-teal-700 text-lg font-black text-[#061012]">H</span>
          <div>
            <p className="text-base font-extrabold tracking-[.12em] text-white">HCM <span className="text-teal-300">LITE</span></p>
            <p className="mt-0.5 text-[11px] text-slate-500">People operations, clearly.</p>
          </div>
        </div>

        <p className="mb-3 text-[11px] font-bold uppercase tracking-[.22em] text-teal-300">Welcome to HCM Lite</p>
        <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">Who are you?</h1>
        <p className="mt-4 text-base leading-7 text-slate-400">Choose your role to continue to the right workspace.</p>

        <div className="mt-9 space-y-3">
          {roles.map(({ name, description, icon: Icon, initial }) => (
            <Link key={name} href={`/login?role=${name}`} className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-[#0d1b1d] p-4 transition duration-200 hover:-translate-y-0.5 hover:border-teal-200/40 hover:bg-[#102426]">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl border border-teal-200/10 bg-teal-300/10 text-teal-200">
                <Icon size={21} />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-bold text-white">{name}</span>
                <span className="mt-1 block text-xs text-slate-400">{description}</span>
              </span>
              <ArrowRight size={18} className="shrink-0 text-teal-300 transition group-hover:translate-x-1" />
            </Link>
          ))}
        </div>

        <p className="mt-7 rounded-xl border border-teal-200/10 bg-teal-300/[0.05] px-4 py-3 text-xs leading-5 text-slate-400">Your company administrator will provide your email and password. Sign up is not available on this page.</p>
      </section>
    </main>
  );
}

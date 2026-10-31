'use client';

import Link from 'next/link';
import {
  ArrowRight, ArrowUpRight, BarChart3, Bell, BriefcaseBusiness, CalendarCheck,
  CheckCircle2, ClipboardList, Clock3, FileClock, Fingerprint, LayoutDashboard,
  LockKeyhole, Megaphone, ShieldCheck, Sparkles, Users, Wallet, Workflow
} from 'lucide-react';

const features = [
  { icon: Users, title: 'Employee Management', description: 'Keep employee profiles, job details, departments and team information organized in one place.' },
  { icon: CalendarCheck, title: 'Attendance Tracking', description: 'Make daily attendance easier to review with check-in records, work hours and attendance summaries.' },
  { icon: ClipboardList, title: 'Leave Management', description: 'Submit, review and manage leave requests with a clear approval workflow.' },
  { icon: Wallet, title: 'Payroll Management', description: 'Prepare payroll records, review salary details and keep finalized payroll runs organized.' },
  { icon: BarChart3, title: 'Reports & Analytics', description: 'Understand your workforce with useful dashboard statistics and department-level insights.' },
  { icon: Sparkles, title: 'AI Assistant', description: 'Get AI-assisted summaries and helpful insights from your company workspace.' }
];

const modules = [
  { icon: LayoutDashboard, name: 'Overview', detail: 'A quick view of company activity' },
  { icon: BriefcaseBusiness, name: 'Departments', detail: 'Organized teams and roles' },
  { icon: Clock3, name: 'Attendance', detail: 'Daily time and attendance records' },
  { icon: FileClock, name: 'Leave requests', detail: 'Requests and approval status' },
  { icon: Wallet, name: 'Payroll', detail: 'Salary and payroll records' },
  { icon: Megaphone, name: 'Announcements', detail: 'Company-wide updates' },
  { icon: Bell, name: 'Notifications', detail: 'Important workspace alerts' },
  { icon: Fingerprint, name: 'Audit logs', detail: 'A record of key activities' }
];

const highlights = [
  'Role-based Admin, HR and Employee workspaces',
  'Centralized employee and organization records',
  'Attendance, leave and payroll workflows',
  'Company announcements and notifications',
  'Dashboard insights and AI-assisted summaries',
  'Protected access and activity history'
];

function SectionEyebrow({ children }) {
  return (
    <p className="mb-3 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[.22em] text-teal-300">
      <span className="h-px w-6 bg-teal-300/70" />
      {children}
    </p>
  );
}

export default function HomePage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#050b0d] text-slate-100">
      <section className="relative isolate border-b border-white/[0.06]">
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute -right-32 -top-36 h-[520px] w-[520px] rounded-full bg-teal-400/[0.12] blur-[120px]" />
          <div className="absolute -left-40 top-64 h-[360px] w-[360px] rounded-full bg-cyan-500/[0.07] blur-[110px]" />
          <div className="absolute inset-0 opacity-[0.12]" style={{ backgroundImage: 'linear-gradient(rgba(148,163,184,.18) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,.18) 1px, transparent 1px)', backgroundSize: '56px 56px', maskImage: 'linear-gradient(to bottom, black, transparent 85%)' }} />
        </div>

        <div className="mx-auto max-w-7xl px-5 pb-20 pt-10 sm:px-8 sm:pb-28 sm:pt-14 lg:px-10">
          <div className="mb-14 flex flex-wrap items-center justify-start gap-3">
            <Link href="/login" className="inline-flex items-center gap-2 rounded-xl bg-teal-300 px-5 py-3 text-sm font-extrabold text-[#061012] shadow-lg shadow-teal-950/30 transition hover:-translate-y-0.5 hover:bg-teal-200">
              Login <ArrowUpRight size={16} />
            </Link>
            <Link href="/setup" className="inline-flex items-center gap-2 rounded-xl border border-teal-200/25 bg-white/[0.04] px-5 py-3 text-sm font-bold text-teal-100 transition hover:border-teal-200/50 hover:bg-teal-300/10">
              Sign Up <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_.95fr]">
            <div className="max-w-2xl">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-teal-200/20 bg-teal-300/[0.07] px-3.5 py-2 text-xs font-semibold text-teal-200">
                <span className="h-2 w-2 rounded-full bg-teal-300 shadow-[0_0_12px_rgba(94,234,212,.8)]" />
                Human Company Management System
              </div>
              <h1 className="text-5xl font-black leading-[1.04] tracking-[-.055em] text-white sm:text-6xl xl:text-7xl">
                People first.
                <span className="mt-2 block bg-gradient-to-r from-teal-200 via-teal-300 to-cyan-400 bg-clip-text text-transparent">Work, simplified.</span>
              </h1>
              <p className="mt-7 max-w-xl text-base leading-8 text-slate-300 sm:text-lg">
                HCM Lite brings your company&apos;s people operations into one organized workspace. Manage employees, attendance, leave, payroll and everyday communication without switching between scattered tools.
              </p>
              <div className="mt-9 flex flex-wrap items-center gap-4">
                <Link href="/login" className="group inline-flex items-center gap-3 rounded-xl bg-teal-300 px-6 py-3.5 text-sm font-extrabold text-[#061012] shadow-xl shadow-teal-950/30 transition hover:-translate-y-0.5 hover:bg-teal-200">
                  Enter your workspace <ArrowRight size={17} className="transition group-hover:translate-x-1" />
                </Link>
                <a href="#features" className="inline-flex items-center gap-2 px-2 py-3 text-sm font-semibold text-slate-300 transition hover:text-teal-200">
                  Explore features <ArrowUpRight size={16} />
                </a>
              </div>
              <div className="mt-10 flex flex-wrap gap-x-6 gap-y-3 text-xs font-medium text-slate-400">
                <span className="inline-flex items-center gap-2"><CheckCircle2 size={15} className="text-teal-300" /> One connected workspace</span>
                <span className="inline-flex items-center gap-2"><CheckCircle2 size={15} className="text-teal-300" /> Role-based access</span>
                <span className="inline-flex items-center gap-2"><CheckCircle2 size={15} className="text-teal-300" /> Clear workflows</span>
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-xl">
              <div className="absolute -inset-5 rounded-[2rem] bg-teal-300/[0.08] blur-2xl" />
              <div className="relative overflow-hidden rounded-[1.7rem] border border-teal-100/15 bg-[#0a1719]/95 p-4 shadow-2xl shadow-black/50 sm:p-5">
                <div className="flex items-center justify-between border-b border-white/[0.07] pb-4">
                  <div className="flex items-center gap-3">
                    <div className="grid h-9 w-9 place-items-center rounded-xl bg-teal-300 text-sm font-black text-[#061012]">H</div>
                    <div><p className="text-sm font-bold text-white">HCM Lite</p><p className="text-[10px] text-slate-500">Company workspace</p></div>
                  </div>
                  <span className="rounded-full border border-emerald-300/20 bg-emerald-300/10 px-2.5 py-1 text-[10px] font-semibold text-emerald-200">Workspace overview</span>
                </div>
                <div className="grid grid-cols-2 gap-3 py-5 sm:grid-cols-3">
                  {[
                    { label: 'Team members', value: 'People', icon: Users },
                    { label: 'Attendance', value: 'Daily logs', icon: CalendarCheck },
                    { label: 'Payroll', value: 'Salary records', icon: Wallet }
                  ].map((item) => {
                    const Icon = item.icon;
                    return <div key={item.label} className="rounded-2xl border border-white/[0.07] bg-white/[0.035] p-3"><span className="grid h-8 w-8 place-items-center rounded-xl bg-teal-300/10 text-teal-200"><Icon size={16} /></span><p className="mt-3 text-xs font-bold text-slate-200">{item.label}</p><p className="mt-1 text-[10px] text-slate-500">{item.value}</p></div>;
                  })}
                </div>
                <div className="rounded-2xl border border-white/[0.07] bg-[#071113] p-4">
                  <div className="mb-4 flex items-center justify-between"><div><p className="text-xs font-bold text-white">Workforce snapshot</p><p className="mt-1 text-[10px] text-slate-500">Your company, at a glance</p></div><BarChart3 size={18} className="text-teal-300" /></div>
                  <div className="flex h-28 items-end gap-2 rounded-xl bg-gradient-to-t from-teal-300/[0.06] to-transparent px-3 pb-3">
                    {[38, 58, 46, 76, 62, 88, 70, 96, 74, 86, 64, 100].map((height, index) => <div key={index} className="flex-1 rounded-t-md bg-gradient-to-t from-teal-700 to-teal-300/90 opacity-90" style={{ height: String(height) + '%' }} />)}
                  </div>
                  <div className="mt-3 flex items-center justify-between text-[10px] text-slate-500"><span>People & operations</span><span className="text-teal-200">Connected view</span></div>
                </div>
                <div className="mt-3 flex items-center gap-3 rounded-xl border border-teal-200/10 bg-teal-300/[0.06] p-3">
                  <span className="grid h-8 w-8 place-items-center rounded-lg bg-teal-300/10 text-teal-200"><ShieldCheck size={16} /></span>
                  <div><p className="text-xs font-semibold text-slate-200">Access for every role</p><p className="mt-1 text-[10px] text-slate-500">Admin · HR · Employee</p></div>
                  <CheckCircle2 size={16} className="ml-auto text-teal-300" />
                </div>
              </div>
              <div className="absolute -bottom-5 -left-5 hidden items-center gap-3 rounded-2xl border border-white/10 bg-[#102124] px-4 py-3 shadow-xl sm:flex">
                <span className="grid h-9 w-9 place-items-center rounded-xl bg-teal-300/10 text-teal-200"><Workflow size={18} /></span>
                <div><p className="text-xs font-bold text-white">Simpler workflows</p><p className="text-[10px] text-slate-400">From people to payroll</p></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-24 lg:px-10">
        <div className="max-w-2xl">
          <SectionEyebrow>What HCM Lite does</SectionEyebrow>
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">Everything your people operations need, <span className="text-teal-300">in one place.</span></h2>
          <p className="mt-4 text-sm leading-7 text-slate-400 sm:text-base">HCM Lite is designed to help organizations keep everyday HR work clear, connected and easier to manage.</p>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return <article key={feature.title} className="group rounded-2xl border border-white/[0.07] bg-[#0a1517] p-6 transition duration-300 hover:-translate-y-1 hover:border-teal-200/25 hover:bg-[#0d1d1f]">
              <span className="grid h-12 w-12 place-items-center rounded-2xl border border-teal-200/10 bg-teal-300/[0.08] text-teal-200 transition group-hover:bg-teal-300 group-hover:text-[#061012]"><Icon size={21} /></span>
              <p className="mt-6 text-[10px] font-bold tracking-[.18em] text-teal-300/70">0{index + 1}</p>
              <h3 className="mt-2 text-lg font-bold text-white">{feature.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-400">{feature.description}</p>
            </article>;
          })}
        </div>
      </section>

      <section className="border-y border-white/[0.06] bg-[#081214]">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-20 sm:px-8 lg:grid-cols-[.85fr_1.15fr] lg:px-10 lg:py-24">
          <div>
            <SectionEyebrow>Built for the whole team</SectionEyebrow>
            <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">The right workspace for <span className="text-teal-300">every role.</span></h2>
            <p className="mt-5 text-sm leading-7 text-slate-400">Different people need different tools. HCM Lite provides dedicated access for company administrators, HR teams and employees, so everyone can focus on the work that matters to them.</p>
            <div className="mt-8 space-y-4">
              {[
                ['Admin', 'Oversee the company, manage access, review insights and configure organization settings.'],
                ['HR', 'Manage employee records, attendance, leave requests, payroll and company updates.'],
                ['Employee', 'View personal information, track attendance and handle leave-related tasks.']
              ].map(([role, description]) => <div key={role} className="flex gap-3"><CheckCircle2 size={18} className="mt-0.5 shrink-0 text-teal-300" /><div><p className="text-sm font-bold text-slate-100">{role}</p><p className="mt-1 text-xs leading-5 text-slate-400">{description}</p></div></div>)}
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {modules.map((module) => {
              const Icon = module.icon;
              return <div key={module.name} className="flex items-center gap-4 rounded-2xl border border-white/[0.07] bg-[#0b191b] p-4">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-teal-300/[0.08] text-teal-200"><Icon size={19} /></span>
                <div><h3 className="text-sm font-bold text-slate-100">{module.name}</h3><p className="mt-1 text-[11px] leading-5 text-slate-500">{module.detail}</p></div>
              </div>;
            })}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-24 lg:px-10">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <SectionEyebrow>Why use HCM Lite</SectionEyebrow>
            <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">Less scattered admin. <span className="text-teal-300">More clarity.</span></h2>
            <p className="mt-4 text-sm leading-7 text-slate-400">Bring essential people-management activities together, make responsibilities easier to follow and give teams a shared view of company operations.</p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {highlights.map((item) => <div key={item} className="flex gap-3 rounded-xl border border-white/[0.06] bg-white/[0.025] p-4 text-sm leading-6 text-slate-300"><CheckCircle2 size={17} className="mt-0.5 shrink-0 text-teal-300" />{item}</div>)}
          </div>
        </div>
      </section>

      <section className="px-5 pb-20 sm:px-8 lg:px-10">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] border border-teal-200/15 bg-gradient-to-br from-[#0d2929] via-[#0a1b1d] to-[#0a1214] px-7 py-12 sm:px-12 sm:py-16">
          <div className="pointer-events-none absolute -right-20 -top-32 h-80 w-80 rounded-full bg-teal-300/10 blur-[90px]" />
          <div className="relative flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
            <div className="max-w-2xl"><p className="text-xs font-bold uppercase tracking-[.2em] text-teal-300">Your company workspace starts here</p><h2 className="mt-4 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">Make people management feel simpler.</h2><p className="mt-4 text-sm leading-7 text-slate-300">Sign in to continue to your HCM Lite workspace, or set up a company workspace to get started.</p></div>
            <div className="flex shrink-0 flex-wrap gap-3">
              <Link href="/login" className="inline-flex items-center gap-2 rounded-xl bg-teal-300 px-5 py-3.5 text-sm font-extrabold text-[#061012] transition hover:bg-teal-200">Login <ArrowRight size={16} /></Link>
              <Link href="/setup" className="inline-flex items-center gap-2 rounded-xl border border-teal-100/25 bg-white/[0.04] px-5 py-3.5 text-sm font-bold text-white transition hover:bg-white/[0.08]">Sign Up <ArrowUpRight size={16} /></Link>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/[0.06] bg-[#030809]">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-7 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-10">
          <p className="font-bold tracking-[.14em] text-slate-300">HCM <span className="text-teal-300">LITE</span></p>
          <p>Human Company Management System · A connected workspace for people and operations</p>
        </div>
      </footer>
    </main>
  );
}

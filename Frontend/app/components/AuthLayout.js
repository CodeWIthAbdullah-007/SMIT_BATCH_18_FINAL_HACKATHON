
import Link from "next/link";

export default function AuthLayout({ children }) {
  return (
    <main className="min-h-screen bg-slate-50 lg:grid lg:grid-cols-2">
      <aside className="relative hidden flex-col justify-between overflow-hidden bg-gradient-to-br from-indigo-950 via-indigo-900 to-violet-800 p-12 text-white lg:flex xl:p-16">
        <div className="absolute -right-24 top-24 h-72 w-72 rounded-full bg-violet-500/20 blur-3xl" />
        <div className="absolute -bottom-24 -left-20 h-72 w-72 rounded-full bg-indigo-400/20 blur-3xl" />

        <Link href="/login" className="relative flex items-center gap-3 text-2xl font-bold">
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-xl font-black text-indigo-900">
            H
          </span>
          HCM <span className="text-violet-300">Lite</span>
        </Link>

        <div className="relative my-12 max-w-xl">
          <span className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold tracking-[0.2em] text-violet-200">
            PEOPLE FIRST. WORK MADE SIMPLE.
          </span>

          <h1 className="mt-8 text-4xl font-bold leading-tight xl:text-5xl">
            Better teams start with better experiences.
          </h1>

          <p className="mt-5 max-w-md text-base leading-7 text-indigo-100/80">
            One organized workspace for your people, everyday HR tasks, and a better way to work together.
          </p>

          <div className="mt-10 space-y-6">
            {[
              ["01", "People in one place", "Keep team information organized."],
              ["02", "Simple HR management", "Make everyday work easier."],
              ["03", "Built for your team", "A clear, focused workspace."],
            ].map(([number, title, description]) => (
              <div key={number} className="flex items-center gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/15 bg-white/10 text-sm font-bold text-violet-200">
                  {number}
                </span>
                <div>
                  <h2 className="font-semibold">{title}</h2>
                  <p className="mt-1 text-sm text-indigo-100/70">{description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <p className="relative text-sm text-indigo-200/70">
          © 2026 HCM Lite · Made for teams that care.
        </p>
      </aside>

      <section className="flex min-h-screen flex-col items-center justify-center px-5 py-10 sm:px-8 lg:px-12">
        <Link href="/login" className="mb-10 flex items-center gap-3 text-xl font-bold text-slate-900 lg:hidden">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-white">
            H
          </span>
          HCM <span className="-ml-3 text-indigo-600">Lite</span>
        </Link>

        <div className="w-full max-w-md">{children}</div>

        <p className="mt-10 text-center text-xs text-slate-400">
          Secure access to your team's workspace.
        </p>
      </section>
    </main>
  );
}

export function AuthHeader({ label, title, description }) {
  return (
    <header className="mb-8">
      <p className="mb-3 text-xs font-bold tracking-[0.2em] text-indigo-600">
        {label}
      </p>
      <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
        {title}
      </h2>
      <p className="mt-3 text-sm leading-6 text-slate-500">{description}</p>
    </header>
  );
}

export function AuthButton({ loading, children }) {
  return (
    <button
      className="flex w-full items-center justify-center gap-3 rounded-xl bg-indigo-600 px-5 py-3.5 font-semibold text-white shadow-lg shadow-indigo-600/20 transition hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-200 disabled:cursor-not-allowed disabled:opacity-60"
      type="submit"
      disabled={loading}
    >
      {loading ? "Please wait..." : children}
      {!loading && <span aria-hidden="true">→</span>}
    </button>
  );
}

export function AuthMessage({ message }) {
  if (!message.text) return null;

  return (
    <div
      className={`mb-5 rounded-xl border px-4 py-3 text-sm ${
        message.type === "success"
          ? "border-emerald-200 bg-emerald-50 text-emerald-700"
          : "border-red-200 bg-red-50 text-red-700"
      }`}
      role="status"
    >
      {message.text}
    </div>
  );
}

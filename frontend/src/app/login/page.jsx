'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAuth } from '../../context/AuthContext';
import API from '../../lib/api';
import { ArrowLeft, LockKeyhole, Mail } from 'lucide-react';

const roleLabels = {
  Admin: 'Admin',
  HR: 'HR',
  Employee: 'Employee'
};

export default function LoginPage() {
  const { login } = useAuth();
  const [selectedRole, setSelectedRole] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const role = new URLSearchParams(window.location.search).get('role');
    if (role && roleLabels[role]) setSelectedRole(role);
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    if (!selectedRole) {
      setError('Please go back and select your role first.');
      return;
    }
    setLoading(true);
    try {
      const response = await API.post('/auth/login', { email, password });
      if (response.data.user?.role !== selectedRole) {
        setError(`These credentials do not belong to the selected ${roleLabels[selectedRole]} role. Please check your role and try again.`);
        return;
      }
      login(response.data.token, response.data.user);
    } catch (err) {
      setError(err.response?.data?.error || 'Invalid email or password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#050b0d] px-4 py-10 text-slate-100">
      <div className="pointer-events-none absolute -left-32 top-0 h-96 w-96 rounded-full bg-teal-400/10 blur-[110px]" />
      <div className="pointer-events-none absolute -bottom-40 -right-20 h-96 w-96 rounded-full bg-cyan-500/[0.08] blur-[120px]" />
      <section className="relative w-full max-w-md rounded-[2rem] border border-teal-100/10 bg-[#0a1517]/95 p-7 shadow-2xl shadow-black/40 sm:p-9">
        <Link href="/access" className="mb-9 inline-flex items-center gap-2 text-xs font-semibold text-slate-400 transition hover:text-teal-200">
          <ArrowLeft size={15} /> Change role
        </Link>

        <div className="mb-8 flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-2xl border border-teal-200/25 bg-gradient-to-br from-teal-300 to-teal-700 text-lg font-black text-[#061012]">H</span>
          <div>
            <p className="text-base font-extrabold tracking-[.12em] text-white">HCM <span className="text-teal-300">LITE</span></p>
            <p className="mt-0.5 text-[11px] text-slate-500">People operations, clearly.</p>
          </div>
        </div>

        <p className="mb-3 text-[11px] font-bold uppercase tracking-[.22em] text-teal-300">{selectedRole ? `${selectedRole} access` : 'Secure access'}</p>
        <h1 className="text-4xl font-extrabold tracking-tight text-white">{selectedRole ? `${selectedRole} Login` : 'Sign in'}</h1>
        <p className="mt-3 text-sm leading-6 text-slate-400">Use the email and password provided to you by your company administrator.</p>

        {error && <div role="alert" className="mt-6 rounded-xl border border-rose-400/20 bg-rose-400/10 px-4 py-3 text-xs leading-5 text-rose-200">{error}</div>}

        <form onSubmit={handleSubmit} autoComplete="off" className="mt-7 space-y-5">
          <label className="block">
            <span className="mb-2 block text-xs font-semibold text-slate-300">Email address</span>
            <span className="flex items-center gap-3 rounded-xl border border-white/10 bg-[#071113] px-4 transition focus-within:border-teal-300/60">
              <Mail size={16} className="shrink-0 text-teal-300" />
              <input type="email" name="hcm-login-email" autoComplete="off" required placeholder="Enter your email" value={email} onChange={(event) => setEmail(event.target.value)} className="w-full bg-transparent py-3.5 text-sm text-white outline-none placeholder:text-slate-600" />
            </span>
          </label>
          <label className="block">
            <span className="mb-2 block text-xs font-semibold text-slate-300">Password</span>
            <span className="flex items-center gap-3 rounded-xl border border-white/10 bg-[#071113] px-4 transition focus-within:border-teal-300/60">
              <LockKeyhole size={16} className="shrink-0 text-teal-300" />
              <input type="password" name="hcm-login-password" autoComplete="new-password" required placeholder="Enter your password" value={password} onChange={(event) => setPassword(event.target.value)} className="w-full bg-transparent py-3.5 text-sm text-white outline-none placeholder:text-slate-600" />
            </span>
          </label>
          <button type="submit" disabled={loading || !selectedRole} className="w-full rounded-xl bg-teal-300 px-5 py-3.5 text-sm font-extrabold text-[#061012] transition hover:bg-teal-200 disabled:cursor-not-allowed disabled:opacity-50">
            {loading ? 'Signing in...' : 'Sign in to workspace'}
          </button>
        </form>

        <p className="mt-6 border-t border-white/[0.07] pt-5 text-center text-xs leading-5 text-slate-500">Your company provides your login credentials. Public account registration is disabled.</p>
      </section>
    </main>
  );
}

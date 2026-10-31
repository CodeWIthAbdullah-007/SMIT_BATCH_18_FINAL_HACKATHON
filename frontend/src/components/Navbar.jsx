'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Bell, ChevronDown, Menu, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import API from '../lib/api';

const roleHomes = { Admin: '/admin', HR: '/hr', Employee: '/employee' };
const dashboardNames = { Admin: 'Admin workspace', HR: 'People operations', Employee: 'My workspace' };

export default function Navbar() {
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [unread, setUnread] = useState(0);
  const isAuthPage = ['/login', '/setup', '/change-password'].includes(pathname);

  useEffect(() => {
    if (!user || isAuthPage) return;
    let active = true;
    API.get('/notifications')
      .then(({ data }) => {
        if (active) setUnread(data.filter((item) => !item.readAt).length);
      })
      .catch((error) => console.error('Unable to load notifications:', error));
    return () => { active = false; };
  }, [isAuthPage, pathname, user]);

  return (
    <header className="sticky top-0 z-40 border-b border-teal-300/10 bg-[#071113]/95 backdrop-blur-xl">
      <div className="mx-auto flex h-[72px] max-w-[1440px] items-center justify-between gap-4 px-4 sm:px-6 xl:px-10">
        <Link href={user ? roleHomes[user.role] || '/' : '/'} className="flex min-w-0 items-center gap-3">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl border border-teal-200/30 bg-gradient-to-br from-teal-300 to-teal-700 text-base font-black text-[#061012] shadow-lg shadow-teal-950/40">H</span>
          <span className="min-w-0">
            <span className="block truncate text-sm font-extrabold tracking-[.12em] text-white">HCM <span className="text-teal-300">LITE</span></span>
            {user && <span className="hidden text-[11px] text-slate-400 sm:block">{dashboardNames[user.role] || user.role}</span>}
          </span>
        </Link>

        <div className="flex items-center gap-2 sm:gap-3">
          {user && !isAuthPage && (
            <>
              <span className="hidden max-w-48 truncate rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs font-medium text-slate-300 md:inline">{user.email}</span>
              <button
                onClick={() => window.dispatchEvent(new Event('hcm:open-notifications'))}
                aria-label={`${unread} unread notifications`}
                className="relative grid h-10 w-10 place-items-center rounded-xl text-slate-400 transition hover:bg-teal-300/10 hover:text-teal-200"
              >
                <Bell size={18} />
                {unread > 0 && <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-teal-300 ring-2 ring-[#071113]" />}
              </button>
              <Link href="/change-password" className="hidden items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-semibold text-slate-300 transition hover:bg-white/[0.06] sm:flex">
                Account <ChevronDown size={14} />
              </Link>
              <button onClick={logout} className="hidden rounded-xl border border-white/10 px-3.5 py-2 text-xs font-semibold text-slate-200 transition hover:border-rose-300/30 hover:bg-rose-400/10 hover:text-rose-200 sm:block">
                Sign out
              </button>
              <button onClick={() => setMenuOpen((open) => !open)} aria-label={menuOpen ? 'Close menu' : 'Open menu'} className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 text-slate-300 sm:hidden">
                {menuOpen ? <X size={18} /> : <Menu size={18} />}
              </button>
            </>
          )}
          {!user && !isAuthPage && <Link href="/login" className="rounded-xl bg-teal-300 px-4 py-2.5 text-xs font-bold text-[#061012] shadow-sm transition hover:bg-teal-200">Sign in</Link>}
        </div>
      </div>
      {menuOpen && user && (
        <div className="border-t border-white/10 bg-[#081214] px-4 py-3 shadow-lg sm:hidden">
          <p className="truncate px-3 pb-2 text-xs text-slate-400">{user.email}</p>
          <Link href={roleHomes[user.role] || '/'} onClick={() => setMenuOpen(false)} className="block rounded-xl px-3 py-2.5 text-sm font-medium text-slate-200 hover:bg-white/[0.06]">Dashboard</Link>
          <Link href="/change-password" onClick={() => setMenuOpen(false)} className="block rounded-xl px-3 py-2.5 text-sm font-medium text-slate-200 hover:bg-white/[0.06]">Change password</Link>
          <button onClick={logout} className="mt-1 block w-full rounded-xl px-3 py-2.5 text-left text-sm font-semibold text-rose-300 hover:bg-rose-400/10">Sign out</button>
        </div>
      )}
    </header>
  );
}

'use client';

import { useCallback, useEffect, useState } from 'react';
import { Bell, CheckCheck, Megaphone, Plus, X, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import API from '../lib/api';

export function WorkspaceLayout({ title, description, tabs, activeTab, onTabChange, actions, children }) {
  const { user } = useAuth();
  const [announcements, setAnnouncements] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [noticeOpen, setNoticeOpen] = useState(false);
  const [error, setError] = useState('');

  const loadNotices = useCallback(async () => {
    try {
      const [announcementResponse, notificationResponse] = await Promise.all([
        API.get('/announcements'),
        API.get('/notifications')
      ]);
      setAnnouncements(announcementResponse.data);
      setNotifications(notificationResponse.data);
      setError('');
    } catch (err) {
      setError(err.response?.data?.error || 'Unable to load updates. Refresh the page to try again.');
    }
  }, []);

  useEffect(() => {
    if (user) loadNotices();
  }, [loadNotices, user]);

  useEffect(() => {
    const showNotices = () => setNoticeOpen(true);
    window.addEventListener('hcm:open-notifications', showNotices);
    return () => window.removeEventListener('hcm:open-notifications', showNotices);
  }, []);

  const markRead = async (id) => {
    try {
      const { data } = await API.patch(`/notifications/${id}/read`);
      setNotifications((items) => items.map((item) => item._id === id ? data : item));
    } catch (err) {
      setError(err.response?.data?.error || 'Unable to mark this notification as read.');
    }
  };

  const unreadCount = notifications.filter((item) => !item.readAt).length;

  return (
    <main className="min-h-[calc(100vh-68px)] bg-[#050b0d] text-slate-100">
      <div className="mx-auto max-w-[1440px] space-y-6 px-4 py-6 sm:px-6 sm:py-8 xl:px-10">
        <section className="relative overflow-hidden rounded-[28px] border border-teal-400/20 bg-gradient-to-br from-[#102326] via-[#0b171a] to-[#071012] p-6 shadow-2xl shadow-black/30 sm:p-8">
          <div className="pointer-events-none absolute -right-16 -top-24 h-72 w-72 rounded-full bg-teal-400/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 right-1/3 h-48 w-48 rounded-full bg-cyan-500/10 blur-3xl" />
          <div className="relative flex flex-col justify-between gap-6 xl:flex-row xl:items-end">
            <div className="min-w-0">
              <div className="inline-flex items-center gap-2 rounded-full border border-teal-300/20 bg-teal-300/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[.2em] text-teal-300">
                <span className="h-1.5 w-1.5 rounded-full bg-teal-300 shadow-[0_0_10px_#5eead4]" />
                {user?.role} workspace
              </div>
              <h1 className="mt-4 text-2xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl">{title}</h1>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">{description}</p>
              <div className="mt-5 flex items-center gap-2 text-xs text-teal-200/80"><Sparkles size={14} /> Human Company Management System</div>
            </div>
            <div className="relative flex flex-wrap items-center gap-2">{actions}</div>
          </div>
        </section>

        {error && <div role="alert" className="flex items-start justify-between gap-3 rounded-2xl border border-rose-400/20 bg-rose-500/10 px-4 py-3 text-sm text-rose-200"><span>{error}</span><button onClick={() => setError('')} aria-label="Dismiss error"><X size={16} /></button></div>}

        {announcements.length > 0 && (
          <section className="grid gap-3 md:grid-cols-2 xl:grid-cols-3" aria-label="Company announcements">
            {announcements.slice(0, 3).map((announcement) => (
              <article key={announcement._id} className="rounded-2xl border border-teal-300/15 bg-[#0b191c] p-4 shadow-lg shadow-black/10">
                <p className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[.16em] text-teal-300"><Megaphone size={14} /> Company update</p>
                <h2 className="mt-2 text-sm font-semibold text-white">{announcement.title}</h2>
                <p className="mt-1 line-clamp-2 text-xs leading-5 text-slate-400">{announcement.message}</p>
              </article>
            ))}
          </section>
        )}

        <div className="rounded-2xl border border-white/[0.07] bg-[#0a1416] p-2 shadow-xl shadow-black/20">
          <nav aria-label="Workspace sections" className="flex gap-1.5 overflow-x-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => onTabChange(tab.id)}
                  className={`inline-flex shrink-0 items-center gap-2 rounded-xl px-4 py-3 text-xs font-semibold transition-all duration-200 ${
                    activeTab === tab.id ? 'bg-teal-300 text-[#061012] shadow-lg shadow-teal-950/40' : 'text-slate-400 hover:bg-white/[0.06] hover:text-teal-200'
                  }`}
                >
                  <Icon size={15} /> {tab.label}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="min-w-0">{children}</div>
      </div>

      {noticeOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-sm" onClick={() => setNoticeOpen(false)}>
          <aside role="dialog" aria-modal="true" aria-label="Notifications" onClick={(event) => event.stopPropagation()} className="flex h-full w-full max-w-md flex-col border-l border-teal-300/10 bg-[#081214] shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
              <div><h2 className="font-semibold text-white">Notifications</h2><p className="mt-0.5 text-xs text-slate-400">{unreadCount} unread updates</p></div>
              <div className="flex gap-2">
                <button onClick={loadNotices} aria-label="Refresh notifications" className="grid h-9 w-9 place-items-center rounded-lg text-slate-400 hover:bg-white/10"><CheckCheck size={17} /></button>
                <button onClick={() => setNoticeOpen(false)} aria-label="Close notifications" className="grid h-9 w-9 place-items-center rounded-lg text-slate-400 hover:bg-white/10"><X size={18} /></button>
              </div>
            </div>
            <div className="flex-1 space-y-3 overflow-y-auto p-4">
              {notifications.length === 0 && <p className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-center text-sm text-slate-400">You’re all caught up. New updates will appear here.</p>}
              {notifications.map((notification) => (
                <article key={notification._id} className={`rounded-2xl border p-4 ${notification.readAt ? 'border-white/10 bg-white/[0.02]' : 'border-teal-300/20 bg-teal-300/[0.06]'}`}>
                  <div className="flex items-start gap-3">
                    <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-teal-300/10 text-teal-300"><Bell size={15} /></span>
                    <div className="min-w-0 flex-1"><p className="text-sm leading-5 text-slate-200">{notification.message}</p><p className="mt-1 text-[11px] text-slate-500">{new Date(notification.createdAt).toLocaleString()}</p></div>
                    {!notification.readAt && <button onClick={() => markRead(notification._id)} className="shrink-0 text-[11px] font-semibold text-teal-300 hover:underline">Mark read</button>}
                  </div>
                </article>
              ))}
            </div>
          </aside>
        </div>
      )}
    </main>
  );
}

export function AnnouncementForm({ onPosted }) {
  const [form, setForm] = useState({ title: '', message: '', audience: 'all' });
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [error, setError] = useState('');

  const submit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');
    setFeedback('');
    try {
      await API.post('/announcements', form);
      setForm({ title: '', message: '', audience: 'all' });
      setFeedback('Your announcement has been published.');
      onPosted?.();
    } catch (err) {
      setError(err.response?.data?.error || 'Unable to publish the announcement.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={submit} className="space-y-4 rounded-2xl border border-teal-300/15 bg-[#0b1719] p-5 shadow-xl shadow-black/20 sm:p-6">
      <div><h2 className="font-semibold text-white">Share an update</h2><p className="mt-1 text-xs leading-5 text-slate-400">Post a clear announcement for your team.</p></div>
      <label className="block text-xs font-semibold text-slate-300">Title<input required maxLength={160} value={form.title} onChange={(event) => setForm({ ...form, title: event.target.value })} className="mt-1.5 block w-full rounded-xl border border-white/10 bg-[#071113] px-3 py-2.5 text-sm text-white outline-none focus:border-teal-300 focus:ring-2 focus:ring-teal-300/10" /></label>
      <label className="block text-xs font-semibold text-slate-300">Message<textarea required maxLength={4000} rows={4} value={form.message} onChange={(event) => setForm({ ...form, message: event.target.value })} className="mt-1.5 block w-full resize-y rounded-xl border border-white/10 bg-[#071113] px-3 py-2.5 text-sm text-white outline-none focus:border-teal-300 focus:ring-2 focus:ring-teal-300/10" /></label>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <label className="text-xs font-semibold text-slate-300">Visible to<select value={form.audience} onChange={(event) => setForm({ ...form, audience: event.target.value })} className="ml-2 rounded-lg border border-white/10 bg-[#071113] px-2.5 py-2 text-xs text-white"><option value="all">Everyone</option><option value="HR">HR team</option><option value="Employee">Employees</option></select></label>
        <button disabled={loading} className="inline-flex items-center gap-2 rounded-xl bg-teal-300 px-4 py-2.5 text-xs font-bold text-[#061012] transition hover:bg-teal-200 disabled:opacity-50"><Plus size={15} /> {loading ? 'Publishing…' : 'Publish update'}</button>
      </div>
      {feedback && <p role="status" className="text-xs text-teal-300">{feedback}</p>}
      {error && <p role="alert" className="text-xs text-rose-300">{error}</p>}
    </form>
  );
}

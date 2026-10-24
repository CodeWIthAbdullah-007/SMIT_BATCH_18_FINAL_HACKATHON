
"use client";

import { useState } from "react";

export default function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [type, setType] = useState("General");
  const [filter, setFilter] = useState("All");
  const [notice, setNotice] = useState("");

  const addNotification = (e) => {
    e.preventDefault();

    if (!title.trim() || !message.trim()) {
      setNotice("Please fill in the required fields.");
      return;
    }

    const newNotification = {
      id: Date.now(),
      title: title.trim(),
      message: message.trim(),
      type,
      date: new Date().toLocaleString(),
      read: false,
    };

    setNotifications((previous) => [newNotification, ...previous]);
    setTitle("");
    setMessage("");
    setType("General");
    setNotice("Notification created.");
  };

  const markAsRead = (id) => {
    setNotifications((previous) =>
      previous.map((item) =>
        item.id === id ? { ...item, read: true } : item
      )
    );
  };

  const deleteNotification = (id) => {
    setNotifications((previous) =>
      previous.filter((item) => item.id !== id)
    );
  };

  const filteredNotifications = notifications.filter((item) => {
    if (filter === "Unread") return !item.read;
    if (filter === "Read") return item.read;
    return true;
  });

  const unreadCount = notifications.filter((item) => !item.read).length;

  return (
    <section className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Notifications</h1>
        <p className="mt-1 text-sm text-slate-500">
          Create and manage organization notifications.
        </p>
      </div>

      {notice && (
        <div className="flex justify-between gap-3 rounded-xl border border-slate-200 bg-white p-4 text-sm text-slate-700">
          <p>{notice}</p>
          <button type="button" onClick={() => setNotice("")}>Close</button>
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <p className="text-sm text-slate-500">All Notifications</p>
          <h2 className="mt-2 text-2xl font-bold">{notifications.length}</h2>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <p className="text-sm text-slate-500">Unread</p>
          <h2 className="mt-2 text-2xl font-bold text-amber-600">
            {unreadCount}
          </h2>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <p className="text-sm text-slate-500">Read</p>
          <h2 className="mt-2 text-2xl font-bold text-emerald-600">
            {notifications.length - unreadCount}
          </h2>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
        <h2 className="mb-5 text-lg font-bold">Create Notification</h2>

        <form onSubmit={addNotification} className="space-y-4">
          <div>
            <label className="mb-2 block text-sm font-medium">Title *</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Notification title"
              className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-slate-500"
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">Message *</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Write your notification..."
              rows={3}
              className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-slate-500"
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">Type</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 sm:max-w-sm"
            >
              <option>General</option>
              <option>Attendance</option>
              <option>Leave</option>
              <option>Payroll</option>
              <option>Important</option>
            </select>
          </div>

          <button
            type="submit"
            className="rounded-xl bg-slate-900 px-5 py-3 font-semibold text-white hover:bg-slate-700"
          >
            Create Notification
          </button>
        </form>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-lg font-bold">Notification Center</h2>

          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="rounded-xl border border-slate-200 bg-white px-4 py-3"
          >
            <option>All</option>
            <option>Unread</option>
            <option>Read</option>
          </select>
        </div>

        {filteredNotifications.length === 0 ? (
          <div className="rounded-xl border border-dashed border-slate-300 px-4 py-12 text-center">
            <h3 className="font-semibold text-slate-800">
              No notifications found
            </h3>
            <p className="mt-2 text-sm text-slate-500">
              Create a notification to see it here.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredNotifications.map((item) => (
              <article
                key={item.id}
                className={`rounded-xl border p-4 ${
                  item.read
                    ? "border-slate-200 bg-white"
                    : "border-blue-200 bg-blue-50/50"
                }`}
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-bold text-slate-900">{item.title}</h3>
                      <span className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-700">
                        {item.type}
                      </span>
                      {!item.read && (
                        <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                          Unread
                        </span>
                      )}
                    </div>

                    <p className="mt-3 whitespace-pre-wrap break-words text-sm leading-6 text-slate-600">
                      {item.message}
                    </p>
                    <p className="mt-3 text-xs text-slate-400">{item.date}</p>
                  </div>

                  <div className="flex shrink-0 gap-3">
                    {!item.read && (
                      <button
                        type="button"
                        onClick={() => markAsRead(item.id)}
                        className="text-sm font-semibold text-blue-700"
                      >
                        Mark Read
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => deleteNotification(item.id)}
                      className="text-sm font-semibold text-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

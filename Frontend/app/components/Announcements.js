
"use client";

import { useState } from "react";

export default function Announcements() {
    const [announcements, setAnnouncements] = useState([]);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [audience, setAudience] = useState("Everyone");
    const [search, setSearch] = useState("");
    const [message, setMessage] = useState("");

    const addAnnouncement = (e) => {
        e.preventDefault();

        if (!title.trim() || !content.trim()) {
            setMessage("Please enter a title and announcement message.");
            return;
        }

        const newAnnouncement = {
            id: Date.now(),
            title: title.trim(),
            content: content.trim(),
            audience,
            date: new Date().toLocaleDateString("en-PK", {
                day: "numeric",
                month: "short",
                year: "numeric",
            }),
        };

        setAnnouncements((previous) => [newAnnouncement, ...previous]);
        setTitle("");
        setContent("");
        setAudience("Everyone");
        setMessage("Announcement published successfully.");
    };

    const deleteAnnouncement = (id) => {
        setAnnouncements((previous) =>
            previous.filter((item) => item.id !== id)
        );
        setMessage("Announcement deleted.");
    };

    const filteredAnnouncements = announcements.filter((item) =>
        `${item.title} ${item.content} ${item.audience}`
            .toLowerCase()
            .includes(search.toLowerCase())
    );

    return (
        <section className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-slate-900">
                    Announcements
                </h1>
                <p className="mt-1 text-sm text-slate-500">
                    Share important updates with your organization.
                </p>
            </div>

            {message && (
                <div className="flex items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white p-4 text-sm text-slate-700">
                    <p>{message}</p>
                    <button
                        type="button"
                        onClick={() => setMessage("")}
                        className="font-semibold hover:text-black"
                    >
                        Close
                    </button>
                </div>
            )}

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-slate-200 bg-white p-5">
                    <p className="text-sm text-slate-500">Total Announcements</p>
                    <h2 className="mt-2 text-2xl font-bold text-slate-900">
                        {announcements.length}
                    </h2>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-5">
                    <p className="text-sm text-slate-500">Latest Announcement</p>
                    <h2 className="mt-2 text-lg font-bold text-slate-900">
                        {announcements.length > 0
                            ? announcements[0].date
                            : "Nothing published"}
                    </h2>
                </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
                <h2 className="mb-5 text-lg font-bold text-slate-900">
                    Create Announcement
                </h2>

                <form onSubmit={addAnnouncement} className="space-y-4">
                    <div>
                        <label className="mb-2 block text-sm font-medium text-slate-700">
                            Announcement Title *
                        </label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Enter a clear title"
                            className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-slate-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium text-slate-700">
                            Message *
                        </label>
                        <textarea
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder="Write your announcement..."
                            rows={5}
                            className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-slate-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium text-slate-700">
                            Audience
                        </label>
                        <select
                            value={audience}
                            onChange={(e) => setAudience(e.target.value)}
                            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-slate-500 sm:max-w-sm"
                        >
                            <option value="Everyone">Everyone</option>
                            <option value="HR">HR</option>
                            <option value="Employees">Employees</option>
                            <option value="Admin">Admin</option>
                        </select>
                    </div>

                    <button
                        type="submit"
                        className="rounded-xl bg-slate-900 px-5 py-3 font-semibold text-white transition hover:bg-slate-700"
                    >
                        Publish Announcement
                    </button>
                </form>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
                <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <h2 className="text-lg font-bold text-slate-900">
                        Published Announcements
                    </h2>
                    <input
                        type="search"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search announcements..."
                        className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-slate-500 sm:max-w-xs"
                    />
                </div>

                {filteredAnnouncements.length === 0 ? (
                    <div className="rounded-xl border border-dashed border-slate-300 px-4 py-12 text-center">
                        <h3 className="font-semibold text-slate-800">
                            {announcements.length === 0
                                ? "No announcements yet"
                                : "No matching announcements"}
                        </h3>
                        <p className="mt-2 text-sm text-slate-500">
                            Create an announcement to share an update.
                        </p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {filteredAnnouncements.map((item) => (
                            <article
                                key={item.id}
                                className="rounded-xl border border-slate-200 p-5"
                            >
                                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                                    <div className="min-w-0">
                                        <h3 className="break-words text-lg font-bold text-slate-900">
                                            {item.title}
                                        </h3>

                                        <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-slate-500">
                                            <span>{item.date}</span>
                                            <span className="rounded-full bg-slate-100 px-3 py-1 font-medium text-slate-700">
                                                {item.audience}
                                            </span>
                                        </div>
                                    </div>

                                    <button
                                        type="button"
                                        onClick={() => deleteAnnouncement(item.id)}
                                        className="self-start rounded-lg border border-red-200 px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50"
                                    >
                                        Delete
                                    </button>
                                </div>

                                <p className="mt-4 whitespace-pre-wrap break-words text-sm leading-7 text-slate-600">
                                    {item.content}
                                </p>
                            </article>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}

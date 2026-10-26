"use client";

import { useState } from "react";

export default function AuditLogs() {
    const [search, setSearch] = useState("");
    const [actionFilter, setActionFilter] = useState("All");

    const logs = [];

    const filteredLogs = logs.filter((log) => {
        const matchesSearch = `${log.user} ${log.action} ${log.details}`
            .toLowerCase()
            .includes(search.toLowerCase());

        const matchesAction =
            actionFilter === "All" || log.action === actionFilter;

        return matchesSearch && matchesAction;
    });

    const totalUsers = new Set(logs.map((log) => log.user)).size;
    const totalActions = new Set(logs.map((log) => log.action)).size;

    const stats = [
        {
            label: "Total activities",
            value: logs.length,
            icon: "↗",
            color: "bg-violet-50 text-violet-600",
        },
        {
            label: "Action types",
            value: totalActions,
            icon: "◈",
            color: "bg-blue-50 text-blue-600",
        },
        {
            label: "Active users recorded",
            value: totalUsers,
            icon: "◎",
            color: "bg-emerald-50 text-emerald-600",
        },
    ];

    return (
        <section className="min-h-full space-y-6 bg-slate-50/60 p-4 sm:p-6 lg:p-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-violet-600">
                        <span className="h-2 w-2 rounded-full bg-violet-500" />
                        Workspace / Security
                    </div>

                    <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                        Audit Logs
                    </h1>

                    <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
                        Track important actions and maintain visibility across your
                        organization.
                    </p>
                </div>

                <div className="flex w-fit items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-600 shadow-sm">
                    <span className="h-2 w-2 rounded-full bg-amber-400" />
                    {loading ? "Loading audit logs" : loadError ? "Unable to load data" : "Connected to backend"}
                </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {stats.map((stat) => (
                    <div
                        key={stat.label}
                        className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition-shadow hover:shadow-md sm:p-6"
                    >
                        <div className="flex items-start justify-between gap-3">
                            <div>
                                <p className="text-sm font-medium text-slate-500">
                                    {stat.label}
                                </p>
                                <p className="mt-3 text-3xl font-bold tracking-tight text-slate-900">
                                    {stat.value}
                                </p>
                            </div>

                            <div
                                className={`flex h-11 w-11 items-center justify-center rounded-xl text-xl ${stat.color}`}
                            >
                                {stat.icon}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">
                <div className="border-b border-slate-100 p-5 sm:p-6">
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <h2 className="text-lg font-bold text-slate-900">
                                Activity history
                            </h2>
                            <p className="mt-1 text-sm text-slate-500">
                                {loadError || (loading ? "Loading recorded actions..." : "Review recorded actions, users and timestamps.")}
                            </p>
                        </div>

                        <span className="w-fit rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-600">
                            {filteredLogs.length} records
                        </span>
                    </div>

                    <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-[1fr_210px]">
                        <div className="relative">
                            <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-lg text-slate-400">
                                ⌕
                            </span>

                            <input
                                type="search"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search users or activities..."
                                className="w-full rounded-xl border border-slate-200 bg-slate-50/50 py-3 pl-10 pr-4 text-sm text-slate-800 outline-none transition focus:border-violet-400 focus:bg-white focus:ring-4 focus:ring-violet-500/10"
                            />
                        </div>

                        <select
                            value={actionFilter}
                            onChange={(e) => setActionFilter(e.target.value)}
                            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-violet-400 focus:ring-4 focus:ring-violet-500/10"
                        >
                            <option value="All">All actions</option>
                            <option value="Create">Create</option>
                            <option value="Update">Update</option>
                            <option value="Delete">Delete</option>
                            <option value="Login">Login</option>
                            <option value="Approve">Approve</option>
                        </select>
                    </div>
                </div>

                {filteredLogs.length === 0 ? (
                    <div className="px-5 py-12 sm:px-8 sm:py-16">
                        <div className="mx-auto flex max-w-md flex-col items-center text-center">
                            <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-violet-100 bg-violet-50 text-violet-600">
                                <svg
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.6"
                                    className="h-8 w-8"
                                    aria-hidden="true"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M8 6h12M8 12h12M8 18h12M4 6h.01M4 12h.01M4 18h.01"
                                    />
                                </svg>
                            </div>

                            <h3 className="mt-5 text-lg font-bold text-slate-900">
                                {search || actionFilter !== "All"
                                    ? "No matching activities"
                                    : "Your activity history starts here"}
                            </h3>

                            <p className="mt-2 text-sm leading-6 text-slate-500">
                                {search || actionFilter !== "All"
                                    ? "Try changing your search or selecting a different action filter."
                                    : "Once your backend records real organization activities, they will appear here. No sample records are displayed."}
                            </p>

                            {(search || actionFilter !== "All") && (
                                <button
                                    type="button"
                                    onClick={() => {
                                        setSearch("");
                                        setActionFilter("All");
                                    }}
                                    className="mt-5 rounded-xl bg-violet-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-violet-700 focus:outline-none focus:ring-4 focus:ring-violet-500/20"
                                >
                                    Clear filters
                                </button>
                            )}
                        </div>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[700px] text-left text-sm">
                            <thead className="bg-slate-50">
                                <tr className="border-y border-slate-100 text-xs uppercase tracking-wider text-slate-500">
                                    <th className="px-5 py-4 font-semibold">User</th>
                                    <th className="px-5 py-4 font-semibold">Action</th>
                                    <th className="px-5 py-4 font-semibold">Details</th>
                                    <th className="px-5 py-4 font-semibold">Date &amp; time</th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-slate-100">
                                {filteredLogs.map((log) => (
                                    <tr
                                        key={log.id}
                                        className="transition hover:bg-slate-50/80"
                                    >
                                        <td className="px-5 py-4 font-medium text-slate-900">
                                            {log.user}
                                        </td>

                                        <td className="px-5 py-4">
                                            <span className="inline-flex rounded-lg bg-violet-50 px-2.5 py-1.5 text-xs font-semibold text-violet-700">
                                                {log.action}
                                            </span>
                                        </td>

                                        <td className="px-5 py-4 text-slate-600">
                                            {log.details}
                                        </td>

                                        <td className="whitespace-nowrap px-5 py-4 text-slate-500">
                                            {new Date(log.createdAt).toLocaleString("en-PK", {
                                                day: "2-digit",
                                                month: "short",
                                                year: "numeric",
                                                hour: "2-digit",
                                                minute: "2-digit",
                                            })}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                <div className="flex flex-col gap-2 border-t border-slate-100 bg-slate-50/60 px-5 py-4 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
                    <span>HCM Lite · Organization activity monitoring</span>
                    <span>Records appear when the audit API is connected.</span>
                </div>
            </div>
        </section>
    );
}

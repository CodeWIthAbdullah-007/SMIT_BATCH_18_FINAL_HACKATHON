
"use client";

import { useState } from "react";

export default function DashboardAnalytics() {
    const [period, setPeriod] = useState("This Month");

    const stats = [
        { title: "Total Employees", value: "—", detail: "Employee records" },
        { title: "Present Today", value: "—", detail: "Attendance records" },
        { title: "Pending Leaves", value: "—", detail: "Awaiting approval" },
        { title: "Payroll Processed", value: "—", detail: "Payment records" },
    ];

    return (
        <section className="space-y-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">
                        Dashboard Analytics
                    </h1>
                    <p className="mt-1 text-sm text-slate-500">
                        Understand your organization's HR activity.
                    </p>
                </div>

                <select
                    value={period}
                    onChange={(e) => setPeriod(e.target.value)}
                    className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm"
                >
                    <option>This Month</option>
                    <option>Last Month</option>
                    <option>This Year</option>
                </select>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {stats.map((stat) => (
                    <div
                        key={stat.title}
                        className="rounded-2xl border border-slate-200 bg-white p-5"
                    >
                        <p className="text-sm text-slate-500">{stat.title}</p>
                        <h2 className="mt-3 text-3xl font-bold text-slate-900">
                            {stat.value}
                        </h2>
                        <p className="mt-2 text-xs text-slate-400">{stat.detail}</p>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
                <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
                    <h2 className="text-lg font-bold text-slate-900">
                        Attendance Overview
                    </h2>
                    <p className="mt-1 text-sm text-slate-500">
                        {period} attendance summary
                    </p>

                    <div className="mt-6 flex min-h-48 flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 p-5 text-center">
                        <h3 className="font-semibold text-slate-800">
                            No attendance data available
                        </h3>
                        <p className="mt-2 max-w-sm text-sm leading-6 text-slate-500">
                            Attendance charts will appear when real attendance records
                            are connected.
                        </p>
                    </div>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
                    <h2 className="text-lg font-bold text-slate-900">
                        Leave Overview
                    </h2>
                    <p className="mt-1 text-sm text-slate-500">
                        Leave requests and approvals
                    </p>

                    <div className="mt-6 flex min-h-48 flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 p-5 text-center">
                        <h3 className="font-semibold text-slate-800">
                            No leave data available
                        </h3>
                        <p className="mt-2 max-w-sm text-sm leading-6 text-slate-500">
                            Leave statistics will appear after connecting actual
                            leave records from the backend.
                        </p>
                    </div>
                </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
                <h2 className="text-lg font-bold text-slate-900">
                    Reports Summary
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                    Review the information available for your organization.
                </p>

                <div className="mt-5 divide-y divide-slate-100">
                    {[
                        ["Employee Report", "Employee directory and department details"],
                        ["Attendance Report", "Daily check-in and check-out records"],
                        ["Leave Report", "Leave requests and approval status"],
                        ["Payroll Report", "Salary and payment records"],
                    ].map(([title, description]) => (
                        <div
                            key={title}
                            className="flex flex-col gap-1 py-4 sm:flex-row sm:items-center sm:justify-between"
                        >
                            <h3 className="font-semibold text-slate-800">{title}</h3>
                            <p className="text-sm text-slate-500">{description}</p>
                        </div>
                    ))}
                </div>

                <p className="mt-4 rounded-xl bg-slate-50 p-4 text-sm leading-6 text-slate-600">
                    Reports are currently a preview. Actual totals, charts and
                    downloadable reports require backend data.
                </p>
            </div>
        </section>
    );
}

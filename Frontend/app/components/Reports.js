
"use client";

import { useState } from "react";

export default function Reports() {
    const [reportType, setReportType] = useState("Employees");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [notice, setNotice] = useState("");

    const reportOptions = [
        {
            name: "Employees",
            description: "Employee directory and department information.",
        },
        {
            name: "Attendance",
            description: "Attendance records, working hours and late arrivals.",
        },
        {
            name: "Leave",
            description: "Leave applications and approval records.",
        },
        {
            name: "Payroll",
            description: "Salary calculations and payment status.",
        },
    ];

    const generateReport = (e) => {
        e.preventDefault();

        if (startDate && endDate && startDate > endDate) {
            setNotice("Start date cannot be after the end date.");
            return;
        }

        setNotice(
            `${reportType} report cannot be generated yet. Connect the backend report API first.`
        );
    };

    return (
        <section className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-slate-900">Reports</h1>
                <p className="mt-1 text-sm text-slate-500">
                    Prepare HR reports for your organization.
                </p>
            </div>

            {notice && (
                <div
                    role="status"
                    className="flex items-start justify-between gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-800"
                >
                    <p>{notice}</p>
                    <button
                        type="button"
                        onClick={() => setNotice("")}
                        className="font-semibold"
                    >
                        Close
                    </button>
                </div>
            )}

            <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
                <h2 className="text-lg font-bold text-slate-900">
                    Generate a Report
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                    Choose a report and optionally set a date range.
                </p>

                <form onSubmit={generateReport} className="mt-6 space-y-5">
                    <div>
                        <label
                            htmlFor="report-type"
                            className="mb-2 block text-sm font-medium text-slate-700"
                        >
                            Report Type
                        </label>
                        <select
                            id="report-type"
                            value={reportType}
                            onChange={(e) => setReportType(e.target.value)}
                            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-slate-500"
                        >
                            {reportOptions.map((option) => (
                                <option key={option.name} value={option.name}>
                                    {option.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div>
                            <label
                                htmlFor="start-date"
                                className="mb-2 block text-sm font-medium text-slate-700"
                            >
                                Start Date
                            </label>
                            <input
                                id="start-date"
                                type="date"
                                value={startDate}
                                max={endDate || undefined}
                                onChange={(e) => setStartDate(e.target.value)}
                                className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-slate-500"
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="end-date"
                                className="mb-2 block text-sm font-medium text-slate-700"
                            >
                                End Date
                            </label>
                            <input
                                id="end-date"
                                type="date"
                                value={endDate}
                                min={startDate || undefined}
                                onChange={(e) => setEndDate(e.target.value)}
                                className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-slate-500"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full rounded-xl bg-slate-900 px-5 py-3 font-semibold text-white transition hover:bg-slate-700 sm:w-auto"
                    >
                        Prepare Report
                    </button>
                </form>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
                <h2 className="text-lg font-bold text-slate-900">
                    Available Reports
                </h2>

                <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {reportOptions.map((report) => (
                        <button
                            key={report.name}
                            type="button"
                            onClick={() => {
                                setReportType(report.name);
                                setNotice("");
                            }}
                            className={`rounded-xl border p-5 text-left transition ${reportType === report.name
                                    ? "border-slate-900 bg-slate-50"
                                    : "border-slate-200 hover:border-slate-400"
                                }`}
                        >
                            <h3 className="font-bold text-slate-900">{report.name}</h3>
                            <p className="mt-2 text-sm leading-6 text-slate-500">
                                {report.description}
                            </p>
                            <p className="mt-4 text-sm font-semibold text-slate-700">
                                {reportType === report.name ? "Selected" : "Select report"}
                            </p>
                        </button>
                    ))}
                </div>
            </div>
        </section>
    );
}

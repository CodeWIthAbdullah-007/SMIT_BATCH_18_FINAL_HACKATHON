
"use client";

import { useState } from "react";

function getToday() {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
}

function getCurrentTime() {
    return new Date().toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
    });
}

function getAttendanceStatus(checkIn, checkOut) {
    if (!checkIn) return "Absent";

    if (checkOut) {
        const [inHour, inMinute] = checkIn.split(":").map(Number);
        const [outHour, outMinute] = checkOut.split(":").map(Number);

        const workedMinutes =
            outHour * 60 + outMinute - (inHour * 60 + inMinute);

        if (workedMinutes < 300) return "Half Day";
    }

    return checkIn > "09:15" ? "Late" : "Present";
}

function getWorkingHours(checkIn, checkOut) {
    if (!checkIn || !checkOut) return "In progress";

    const [inHour, inMinute] = checkIn.split(":").map(Number);
    const [outHour, outMinute] = checkOut.split(":").map(Number);

    const totalMinutes =
        outHour * 60 + outMinute - (inHour * 60 + inMinute);

    if (totalMinutes < 0) return "Invalid time";

    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    return `${hours}h ${minutes}m`;
}

export default function Attendance() {
    const [records, setRecords] = useState([]);
    const [employeeName, setEmployeeName] = useState("");
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");
    const [notice, setNotice] = useState("");

    const today = getToday();
    const todayRecords = records.filter((record) => record.date === today);

    const presentCount = todayRecords.filter(
        (record) => getAttendanceStatus(record.checkIn, record.checkOut) === "Present"
    ).length;

    const lateCount = todayRecords.filter(
        (record) => getAttendanceStatus(record.checkIn, record.checkOut) === "Late"
    ).length;

    const halfDayCount = todayRecords.filter(
        (record) =>
            getAttendanceStatus(record.checkIn, record.checkOut) === "Half Day"
    ).length;

    const filteredRecords = records.filter((record) => {
        const matchesSearch = record.name
            .toLowerCase()
            .includes(search.toLowerCase());

        const status = getAttendanceStatus(record.checkIn, record.checkOut);
        const matchesStatus = statusFilter === "All" || status === statusFilter;

        return matchesSearch && matchesStatus;
    });

    function showNotice(message) {
        setNotice(message);
    }

    function handleCheckIn(event) {
        event.preventDefault();

        const name = employeeName.trim();

        if (!name) {
            showNotice("Please enter the employee's name first.");
            return;
        }

        const alreadyCheckedIn = todayRecords.some(
            (record) => record.name.toLowerCase() === name.toLowerCase()
        );

        if (alreadyCheckedIn) {
            showNotice("This employee already has an attendance record for today.");
            return;
        }

        const newRecord = {
            id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
            name,
            date: today,
            checkIn: getCurrentTime(),
            checkOut: "",
        };

        setRecords((currentRecords) => [newRecord, ...currentRecords]);
        setEmployeeName("");
        showNotice(`${name} has been checked in.`);
    }

    function handleCheckOut(recordId) {
        const record = records.find((item) => item.id === recordId);

        if (!record || record.checkOut) {
            showNotice("This employee has already checked out.");
            return;
        }

        const checkOutTime = getCurrentTime();

        setRecords((currentRecords) =>
            currentRecords.map((item) =>
                item.id === recordId
                    ? { ...item, checkOut: checkOutTime }
                    : item
            )
        );

        showNotice(`${record.name} has been checked out.`);
    }

    function formatDate(date) {
        return new Date(`${date}T12:00:00`).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "short",
            year: "numeric",
        });
    }

    function getStatusStyle(status) {
        if (status === "Present") return "bg-emerald-50 text-emerald-700";
        if (status === "Late") return "bg-amber-50 text-amber-700";
        if (status === "Half Day") return "bg-orange-50 text-orange-700";

        return "bg-slate-100 text-slate-600";
    }

    return (
        <section className="space-y-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-violet-600">
                        People operations
                    </p>
                    <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                        Attendance management
                    </h2>
                    <p className="mt-2 text-sm leading-6 text-slate-500">
                        Record daily check-ins, check-outs and working hours.
                    </p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3">
                    <p className="text-xs font-medium text-slate-500">Today's date</p>
                    <p className="mt-1 font-semibold text-slate-800">
                        {formatDate(today)}
                    </p>
                </div>
            </div>

            {notice && (
                <div
                    role="status"
                    className="flex items-start justify-between gap-3 rounded-xl border border-violet-100 bg-violet-50 px-4 py-3 text-sm text-violet-800"
                >
                    <span>{notice}</span>
                    <button
                        type="button"
                        onClick={() => setNotice("")}
                        className="font-semibold"
                        aria-label="Dismiss message"
                    >
                        ×
                    </button>
                </div>
            )}

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <article className="rounded-2xl border border-slate-200 bg-white p-5">
                    <p className="text-sm text-slate-500">Today's records</p>
                    <p className="mt-3 text-3xl font-bold text-slate-900">
                        {todayRecords.length}
                    </p>
                    <p className="mt-2 text-xs text-slate-400">
                        Employees checked in today
                    </p>
                </article>

                <article className="rounded-2xl border border-slate-200 bg-white p-5">
                    <p className="text-sm text-slate-500">Present</p>
                    <p className="mt-3 text-3xl font-bold text-emerald-600">
                        {presentCount}
                    </p>
                    <p className="mt-2 text-xs text-slate-400">
                        Checked in by 9:15 AM
                    </p>
                </article>

                <article className="rounded-2xl border border-slate-200 bg-white p-5">
                    <p className="text-sm text-slate-500">Late arrivals</p>
                    <p className="mt-3 text-3xl font-bold text-amber-600">
                        {lateCount}
                    </p>
                    <p className="mt-2 text-xs text-slate-400">
                        Checked in after the grace period
                    </p>
                </article>

                <article className="rounded-2xl border border-slate-200 bg-white p-5">
                    <p className="text-sm text-slate-500">Half days</p>
                    <p className="mt-3 text-3xl font-bold text-orange-600">
                        {halfDayCount}
                    </p>
                    <p className="mt-2 text-xs text-slate-400">
                        Less than five hours worked
                    </p>
                </article>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
                <div className="mb-5">
                    <h3 className="text-lg font-semibold text-slate-900">
                        Record attendance
                    </h3>
                    <p className="mt-1 text-sm text-slate-500">
                        Enter an employee's name to record their check-in.
                    </p>
                </div>

                <form
                    onSubmit={handleCheckIn}
                    className="flex flex-col gap-3 sm:flex-row"
                >
                    <input
                        type="text"
                        value={employeeName}
                        onChange={(event) => setEmployeeName(event.target.value)}
                        placeholder="Enter employee name"
                        className="min-h-12 min-w-0 flex-1 rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-800 outline-none transition focus:border-violet-400 focus:bg-white focus:ring-4 focus:ring-violet-100"
                    />

                    <button
                        type="submit"
                        className="min-h-12 rounded-xl bg-violet-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-violet-700 focus:outline-none focus:ring-4 focus:ring-violet-200"
                    >
                        Check in employee
                    </button>
                </form>

                <p className="mt-3 text-xs leading-5 text-slate-400">
                    Office starts at 9:00 AM, with a 15-minute grace period. Attendance
                    is currently stored in this page's temporary state.
                </p>
            </div>

            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
                <div className="flex flex-col gap-4 border-b border-slate-100 p-5 sm:p-6 lg:flex-row lg:items-center lg:justify-between">
                    <div>
                        <h3 className="text-lg font-semibold text-slate-900">
                            Attendance records
                        </h3>
                        <p className="mt-1 text-sm text-slate-500">
                            Review check-in times, working hours and daily status.
                        </p>
                    </div>

                    <div className="flex flex-col gap-3 sm:flex-row">
                        <input
                            type="search"
                            value={search}
                            onChange={(event) => setSearch(event.target.value)}
                            placeholder="Search employee..."
                            className="min-h-11 min-w-0 rounded-xl border border-slate-200 px-3 text-sm outline-none focus:border-violet-400 focus:ring-4 focus:ring-violet-100 sm:w-52"
                        />

                        <select
                            value={statusFilter}
                            onChange={(event) => setStatusFilter(event.target.value)}
                            className="min-h-11 rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none focus:border-violet-400 focus:ring-4 focus:ring-violet-100"
                        >
                            <option value="All">All statuses</option>
                            <option value="Present">Present</option>
                            <option value="Late">Late</option>
                            <option value="Half Day">Half Day</option>
                        </select>
                    </div>
                </div>

                {filteredRecords.length === 0 ? (
                    <div className="px-5 py-14 text-center sm:px-8">
                        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-50 text-2xl text-violet-600">
                            ◷
                        </div>
                        <h4 className="mt-4 font-semibold text-slate-900">
                            No attendance records found
                        </h4>
                        <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
                            Check in an employee to create the first record. You can also
                            change your search or status filter.
                        </p>
                    </div>
                ) : (
                    <>
                        <div className="hidden overflow-x-auto md:block">
                            <table className="w-full text-left">
                                <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                                    <tr>
                                        <th className="px-6 py-4 font-semibold">Employee</th>
                                        <th className="px-6 py-4 font-semibold">Date</th>
                                        <th className="px-6 py-4 font-semibold">Check in</th>
                                        <th className="px-6 py-4 font-semibold">Check out</th>
                                        <th className="px-6 py-4 font-semibold">Hours</th>
                                        <th className="px-6 py-4 font-semibold">Status</th>
                                        <th className="px-6 py-4 text-right font-semibold">Action</th>
                                    </tr>
                                </thead>

                                <tbody className="divide-y divide-slate-100">
                                    {filteredRecords.map((record) => {
                                        const status = getAttendanceStatus(
                                            record.checkIn,
                                            record.checkOut
                                        );

                                        return (
                                            <tr key={record.id} className="transition hover:bg-slate-50/70">
                                                <td className="px-6 py-4">
                                                    <span className="font-medium text-slate-800">
                                                        {record.name}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-sm text-slate-500">
                                                    {formatDate(record.date)}
                                                </td>
                                                <td className="px-6 py-4 text-sm text-slate-700">
                                                    {record.checkIn}
                                                </td>
                                                <td className="px-6 py-4 text-sm text-slate-700">
                                                    {record.checkOut || "—"}
                                                </td>
                                                <td className="px-6 py-4 text-sm text-slate-700">
                                                    {getWorkingHours(record.checkIn, record.checkOut)}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span
                                                        className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${getStatusStyle(status)}`}
                                                    >
                                                        {status}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    {!record.checkOut && record.date === today ? (
                                                        <button
                                                            type="button"
                                                            onClick={() => handleCheckOut(record.id)}
                                                            className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700 transition hover:border-violet-300 hover:bg-violet-50 hover:text-violet-700"
                                                        >
                                                            Check out
                                                        </button>
                                                    ) : (
                                                        <span className="text-xs text-slate-400">
                                                            {record.checkOut ? "Completed" : "View only"}
                                                        </span>
                                                    )}
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>

                        <div className="space-y-3 p-4 md:hidden">
                            {filteredRecords.map((record) => {
                                const status = getAttendanceStatus(
                                    record.checkIn,
                                    record.checkOut
                                );

                                return (
                                    <article
                                        key={record.id}
                                        className="rounded-xl border border-slate-200 p-4"
                                    >
                                        <div className="flex items-start justify-between gap-3">
                                            <div>
                                                <h4 className="font-semibold text-slate-900">
                                                    {record.name}
                                                </h4>
                                                <p className="mt-1 text-xs text-slate-500">
                                                    {formatDate(record.date)}
                                                </p>
                                            </div>
                                            <span
                                                className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${getStatusStyle(status)}`}
                                            >
                                                {status}
                                            </span>
                                        </div>

                                        <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                                            <div>
                                                <p className="text-xs text-slate-400">Check in</p>
                                                <p className="mt-1 font-medium text-slate-700">
                                                    {record.checkIn}
                                                </p>
                                            </div>
                                            <div>
                                                <p className="text-xs text-slate-400">Check out</p>
                                                <p className="mt-1 font-medium text-slate-700">
                                                    {record.checkOut || "Not checked out"}
                                                </p>
                                            </div>
                                            <div className="col-span-2">
                                                <p className="text-xs text-slate-400">Working hours</p>
                                                <p className="mt-1 font-medium text-slate-700">
                                                    {getWorkingHours(record.checkIn, record.checkOut)}
                                                </p>
                                            </div>
                                        </div>

                                        {!record.checkOut && record.date === today && (
                                            <button
                                                type="button"
                                                onClick={() => handleCheckOut(record.id)}
                                                className="mt-4 w-full rounded-xl bg-violet-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-violet-700"
                                            >
                                                Check out
                                            </button>
                                        )}
                                    </article>
                                );
                            })}
                        </div>
                    </>
                )}
            </div>

            <p className="text-xs leading-5 text-slate-400">
                Saturday and Sunday are configured as non-working days in the project
                rules. This frontend demo does not yet enforce weekends or verify
                employees against the employee directory.
            </p>
        </section>
    );
}
 
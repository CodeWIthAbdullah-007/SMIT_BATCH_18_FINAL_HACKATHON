
"use client";

import { useState } from "react";

const leaveTypes = [
  { name: "Annual Leave", limit: 14 },
  { name: "Sick Leave", limit: 8 },
  { name: "Casual Leave", limit: 10 },
  { name: "Unpaid Leave", limit: null },
];

export default function LeaveManagement() {
  const [requests, setRequests] = useState([]);
  const [employeeName, setEmployeeName] = useState("");
  const [leaveType, setLeaveType] = useState("Annual Leave");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [reason, setReason] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [notice, setNotice] = useState("");

  function calculateDays(start, end) {
    if (!start || !end || end < start) return 0;

    const firstDay = new Date(`${start}T12:00:00`);
    const lastDay = new Date(`${end}T12:00:00`);
    const difference = lastDay.getTime() - firstDay.getTime();

    return Math.floor(difference / 86400000) + 1;
  }

  const requestedDays = calculateDays(startDate, endDate);

  const filteredRequests = requests.filter(
    (request) =>
      statusFilter === "All" || request.status === statusFilter
  );

  function submitRequest(event) {
    event.preventDefault();

    const name = employeeName.trim();

    if (!name || !startDate || !endDate || !reason.trim()) {
      setNotice("Please complete all fields before submitting.");
      return;
    }

    if (endDate < startDate) {
      setNotice("The end date cannot be earlier than the start date.");
      return;
    }

    const hasOverlap = requests.some(
      (request) =>
        request.name.toLowerCase() === name.toLowerCase() &&
        request.status !== "Rejected" &&
        startDate <= request.endDate &&
        endDate >= request.startDate
    );

    if (hasOverlap) {
      setNotice("This employee already has a request for overlapping dates.");
      return;
    }

    const newRequest = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      name,
      leaveType,
      startDate,
      endDate,
      days: requestedDays,
      reason: reason.trim(),
      status: "Pending",
    };

    setRequests((currentRequests) => [
      newRequest,
      ...currentRequests,
    ]);

    setEmployeeName("");
    setLeaveType("Annual Leave");
    setStartDate("");
    setEndDate("");
    setReason("");
    setNotice("Leave request submitted successfully.");
  }

  function updateStatus(id, status) {
    setRequests((currentRequests) =>
      currentRequests.map((request) =>
        request.id === id ? { ...request, status } : request
      )
    );

    setNotice(`Leave request ${status.toLowerCase()}.`);
  }

  function formatDate(date) {
    return new Date(`${date}T12:00:00`).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  }

  function statusStyle(status) {
    if (status === "Approved") return "bg-emerald-50 text-emerald-700";
    if (status === "Rejected") return "bg-rose-50 text-rose-700";

    return "bg-amber-50 text-amber-700";
  }

  const pendingCount = requests.filter(
    (request) => request.status === "Pending"
  ).length;

  const approvedCount = requests.filter(
    (request) => request.status === "Approved"
  ).length;

  const rejectedCount = requests.filter(
    (request) => request.status === "Rejected"
  ).length;

  return (
    <section className="space-y-6">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-violet-600">
          People operations
        </p>
        <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
          Leave management
        </h2>
        <p className="mt-2 text-sm leading-6 text-slate-500">
          Submit leave requests and manage approval decisions.
        </p>
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
            aria-label="Dismiss message"
            className="font-semibold"
          >
            ×
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <article className="rounded-2xl border border-slate-200 bg-white p-5">
          <p className="text-sm text-slate-500">Pending requests</p>
          <p className="mt-3 text-3xl font-bold text-amber-600">
            {pendingCount}
          </p>
        </article>

        <article className="rounded-2xl border border-slate-200 bg-white p-5">
          <p className="text-sm text-slate-500">Approved requests</p>
          <p className="mt-3 text-3xl font-bold text-emerald-600">
            {approvedCount}
          </p>
        </article>

        <article className="rounded-2xl border border-slate-200 bg-white p-5">
          <p className="text-sm text-slate-500">Rejected requests</p>
          <p className="mt-3 text-3xl font-bold text-rose-600">
            {rejectedCount}
          </p>
        </article>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
        <h3 className="text-lg font-semibold text-slate-900">
          New leave request
        </h3>
        <p className="mt-1 text-sm text-slate-500">
          Enter the employee and leave details below.
        </p>

        <form onSubmit={submitRequest} className="mt-5 space-y-5">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <label className="block text-sm font-medium text-slate-700">
              Employee name
              <input
                required
                value={employeeName}
                onChange={(event) => setEmployeeName(event.target.value)}
                placeholder="Enter employee name"
                className="mt-2 min-h-11 w-full rounded-xl border border-slate-200 px-3 font-normal outline-none focus:border-violet-400 focus:ring-4 focus:ring-violet-100"
              />
            </label>

            <label className="block text-sm font-medium text-slate-700">
              Leave type
              <select
                value={leaveType}
                onChange={(event) => setLeaveType(event.target.value)}
                className="mt-2 min-h-11 w-full rounded-xl border border-slate-200 bg-white px-3 font-normal outline-none focus:border-violet-400 focus:ring-4 focus:ring-violet-100"
              >
                {leaveTypes.map((type) => (
                  <option key={type.name} value={type.name}>
                    {type.name}
                  </option>
                ))}
              </select>
            </label>

            <label className="block text-sm font-medium text-slate-700">
              Start date
              <input
                required
                type="date"
                min={new Date().toLocaleDateString("en-CA")}
                value={startDate}
                onChange={(event) => setStartDate(event.target.value)}
                className="mt-2 min-h-11 w-full rounded-xl border border-slate-200 px-3 font-normal outline-none focus:border-violet-400 focus:ring-4 focus:ring-violet-100"
              />
            </label>

            <label className="block text-sm font-medium text-slate-700">
              End date
              <input
                required
                type="date"
                min={startDate || new Date().toLocaleDateString("en-CA")}
                value={endDate}
                onChange={(event) => setEndDate(event.target.value)}
                className="mt-2 min-h-11 w-full rounded-xl border border-slate-200 px-3 font-normal outline-none focus:border-violet-400 focus:ring-4 focus:ring-violet-100"
              />
            </label>
          </div>

          <label className="block text-sm font-medium text-slate-700">
            Reason for leave
            <textarea
              required
              rows={3}
              value={reason}
              onChange={(event) => setReason(event.target.value)}
              placeholder="Briefly explain the reason for leave"
              className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-3 font-normal outline-none focus:border-violet-400 focus:ring-4 focus:ring-violet-100"
            />
          </label>

          <div className="flex flex-col gap-3 rounded-xl bg-slate-50 p-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-slate-500">Requested duration</p>
              <p className="mt-1 text-lg font-semibold text-slate-900">
                {requestedDays} {requestedDays === 1 ? "day" : "days"}
              </p>
            </div>

            <button
              type="submit"
              className="min-h-11 rounded-xl bg-violet-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-violet-700 focus:outline-none focus:ring-4 focus:ring-violet-200"
            >
              Submit request
            </button>
          </div>
        </form>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
        <div className="flex flex-col gap-3 border-b border-slate-100 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
          <div>
            <h3 className="text-lg font-semibold text-slate-900">
              Leave requests
            </h3>
            <p className="mt-1 text-sm text-slate-500">
              Review and update submitted requests.
            </p>
          </div>

          <select
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value)}
            className="min-h-11 rounded-xl border border-slate-200 bg-white px-3 text-sm outline-none focus:border-violet-400 focus:ring-4 focus:ring-violet-100"
          >
            <option value="All">All requests</option>
            <option value="Pending">Pending</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>

        {filteredRequests.length === 0 ? (
          <div className="px-5 py-14 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-50 text-2xl text-violet-600">
              ▤
            </div>
            <h4 className="mt-4 font-semibold text-slate-900">
              No leave requests yet
            </h4>
            <p className="mt-2 text-sm leading-6 text-slate-500">
              Submitted requests will appear here for review.
            </p>
          </div>
        ) : (
          <div className="space-y-4 p-4 sm:p-5">
            {filteredRequests.map((request) => (
              <article
                key={request.id}
                className="rounded-xl border border-slate-200 p-4 sm:p-5"
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h4 className="font-semibold text-slate-900">
                      {request.name}
                    </h4>
                    <p className="mt-1 text-sm text-slate-500">
                      {request.leaveType}
                    </p>
                  </div>

                  <span
                    className={`w-fit rounded-full px-3 py-1 text-xs font-semibold ${statusStyle(request.status)}`}
                  >
                    {request.status}
                  </span>
                </div>

                <div className="mt-4 grid grid-cols-1 gap-3 text-sm sm:grid-cols-3">
                  <div>
                    <p className="text-xs text-slate-400">Start date</p>
                    <p className="mt-1 text-slate-700">
                      {formatDate(request.startDate)}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-slate-400">End date</p>
                    <p className="mt-1 text-slate-700">
                      {formatDate(request.endDate)}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-slate-400">Duration</p>
                    <p className="mt-1 text-slate-700">
                      {request.days} {request.days === 1 ? "day" : "days"}
                    </p>
                  </div>
                </div>

                <div className="mt-4 rounded-lg bg-slate-50 p-3">
                  <p className="text-xs font-medium text-slate-500">Reason</p>
                  <p className="mt-1 whitespace-pre-wrap text-sm leading-6 text-slate-700">
                    {request.reason}
                  </p>
                </div>

                {request.status === "Pending" && (
                  <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:justify-end">
                    <button
                      type="button"
                      onClick={() => updateStatus(request.id, "Rejected")}
                      className="min-h-10 rounded-lg border border-rose-200 px-4 py-2 text-sm font-semibold text-rose-700 transition hover:bg-rose-50"
                    >
                      Reject
                    </button>

                    <button
                      type="button"
                      onClick={() => updateStatus(request.id, "Approved")}
                      className="min-h-10 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700"
                    >
                      Approve
                    </button>
                  </div>
                )}
              </article>
            ))}
          </div>
        )}
      </div>

      <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
        <h4 className="text-sm font-semibold text-slate-800">
          Leave policy reference
        </h4>
        <div className="mt-3 grid grid-cols-2 gap-3 text-sm sm:grid-cols-4">
          {leaveTypes.map((type) => (
            <div key={type.name}>
              <p className="text-slate-500">{type.name}</p>
              <p className="mt-1 font-semibold text-slate-800">
                {type.limit === null ? "Unlimited" : `${type.limit} days/year`}
              </p>
            </div>
          ))}
        </div>
        <p className="mt-3 text-xs leading-5 text-slate-500">
          These are policy reference values. Employee balances, working-day
          calculations, holidays and approval permissions require backend
          validation.
        </p>
      </div>
    </section>
  );
}

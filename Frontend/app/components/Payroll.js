
"use client";

import { useState } from "react";

export default function Payroll() {
  const [payroll, setPayroll] = useState([]);
  const [search, setSearch] = useState("");
  const [employeeName, setEmployeeName] = useState("");
  const [month, setMonth] = useState("");
  const [basicSalary, setBasicSalary] = useState("");
  const [allowances, setAllowances] = useState("");
  const [deductions, setDeductions] = useState("");
  const [message, setMessage] = useState("");
  const [selectedPayroll, setSelectedPayroll] = useState(null);

  const netSalary = (basic, allowance, deduction) =>
    Number(basic) + Number(allowance || 0) - Number(deduction || 0);

  const addPayroll = (e) => {
    e.preventDefault();

    if (!employeeName.trim() || !month || basicSalary === "") {
      setMessage("Please fill in all required fields.");
      return;
    }

    const basic = Number(basicSalary);
    const allowance = Number(allowances || 0);
    const deduction = Number(deductions || 0);

    if (
      !Number.isFinite(basic) ||
      !Number.isFinite(allowance) ||
      !Number.isFinite(deduction) ||
      basic < 0 ||
      allowance < 0 ||
      deduction < 0 ||
      netSalary(basic, allowance, deduction) < 0
    ) {
      setMessage("Please enter valid salary amounts.");
      return;
    }

    const alreadyExists = payroll.some(
      (item) =>
        item.employeeName.toLowerCase() === employeeName.trim().toLowerCase() &&
        item.month === month
    );

    if (alreadyExists) {
      setMessage("Payroll already exists for this employee and month.");
      return;
    }

    const newRecord = {
      id: Date.now(),
      employeeName: employeeName.trim(),
      month,
      basicSalary: basic,
      allowances: allowance,
      deductions: deduction,
      netSalary: netSalary(basic, allowance, deduction),
      status: "Pending",
    };

    setPayroll((previous) => [...previous, newRecord]);
    setEmployeeName("");
    setMonth("");
    setBasicSalary("");
    setAllowances("");
    setDeductions("");
    setMessage("Payroll record created successfully.");
  };

  const updateStatus = (id) => {
    setPayroll((previous) =>
      previous.map((item) =>
        item.id === id ? { ...item, status: "Paid" } : item
      )
    );

    if (selectedPayroll?.id === id) {
      setSelectedPayroll((previous) => ({
        ...previous,
        status: "Paid",
      }));
    }
  };

  const filteredPayroll = payroll.filter((item) =>
    `${item.employeeName} ${item.month} ${item.status}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const formatAmount = (amount) =>
    new Intl.NumberFormat("en-PK", {
      style: "currency",
      currency: "PKR",
      maximumFractionDigits: 0,
    }).format(amount);

  return (
    <section className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">
          Payroll Management
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Manage employee salaries and monthly payments.
        </p>
      </div>

      {message && (
        <div className="flex items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white p-4 text-sm text-slate-700">
          <p>{message}</p>
          <button
            type="button"
            onClick={() => setMessage("")}
            className="font-semibold text-slate-500 hover:text-slate-900"
          >
            Close
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <p className="text-sm text-slate-500">Total Records</p>
          <h2 className="mt-2 text-2xl font-bold text-slate-900">
            {payroll.length}
          </h2>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <p className="text-sm text-slate-500">Pending Payments</p>
          <h2 className="mt-2 text-2xl font-bold text-amber-600">
            {payroll.filter((item) => item.status === "Pending").length}
          </h2>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <p className="text-sm text-slate-500">Total Paid</p>
          <h2 className="mt-2 text-xl font-bold text-emerald-600">
            {formatAmount(
              payroll
                .filter((item) => item.status === "Paid")
                .reduce((total, item) => total + item.netSalary, 0)
            )}
          </h2>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
        <h2 className="mb-5 text-lg font-bold text-slate-900">
          Create Payroll
        </h2>

        <form onSubmit={addPayroll} className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Employee Name *
            </label>
            <input
              type="text"
              value={employeeName}
              onChange={(e) => setEmployeeName(e.target.value)}
              placeholder="Enter employee name"
              className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-slate-500"
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Payroll Month *
            </label>
            <input
              type="month"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-slate-500"
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Basic Salary (PKR) *
            </label>
            <input
              type="number"
              min="0"
              step="any"
              value={basicSalary}
              onChange={(e) => setBasicSalary(e.target.value)}
              placeholder="e.g. 50000"
              className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-slate-500"
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Allowances (PKR)
            </label>
            <input
              type="number"
              min="0"
              step="any"
              value={allowances}
              onChange={(e) => setAllowances(e.target.value)}
              placeholder="0"
              className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-slate-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Deductions (PKR)
            </label>
            <input
              type="number"
              min="0"
              step="any"
              value={deductions}
              onChange={(e) => setDeductions(e.target.value)}
              placeholder="0"
              className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-slate-500"
            />
          </div>

          <div className="flex items-end">
            <button
              type="submit"
              className="w-full rounded-xl bg-slate-900 px-5 py-3 font-semibold text-white transition hover:bg-slate-700"
            >
              Create Payroll
            </button>
          </div>
        </form>

        {basicSalary !== "" && (
          <div className="mt-5 rounded-xl bg-slate-50 p-4">
            <p className="text-sm text-slate-500">Calculated Net Salary</p>
            <p className="mt-1 text-xl font-bold text-slate-900">
              {formatAmount(
                netSalary(basicSalary, allowances, deductions)
              )}
            </p>
          </div>
        )}
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-lg font-bold text-slate-900">
            Payroll Records
          </h2>

          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search payroll..."
            className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-slate-500 sm:max-w-xs"
          />
        </div>

        {filteredPayroll.length === 0 ? (
          <div className="rounded-xl border border-dashed border-slate-300 px-4 py-12 text-center">
            <h3 className="font-semibold text-slate-800">
              {payroll.length === 0
                ? "No payroll records yet"
                : "No matching records"}
            </h3>
            <p className="mt-2 text-sm text-slate-500">
              {payroll.length === 0
                ? "Create a payroll record using the form above."
                : "Try searching with another name or month."}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px] text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500">
                  <th className="px-3 py-4 font-medium">Employee</th>
                  <th className="px-3 py-4 font-medium">Month</th>
                  <th className="px-3 py-4 font-medium">Net Salary</th>
                  <th className="px-3 py-4 font-medium">Status</th>
                  <th className="px-3 py-4 font-medium">Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredPayroll.map((item) => (
                  <tr key={item.id} className="border-b border-slate-100">
                    <td className="px-3 py-4 font-medium text-slate-900">
                      {item.employeeName}
                    </td>
                    <td className="px-3 py-4 text-slate-600">
                      {item.month}
                    </td>
                    <td className="px-3 py-4 font-medium text-slate-900">
                      {formatAmount(item.netSalary)}
                    </td>
                    <td className="px-3 py-4">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          item.status === "Paid"
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-amber-100 text-amber-700"
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="px-3 py-4">
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() => setSelectedPayroll(item)}
                          className="font-semibold text-slate-700 hover:text-black"
                        >
                          Payslip
                        </button>

                        {item.status === "Pending" && (
                          <button
                            type="button"
                            onClick={() => updateStatus(item.id)}
                            className="font-semibold text-emerald-700 hover:text-emerald-900"
                          >
                            Mark Paid
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {selectedPayroll && (
        <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-lg font-bold text-slate-900">
              Employee Payslip
            </h2>
            <button
              type="button"
              onClick={() => setSelectedPayroll(null)}
              className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50"
            >
              Close
            </button>
          </div>

          <div className="mt-5 space-y-4">
            <div>
              <p className="text-sm text-slate-500">Employee</p>
              <p className="font-semibold text-slate-900">
                {selectedPayroll.employeeName}
              </p>
            </div>

            <div>
              <p className="text-sm text-slate-500">Month</p>
              <p className="font-semibold text-slate-900">
                {selectedPayroll.month}
              </p>
            </div>

            <div className="space-y-3 border-t border-slate-200 pt-4">
              <div className="flex justify-between gap-4">
                <span className="text-slate-600">Basic Salary</span>
                <span>{formatAmount(selectedPayroll.basicSalary)}</span>
              </div>
              <div className="flex justify-between gap-4">
                <span className="text-slate-600">Allowances</span>
                <span>{formatAmount(selectedPayroll.allowances)}</span>
              </div>
              <div className="flex justify-between gap-4">
                <span className="text-slate-600">Deductions</span>
                <span>{formatAmount(selectedPayroll.deductions)}</span>
              </div>
              <div className="flex justify-between gap-4 border-t border-slate-200 pt-3 font-bold text-slate-900">
                <span>Net Salary</span>
                <span>{formatAmount(selectedPayroll.netSalary)}</span>
              </div>
              <div className="flex justify-between gap-4">
                <span className="text-slate-600">Payment Status</span>
                <span className="font-semibold">{selectedPayroll.status}</span>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => window.print()}
            className="mt-6 rounded-xl bg-slate-900 px-5 py-3 font-semibold text-white hover:bg-slate-700"
          >
            Print Payslip
          </button>
        </div>
      )}
    </section>
  );
}


"use client";

import { useMemo, useState } from "react";

const emptyForm = {
  name: "",
  email: "",
  phone: "",
  department: "",
  designation: "",
  joiningDate: "",
  salary: "",
  status: "Active",
};

export default function Employees() {
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [notice, setNotice] = useState("");

  const departments = useMemo(
    () => [...new Set(employees.map((employee) => employee.department))],
    [employees]
  );

  const filteredEmployees = employees.filter((employee) => {
    const query = search.toLowerCase();

    const matchesSearch = [
      employee.name,
      employee.email,
      employee.designation,
      employee.department,
    ].some((value) => value.toLowerCase().includes(query));

    const matchesDepartment =
      departmentFilter === "All" ||
      employee.department === departmentFilter;

    const matchesStatus =
      statusFilter === "All" || employee.status === statusFilter;

    return matchesSearch && matchesDepartment && matchesStatus;
  });

  function updateField(event) {
    const { name, value } = event.target;
    setForm((previous) => ({ ...previous, [name]: value }));
  }

  function openNewForm() {
    setForm(emptyForm);
    setEditingId(null);
    setSelectedEmployee(null);
    setShowForm(true);
    setNotice("");
  }

  function editEmployee(employee) {
    setForm({
      name: employee.name,
      email: employee.email,
      phone: employee.phone,
      department: employee.department,
      designation: employee.designation,
      joiningDate: employee.joiningDate,
      salary: employee.salary,
      status: employee.status,
    });
    setEditingId(employee.id);
    setSelectedEmployee(null);
    setShowForm(true);
    setNotice("");
  }

  function handleSubmit(event) {
    event.preventDefault();

    const normalizedEmail = form.email.trim().toLowerCase();

    const duplicate = employees.some(
      (employee) =>
        employee.email.toLowerCase() === normalizedEmail &&
        employee.id !== editingId
    );

    if (duplicate) {
      setNotice("An employee with this email already exists.");
      return;
    }

    const employeeData = {
      ...form,
      name: form.name.trim(),
      email: normalizedEmail,
      phone: form.phone.trim(),
      department: form.department.trim(),
      designation: form.designation.trim(),
      salary: Number(form.salary),
      id: editingId || crypto.randomUUID(),
    };

    if (editingId) {
      setEmployees((previous) =>
        previous.map((employee) =>
          employee.id === editingId ? employeeData : employee
        )
      );
      setNotice("Employee updated successfully.");
    } else {
      setEmployees((previous) => [...previous, employeeData]);
      setNotice("Employee added successfully.");
    }

    setForm(emptyForm);
    setEditingId(null);
    setShowForm(false);
  }

  function deleteEmployee(employee) {
    const confirmed = window.confirm(
      `Delete employee ${employee.name}?`
    );

    if (!confirmed) return;

    setEmployees((previous) =>
      previous.filter((item) => item.id !== employee.id)
    );

    setSelectedEmployee(null);
    setNotice("Employee removed from this session.");
  }

  const inputClass =
    "mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100";

  const labelClass = "block text-sm font-semibold text-slate-700";

  return (
    <div className="mx-auto w-full max-w-7xl space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="text-sm font-medium text-violet-600">
            PEOPLE / EMPLOYEES
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
            Employee Directory
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Register employees and manage your workforce.
          </p>
        </div>

        <button
          onClick={openNewForm}
          className="rounded-xl bg-violet-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-violet-700"
        >
          + Add Employee
        </button>
      </div>

      {notice && (
        <div className="flex items-center justify-between gap-3 rounded-xl border border-violet-200 bg-violet-50 p-4 text-sm text-violet-800">
          <span>{notice}</span>
          <button
            onClick={() => setNotice("")}
            aria-label="Dismiss message"
            className="text-lg"
          >
            ×
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">Total employees</p>
          <p className="mt-2 text-3xl font-bold text-slate-900">
            {employees.length}
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">Active employees</p>
          <p className="mt-2 text-3xl font-bold text-emerald-600">
            {employees.filter((employee) => employee.status === "Active").length}
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">Departments represented</p>
          <p className="mt-2 text-3xl font-bold text-violet-600">
            {departments.length}
          </p>
        </div>
      </div>

      {showForm && (
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-6 flex items-center justify-between gap-3">
            <div>
              <h2 className="text-xl font-bold text-slate-900">
                {editingId ? "Edit Employee" : "Register Employee"}
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Enter the employee's information below.
              </p>
            </div>

            <button
              type="button"
              onClick={() => {
                setShowForm(false);
                setEditingId(null);
                setForm(emptyForm);
              }}
              className="rounded-lg px-3 py-2 text-slate-500 hover:bg-slate-100"
            >
              Close ✕
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              <label className={labelClass}>
                Full Name *
                <input
                  className={inputClass}
                  name="name"
                  value={form.name}
                  onChange={updateField}
                  placeholder="Enter full name"
                  required
                  maxLength={100}
                />
              </label>

              <label className={labelClass}>
                Email Address *
                <input
                  className={inputClass}
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={updateField}
                  placeholder="employee@company.com"
                  required
                />
              </label>

              <label className={labelClass}>
                Phone Number
                <input
                  className={inputClass}
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={updateField}
                  placeholder="Enter phone number"
                />
              </label>

              <label className={labelClass}>
                Department *
                <input
                  className={inputClass}
                  name="department"
                  value={form.department}
                  onChange={updateField}
                  placeholder="e.g. Engineering"
                  required
                  maxLength={100}
                />
              </label>

              <label className={labelClass}>
                Designation *
                <input
                  className={inputClass}
                  name="designation"
                  value={form.designation}
                  onChange={updateField}
                  placeholder="e.g. Frontend Developer"
                  required
                  maxLength={100}
                />
              </label>

              <label className={labelClass}>
                Joining Date *
                <input
                  className={inputClass}
                  type="date"
                  name="joiningDate"
                  value={form.joiningDate}
                  onChange={updateField}
                  required
                />
              </label>

              <label className={labelClass}>
                Monthly Basic Salary *
                <input
                  className={inputClass}
                  type="number"
                  name="salary"
                  value={form.salary}
                  onChange={updateField}
                  placeholder="Enter basic salary"
                  min="0"
                  step="0.01"
                  required
                />
              </label>

              <label className={labelClass}>
                Employment Status
                <select
                  className={inputClass}
                  name="status"
                  value={form.status}
                  onChange={updateField}
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </label>
            </div>

            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setEditingId(null);
                  setForm(emptyForm);
                }}
                className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="rounded-xl bg-violet-600 px-6 py-3 text-sm font-semibold text-white hover:bg-violet-700"
              >
                {editingId ? "Update Employee" : "Register Employee"}
              </button>
            </div>
          </form>
        </section>
      )}

      {selectedEmployee && (
        <section className="rounded-2xl border border-violet-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
            <div>
              <p className="text-sm font-medium text-violet-600">
                EMPLOYEE PROFILE
              </p>
              <h2 className="mt-2 text-2xl font-bold text-slate-900">
                {selectedEmployee.name}
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                {selectedEmployee.designation} · {selectedEmployee.department}
              </p>
            </div>

            <button
              onClick={() => setSelectedEmployee(null)}
              className="self-start rounded-lg px-3 py-2 text-slate-500 hover:bg-slate-100"
            >
              Close ✕
            </button>
          </div>

          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              ["Email", selectedEmployee.email],
              ["Phone", selectedEmployee.phone || "Not provided"],
              ["Joining date", selectedEmployee.joiningDate],
              ["Department", selectedEmployee.department],
              ["Designation", selectedEmployee.designation],
              [
                "Basic salary",
                Number(selectedEmployee.salary).toLocaleString("en-PK", {
                  style: "currency",
                  currency: "PKR",
                  maximumFractionDigits: 2,
                }),
              ],
              ["Status", selectedEmployee.status],
            ].map(([label, value]) => (
              <div key={label} className="rounded-xl bg-slate-50 p-4">
                <p className="text-xs font-medium uppercase text-slate-500">
                  {label}
                </p>
                <p className="mt-2 break-words text-sm font-semibold text-slate-800">
                  {value}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-5 flex flex-wrap gap-3">
            <button
              onClick={() => editEmployee(selectedEmployee)}
              className="rounded-xl bg-violet-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-violet-700"
            >
              Edit Employee
            </button>

            <button
              onClick={() => deleteEmployee(selectedEmployee)}
              className="rounded-xl border border-red-200 px-4 py-2.5 text-sm font-semibold text-red-600 hover:bg-red-50"
            >
              Delete Employee
            </button>
          </div>
        </section>
      )}

      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-100 p-5">
          <h2 className="text-lg font-bold text-slate-900">All Employees</h2>
          <p className="mt-1 text-sm text-slate-500">
            {filteredEmployees.length} employee
            {filteredEmployees.length === 1 ? "" : "s"} found
          </p>

          <div className="mt-4 grid gap-3 md:grid-cols-3">
            <input
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-violet-500"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search name, email, department..."
              aria-label="Search employees"
            />

            <select
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-violet-500"
              value={departmentFilter}
              onChange={(event) => setDepartmentFilter(event.target.value)}
              aria-label="Filter by department"
            >
              <option value="All">All departments</option>
              {departments.map((department) => (
                <option key={department} value={department}>
                  {department}
                </option>
              ))}
            </select>

            <select
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-violet-500"
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value)}
              aria-label="Filter by status"
            >
              <option value="All">All statuses</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
        </div>

        {filteredEmployees.length === 0 ? (
          <div className="px-6 py-14 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-50 text-2xl text-violet-600">
              ♙
            </div>
            <h3 className="mt-4 text-lg font-bold text-slate-900">
              {employees.length === 0
                ? "No employees registered yet"
                : "No matching employees"}
            </h3>
            <p className="mx-auto mt-2 max-w-md text-sm text-slate-500">
              {employees.length === 0
                ? "Register your first employee to start building your directory."
                : "Try changing your search or filters."}
            </p>
            {employees.length === 0 && (
              <button
                onClick={openNewForm}
                className="mt-5 rounded-xl bg-violet-600 px-5 py-3 text-sm font-semibold text-white hover:bg-violet-700"
              >
                + Register First Employee
              </button>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[850px] text-left text-sm">
              <thead className="bg-slate-50 text-xs uppercase text-slate-500">
                <tr>
                  <th className="px-5 py-4 font-semibold">Employee</th>
                  <th className="px-5 py-4 font-semibold">Department</th>
                  <th className="px-5 py-4 font-semibold">Designation</th>
                  <th className="px-5 py-4 font-semibold">Joining Date</th>
                  <th className="px-5 py-4 font-semibold">Status</th>
                  <th className="px-5 py-4 text-right font-semibold">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {filteredEmployees.map((employee) => (
                  <tr key={employee.id} className="hover:bg-slate-50">
                    <td className="px-5 py-4">
                      <button
                        onClick={() => setSelectedEmployee(employee)}
                        className="flex items-center gap-3 text-left"
                      >
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-violet-100 font-bold text-violet-700">
                          {employee.name.charAt(0).toUpperCase()}
                        </span>
                        <span>
                          <span className="block font-semibold text-slate-900">
                            {employee.name}
                          </span>
                          <span className="mt-1 block text-xs text-slate-500">
                            {employee.email}
                          </span>
                        </span>
                      </button>
                    </td>

                    <td className="px-5 py-4 text-slate-600">
                      {employee.department}
                    </td>
                    <td className="px-5 py-4 text-slate-600">
                      {employee.designation}
                    </td>
                    <td className="px-5 py-4 text-slate-600">
                      {employee.joiningDate}
                    </td>
                    <td className="px-5 py-4">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          employee.status === "Active"
                            ? "bg-emerald-50 text-emerald-700"
                            : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        {employee.status}
                      </span>
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => editEmployee(employee)}
                          className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => deleteEmployee(employee)}
                          className="rounded-lg border border-red-200 px-3 py-2 text-xs font-semibold text-red-600 hover:bg-red-50"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}

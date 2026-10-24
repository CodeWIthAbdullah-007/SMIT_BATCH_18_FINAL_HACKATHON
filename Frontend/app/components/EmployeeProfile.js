
"use client";

import { useState } from "react";

export default function EmployeeProfile() {
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [department, setDepartment] = useState("");
  const [position, setPosition] = useState("");
  const [notice, setNotice] = useState("");

  const addEmployee = (e) => {
    e.preventDefault();

    if (!name.trim() || !email.trim()) {
      setNotice("Name and email are required.");
      return;
    }

    const emailExists = employees.some(
      (employee) => employee.email.toLowerCase() === email.trim().toLowerCase()
    );

    if (emailExists) {
      setNotice("This email already exists in these profiles.");
      return;
    }

    const employee = {
      id: Date.now(),
      name: name.trim(),
      email: email.trim(),
      department: department.trim(),
      position: position.trim(),
    };

    setEmployees((previous) => [...previous, employee]);
    setName("");
    setEmail("");
    setDepartment("");
    setPosition("");
    setNotice("Profile created.");
  };

  const filteredEmployees = employees.filter((employee) =>
    `${employee.name} ${employee.email} ${employee.department} ${employee.position}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <section className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Employee Profiles</h1>
        <p className="mt-1 text-sm text-slate-500">
          View employee contact and job information.
        </p>
      </div>

      {notice && (
        <div className="flex justify-between gap-3 rounded-xl border border-slate-200 bg-white p-4 text-sm text-slate-700">
          <p>{notice}</p>
          <button type="button" onClick={() => setNotice("")}>Close</button>
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <p className="text-sm text-slate-500">Profiles in This Page</p>
          <h2 className="mt-2 text-2xl font-bold text-slate-900">
            {employees.length}
          </h2>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <p className="text-sm text-slate-500">Search Results</p>
          <h2 className="mt-2 text-2xl font-bold text-slate-900">
            {filteredEmployees.length}
          </h2>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
        <h2 className="mb-5 text-lg font-bold text-slate-900">
          Add Profile
        </h2>

        <form onSubmit={addEmployee} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium">Full Name *</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Employee name"
              className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-slate-500"
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">Email *</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="employee@example.com"
              className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-slate-500"
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">Department</label>
            <input
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              placeholder="Department name"
              className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-slate-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">Job Position</label>
            <input
              value={position}
              onChange={(e) => setPosition(e.target.value)}
              placeholder="Job title"
              className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-slate-500"
            />
          </div>

          <div className="sm:col-span-2">
            <button
              type="submit"
              className="rounded-xl bg-slate-900 px-5 py-3 font-semibold text-white hover:bg-slate-700"
            >
              Create Profile
            </button>
          </div>
        </form>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-lg font-bold text-slate-900">Employee Directory</h2>
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search employees..."
            className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-slate-500 sm:max-w-xs"
          />
        </div>

        {filteredEmployees.length === 0 ? (
          <div className="rounded-xl border border-dashed border-slate-300 px-4 py-12 text-center">
            <h3 className="font-semibold text-slate-800">
              No employee profiles found
            </h3>
            <p className="mt-2 text-sm text-slate-500">
              Create a profile above to see its details here.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            {filteredEmployees.map((employee) => (
              <article
                key={employee.id}
                className="rounded-xl border border-slate-200 p-5"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-slate-100 text-lg font-bold text-slate-700">
                    {employee.name.charAt(0).toUpperCase()}
                  </div>

                  <div className="min-w-0 flex-1">
                    <h3 className="break-words font-bold text-slate-900">
                      {employee.name}
                    </h3>
                    <p className="mt-1 break-words text-sm text-slate-500">
                      {employee.email}
                    </p>
                    <p className="mt-2 text-sm text-slate-600">
                      {employee.position || "Position not set"}
                    </p>
                    <p className="text-sm text-slate-500">
                      {employee.department || "Department not set"}
                    </p>

                    <button
                      type="button"
                      onClick={() => setSelectedEmployee(employee)}
                      className="mt-4 rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                    >
                      View Profile
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      {selectedEmployee && (
        <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-lg font-bold text-slate-900">
              Profile Details
            </h2>
            <button
              type="button"
              onClick={() => setSelectedEmployee(null)}
              className="rounded-lg border border-slate-200 px-3 py-2 text-sm hover:bg-slate-50"
            >
              Close
            </button>
          </div>

          <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div>
              <p className="text-sm text-slate-500">Full Name</p>
              <p className="mt-1 font-semibold">{selectedEmployee.name}</p>
            </div>
            <div>
              <p className="text-sm text-slate-500">Email</p>
              <p className="mt-1 break-words font-semibold">{selectedEmployee.email}</p>
            </div>
            <div>
              <p className="text-sm text-slate-500">Department</p>
              <p className="mt-1 font-semibold">
                {selectedEmployee.department || "Not set"}
              </p>
            </div>
            <div>
              <p className="text-sm text-slate-500">Position</p>
              <p className="mt-1 font-semibold">
                {selectedEmployee.position || "Not set"}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

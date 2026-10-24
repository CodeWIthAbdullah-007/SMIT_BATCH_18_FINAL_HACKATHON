
"use client";

import { useState } from "react";

export default function Departments() {
  const [departments, setDepartments] = useState([]);
  const [name, setName] = useState("");
  const [manager, setManager] = useState("");
  const [description, setDescription] = useState("");
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState("");

  const addDepartment = (e) => {
    e.preventDefault();

    const departmentName = name.trim();

    if (!departmentName) {
      setMessage("Please enter a department name.");
      return;
    }

    const exists = departments.some(
      (department) =>
        department.name.toLowerCase() === departmentName.toLowerCase()
    );

    if (exists) {
      setMessage("This department already exists.");
      return;
    }

    const newDepartment = {
      id: Date.now(),
      name: departmentName,
      manager: manager.trim(),
      description: description.trim(),
    };

    setDepartments((previous) => [...previous, newDepartment]);
    setName("");
    setManager("");
    setDescription("");
    setMessage("Department added successfully.");
  };

  const deleteDepartment = (id) => {
    setDepartments((previous) =>
      previous.filter((department) => department.id !== id)
    );
    setMessage("Department deleted.");
  };

  const filteredDepartments = departments.filter((department) =>
    `${department.name} ${department.manager} ${department.description}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <section className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">
          Departments
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Create and manage your organization departments.
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
          <p className="text-sm text-slate-500">Total Departments</p>
          <h2 className="mt-2 text-2xl font-bold text-slate-900">
            {departments.length}
          </h2>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <p className="text-sm text-slate-500">Assigned Managers</p>
          <h2 className="mt-2 text-2xl font-bold text-slate-900">
            {departments.filter((item) => item.manager).length}
          </h2>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
        <h2 className="mb-5 text-lg font-bold text-slate-900">
          Add Department
        </h2>

        <form
          onSubmit={addDepartment}
          className="grid grid-cols-1 gap-4 sm:grid-cols-2"
        >
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Department Name *
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Human Resources"
              className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-slate-500"
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Department Manager
            </label>
            <input
              type="text"
              value={manager}
              onChange={(e) => setManager(e.target.value)}
              placeholder="Manager name"
              className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-slate-500"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="What does this department do?"
              rows={3}
              className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-slate-500"
            />
          </div>

          <div className="sm:col-span-2">
            <button
              type="submit"
              className="rounded-xl bg-slate-900 px-5 py-3 font-semibold text-white transition hover:bg-slate-700"
            >
              Add Department
            </button>
          </div>
        </form>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-lg font-bold text-slate-900">
            Department List
          </h2>
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search departments..."
            className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-slate-500 sm:max-w-xs"
          />
        </div>

        {filteredDepartments.length === 0 ? (
          <div className="rounded-xl border border-dashed border-slate-300 px-4 py-12 text-center">
            <h3 className="font-semibold text-slate-800">
              {departments.length === 0
                ? "No departments yet"
                : "No matching departments"}
            </h3>
            <p className="mt-2 text-sm text-slate-500">
              Add a department using the form above.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            {filteredDepartments.map((department) => (
              <div
                key={department.id}
                className="rounded-xl border border-slate-200 p-5"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-bold text-slate-900">
                      {department.name}
                    </h3>
                    <p className="mt-1 text-sm text-slate-500">
                      Manager: {department.manager || "Not assigned"}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => deleteDepartment(department.id)}
                    className="rounded-lg border border-red-200 px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50"
                  >
                    Delete
                  </button>
                </div>

                <p className="mt-4 text-sm leading-6 text-slate-600">
                  {department.description || "No description added."}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

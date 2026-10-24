
"use client";

import { useState } from "react";

const initialSettings = {
  companyName: "",
  officeStart: "09:00",
  officeEnd: "17:00",
  gracePeriod: "15",
  weekend: ["Saturday", "Sunday"],
  annualLeave: "14",
  sickLeave: "8",
  casualLeave: "10",
  officeAddress: "",
  officeRadius: "200",
};

export default function OrganizationSetup() {
  const [settings, setSettings] = useState(initialSettings);
  const [saved, setSaved] = useState(false);

  function updateField(event) {
    const { name, value } = event.target;
    setSettings((previous) => ({ ...previous, [name]: value }));
    setSaved(false);
  }

  function toggleWeekend(day) {
    setSettings((previous) => ({
      ...previous,
      weekend: previous.weekend.includes(day)
        ? previous.weekend.filter((item) => item !== day)
        : [...previous.weekend, day],
    }));
    setSaved(false);
  }

  function handleSubmit(event) {
    event.preventDefault();
    setSaved(true);
  }

  const fieldClass =
    "mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-100";

  const labelClass = "text-sm font-semibold text-slate-700";

  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  return (
    <div className="mx-auto w-full max-w-5xl space-y-6">
      <div>
        <p className="text-sm font-medium text-violet-600">
          ADMINISTRATION / ORGANIZATION
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
          Organization Setup
        </h1>
        <p className="mt-2 text-sm text-slate-500">
          Configure your company details, office hours, and HR policies.
        </p>
      </div>

      {saved && (
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm font-medium text-emerald-700">
          Form submitted successfully in this session. Permanent saving will
          work after backend integration.
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900">
            Company Information
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Enter the basic details of your organization.
          </p>

          <div className="mt-5 grid gap-5 md:grid-cols-2">
            <label className={labelClass}>
              Organization Name
              <input
                className={fieldClass}
                name="companyName"
                value={settings.companyName}
                onChange={updateField}
                placeholder="Enter company name"
                required
              />
            </label>

            <label className={labelClass}>
              Office Address
              <input
                className={fieldClass}
                name="officeAddress"
                value={settings.officeAddress}
                onChange={updateField}
                placeholder="Enter office address"
              />
            </label>

            <label className={labelClass}>
              Office Radius (meters)
              <input
                className={fieldClass}
                type="number"
                name="officeRadius"
                min="1"
                value={settings.officeRadius}
                onChange={updateField}
                required
              />
            </label>
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900">Office Hours</h2>
          <p className="mt-1 text-sm text-slate-500">
            These rules determine attendance status.
          </p>

          <div className="mt-5 grid gap-5 md:grid-cols-3">
            <label className={labelClass}>
              Office Start
              <input
                className={fieldClass}
                type="time"
                name="officeStart"
                value={settings.officeStart}
                onChange={updateField}
                required
              />
            </label>

            <label className={labelClass}>
              Office End
              <input
                className={fieldClass}
                type="time"
                name="officeEnd"
                value={settings.officeEnd}
                onChange={updateField}
                required
              />
            </label>

            <label className={labelClass}>
              Grace Period (minutes)
              <input
                className={fieldClass}
                type="number"
                name="gracePeriod"
                min="0"
                value={settings.gracePeriod}
                onChange={updateField}
                required
              />
            </label>
          </div>

          <div className="mt-6">
            <p className={labelClass}>Weekly Weekend</p>
            <div className="mt-3 flex flex-wrap gap-3">
              {days.map((day) => (
                <label
                  key={day}
                  className="flex cursor-pointer items-center gap-2 rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-700"
                >
                  <input
                    type="checkbox"
                    checked={settings.weekend.includes(day)}
                    onChange={() => toggleWeekend(day)}
                    className="accent-violet-600"
                  />
                  {day}
                </label>
              ))}
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900">Leave Policies</h2>
          <p className="mt-1 text-sm text-slate-500">
            Set the yearly leave allowance for each employee.
          </p>

          <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["Annual Leave", "annualLeave"],
              ["Sick Leave", "sickLeave"],
              ["Casual Leave", "casualLeave"],
            ].map(([label, name]) => (
              <label key={name} className={labelClass}>
                {label} (days)
                <input
                  className={fieldClass}
                  type="number"
                  name={name}
                  min="0"
                  value={settings[name]}
                  onChange={updateField}
                  required
                />
              </label>
            ))}

            <label className={labelClass}>
              Unpaid Leave
              <input
                className={fieldClass}
                value="Unlimited"
                readOnly
              />
            </label>
          </div>
        </section>

        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={() => {
              setSettings({
                ...initialSettings,
                weekend: [...initialSettings.weekend],
              });
              setSaved(false);
            }}
            className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            Reset Form
          </button>

          <button
            type="submit"
            className="rounded-xl bg-violet-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-violet-700"
          >
            Save Organization Settings
          </button>
        </div>
      </form>
    </div>
  );
}

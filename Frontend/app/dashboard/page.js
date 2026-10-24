"use client";

import { useState } from "react";
import OrganizationSetup from "./components/OrganizationSetup";
import Employees from "./components/Employees";
import Attendance from "./components/Attendance";
import LeaveManagement from "./components/LeaveManagement";
import Payroll from "./components/Payroll";
import Departments from "./components/Departments";
import Announcements from "./components/Announcements";
import AIAssistant from "./components/AIAssistant";
import AuditLogs from "./components/AuditLogs";
import Notifications from "./components/Notifications";
import EmployeeProfile from "./components/EmployeeProfile";
import DashboardAnalytics from "./components/DashboardAnalytics";
import Reports from "./components/Reports";

const navigation = [
  { label: "Overview", icon: "⌂", group: "WORKSPACE" },
  { label: "Employees", icon: "♙", group: "WORKSPACE" },
  { label: "Attendance", icon: "◷", group: "WORKSPACE" },
  { label: "Leave Management", icon: "▤", group: "WORKSPACE" },
  { label: "Payroll", icon: "＄", group: "WORKSPACE" },
  { label: "Departments", icon: "▦", group: "WORKSPACE" },
  { label: "Employee Profile", icon: "◎", group: "PEOPLE" },
  { label: "Announcements", icon: "♢", group: "PEOPLE" },
  { label: "Notifications", icon: "♧", group: "PEOPLE" },
  { label: "Dashboard Analytics", icon: "▥", group: "INSIGHTS" },
  { label: "Reports", icon: "▧", group: "INSIGHTS" },
  { label: "AI Assistant", icon: "✳", group: "INSIGHTS" },
  { label: "Audit Logs", icon: "☷", group: "ADMINISTRATION" },
  { label: "Settings", icon: "⚙", group: "ADMINISTRATION" },
];

const descriptions = {
  Overview: [
    "Dashboard overview",
    "Your organization's activity at a glance.",
  ],
  Employees: [
    "Employee directory",
    "Manage employee profiles and company records.",
  ],
  Attendance: [
    "Attendance management",
    "Monitor check-ins, check-outs and working hours.",
  ],
  "Leave Management": [
    "Leave management",
    "Review leave requests and manage balances.",
  ],
  Payroll: [
    "Payroll management",
    "Prepare monthly payroll and employee payslips.",
  ],
  Departments: [
    "Departments",
    "Organize teams, departments and designations.",
  ],
  "Employee Profile": [
    "Employee profiles",
    "View and manage employee information.",
  ],
  Announcements: [
    "Announcements",
    "Share important updates with your organization.",
  ],
  Notifications: [
    "Notifications",
    "Keep track of important workspace updates.",
  ],
  "Dashboard Analytics": [
    "Dashboard analytics",
    "Understand your organization's activity and trends.",
  ],
  Reports: [
    "Reports",
    "Access organizational reports and summaries.",
  ],
  "AI Assistant": [
    "AI Assistant",
    "Get help with HR tasks and company policies.",
  ],
  "Audit Logs": [
    "Audit logs",
    "Review important actions performed in your workspace.",
  ],
  Settings: [
    "Organization settings",
    "Configure your company workspace.",
  ],
};

function Overview() {
  const cards = [
    { title: "Total Employees", icon: "♙" },
    { title: "Present Today", icon: "◷" },
    { title: "Pending Leaves", icon: "▤" },
    { title: "Monthly Payroll", icon: "＄" },
  ];

  return (
    <div className="space-y-6">
      <div className="rounded-2xl bg-gradient-to-r from-violet-700 to-indigo-600 p-6 text-white sm:p-8">
        <p className="text-sm font-medium text-violet-100">
          HCM LITE WORKSPACE
        </p>
        <h2 className="mt-3 text-2xl font-bold sm:text-3xl">
          Welcome to your workspace
        </h2>
        <p className="mt-2 max-w-xl text-sm leading-6 text-violet-100">
          Manage your people, attendance, leave and payroll from one place.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => (
          <div
            key={card.title}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-slate-500">
                {card.title}
              </p>
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-50 text-xl text-violet-600">
                {card.icon}
              </span>
            </div>
            <p className="mt-5 text-3xl font-bold text-slate-900">—</p>
            <p className="mt-2 text-xs text-slate-400">
              Available after data integration
            </p>
          </div>
        ))}
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-50 text-2xl text-violet-600">
          ✳
        </div>
        <h3 className="mt-4 text-lg font-bold text-slate-900">
          Your HR workspace, all in one place
        </h3>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
          Use the sidebar to manage employees, record attendance, review leave
          requests, prepare payroll and explore reports. Live dashboard
          statistics will appear when the backend is connected.
        </p>
      </div>
    </div>
  );
}

export default function Home() {
  const [activePage, setActivePage] = useState("Overview");
  const [mobileMenu, setMobileMenu] = useState(false);
  const [search, setSearch] = useState("");
  const [showProfile, setShowProfile] = useState(false);

  const currentDescription =
    descriptions[activePage] || descriptions.Overview;

  const filteredNavigation = navigation.filter((item) =>
    item.label.toLowerCase().includes(search.toLowerCase())
  );

  function openPage(label) {
    setActivePage(label);
    setMobileMenu(false);
    setSearch("");
    setShowProfile(false);
  }

  function renderPage() {
    switch (activePage) {
      case "Employees":
        return <Employees />;
      case "Attendance":
        return <Attendance />;
      case "Leave Management":
        return <LeaveManagement />;
      case "Payroll":
        return <Payroll />;
      case "Departments":
        return <Departments />;
      case "Employee Profile":
        return <EmployeeProfile />;
      case "Announcements":
        return <Announcements />;
      case "Notifications":
        return <Notifications />;
      case "Dashboard Analytics":
        return <DashboardAnalytics />;
      case "Reports":
        return <Reports />;
      case "AI Assistant":
        return <AIAssistant />;
      case "Audit Logs":
        return <AuditLogs />;
      case "Settings":
        return <OrganizationSetup />;
      case "Overview":
      default:
        return <Overview />;
    }
  }

  const groupedNavigation = filteredNavigation.reduce((groups, item) => {
    if (!groups[item.group]) {
      groups[item.group] = [];
    }

    groups[item.group].push(item);
    return groups;
  }, {});

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {mobileMenu && (
        <button
          type="button"
          aria-label="Close navigation menu"
          onClick={() => setMobileMenu(false)}
          className="fixed inset-0 z-40 bg-slate-950/40 lg:hidden"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r border-slate-200 bg-white transition-transform duration-200 lg:translate-x-0 ${mobileMenu ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        <div className="flex h-[76px] items-center justify-between border-b border-slate-100 px-6">
          <button
            type="button"
            onClick={() => openPage("Overview")}
            className="flex items-center gap-3 text-left"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-600 text-lg font-bold text-white shadow-sm">
              H
            </span>
            <span>
              <span className="block text-lg font-bold tracking-tight text-slate-900">
                HCM Lite
              </span>
              <span className="block text-xs text-slate-500">
                HR workspace
              </span>
            </span>
          </button>

          <button
            type="button"
            onClick={() => setMobileMenu(false)}
            aria-label="Close sidebar"
            className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 lg:hidden"
          >
            ✕
          </button>
        </div>

        <div className="px-4 pb-3 pt-5">
          <label htmlFor="navigation-search" className="sr-only">
            Search navigation
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
              ⌕
            </span>
            <input
              id="navigation-search"
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search menu..."
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-9 pr-3 text-sm outline-none transition focus:border-violet-400 focus:bg-white focus:ring-4 focus:ring-violet-500/10"
            />
          </div>
        </div>

        <nav className="flex-1 space-y-6 overflow-y-auto px-4 pb-6 pt-2">
          {Object.entries(groupedNavigation).map(([group, items]) => (
            <div key={group}>
              <p className="mb-2 px-3 text-[10px] font-bold tracking-[0.16em] text-slate-400">
                {group}
              </p>

              <div className="space-y-1">
                {items.map((item) => {
                  const isActive = activePage === item.label;

                  return (
                    <button
                      key={item.label}
                      type="button"
                      onClick={() => openPage(item.label)}
                      className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium transition ${isActive
                          ? "bg-violet-50 text-violet-700"
                          : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                        }`}
                    >
                      <span
                        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-lg ${isActive
                            ? "bg-violet-100 text-violet-700"
                            : "text-slate-400"
                          }`}
                      >
                        {item.icon}
                      </span>
                      <span className="min-w-0 flex-1">{item.label}</span>
                      {isActive && (
                        <span className="h-1.5 w-1.5 rounded-full bg-violet-600" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}

          {filteredNavigation.length === 0 && (
            <p className="px-3 py-5 text-sm text-slate-500">
              No matching menu items.
            </p>
          )}
        </nav>

        <div className="border-t border-slate-100 p-4">
          <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-violet-100 font-bold text-violet-700">
              A
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-slate-800">
                Workspace Admin
              </p>
              <p className="truncate text-xs text-slate-500">
                Administrator
              </p>
            </div>
          </div>
        </div>
      </aside>

      <div className="min-h-screen lg:pl-72">
        <header className="sticky top-0 z-30 flex h-[76px] items-center justify-between border-b border-slate-200 bg-white/95 px-4 backdrop-blur sm:px-6 lg:px-8">
          <div className="flex min-w-0 items-center gap-3">
            <button
              type="button"
              onClick={() => setMobileMenu(true)}
              aria-label="Open navigation menu"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 text-xl text-slate-600 hover:bg-slate-50 lg:hidden"
            >
              ☰
            </button>

            <div className="min-w-0">
              <h1 className="truncate text-base font-bold text-slate-900 sm:text-lg">
                {currentDescription[0]}
              </h1>
              <p className="hidden truncate text-xs text-slate-500 sm:block">
                {currentDescription[1]}
              </p>
            </div>
          </div>

          <div className="relative flex shrink-0 items-center gap-2 sm:gap-4">
            <button
              type="button"
              onClick={() => openPage("Notifications")}
              aria-label="Open notifications"
              className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-lg text-slate-600 transition hover:bg-slate-50"
            >
              ♧
            </button>

            <button
              type="button"
              onClick={() => setShowProfile(!showProfile)}
              className="flex items-center gap-2 rounded-xl p-1.5 transition hover:bg-slate-50"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-violet-100 text-sm font-bold text-violet-700">
                A
              </span>
              <span className="hidden text-left sm:block">
                <span className="block text-sm font-semibold text-slate-800">
                  Admin
                </span>
                <span className="block text-xs text-slate-500">
                  Workspace
                </span>
              </span>
              <span className="hidden text-xs text-slate-400 sm:block">
                ▾
              </span>
            </button>

            {showProfile && (
              <div className="absolute right-0 top-14 z-50 w-48 rounded-xl border border-slate-200 bg-white p-2 shadow-lg">
                <button
                  type="button"
                  onClick={() => openPage("Settings")}
                  className="w-full rounded-lg px-3 py-2.5 text-left text-sm text-slate-700 hover:bg-slate-50"
                >
                  Organization settings
                </button>
                <button
                  type="button"
                  onClick={() => openPage("Employee Profile")}
                  className="w-full rounded-lg px-3 py-2.5 text-left text-sm text-slate-700 hover:bg-slate-50"
                >
                  Employee profile
                </button>
              </div>
            )}
          </div>
        </header>

        <main className="p-4 sm:p-6 lg:p-8">
          <div className="mx-auto w-full max-w-[1600px]">
            {renderPage()}
          </div>
        </main>

        <footer className="border-t border-slate-200 bg-white px-4 py-4 sm:px-8">
          <div className="mx-auto flex max-w-[1600px] flex-col gap-1 text-xs text-slate-400 sm:flex-row sm:items-center sm:justify-between">
            <span>HCM Lite · Human Capital Management</span>
            <span>HR workspace</span>
          </div>
        </footer>
      </div>
    </div>
  );
} 
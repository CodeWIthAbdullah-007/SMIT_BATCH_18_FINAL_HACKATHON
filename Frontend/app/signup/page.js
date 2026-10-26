"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AuthLayout, {
  AuthHeader,
  AuthButton,
  AuthMessage,
} from "../components/AuthLayout";

export default function SetupPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    companyName: "",
    adminEmail: "",
    adminPassword: "",
  });
  const [checking, setChecking] = useState(true);
  const [firstRun, setFirstRun] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  useEffect(() => {
    async function checkSetup() {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/setup/first-run`
        );
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Unable to check initial setup.");
        }

        setFirstRun(Boolean(data.firstRun));

        if (!data.firstRun) {
          setMessage({
            type: "error",
            text: "The system is already initialized. Please sign in or contact your administrator.",
          });
        }
      } catch (error) {
        setMessage({
          type: "error",
          text: error.message || "Unable to connect to the backend.",
        });
      } finally {
        setChecking(false);
      }
    }

    checkSetup();
  }, []);

  function handleChange(event) {
    setForm((previous) => ({
      ...previous,
      [event.target.name]: event.target.value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (!firstRun || loading) return;

    setLoading(true);
    setMessage({ type: "", text: "" });

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/setup/first-run`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            companyName: form.companyName.trim(),
            adminEmail: form.adminEmail.trim(),
            adminPassword: form.adminPassword,
          }),
        }
      );
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || data.message || "Initial setup failed.");
      }

      setMessage({
        type: "success",
        text: data.message || "Setup completed. Redirecting to login...",
      });

      setTimeout(() => router.push("/login"), 1000);
    } catch (error) {
      setMessage({
        type: "error",
        text: error.message || "Unable to complete initial setup.",
      });
    } finally {
      setLoading(false);
    }
  }

  const inputClass =
    "w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10";

  return (
    <AuthLayout>
      <AuthHeader
        label="INITIAL SETUP"
        title="Set up HCM Lite"
        description="Create the first administrator account and register your organization."
      />

      <AuthMessage message={message} />

      {checking ? (
        <p className="text-sm text-slate-500">Checking system setup...</p>
      ) : firstRun ? (
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="companyName" className="mb-2 block text-sm font-semibold text-slate-700">
              Organization name
            </label>
            <input
              id="companyName"
              name="companyName"
              value={form.companyName}
              onChange={handleChange}
              className={inputClass}
              placeholder="Your organization"
              autoComplete="organization"
              required
            />
          </div>

          <div>
            <label htmlFor="adminEmail" className="mb-2 block text-sm font-semibold text-slate-700">
              Administrator email
            </label>
            <input
              id="adminEmail"
              name="adminEmail"
              type="email"
              value={form.adminEmail}
              onChange={handleChange}
              className={inputClass}
              placeholder="admin@company.com"
              autoComplete="email"
              required
            />
          </div>

          <div>
            <label htmlFor="adminPassword" className="mb-2 block text-sm font-semibold text-slate-700">
              Administrator password
            </label>
            <input
              id="adminPassword"
              name="adminPassword"
              type="password"
              value={form.adminPassword}
              onChange={handleChange}
              className={inputClass}
              placeholder="Create a strong password"
              autoComplete="new-password"
              minLength={6}
              required
            />
          </div>

          <AuthButton loading={loading}>Initialize workspace</AuthButton>
        </form>
      ) : null}

      <p className="mt-7 text-center text-sm text-slate-600">
        Already set up?{" "}
        <Link href="/login" className="font-semibold text-indigo-600 hover:text-indigo-800">
          Sign in
        </Link>
      </p>
    </AuthLayout>
  );
}

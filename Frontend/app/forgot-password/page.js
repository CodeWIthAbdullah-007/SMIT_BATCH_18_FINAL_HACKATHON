
"use client";

import { useState } from "react";
import Link from "next/link";
import AuthLayout, {
  AuthHeader,
  AuthButton,
  AuthMessage,
} from "../components/AuthLayout";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  async function handleSubmit(event) {
    event.preventDefault();

    if (!email.trim()) {
      setMessage({
        type: "error",
        text: "Please enter your email address.",
      });
      return;
    }

    setLoading(true);
    setMessage({ type: "", text: "" });

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/auth/forgot-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email.trim(),
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || data.error || "Unable to process your request."
        );
      }

      setMessage({
        type: "success",
        text:
          data.message ||
          "If an account exists for this email, recovery instructions will be sent.",
      });
    } catch (error) {
      setMessage({
        type: "error",
        text: error.message || "Unable to connect to the server.",
      });
    } finally {
      setLoading(false);
    }
  }

  const inputClasses =
    "w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10";

  return (
    <AuthLayout>
      <Link
        href="/login"
        className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-indigo-600"
      >
        <span aria-hidden="true">←</span>
        Back to login
      </Link>

      <div className="mb-7 flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-50 text-3xl text-indigo-600">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          className="h-8 w-8"
          aria-hidden="true"
        >
          <rect x="3" y="5" width="18" height="14" rx="3" />
          <path d="m4 7 8 6 8-6" />
          <path d="M16 3v4" />
        </svg>
      </div>

      <AuthHeader
        label="ACCOUNT RECOVERY"
        title="Forgot your password?"
        description="It happens! Enter the email address associated with your account to request recovery instructions."
      />

      <AuthMessage message={message} />

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label
            htmlFor="email"
            className="mb-2 block text-sm font-semibold text-slate-700"
          >
            Work email
          </label>

          <input
            id="email"
            name="email"
            type="email"
            placeholder="you@company.com"
            autoComplete="email"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
              setMessage({ type: "", text: "" });
            }}
            className={inputClasses}
            required
          />
        </div>

        <AuthButton loading={loading}>Send recovery request</AuthButton>
      </form>

      <div className="mt-7 rounded-xl border border-slate-200 bg-white p-4">
        <div className="flex items-start gap-3">
          <span className="mt-0.5 text-lg text-indigo-600">ⓘ</span>
          <div>
            <h3 className="text-sm font-semibold text-slate-700">
              Check your inbox
            </h3>
            <p className="mt-1 text-xs leading-5 text-slate-500">
              If your account is registered, follow the recovery instructions
              sent to your email. Check your spam folder too.
            </p>
          </div>
        </div>
      </div>

      <p className="mt-8 text-center text-sm text-slate-600">
        Remember your password?{" "}
        <Link
          href="/login"
          className="font-semibold text-indigo-600 transition hover:text-indigo-800"
        >
          Sign in
        </Link>
      </p>
    </AuthLayout>
  );
}


"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AuthLayout, {
  AuthHeader,
  AuthButton,
  AuthMessage,
} from "../components/AuthLayout";

export default function LoginPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({
    type: "",
    text: "",
  });

  function handleChange(event) {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });

    setMessage({
      type: "",
      text: "",
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (!form.email.trim() || !form.password) {
      setMessage({
        type: "error",
        text: "Please enter your email and password.",
      });
      return;
    }

    setLoading(true);
    setMessage({
      type: "",
      text: "",
    });

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: form.email.trim(),
            password: form.password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || data.error || "Invalid email or password."
        );
      }

      const token =
        data.token || data.accessToken || data.data?.token;

      const user = data.user || data.data?.user;

      if (token) {
        localStorage.setItem("hcm_token", token);
      }

      if (user) {
        localStorage.setItem("hcm_user", JSON.stringify(user));
      }

      setMessage({
        type: "success",
        text: "Login successful! Redirecting to your dashboard...",
      });

      setTimeout(() => {
        router.push("/dashboard");
      }, 800);
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
      <AuthHeader
        label="WELCOME BACK"
        title="Sign in to HCM Lite"
        description="Welcome back! Enter your details to access your workspace."
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
            value={form.email}
            onChange={handleChange}
            className={inputClasses}
            required
          />
        </div>

        <div>
          <div className="mb-2 flex items-center justify-between gap-3">
            <label
              htmlFor="password"
              className="text-sm font-semibold text-slate-700"
            >
              Password
            </label>

            <Link
              href="/forgot-password"
              className="text-xs font-semibold text-indigo-600 transition hover:text-indigo-800 sm:text-sm"
            >
              Forgot password?
            </Link>
          </div>

          <div className="relative">
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              autoComplete="current-password"
              value={form.password}
              onChange={handleChange}
              className={`${inputClasses} pr-16`}
              required
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-indigo-600 transition hover:text-indigo-800"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
        </div>

        <div className="flex items-start gap-3 rounded-xl bg-indigo-50 p-4">
          <span className="mt-0.5 text-indigo-600">✓</span>
          <p className="text-xs leading-5 text-slate-600">
            Your account information is protected. Never share your password
            with anyone.
          </p>
        </div>

        <AuthButton loading={loading}>Sign in</AuthButton>
      </form>

      <div className="my-7 flex items-center gap-4">
        <div className="h-px flex-1 bg-slate-200" />
        <span className="text-xs text-slate-400">NEW TO HCM LITE?</span>
        <div className="h-px flex-1 bg-slate-200" />
      </div>

      <p className="text-center text-sm text-slate-600">
        Don't have an account?{" "}
        <Link
          href="/signup"
          className="font-semibold text-indigo-600 transition hover:text-indigo-800"
        >
          Create account
        </Link>
      </p>

      <p className="mt-8 text-center text-xs leading-5 text-slate-400">
        Secure access to your team's workspace.
      </p>
    </AuthLayout>
  );
}

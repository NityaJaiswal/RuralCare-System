import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";

function DoctorLogin() {
  const navigate = useNavigate();

  const {
    isAuthenticated,
    login,
  } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (isAuthenticated) {
    return (
      <Navigate
        to="/doctor/dashboard"
        replace
      />
    );
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    setError("");

    const normalizedEmail = email.trim().toLowerCase();

    if (!normalizedEmail) {
      setError("Please enter your email address.");
      return;
    }

    if (!password) {
      setError("Please enter your password.");
      return;
    }

    setIsSubmitting(true);

    try {
      /*
       * Temporary local authentication.
       *
       * This is intentionally isolated inside the login page.
       * When backend authentication is connected, this section
       * can be replaced with the API authentication service
       * without changing the rest of the doctor portal.
       */
      login({
        token: "local-doctor-session",
        role: "doctor",
        doctor: {
          name: "Doctor",
          email: normalizedEmail,
        },
      });

      navigate("/doctor/dashboard", {
        replace: true,
      });
    } catch (loginError) {
      setError(
        loginError.message ||
          "Unable to sign in. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-12">
      <div className="w-full max-w-md">
        {/* Brand */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-blue-600">
            RuralCare
          </h1>

          <p className="mt-1 text-sm font-medium text-slate-500">
            Doctor Portal
          </p>
        </div>

        {/* Login Card */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-slate-900">
              Doctor Sign In
            </h2>

            <p className="mt-1 text-sm leading-6 text-slate-500">
              Sign in to review patient cases and provide
              clinical responses.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >
            {/* Email */}
            <div>
              <label
                htmlFor="doctor-email"
                className="mb-1.5 block text-sm font-medium text-slate-700"
              >
                Email Address
              </label>

              <input
                id="doctor-email"
                type="email"
                value={email}
                onChange={(event) =>
                  setEmail(event.target.value)
                }
                autoComplete="email"
                placeholder="doctor@example.com"
                disabled={isSubmitting}
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-slate-50"
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="doctor-password"
                className="mb-1.5 block text-sm font-medium text-slate-700"
              >
                Password
              </label>

              <input
                id="doctor-password"
                type="password"
                value={password}
                onChange={(event) =>
                  setPassword(event.target.value)
                }
                autoComplete="current-password"
                placeholder="Enter your password"
                disabled={isSubmitting}
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-slate-50"
              />
            </div>

            {/* Error */}
            {error && (
              <div
                role="alert"
                className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm leading-5 text-red-700"
              >
                {error}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting
                ? "Signing in..."
                : "Sign In"}
            </button>
          </form>
        </div>

        {/* Development note */}
        <p className="mt-5 text-center text-xs leading-5 text-slate-400">
          Authentication is currently running in local
          development mode. Backend authentication will be
          connected during API integration.
        </p>
      </div>
    </div>
  );
}

export default DoctorLogin;
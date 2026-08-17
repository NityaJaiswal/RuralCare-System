import { Link, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Temporary frontend-only navigation.
    // Later this will be replaced with real authentication.
    navigate("/home");
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">

        {/* Brand */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-emerald-700">
            RuralCare
          </h1>

          <p className="mt-2 text-slate-500">
            AI-Powered Rural Healthcare Assistant
          </p>
        </div>

        {/* Heading */}
        <h2 className="text-2xl font-semibold text-slate-800 mb-2">
          Welcome Back
        </h2>

        <p className="text-slate-500 mb-6">
          Login to continue your healthcare journey.
        </p>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-5">

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-slate-700 mb-2"
            >
              Email
            </label>

            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-3 border border-slate-300 rounded-lg
              focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-slate-700 mb-2"
            >
              Password
            </label>

            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              className="w-full px-4 py-3 border border-slate-300 rounded-lg
              focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          {/* Login */}
          <button
            type="submit"
            className="w-full bg-emerald-600 text-white py-3 rounded-lg
            font-semibold hover:bg-emerald-700 transition"
          >
            Login
          </button>
        </form>

        {/* Register */}
        <p className="text-center text-sm text-slate-500 mt-6">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-emerald-600 font-semibold hover:underline"
          >
            Register
          </Link>
        </p>

      </div>
    </div>
  );
}

export default Login;
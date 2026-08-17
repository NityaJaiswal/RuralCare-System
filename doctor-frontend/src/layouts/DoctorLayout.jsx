import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const navigationItems = [
  {
    label: "Dashboard",
    path: "/doctor/dashboard",
  },
  {
    label: "Cases",
    path: "/doctor/cases",
  },
  {
    label: "History",
    path: "/doctor/history",
  },
];

function DoctorLayout() {
  const { doctor, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/doctor/login", { replace: true });
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Sidebar */}
      <aside className="fixed inset-y-0 left-0 z-40 flex w-[260px] flex-col border-r border-slate-200 bg-white">
        {/* Brand */}
        <div className="flex h-[72px] items-center border-b border-slate-200 px-6">
          <div>
            <h1 className="text-xl font-bold text-blue-600">
              RuralCare
            </h1>

            <p className="text-xs text-slate-500">
              Doctor Portal
            </p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 p-4">
          {navigationItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                [
                  "flex items-center rounded-lg px-4 py-3 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-blue-50 text-blue-700"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900",
                ].join(" ")
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Doctor information */}
        <div className="border-t border-slate-200 p-4">
          <div className="mb-3">
            <p className="text-sm font-medium text-slate-900">
              {doctor?.name ?? "Doctor"}
            </p>

            <p className="text-xs text-slate-500">
              Doctor
            </p>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="w-full rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50 hover:text-slate-900"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Main application area */}
      <div className="ml-[260px] min-h-screen">
        {/* Top bar */}
        <header className="sticky top-0 z-30 flex h-[72px] items-center justify-between border-b border-slate-200 bg-white px-8">
          <div>
            <p className="text-sm text-slate-500">
              Doctor Portal
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-50 text-sm font-semibold text-blue-700">
              {doctor?.name?.charAt(0)?.toUpperCase() ?? "D"}
            </div>

            <div className="hidden sm:block">
              <p className="text-sm font-medium text-slate-900">
                {doctor?.name ?? "Doctor"}
              </p>

              <p className="text-xs text-slate-500">
                Doctor
              </p>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default DoctorLayout;
import { Navigate, Route, Routes } from "react-router-dom";

import DoctorLogin from "./pages/auth/DoctorLogin";
import Dashboard from "./pages/dashboard/Dashboard";
import CaseQueue from "./pages/cases/CaseQueue";
import CaseDetails from "./pages/cases/CaseDetails";
import CaseHistory from "./pages/cases/CaseHistory";

import DoctorLayout from "./layouts/DoctorLayout";
import AuthLayout from "./layouts/AuthLayout";

function App() {
  return (
    <Routes>
      {/* =========================
          Doctor Authentication
          ========================= */}
      <Route element={<AuthLayout />}>
        <Route
          path="/doctor/login"
          element={<DoctorLogin />}
        />
      </Route>

      {/* =========================
          Doctor Application
          ========================= */}
      <Route element={<DoctorLayout />}>
        <Route
          path="/doctor/dashboard"
          element={<Dashboard />}
        />

        <Route
          path="/doctor/cases"
          element={<CaseQueue />}
        />

        <Route
          path="/doctor/cases/:caseId"
          element={<CaseDetails />}
        />

        <Route
          path="/doctor/history"
          element={<CaseHistory />}
        />
      </Route>

      {/* =========================
          Default Route
          ========================= */}
      <Route
        path="/"
        element={
          <Navigate
            to="/doctor/login"
            replace
          />
        }
      />

      {/* =========================
          Unknown Routes
          ========================= */}
      <Route
        path="*"
        element={
          <Navigate
            to="/doctor/login"
            replace
          />
        }
      />
    </Routes>
  );
}

export default App;
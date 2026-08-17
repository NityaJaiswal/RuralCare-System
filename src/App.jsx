import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { CaseProvider } from "./context/CaseContext";

// Authentication
import Login from "./pages/Login";
import Register from "./pages/Register";

// Patient Home
import Home from "./pages/Home";

// New Consultation
import NewCase from "./pages/NewCase";
import PhotoUpload from "./pages/PhotoUpload";
import CreateCase from "./pages/CreateCase";

// AI Consultation
import AIChat from "./pages/AIChat";
import AIReviewing from "./pages/AIReviewing";

// Doctor Review
import SentToDoctor from "./pages/SentToDoctor";
import WaitingForDoctor from "./pages/WaitingForDoctor";
import DoctorResponse from "./pages/DoctorResponse";

// Doctor Final Plan
import DoctorPlan from "./pages/DoctorPlan";

// Patient History
import History from "./pages/History";
import CaseDetails from "./pages/CaseDetails";


function App() {
  return (
    <BrowserRouter>
      <CaseProvider>

        <Routes>

          {/* ================================
              AUTHENTICATION
          ================================= */}

          <Route
            path="/login"
            element={<Login />}
          />

          <Route
            path="/register"
            element={<Register />}
          />


          {/* ================================
              PATIENT HOME
          ================================= */}

          <Route
            path="/home"
            element={<Home />}
          />


          {/* ================================
              NEW CONSULTATION
          ================================= */}

          <Route
            path="/consultation"
            element={<NewCase />}
          />

          <Route
            path="/consultation/photo"
            element={<PhotoUpload />}
          />

          <Route
            path="/consultation/create-case"
            element={<CreateCase />}
          />


          {/* ================================
              AI CONSULTATION
          ================================= */}

          <Route
            path="/consultation/chat"
            element={<AIChat />}
          />

          <Route
            path="/consultation/ai-reviewing"
            element={<AIReviewing />}
          />


          {/* ================================
              DOCTOR REVIEW
          ================================= */}

          <Route
            path="/consultation/sent-to-doctor"
            element={<SentToDoctor />}
          />

          <Route
            path="/consultation/waiting-doctor"
            element={<WaitingForDoctor />}
          />

          <Route
            path="/consultation/doctor-response"
            element={<DoctorResponse />}
          />


          {/* ================================
              DOCTOR FINAL PLAN
          ================================= */}

          <Route
            path="/consultation/doctor-plan"
            element={<DoctorPlan />}
          />


          {/* ================================
              PATIENT HISTORY
          ================================= */}

          <Route
            path="/history"
            element={<History />}
          />

          <Route
            path="/history/:caseId"
            element={<CaseDetails />}
          />


          {/* ================================
              DEFAULT / UNKNOWN ROUTES
          ================================= */}

          <Route
            path="*"
            element={
              <Navigate
                to="/login"
                replace
              />
            }
          />

        </Routes>

      </CaseProvider>
    </BrowserRouter>
  );
}

export default App;
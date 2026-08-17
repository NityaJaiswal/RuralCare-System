import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import "./index.css";
import App from "./App.jsx";

import { AuthProvider } from "./context/AuthContext.jsx";
import { CaseProvider } from "./context/CaseContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <CaseProvider>
          <App />
        </CaseProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
);
import { useEffect } from "react";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import { Dashboard } from "./pages/Dashboard";
import { Initial } from "./pages/Initial";
import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup";

export function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="*" element={<Navigate to="/initial" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/initial" element={<Initial />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

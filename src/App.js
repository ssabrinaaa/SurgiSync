import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";

import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import RegisterPatient from "./pages/RegisterPatient";
import SurgicalCases from "./pages/SurgicalCases";
import PrePostChecklist from "./pages/PrePostChecklist";
import AddCase from "./pages/AddCase";
import Header from "./components/Header";

const AppWrapper = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/home";

  return (
    <>
    {!isHomePage && <Header />}

    <Routes>
      <Route path="/" element={<Navigate to="/home" replace />} />
      <Route path="/home" element={<Home />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/registerpatient" element={<RegisterPatient />} />
      <Route path="/surgicalcases" element={<SurgicalCases />} />
      <Route path="/checklist" element={<PrePostChecklist />} />
      <Route path="/add-case" element={<AddCase />} />
    </Routes>
    </>
  );
};

export default function App() {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
}

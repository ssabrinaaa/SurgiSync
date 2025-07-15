import React, { useState } from "react";
import { useNavigate } from "react-router-dom"

const SurgicalCases = () => {
  const navigate = useNavigate();
  const [cases] = useState([
    {
      id: "C123",
      patient: "John Doe",
      procedure: "Appendectomy",
      date: "2025-07-08",
      time: "10:00 AM",
      status: "Scheduled",
    },
    {
      id: "C124",
      patient: "Jane Smith",
      procedure: "Knee Replacement",
      date: "2025-07-09",
      time: "1:30 PM",
      status: "Completed",
    },
  ]);

  return (
    <div className="min-h-screen bg-blue-100 font-manrope flex flex-col items-center px-4 py-10">
      <h1 className="text-3xl font-bold mb-2">Surgical Cases</h1>
      <p className="text-sm text-gray-600 mb-8">
        View, Add, or Update Surgical Cases Information
      </p>

      <div className="bg-white w-full max-w-4xl p-6 rounded-2xl shadow-md mb-6 space-y-6">
        {cases.map((c, index) => (
          <div key={index}
           className="border-b pb-4 last:border-b-0"
           onClick={() => navigate(`/checklist/${c.id}`, { state: { patient: c.patient, procedure: c.procedure } })}>
            <p><strong>Case ID:</strong> {c.id}</p>
            <p><strong>Patient:</strong> {c.patient}</p>
            <p><strong>Procedure:</strong> {c.procedure}</p>
            <p><strong>Date:</strong> {c.date}</p>
            <p><strong>Time:</strong> {c.time}</p>
            <p><strong>Status:</strong> {c.status}</p>
          </div>
        ))}
      </div>

      <button
        onClick={() => navigate("/add-case")}
        className="bg-teal-700 text-white font-semibold px-6 py-2 rounded-md hover:bg-teal-800 transition"
      >
        Add new cases
      </button>
    </div>
  );
};

export default SurgicalCases;


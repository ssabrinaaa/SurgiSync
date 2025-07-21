// src/pages/SurgicalCases.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

const SurgicalCases = () => {
  const navigate = useNavigate();
  const [cases, setCases]           = useState([]);
  const [patientsMap, setPatientsMap]     = useState({});
  const [proceduresMap, setProceduresMap] = useState({});

  useEffect(() => {
    // Build patient lookup
    api.get("/patients").then(r => {
      const m = {};
      r.data.forEach(p => {
        m[p.patient_id] = `${p.firstName} ${p.lastName}`;
      });
      setPatientsMap(m);
    });

    // Build procedure lookup
    api.get("/procedures").then(r => {
      const m = {};
      r.data.forEach(pr => {
        m[pr.procedure_id] = pr.name;
      });
      setProceduresMap(m);
    });

    // Fetch cases
    api.get("/cases").then(r => {
      const arr = r.data.map(item => ({
        id:          item.case_id,
        patientId:   item.patientId,
        procedureId: item.procedureId,
        date:        item.date,
        time:        item.time,
        status:      item.status,
      }));
      setCases(arr);
    });
  }, []);

  return (
    <div className="min-h-screen bg-blue-100 font-manrope flex flex-col items-center px-4 py-10">
      <h1 className="text-3xl font-bold mb-2">Surgical Cases</h1>
      <p className="text-sm text-gray-600 mb-8">
        View, Add, or Update Surgical Cases Information
      </p>

      <div className="bg-white w-full max-w-4xl p-6 rounded-2xl shadow-md mb-6 space-y-6">
        {cases.map((c, index) => (
          <div
            key={index}
            className="border-b pb-4 last:border-b-0 cursor-pointer"
            onClick={() =>
              navigate(`/checklist/${c.id}`, {
                state: {
                  patient:   patientsMap[c.patientId],
                  procedure: proceduresMap[c.procedureId],
                },
              })
            }
          >
            <p>
              <strong>Patient:</strong>{" "}
              {patientsMap[c.patientId] || c.patientId}
            </p>
            <p>
              <strong>Procedure:</strong>{" "}
              {proceduresMap[c.procedureId] || c.procedureId}
            </p>
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
        Add new case
      </button>
    </div>
  );
};

export default SurgicalCases;

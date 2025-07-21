// src/pages/AddCase.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

const AddCase = () => {
  const [formData, setFormData] = useState({
    patientId: "",
    procedureId: "",
    date: "",
    time: "",
    status: "",
    preOp: [],
    postOp: []
  });
  const [patients, setPatients]     = useState([]);
  const [procedures, setProcedures] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    api.get("/patients").then(r => setPatients(r.data));
    api.get("/procedures").then(r => setProcedures(r.data));
  }, []);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    // backend will generate the case ID
    await api.post("/cases", formData);
    navigate("/surgicalCases");
  };

  return (
    <div className="min-h-screen bg-blue-100 flex items-center justify-center font-manrope px-4 py-10">
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-lg">
        <h1 className="text-2xl font-bold text-center mb-2">
          Add New Surgical Case
        </h1>
        <p className="text-sm text-gray-600 text-center mb-6">
          Fill out the case information below.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Patient dropdown */}
          <div>
            <label htmlFor="patientId" className="block text-left mb-1">
              Patient
            </label>
            <select
              id="patientId"
              name="patientId"
              value={formData.patientId}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2"
              required
            >
              <option value="">– select patient –</option>
              {patients.map(p => (
                <option key={p.patient_id} value={p.patient_id}>
                  {p.firstName} {p.lastName}
                </option>
              ))}
            </select>
          </div>

          {/* Procedure dropdown */}
          <div>
            <label htmlFor="procedureId" className="block text-left mb-1">
              Procedure
            </label>
            <select
              id="procedureId"
              name="procedureId"
              value={formData.procedureId}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2"
              required
            >
              <option value="">– select procedure –</option>
              {procedures.map(proc => (
                <option key={proc.procedure_id} value={proc.procedure_id}>
                  {proc.name}
                </option>
              ))}
            </select>
          </div>

          {/* Date */}
          <div>
            <label htmlFor="date" className="block text-left mb-1">
              Date
            </label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2"
              required
            />
          </div>

          {/* Time */}
          <div>
            <label htmlFor="time" className="block text-left mb-1">
              Time
            </label>
            <input
              type="time"
              id="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2"
              required
            />
          </div>

          {/* Status */}
          <div>
            <label htmlFor="status" className="block text-left mb-1">
              Status
            </label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2"
              required
            >
              <option value="">Select status</option>
              <option value="Scheduled">Scheduled</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-teal-700 text-white font-semibold px-6 py-2 rounded-md hover:bg-teal-800 transition"
          >
            Submit Case
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCase;

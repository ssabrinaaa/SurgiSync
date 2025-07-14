import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddCase = () => {
  const [formData, setFormData] = useState({
    caseId: "",
    patient: "",
    procedure: "",
    date: "",
    time: "",
    status: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("New Case Added:", formData);
    // TODO: Send to backend
    navigate("/cases"); // Go back to Surgical Cases list
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
          {["caseId", "patient", "procedure", "date", "time"].map((field) => (
            <div key={field}>
              <label
                htmlFor={field}
                className="block text-left mb-1 capitalize"
              >
                {field === "caseId"
                  ? "Case ID"
                  : field.charAt(0).toUpperCase() + field.slice(1)}
              </label>
              <input
                type={field === "date" ? "date" : "text"}
                name={field}
                id={field}
                value={formData[field]}
                onChange={handleChange}
                className="w-full border rounded-md px-3 py-2"
                required
              />
            </div>
          ))}

          {/* Status field as a dropdown */}
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

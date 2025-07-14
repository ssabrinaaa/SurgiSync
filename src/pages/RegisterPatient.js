import React, { useState } from "react";

const RegisterPatient = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dob: "",
    medicalId: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Patient Registered:", formData);
    // Reset form
    setFormData({ firstName: "", lastName: "", dob: "", medicalId: "" });
  };

  return (
    <div className="bg-blue-100 py-10 px-4 min-h-screen font-manrope">
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md mx-auto">
        <h1 className="text-2xl font-bold text-center mb-2">Register Patient</h1>
        <p className="text-sm text-gray-600 text-center mb-6">
          Enter new patient details below.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-left mb-1 font-medium">
              <span role="img" aria-label="user">👤</span> First Name:
            </label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-600"
              required
            />
          </div>

          <div>
            <label className="block text-left mb-1 font-medium">
              <span role="img" aria-label="user">👤</span> Last Name:
            </label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-600"
              required
            />
          </div>

          <div>
            <label className="block text-left mb-1 font-medium">
              <span role="img" aria-label="calendar">📅</span> Date of Birth:
            </label>
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-600"
              required
            />
          </div>

          <div>
            <label className="block text-left mb-1 font-medium">
              <span role="img" aria-label="id">🆔</span> Medical ID:
            </label>
            <input
              type="text"
              name="medicalId"
              value={formData.medicalId}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-600"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-teal-700 hover:bg-teal-800 text-white font-semibold py-2 px-4 rounded-md transition"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPatient;

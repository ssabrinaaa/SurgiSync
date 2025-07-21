// src/pages/RegisterPatient.js
import React, { useState } from 'react';
import api from '../api';

const RegisterPatient = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dob: '',
    phone: '',
    address: ''
  });
  const [status, setStatus] = useState('');

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // derive age in years from a yyyy-mm-dd string
  const calculateAge = dob => {
    const birth = new Date(dob);
    const diff = Date.now() - birth.getTime();
    const ageDt = new Date(diff);
    return Math.abs(ageDt.getUTCFullYear() - 1970);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setStatus('');

    // compute age just before sending
    const age = calculateAge(formData.dob);
    const payload = { ...formData, age };

    try {
      await api.post('/patients', payload);
      setStatus('Patient registered successfully');
      setFormData({
        firstName: '',
        lastName: '',
        dob: '',
        phone: '',
        address: ''
      });
    } catch (err) {
      console.error(err);
      setStatus('Error registering patient');
    }
  };

  return (
    <div className="bg-blue-100 py-10 px-4 min-h-screen font-manrope">
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md mx-auto">
        <h1 className="text-2xl font-bold text-center mb-4">Register Patient</h1>
        {status && <p className="text-center text-sm mb-4">{status}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">First Name</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-600"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-600"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Date of Birth</label>
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              required
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-600"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Phone Number</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-600"
              placeholder="e.g. (555) 123‑4567"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Address</label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              rows="3"
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-600"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-teal-700 hover:bg-teal-800 text-white font-semibold py-2 rounded-md transition"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPatient;

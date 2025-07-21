// src/pages/PrePostChecklist.js
import React, { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import api from "../api";

const PrePostChecklist = () => {
  const { id } = useParams();
  const { state } = useLocation(); // contains { patient, procedure }
  const navigate = useNavigate();

  const [caseInfo, setCaseInfo]         = useState(null);
  const [procTemplate, setProcTemplate] = useState(null);
  const [preOp, setPreOp]               = useState([]);
  const [postOp, setPostOp]             = useState([]);
  const [saving, setSaving]             = useState(false);

  // 1) Load the case, then its procedure template
  useEffect(() => {
    api.get(`/cases/${id}`)
      .then((r) => {
        setCaseInfo(r.data);
        return api.get(`/procedures/${r.data.procedureId}`);
      })
      .then((r) => setProcTemplate(r.data))
      .catch(console.error);
  }, [id]);

  // 2) When both are ready, initialize checkbox state
  useEffect(() => {
    if (!caseInfo || !procTemplate) return;

    setPreOp(
      procTemplate.preOp.map((label) => ({
        label,
        checked: caseInfo.preOp.includes(label),
      }))
    );
    setPostOp(
      procTemplate.postOp.map((label) => ({
        label,
        checked: caseInfo.postOp.includes(label),
      }))
    );
  }, [caseInfo, procTemplate]);

  const toggle = (type, idx) => {
    const updater = type === "preOp" ? setPreOp : setPostOp;
    const list    = type === "preOp" ? preOp   : postOp;
    updater(
      list.map((item, i) =>
        i === idx ? { ...item, checked: !item.checked } : item
      )
    );
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await api.put(`/cases/${id}`, {
        preOp:  preOp.filter((i) => i.checked).map((i) => i.label),
        postOp: postOp.filter((i) => i.checked).map((i) => i.label),
      });
      navigate("/surgicalCases");
    } catch (err) {
      console.error("Save failed:", err);
      setSaving(false);
    }
  };

  // Show loading until we have both
  if (!caseInfo || !procTemplate) {
    return (
      <div className="min-h-screen bg-blue-100 flex items-center justify-center">
        <p className="text-gray-700">Loading checklist…</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-blue-100 px-4 py-10 font-manrope text-center">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
        Pre/Post‑Op Checklists
      </h1>
      <p className="text-sm md:text-base text-gray-700 mb-6">
        Ensure compliance at every step of the surgical journey.
      </p>

      <div className="bg-white rounded-xl shadow-md max-w-xs md:max-w-md mx-auto p-4 mb-8 text-left text-sm text-gray-800 leading-relaxed">
        <p>
          <strong>Patient:</strong> {state.patient}
        </p>
        <p>
          <strong>Procedure:</strong> {state.procedure}
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-md max-w-3xl mx-auto p-6 mb-6 text-left">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          Pre‑Op Checklist
        </h2>
        {preOp.map((item, idx) => (
          <label key={idx} className="block text-gray-700 text-base mb-3">
            <input
              type="checkbox"
              checked={item.checked}
              onChange={() => toggle("preOp", idx)}
              className="mr-2"
            />
            {item.label}
          </label>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-md max-w-3xl mx-auto p-6 text-left mb-8">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          Post‑Op Checklist
        </h2>
        {postOp.map((item, idx) => (
          <label key={idx} className="block text-gray-700 text-base mb-3">
            <input
              type="checkbox"
              checked={item.checked}
              onChange={() => toggle("postOp", idx)}
              className="mr-2"
            />
            {item.label}
          </label>
        ))}
      </div>

      <button
        onClick={handleSave}
        disabled={saving}
        className="w-full max-w-md mx-auto bg-teal-700 text-white font-semibold px-6 py-2 rounded-md hover:bg-teal-800 transition"
      >
        {saving ? "Saving…" : "Update Checklist"}
      </button>
    </div>
  );
};

export default PrePostChecklist;

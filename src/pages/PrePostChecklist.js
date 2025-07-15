import React from "react";
import { useLocation, useParams } from "react-router-dom";

const PrePostChecklist = () => {
  const { id } = useParams();
  const { state } = useLocation();

  const preOpItems = [
    "Confirm patient identity",
    "Review medical history",
    "Obtain signed consent",
    "Verify surgical site and procedure",
  ];

  const postOpItems = [
    "Monitor vitals and recovery",
    "Pain assessment completed",
    "Provide post-op care instruction",
    "Schedule follow-up visit",
  ];

  return (
    <div className="min-h-screen bg-blue-100 px-4 py-10 font-manrope text-center">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
        Pre/Post-Op Checklists
      </h1>
      <p className="text-sm md:text-base text-gray-700 mb-6">
        Ensure compliance at every step of the surgical journey.
      </p>

      <div className="bg-white rounded-xl shadow-md max-w-xs md:max-w-md mx-auto p-4 mb-8 text-left text-sm text-gray-800 leading-relaxed">
        <p><strong>Case ID:</strong> {id}</p>
        <p><strong>Patient:</strong> {state?.patient || "N/A"}</p>
        <p><strong>Procedure:</strong> {state?.procedure || "N/A"}</p>
      </div>

      <div className="bg-white rounded-xl shadow-md max-w-3xl mx-auto p-6 mb-6 text-left">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          Pre-Op Checklist
        </h2>
        {preOpItems.map((item, index) => (
          <label key={index} className="block text-gray-700 text-base mb-3">
            <input type="checkbox" className="mr-2" />
            {item}
          </label>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-md max-w-3xl mx-auto p-6 text-left">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          Post-Op Checklist
        </h2>
        {postOpItems.map((item, index) => (
          <label key={index} className="block text-gray-700 text-base mb-3">
            <input type="checkbox" className="mr-2" />
            {item}
          </label>
        ))}
      </div>
    </div>
  );
};

export default PrePostChecklist;

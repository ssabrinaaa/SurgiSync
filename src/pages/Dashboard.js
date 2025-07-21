// src/pages/Dashboard.js
import React, { useState, useEffect } from "react";
import api from "../api";

const Dashboard = () => {
  const [patients, setPatients]       = useState([]);
  const [procedures, setProcedures]   = useState([]);
  const [cases, setCases]             = useState([]);

  useEffect(() => {
    api.get("/patients").then(r => setPatients(r.data)).catch(console.error);
    api.get("/procedures").then(r => setProcedures(r.data)).catch(console.error);
    api.get("/cases").then(r => setCases(r.data)).catch(console.error);
  }, []);

  // build a lookup of procedure_id → procedure
  const procMap = {};
  procedures.forEach(p => {
    procMap[p.procedure_id] = p;
  });

  // today in YYYY-MM-DD
  const now      = new Date();
  const yyyy     = now.getFullYear();
  const mm       = String(now.getMonth() + 1).padStart(2, "0");
  const dd       = String(now.getDate()).padStart(2, "0");
  const todayStr = `${yyyy}-${mm}-${dd}`;

  // 1) Total patients
  const totalPatients = patients.length;

  // 2) Surgeries scheduled for today
  const surgeriesToday = cases.filter(c => c.date === todayStr).length;

  // 3) Pending Pre-Op
  const pendingPreOpCases = cases.filter(c => {
    const proc = procMap[c.procedureId];
    return proc && c.preOp.length < proc.preOp.length;
  });
  const pendingPreOpCount = pendingPreOpCases.length;

  // 4) Pending Post-Op
  const pendingPostOpCases = cases.filter(c => {
    const proc = procMap[c.procedureId];
    return proc && c.postOp.length < proc.postOp.length;
  });
  const pendingPostOpCount = pendingPostOpCases.length;

  // helper to format YYYY-MM-DD → MM/DD/YYYY
  const formatDate = iso => {
    const [y, m, d] = iso.split("-");
    return `${m}/${d}/${y}`;
  };

  // 5) Upcoming surgeries (date ≥ today), sorted, take next 4
  const upcomingSurgeries = cases
    .filter(c => c.date >= todayStr)
    .sort((a, b) =>
      a.date.localeCompare(b.date) || a.time.localeCompare(b.time)
    )
    .slice(0, 4)
    .map(c => ({
      id:        c.case_id,
      patient:   `${patients.find(p => p.patient_id === c.patientId)?.firstName} ${patients.find(p => p.patient_id === c.patientId)?.lastName}`,
      procedure: procMap[c.procedureId]?.name,
      date:      c.date,
      time:      c.time
    }));

  // 6) 2 most recent with uncompleted Pre-Op
  const recentUncompletedPreOp = pendingPreOpCases
    .sort((a, b) =>
      b.date.localeCompare(a.date) || b.time.localeCompare(a.time)
    )
    .slice(0, 2)
    .map(c => ({
      id:        c.case_id,
      patient:   `${patients.find(p => p.patient_id === c.patientId)?.firstName} ${patients.find(p => p.patient_id === c.patientId)?.lastName}`,
      procedure: procMap[c.procedureId]?.name,
      date:      c.date,
      time:      c.time
    }));

  // 7) 2 past surgeries with uncompleted Post-Op
  const completedUncompletedPostOp = cases
    .filter(c =>
      c.date < todayStr &&
      procMap[c.procedureId] &&
      c.postOp.length < procMap[c.procedureId].postOp.length
    )
    .sort((a, b) =>
      b.date.localeCompare(a.date) || b.time.localeCompare(a.time)
    )
    .slice(0, 2)
    .map(c => ({
      id:        c.case_id,
      patient:   `${patients.find(p => p.patient_id === c.patientId)?.firstName} ${patients.find(p => p.patient_id === c.patientId)?.lastName}`,
      procedure: procMap[c.procedureId]?.name,
      date:      c.date,
      time:      c.time
    }));

  // 8a) Pre-Op completion %
  const preOpCompletedCount = cases.filter(c => {
    const proc = procMap[c.procedureId];
    return proc && c.preOp.length >= proc.preOp.length;
  }).length;
  const preOpCompletionRate = cases.length
    ? Math.round((preOpCompletedCount / cases.length) * 100)
    : 0;

  // 8b) Post-Op completion %
  const postOpCompletedCount = cases.filter(c => {
    const proc = procMap[c.procedureId];
    return proc && c.postOp.length >= proc.postOp.length;
  }).length;
  const postOpCompletionRate = cases.length
    ? Math.round((postOpCompletedCount / cases.length) * 100)
    : 0;

  // stats cards 1–4
  const stats = [
    { label: "Total Patients Registered", value: totalPatients },
    { label: "Surgeries Scheduled Today", value: surgeriesToday },
    { label: "Pending Pre‑Op Checklist", value: pendingPreOpCount },
    { label: "Pending Post‑Op Checklist", value: pendingPostOpCount },
  ];

  return (
    <div className="min-h-screen bg-blue-100 px-6 py-10 font-manrope">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-10 text-gray-800">
        Dashboard
      </h1>

      {/* Cards 1–4 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {stats.map((item, i) => (
          <div
            key={i}
            className="bg-white rounded-xl p-6 shadow-md text-center"
          >
            <h2 className="text-2xl font-bold text-gray-800">
              {item.value}
            </h2>
            <p className="text-sm text-gray-600 mt-2">
              {item.label}
            </p>
          </div>
        ))}
      </div>

      {/* Upcoming, Compliance, Recent Pre-Op, Past Post-Op */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* 5) Upcoming Surgeries */}
        <div className="bg-white rounded-xl p-6 shadow-md">
          <h3 className="text-lg font-semibold mb-4 text-gray-700">
            Upcoming Surgeries
          </h3>
          <div className="space-y-3 max-h-48 overflow-y-auto">
            {upcomingSurgeries.map((s, i) => (
              <div
                key={i}
                className="bg-blue-100 p-3 rounded-md text-sm text-gray-800"
              >
                <strong>{s.patient}</strong> — {s.procedure} @{" "}
                {s.time}, {formatDate(s.date)}
              </div>
            ))}
          </div>
        </div>

        {/* 8) Checklist Compliance */}
        <div className="bg-white rounded-xl p-6 shadow-md">
          <h3 className="text-lg font-semibold mb-4 text-gray-700">
            Checklist Compliance
          </h3>
          <p className="text-sm text-gray-800 mb-2">
            Pre‑Op Completion Rate:&nbsp;
            <strong>{preOpCompletionRate}%</strong>
          </p>
          <p className="text-sm text-gray-800">
            Post‑Op Completion Rate:&nbsp;
            <strong>{postOpCompletionRate}%</strong>
          </p>
        </div>

        {/* 6) Recent Pending Pre‑Op */}
        <div className="bg-white rounded-xl p-6 shadow-md">
          <h3 className="text-lg font-semibold mb-4 text-gray-700">
            Recent Pending Pre‑Op
          </h3>
          <div className="space-y-2 text-sm text-gray-800">
            {recentUncompletedPreOp.map((c, i) => (
              <div key={i}>
                <strong>{c.patient}</strong> — {c.procedure} (
                {formatDate(c.date)})
              </div>
            ))}
          </div>
        </div>

        {/* 7) Past Surgeries Pending Post‑Op */}
        <div className="bg-white rounded-xl p-6 shadow-md">
          <h3 className="text-lg font-semibold mb-4 text-gray-700">
            Past Surgeries Pending Post‑Op
          </h3>
          <div className="space-y-2 text-sm text-gray-800">
            {completedUncompletedPostOp.map((c, i) => (
              <div key={i}>
                <strong>{c.patient}</strong> — {c.procedure} (
                {formatDate(c.date)})
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

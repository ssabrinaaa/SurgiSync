import React from "react";

const Dashboard = () => {
  const stats = [
    { label: "Total patients registered", value: 0 },
    { label: "Surgeries Scheduled Today", value: 0 },
    { label: "Pending Pre-Op Checklist", value: 0 },
    { label: "Post-Op Follow Ups Due", value: 0 },
  ];

  const upcomingSurgeries = [
    { name: "Jayden", time: "10:00 AM", procedure: "Appendix" },
    { name: "Maya", time: "12:30 PM", procedure: "Gallbladder" },
  ];

  return (
    <div className="min-h-screen bg-blue-100 px-6 py-10 font-manrope">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-10 text-gray-800">
        Dashboard
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {stats.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-xl p-6 shadow-md text-center"
          >
            <h2 className="text-2xl font-bold text-gray-800">{item.value}</h2>
            <p className="text-sm text-gray-600 mt-2">{item.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-md">
          <h3 className="text-lg font-semibold mb-4 text-gray-700">
            Upcoming Surgeries
          </h3>
          <div className="space-y-3 max-h-48 overflow-y-auto">
            {upcomingSurgeries.map((surgery, index) => (
              <div
                key={index}
                className="bg-blue-100 p-3 rounded-md text-sm text-gray-800"
              >
                <strong>{surgery.name}</strong> — {surgery.procedure} @ {surgery.time}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-md">
          <h3 className="text-lg font-semibold mb-4 text-gray-700">
            Checklist Compliance
          </h3>
          <p className="text-sm text-gray-800 mb-2">
            Pre-op Completion Rate: <strong>85%</strong>
          </p>
          <p className="text-sm text-gray-800">
            Post-op Completion Rate: <strong>72%</strong>
          </p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-md">
          <h3 className="text-lg font-semibold mb-4 text-gray-700">
            Alerts & Reminders
          </h3>
          <ul className="list-disc list-inside text-sm text-gray-800 space-y-2">
            <li>No post-op follow-up logged for Case #345327</li>
            <li>Jayden’s checklist due in 2 hours</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

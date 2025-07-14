import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const cards = [
    {
      title: "Dashboard",
      icon: "📊",
      route: "/dashboard",
    },
    {
      title: "Register Patient",
      icon: "🩺",
      route: "/registerpatient",
    },
    {
      title: "Surgical Cases",
      icon: "🗂️",
      description: "view, add, or update cases",
      route: "/surgicalcases",
    },
    {
      title: "Pre/Post-Op Checklist",
      icon: "✅",
      description: "ensure procedure compliance",
      route: "/checklist",
    },
  ];

  return (
    <div className="min-h-screen bg-blue-100 flex flex-col items-center px-4 py-10 font-manrope text-center">
      <h1 className="text-5xl font-bold mb-2">SurgiSync</h1>
      <p className="text-lg text-gray-700 mb-10">
        Seamless Surgical Case Management in One Place
      </p>

      <div className="bg-white rounded-xl shadow-md p-6 mb-10 max-w-xl">
        <h2 className="text-2xl font-semibold mb-2">Welcome to SurgiSync!</h2>
        <p className="text-gray-600">
          Start by selecting a task above to manage your surgical workflow efficiently.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {cards.map((card) => (
          <div
            key={card.title}
            onClick={() => navigate(card.route)}
            className="bg-white rounded-xl shadow-md p-6 w-48 cursor-pointer hover:shadow-lg transition text-center"
          >
            <div className="text-4xl mb-3">{card.icon}</div>
            <h3 className="text-lg font-bold">{card.title}</h3>
            {card.description && (
              <p className="text-sm text-gray-500 mt-1">{card.description}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;

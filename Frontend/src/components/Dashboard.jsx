import React from "react";
import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";

const dummyData = [
  {
    id: 1,
    department: "Technical",
    agenda: "Weekly Sync",
    date: "2025-06-15",
    mode: "Online",
  },
  {
    id: 2,
    department: "Corporate",
    agenda: "Budget Planning",
    date: "2025-06-13",
    mode: "Offline",
  },
];

const Dashboard = () => {
  const navigate = useNavigate();

  const handleAdd = () => {
    navigate("/mom");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-300 via-purple-300 to-indigo-400 p-6 relative">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-10 text-center">Dashboard</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {dummyData.map(({ id, department, agenda, date, mode }) => (
            <div
              key={id}
              className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition duration-300"
            >
              <h2 className="text-2xl font-semibold text-gray-800 mb-3">{department}</h2>
              <div className="space-y-1 text-gray-700">
                <p>
                  <span className="font-medium">Agenda:</span> {agenda}
                </p>
                <p>
                  <span className="font-medium">Date:</span> {date}
                </p>
                <p>
                  <span className="font-medium">Mode:</span> {mode}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={handleAdd}
        aria-label="Add new MoM"
        className="fixed bottom-6 right-6 bg-purple-600 text-white p-4 rounded-full shadow-lg hover:bg-purple-700 focus:outline-none focus:ring-4 focus:ring-purple-300"
      >
        <Plus className="w-6 h-6" />
      </button>
    </div>
  );
};

export default Dashboard;

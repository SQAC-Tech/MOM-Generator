import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";
import axios from "axios";

const Dashboard = () => {
  const [momList, setMomList] = useState([]);
  const navigate = useNavigate();

  const handleAdd = () => {
    navigate("/mom");
  };

  useEffect(() => {
    const fetchMOMs = async () => {
      try {
        const res = await axios.get("http://localhost:3000/mom");
        setMomList(res.data);
      } catch (err) {
        console.error("Failed to fetch MOM data:", err.message);
      }
    };

    fetchMOMs();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-300 via-purple-300 to-indigo-400 p-6 relative">
      <div className="max-w-6xl mx-auto">

        <div className="flex justify-center mb-4">
  <img src="/public/SQAClogo.png" alt="SQAC Logo" className="h-16 w-auto" />
</div>
        <h1 className="text-4xl font-bold text-gray-800 mb-10 text-center">Dashboard</h1>

      {momList.length === 0 ? (
        <p className="text-center text-xl text-gray-800 bg-white p-6 rounded-xl shadow-md">
          No meetings for this month
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {momList.map(({ _id, department, agenda, date, mode }) => (
            <div
              key={_id}
              className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition duration-300"
            >
              <h2 className="text-2xl font-semibold text-gray-800 mb-3">{department}</h2>
              <div className="space-y-1 text-gray-700">
                <p><span className="font-medium">Agenda:</span> {agenda}</p>
                <p><span className="font-medium">Date:</span> {new Date(date).toLocaleDateString()}</p>
                <p><span className="font-medium">Mode:</span> {mode}</p>
              </div>
            </div>
          ))}
        </div>
      )}
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

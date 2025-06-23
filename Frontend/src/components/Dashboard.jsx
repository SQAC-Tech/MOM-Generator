import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Plus } from "lucide-react";
import axios from "axios";

const Dashboard = () => {
  const [momList, setMomList] = useState([]);
  const [filterDomain, setFilterDomain] = useState("All");
  const [sortOrder, setSortOrder] = useState("desc");

  const navigate = useNavigate();

  const handleAdd = () => {
    navigate("/mom");
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
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

  // Apply filter
  const filteredData = momList.filter(
    (item) => filterDomain === "All" || item.department === filterDomain
  );

  // Apply sorting
  const sortedData = [...filteredData].sort((a, b) => {
    return sortOrder === "asc"
      ? new Date(a.date) - new Date(b.date)
      : new Date(b.date) - new Date(a.date);
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-300 via-purple-300 to-indigo-400 p-6 relative">
      {/* Logout */}
      <div className="absolute top-4 right-4">
        <button
          onClick={handleLogout}
          className="bg-purple-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg text-sm sm:text-base font-bold transition-all duration-300 cursor-pointer"
        >
          Logout
        </button>
      </div>
      <div className="absolute top-4 left-4 cursor-pointer">
        <Link to="/credits"><button
          className="bg-purple-600 hover:bg-purple-800 text-white px-6 py-2 rounded-lg text-sm sm:text-base font-bold transition-all duration-300 cursor-pointer"
        >
          Credits
        </button></Link>
      </div>

      <div className="max-w-6xl mx-auto">
        {/* Logo */}
        <div className="flex justify-center mb-4">
          <img src="/public/SQAClogo.png" alt="SQAC Logo" className="h-16 w-auto" />
        </div>

        {/* Heading */}
        <h1 className="text-4xl font-bold text-gray-800 mb-6 text-center">Dashboard</h1>

        {/* Filter & Sort */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
          <div>
            <label className="mr-2 font-semibold text-gray-700">Filter by Domain:</label>
            <select
              value={filterDomain}
              onChange={(e) => setFilterDomain(e.target.value)}
              className="px-4 py-2 rounded-lg border border-gray-300 cursor-pointer"
            >
              <option value="All">All</option>
              <option value="Full Team">Full Team</option>
              <option value="Technical">Technical</option>
              <option value="Corporate">Corporate</option>
            </select>

          </div>

          <div>
            <label className="mr-2 font-semibold text-gray-700">Sort by Date:</label>
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="px-4 py-2 rounded-lg border border-gray-300 cursor-pointer"
            >
              <option value="desc">Newest First</option>
              <option value="asc">Oldest First</option>
            </select>
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {sortedData.length > 0 ? (
            sortedData.map(({ _id, department, agenda, date, mode }) => (
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
            ))
          ) : (
            <p className="text-gray-800 col-span-full text-center font-medium">No meetings found.</p>
          )}
        </div>
      </div>

      {/* Add New MoM Button */}
      <button
        onClick={handleAdd}
        aria-label="Add new MoM"
        className="fixed bottom-6 right-6 bg-purple-600 text-white p-4 rounded-full shadow-lg hover:bg-purple-700 focus:outline-none focus:ring-4 focus:ring-purple-300"
      >
        <Plus className="w-6 h-6 cursor-pointer" />
      </button>
    </div>
  );
};

export default Dashboard;

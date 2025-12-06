import React, { useEffect, useState } from "react";
import axios from "axios";

function AddPeople() {
  const [name, setName] = useState("");
  const [peopleList, setPeopleList] = useState([]);
  const [loading, setLoading] = useState(false);

  // Auto URL switching
  const API_BASE =
    import.meta.env.MODE === "development"
      ? "http://localhost:3000"
      : "https://mom-generator.onrender.com";

  const token = localStorage.getItem("authToken");

  // Fetch all people
  const fetchPeople = async () => {
    try {
      const res = await axios.get(`${API_BASE}/people`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.data.success) {
        setPeopleList(res.data.people);
      }
    } catch (error) {
      console.error("Error loading people:", error);
    }
  };

  useEffect(() => {
    fetchPeople();
  }, []);

  // Add new person
  const handleAdd = async () => {
    if (!name.trim()) return alert("Name cannot be empty");

    try {
      setLoading(true);
      const res = await axios.post(
        `${API_BASE}/people`,
        { name },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (res.data.success) {
        alert("Person added!");
        setName("");
        fetchPeople();
      } else {
        alert("Failed to add");
      }
    } catch (err) {
      alert(err.response?.data?.message || "Error adding name");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Delete person
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this person?")) return;

    try {
      await axios.delete(`${API_BASE}/people/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      fetchPeople();
    } catch (err) {
      alert("Error deleting");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-300 to-pink-300 flex items-center justify-center p-6">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-lg">

        <h1 className="text-2xl font-bold mb-4 text-center text-gray-800">
          Add Attendees (Admin Only)
        </h1>

        {/* Add Form */}
        <div className="flex gap-3 mb-6">
          <input
            type="text"
            placeholder="Enter attendee name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="flex-1 px-4 py-2 border rounded-lg"
          />
          <button
            onClick={handleAdd}
            disabled={loading}
            className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
          >
            {loading ? "Adding..." : "Add"}
          </button>
        </div>

        {/* People List */}
        <h2 className="text-xl font-semibold mb-3">Current Attendees</h2>

        <div className="space-y-3">
          {peopleList.length === 0 ? (
            <p className="text-gray-600 text-center">No attendees found</p>
          ) : (
            peopleList.map((person) => (
              <div
                key={person._id}
                className="flex justify-between items-center bg-gray-100 p-3 rounded-lg"
              >
                <span className="font-medium">{person.name}</span>

                <button
                  onClick={() => handleDelete(person._id)}
                  className="text-red-600 hover:text-red-800 font-bold"
                >
                  Delete
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default AddPeople;

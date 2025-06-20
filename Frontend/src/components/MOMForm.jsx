import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Autocomplete, TextField } from "@mui/material";
import peopleData from "../../people.json";
import axios from "axios";
import jsPDF from "jspdf";

function MOMForm() {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [mode, setMode] = useState("");
  const [agenda, setAgenda] = useState("");
  const [discussion, setDiscussion] = useState("");
  const [attendees, setAttendees] = useState([]);
  const [department, setDepartment] = useState(" ");
  const [pdfPreviewUrl, setPdfPreviewUrl] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const navigate = useNavigate();

  const isFormValid =
    date.trim() !== "" &&
    time.trim() !== "" &&
    mode.trim() !== "" &&
    agenda.trim() !== "" &&
    discussion.trim() !== "" &&
    attendees.length > 0 &&
    department.trim() !== "" &&
    department.trim() !== " ";

  const handleSubmit = async () => {
    try {
      const response = await axios.post("http://localhost:3000/mom", {
        date,
        time: time.trim(),
        mode,
        agenda: agenda.trim(),
        attendees: attendees.map((a) => a.name),
        discussion: discussion.trim(),
      });

      if (response.data.success) {
        alert("MOM submitted successfully!");
        await generatePDF();

        // Reset form
        setDate("");
        setTime("");
        setMode("");
        setAgenda("");
        setDiscussion("");
        setAttendees([]);
        setDepartment(" ");
      } else {
        alert("Failed to submit MOM.");
      }
    } catch (err) {
      console.error("API Error:", err);
      alert("Error submitting MOM: " + err.message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  const generatePDF = async () => {
    const doc = new jsPDF();
    const img = new Image();
    img.src = "/SQAC.jpg";

    await new Promise((resolve) => (img.onload = resolve));

    const pageWidth = doc.internal.pageSize.getWidth();
    const imgWidth = 50;
    const imgX = (pageWidth - imgWidth) / 2;
    doc.addImage(img, "JPEG", imgX, 10, imgWidth, 25);

    doc.setFontSize(18);
    doc.text("Minutes of Meeting", pageWidth / 2, 45, { align: "center" });

    doc.setFontSize(12);
    doc.text(`Date: ${date}`, 20, 60);
    doc.text(`Time: ${time}`, 20, 70);
    doc.text(`Mode: ${mode}`, 20, 80);

    doc.text("Attendees:", 20, 95);
    attendees
      .map((a) => a.name)
      .sort()
      .forEach((name, i) => {
        doc.text(`• ${name}`, 25, 105 + i * 8);
      });

    const agendaStart = 105 + attendees.length * 8 + 10;
    doc.text("Agenda:", 20, agendaStart);
    doc.text(agenda, 25, agendaStart + 10);

    const discussionStart = agendaStart + 30;
    doc.text("Discussion Points:", 20, discussionStart);
    discussion.split("\n").forEach((point, i) => {
      doc.text(`• ${point}`, 25, discussionStart + 10 + i * 8);
    });

    doc.save(`MOM_${date}.pdf`);
  };

  const generatePDFBlob = async () => {
    const doc = new jsPDF();
    const img = new Image();
    img.src = "/SQAC.jpg";

    await new Promise((resolve) => (img.onload = resolve));

    const pageWidth = doc.internal.pageSize.getWidth();
    const imgWidth = 50;
    const imgX = (pageWidth - imgWidth) / 2;
    doc.addImage(img, "JPEG", imgX, 10, imgWidth, 25);

    doc.setFontSize(18);
    doc.text("Minutes of Meeting", pageWidth / 2, 45, { align: "center" });

    doc.setFontSize(12);
    doc.text(`Date: ${date}`, 20, 60);
    doc.text(`Time: ${time}`, 20, 70);
    doc.text(`Mode: ${mode}`, 20, 80);

    doc.text("Attendees:", 20, 95);
    attendees
      .map((a) => a.name)
      .sort()
      .forEach((name, i) => {
        doc.text(`• ${name}`, 25, 105 + i * 8);
      });

    const agendaStart = 105 + attendees.length * 8 + 10;
    doc.text("Agenda:", 20, agendaStart);
    doc.text(agenda, 25, agendaStart + 10);

    const discussionStart = agendaStart + 30;
    doc.text("Discussion Points:", 20, discussionStart);
    discussion.split("\n").forEach((point, i) => {
      doc.text(`• ${point}`, 25, discussionStart + 10 + i * 8);
    });

    const blob = doc.output("blob");
    const url = URL.createObjectURL(blob);
    setPdfPreviewUrl(url);
    setShowPreview(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-300 via-purple-300 to-indigo-400 flex items-center justify-center py-10 relative">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-4xl">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Minutes of the Meeting
        </h1>

        <div className="mb-6">
          <label htmlFor="Domain" className="block mb-1 text-sm font-medium text-gray-700">
            Domain Type
          </label>
          <select
            id="Domain"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            onChange={(e) => setDepartment(e.target.value)}
            value={department}
          >
            <option value=" ">Select your Domain</option>
            <option value="All">All</option>
            <option value="Corporate">Corporate</option>
            <option value="Technical">Technical</option>
          </select>
        </div>

        <div className="mb-6">
          <label htmlFor="date" className="block mb-1 text-sm font-medium text-gray-700">
            Date
          </label>
          <input
            type="date"
            id="date"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            onChange={(e) => setDate(e.target.value)}
            value={date}
          />
        </div>

        <div className="mb-6">
          <label htmlFor="time" className="block mb-1 text-sm font-medium text-gray-700">
            Time
          </label>
          <input
            type="text"
            id="time"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            placeholder="Enter time (e.g. 10:00 AM - 11:00 AM)"
            onChange={(e) => setTime(e.target.value)}
            value={time}
          />
        </div>

        <div className="mb-6">
          <label htmlFor="mode" className="block mb-1 text-sm font-medium text-gray-700">
            Mode
          </label>
          <select
            id="mode"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            onChange={(e) => setMode(e.target.value)}
            value={mode}
          >
            <option value=" ">Select Mode</option>
            <option value="Online">Online</option>
            <option value="Offline">Offline</option>
          </select>
        </div>

        <div className="mb-6">
          <label htmlFor="attendees" className="block mb-1 text-sm font-medium text-gray-700">
            Attendees
          </label>
          <Autocomplete
            multiple
            id="attendees"
            options={peopleData}
            getOptionLabel={(option) => option.name}
            value={attendees}
            onChange={(event, newValue) => setAttendees(newValue)}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder="Select attendees"
                className="bg-white"
              />
            )}
          />
        </div>

        {attendees.length > 0 && (
          <div className="mt-4">
            <h3 className="text-md font-semibold text-gray-800 mb-2">Attendees:</h3>
            <ol className="list-decimal pl-6 text-gray-700">
              {attendees
                .map((person) => person.name.trim())
                .sort((a, b) => a.localeCompare(b))
                .map((name, index) => (
                  <li key={index} className="break-words">{name}</li>
                ))}
            </ol>
          </div>
        )}

        <div className="mb-6">
          <label htmlFor="agenda" className="block mb-1 text-sm font-medium text-gray-700">
            Agenda
          </label>
          <input
            type="text"
            id="agenda"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            placeholder="Enter meeting agenda"
            onChange={(e) => setAgenda(e.target.value)}
            value={agenda}
          />
        </div>

        <div className="mb-6">
          <label htmlFor="discussion" className="block mb-1 text-sm font-medium text-gray-700">
            Discussion Points
          </label>
          <textarea
            id="discussion"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            placeholder="One point per line"
            rows="4"
            onChange={(e) => setDiscussion(e.target.value)}
            value={discussion}
          />
        </div>

        {discussion && (
          <div className="mb-6 mt-2">
            <h3 className="text-md font-semibold text-gray-800 mb-2">Preview:</h3>
            <ul className="list-disc pl-6 text-gray-700">
              {discussion.split("\n").map((point, index) => (
                <li key={index} className="break-words">{point}</li>
              ))}
            </ul>
          </div>
        )}

        <button
          type="button"
          onClick={generatePDFBlob}
          className="w-full mb-3 bg-pink-400 hover:bg-pink-600 text-white font-semibold py-2 rounded-lg cursor-pointer"
        >
          Preview PDF
        </button>

        <button
          type="button"
          onClick={handleSubmit}
          disabled={!isFormValid}
          className={`w-full ${
            isFormValid
              ? "bg-purple-400 hover:bg-purple-500"
              : "bg-gray-300 cursor-not-allowed"
          } text-white font-semibold py-2 rounded-lg transition-all duration-300`}
        >
          Submit and Download PDF
        </button>
      </div>

      <div className="absolute top-4 right-4">
        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg text-sm sm:text-base font-bold transition-all duration-300 cursor-pointer"
        >
          Logout
        </button>
      </div>

      {showPreview && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-11/12 max-w-3xl p-4 relative">
            <button
              onClick={() => setShowPreview(false)}
              className="absolute top-2 right-2 text-red-600 font-bold text-lg"
            >
              ×
            </button>
            <h2 className="text-xl font-semibold mb-2 text-center">PDF Preview</h2>
            <iframe
              src={pdfPreviewUrl}
              title="PDF Preview"
              className="w-full h-[500px] border"
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default MOMForm;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, LogOut } from "lucide-react";
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
      const response = await axios.post("https://mom-generator.onrender.com/mom", {
        date,
        time: time.trim(),
        mode,
        agenda: agenda.trim(),
        attendees: attendees.map((a) => a.name),
        discussion: discussion.trim(),
        department: department.trim(),
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

  // Function to generate PDF and download it

  const drawPDFPageLayout = (doc, bg, logo, pageWidth, pageHeight) => {
  if (bg.complete) {
    doc.addImage(bg, "PNG", 0, 0, pageWidth, pageHeight);
  }

  doc.setDrawColor(50);
  doc.setLineWidth(0.8);
  doc.rect(10, 10, pageWidth - 20, pageHeight - 20);

  if (logo.complete) {
    const imgWidth = 80;
    const imgHeight = 28;
    const imgX = (pageWidth - imgWidth) / 2;
    doc.addImage(logo, "JPEG", imgX, 13, imgWidth, imgHeight);
  }

  doc.setTextColor(0);
  doc.setFontSize(20);
  doc.setFont("helvetica", "bold");
  doc.text("Minutes of Meeting", pageWidth / 2, 50, { align: "center" });
  doc.setLineWidth(0.2);
  doc.line(20, 55, pageWidth - 20, 55);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(12);  
};

const generatePDF = async () => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const logo = new Image();
  logo.src = "/SQAC.jpg";
  const bg = new Image();
  bg.src = "/gradient-bg.png";

  await Promise.all([
    new Promise((resolve) => (logo.onload = resolve)),
    new Promise((resolve) => (bg.onload = resolve)),
  ]);

  drawPDFPageLayout(doc, bg, logo, pageWidth, pageHeight);

  let y = 65;
  const lineHeight = 8;
  const bottomMargin = pageHeight - 30;

  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text("Date:", 20, y);
  doc.setFont("helvetica", "normal");
  doc.text(date, 50, y);
  y += 10;

  doc.setFont("helvetica", "bold");
  doc.text("Time:", 20, y);
  doc.setFont("helvetica", "normal");
  doc.text(time, 50, y);
  y += 10;

  doc.setFont("helvetica", "bold");
  doc.text("Mode:", 20, y);
  doc.setFont("helvetica", "normal");
  doc.text(mode, 50, y);
  y += 10;

  doc.setFont("helvetica", "bold");
  doc.text("Domain:", 20, y);
  doc.setFont("helvetica", "normal");
  doc.text(department, 50, y);
  y += 20;

  doc.setFont("helvetica", "bold");
  doc.text("Attendees:", 20, y);
  y += 10;
  doc.setFont("helvetica", "normal");
  attendees.map((a) => a.name).sort().forEach((name) => {
    if (y + lineHeight > bottomMargin) {
      doc.addPage();
      drawPDFPageLayout(doc, bg, logo, pageWidth, pageHeight);
      y = 65;
    }
    doc.text(`• ${name}`, 25, y);
    y += lineHeight;
  });

  y += 10;
  doc.setFont("helvetica", "bold");
  doc.text("Agenda:", 20, y);
  y += 10;
  doc.setFont("helvetica", "normal");
  agenda.split("\n").forEach((line) => {
    if (y + lineHeight > bottomMargin) {
      doc.addPage();
      drawPDFPageLayout(doc, bg, logo, pageWidth, pageHeight);
      y = 65;
    }
    doc.text(line, 25, y);
    y += lineHeight;
  });

  y += 10;
  doc.setFont("helvetica", "bold");
  doc.text("Discussion Points:", 20, y);
  y += 10;
  doc.setFont("helvetica", "normal");
  discussion.split("\n").forEach((point) => {
    if (y + lineHeight > bottomMargin) {
      doc.addPage();
      drawPDFPageLayout(doc, bg, logo, pageWidth, pageHeight);
      y = 65;
    }
    doc.text(`• ${point}`, 25, y);
    y += lineHeight;
  });

  doc.save(`MOM_${date}.pdf`);
};

const generatePDFBlob = async () => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const logo = new Image();
  logo.src = "/SQAC.jpg";
  const bg = new Image();
  bg.src = "/gradient-bg.png";

  await Promise.all([
    new Promise((resolve) => (logo.onload = resolve)),
    new Promise((resolve) => (bg.onload = resolve)),
  ]);

  drawPDFPageLayout(doc, bg, logo, pageWidth, pageHeight);

  let y = 65;
  const lineHeight = 8;
  const bottomMargin = pageHeight - 30;

  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text("Date:", 20, y);
  doc.setFont("helvetica", "normal");
  doc.text(date, 50, y);
  y += 10;

  doc.setFont("helvetica", "bold");
  doc.text("Time:", 20, y);
  doc.setFont("helvetica", "normal");
  doc.text(time, 50, y);
  y += 10;

  doc.setFont("helvetica", "bold");
  doc.text("Mode:", 20, y);
  doc.setFont("helvetica", "normal");
  doc.text(mode, 50, y);
  y += 10;

  doc.setFont("helvetica", "bold");
  doc.text("Domain:", 20, y);
  doc.setFont("helvetica", "normal");
  doc.text(department, 50, y);
  y += 20;

  doc.setFont("helvetica", "bold");
  doc.text("Attendees:", 20, y);
   y += 10;
  doc.setFont("helvetica", "normal");
  attendees.map((a) => a.name).sort().forEach((name) => {
    if (y + lineHeight > bottomMargin) {
      doc.addPage();
      drawPDFPageLayout(doc, bg, logo, pageWidth, pageHeight);
      y = 65;
    }
    doc.text(`• ${name}`, 25, y);
    y += lineHeight;
  });

  y += 10;
  doc.setFont("helvetica", "bold");
  doc.text("Agenda:", 20, y);
  y += 10;
  doc.setFont("helvetica", "normal");
  agenda.split("\n").forEach((line) => {
    if (y + lineHeight > bottomMargin) {
      doc.addPage();
      drawPDFPageLayout(doc, bg, logo, pageWidth, pageHeight);
      y = 65;
    }
    doc.text(line, 25, y);
    y += lineHeight;
  });

  y += 10;
  doc.setFont("helvetica", "bold");
  doc.text("Discussion Points:", 20, y);
  y += 10;
  doc.setFont("helvetica", "normal");
  discussion.split("\n").forEach((point) => {
    if (y + lineHeight > bottomMargin) {
      doc.addPage();
      drawPDFPageLayout(doc, bg, logo, pageWidth, pageHeight);
      y = 65;
    }
    doc.text(`• ${point}`, 25, y);
    y += lineHeight;
  });

  const blob = doc.output("blob");
  const url = URL.createObjectURL(blob);
  setPdfPreviewUrl(url);
  setShowPreview(true);
};



  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-300 via-purple-300 to-indigo-400 flex items-center justify-center py-10 relative">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-4xl">
        <div className="flex justify-center mb-4">
          <img src="/SQACLogo.png" alt="SQAC Logo" className="h-16 w-auto" />
        </div>

        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Minutes of the Meeting
        </h1>

        {/* Back Button */}
        <div className="absolute top-1 left-4">
          <button
            onClick={() => navigate("/dashboard")}
            className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg shadow hover:bg-purple-700 transition-colors duration-300 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Dashboard</span>
          </button>
        </div>

        {/* Logout Button */}
        <div className="absolute top-1 right-4">
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-purple-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm sm:text-base font-bold transition-all duration-300 cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>

        <div className="mb-6">
          <label htmlFor="Domain" className="block mb-1 text-sm font-medium text-gray-700">
            Domain Type
          </label>
          <select
            id="Domain"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg cursor-pointer"
            onChange={(e) => setDepartment(e.target.value)}
            value={department}
          >
            <option value=" ">Select your Domain</option>
            <option value="Full Team">Full Team</option>
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
          disabled={!isFormValid}
          className={`w-full mb-3 ${isFormValid
            ? "bg-pink-400 hover:bg-pink-600 cursor-pointer"
            : "bg-gray-300 cursor-not-allowed"
            } text-white font-semibold py-2 rounded-lg transition-all duration-300`}
        >
          Preview PDF
        </button>

        <button
          type="button"
          onClick={handleSubmit}
          disabled={!isFormValid}
          className={`w-full ${isFormValid
            ? "bg-purple-400 hover:bg-purple-500 cursor-pointer"
            : "bg-gray-300 cursor-not-allowed"
            } text-white font-semibold py-2 rounded-lg transition-all duration-300`}
        >
          Submit and Download PDF
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

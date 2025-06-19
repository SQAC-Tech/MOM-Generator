import React, { use } from "react";
import { useState } from "react";

function MOMForm() { 
     const [date, setDate] = useState('');
     const [time, setTime] = useState('');
     const [mode, setMode] = useState('');
     const [agenda, setAgenda] = useState('');
     const [discussion, setDiscussion] = useState('');
     const [attendees, setAttendees] = useState('');
     const discussionPoints = discussion.split('\n');


    return (
    <div className="min-h-screen bg-gradient-to-b from-pink-300 via-purple-300 to-indigo-400 flex items-center justify-center">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-4xl">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Minutes of the Meeting</h1>

        <div className="mb-6">
            <label htmlFor="date" className="block mb-1 text-sm font-medium text-gray-700">Date</label>
            <input
              type="date"              id="date"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              onChange={(e) => setDate(e.target.value)}
              value={date}
            />
          </div>

          <div className="mb-6">
            <label htmlFor="Time" className="block mb-1 text-sm font-medium text-gray-700">Time</label>
            <input
              type="text"
              id="time"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              placeholder="Enter your start and end time (e.g. 10:00 AM - 11:00 AM)"
              onChange={(e) => setTime(e.target.value)}
              value={time}
            />
          </div>

          <div className="mb-6">
            <label htmlFor="Mode" className="block mb-1 text-sm font-medium text-gray-700">Mode</label>
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
  <textarea
    id="attendees"
    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
    placeholder="Enter names, one per line"
    rows="4"
    onChange={(e) => setAttendees(e.target.value)}
    value={attendees}
  />
</div>

            {attendees && (
  <div className="mt-4">
    <h3 className="text-md font-semibold text-gray-800 mb-2">Attendees:</h3>
    <ol className="list-decimal pl-6 text-gray-700">
      {attendees
        .split("\n")
        .map(name => name.trim())
        .filter(name => name !== "")
        .sort((a, b) => a.localeCompare(b))
        .map((name, index) => (
          <li key={index} className="break-words">{name}</li>
        ))}
    </ol>
  </div>
)}



          <div className="mb-6">
            <label htmlFor="Agenda" className="block mb-1 text-sm font-medium text-gray-700">Agenda</label>
            <input
                type="text"
                id="agenda"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                placeholder="Enter the agenda of the meeting"
                onChange={(e) => setAgenda(e.target.value)}
                value={agenda}
            />
          </div>

          <div className="mb-6">
  <label htmlFor="Discussion" className="block mb-1 text-sm font-medium text-gray-700">
    Discussion Points
  </label>
  <textarea
    id="Discussion"
    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
    placeholder="Enter the points discussed in the meeting (one per line)"
    rows="4"
    onChange={(e) => setDiscussion(e.target.value)}
    value={discussion}
  />
</div>

{discussion && (
  <div className="mb-6 mt-2">
    <h3 className="text-md font-semibold text-gray-800 mb-2">Preview:</h3>
    <ul className="list-disc pl-6 text-gray-700">
      {discussion.split('\n').map((point, index) => (
       <li key={index} className="break-words">{point}</li>
      ))}
    </ul>
  </div>
)}


          <button
            type="submit"
            className="w-full bg-purple-400 text-white font-semibold py-2 rounded-lg"
            >Submit and Download PDF
            </button>

</div>
    </div>

    );
}

export default MOMForm;
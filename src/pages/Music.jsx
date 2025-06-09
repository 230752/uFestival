import React, { useState } from "react";
import artists from "../assets/json/music/artists.json";
import schedule from "../assets/json/music/schedule.json";

const stages = ["Ponton", "The Lake", "The Club", "Hangar"];
const days = ["Saturday", "Sunday"];
const timeSlots = [
  "10:00", "10:15", "10:30", "10:45", "11:00", "11:15", "11:30", "11:45",
  "12:00", "12:15", "12:30", "12:45", "13:00", "13:15", "13:30", "13:45",
  "14:00", "14:15"
];

function getArtistInfo(name) {
  return artists.find((a) => a.name === name) || { name, image: "", short: "", description: "", video: "" };
}

function isArtistInSlot(artist, slot) {
  const [sh, sm] = artist.start.split(":").map(Number);
  const [eh, em] = artist.end.split(":").map(Number);
  const [th, tm] = slot.split(":").map(Number);
  const start = sh * 60 + sm;
  const end = eh * 60 + em;
  const time = th * 60 + tm;
  return time >= start && time < end;
}

function MusicPage() {
  const [selectedDay, setSelectedDay] = useState("Saturday");
  const [modalArtist, setModalArtist] = useState(null);

  // Get the schedule for the currently selected day (returns an array or empty)
  const daySchedule = schedule[selectedDay] || [];

  return (
    <div className="p-2 min-h-screen pb-20 flex justify-center">
      <div className="w-full max-w-2xl">
        {/* Day selector */}
        <div className="mb-4 flex gap-4 justify-center">
          {days.map((day) => (
            <button
              key={day}
              onClick={() => setSelectedDay(day)}
              className={`px-4 py-1 rounded-full font-bold shadow border-2 transition-all ${
                selectedDay === day
                  ? "bg-[#247BA0] text-white border-[#247BA0] scale-105"
                  : "bg-white text-[#247BA0] border-[#E3B505] hover:bg-[#E3B505] hover:text-white"
              }`}
            >
              {day}
            </button>
          ))}
        </div>

        {/* Schedule Table */}
        <div className="overflow-auto rounded-xl shadow-2xl border border-gray-200 bg-white" style={{ maxHeight: "55vh" }}>
          <table className="border-separate border-spacing-0 w-max min-w-[600px]">
            <thead>
              <tr>
                <th className="p-2 bg-[#247BA0] text-white sticky left-0 z-10 rounded-tl-xl shadow">Stage</th>
                {timeSlots.map((slot, idx) => (
                  <th
                    key={slot}
                    className={`p-1 bg-[#247BA0] text-white min-w-[40px] text-[10px] font-semibold ${
                      idx === timeSlots.length - 1 ? "rounded-tr-xl" : ""
                    }`}
                  >
                    {slot}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {stages.map((stage) => (
                <tr key={stage} className="even:bg-[#f6f8fa] odd:bg-white">
                  <td className="p-2 font-bold text-[#247BA0] sticky left-0 bg-white z-10 border-r border-gray-200 shadow">
                    {stage}
                  </td>
                  {timeSlots.map((slot, idx) => {
                    const block = daySchedule.find(
                      (a) => a.stage === stage && isArtistInSlot(a, slot)
                    );

                    if (
                      block &&
                      (!timeSlots[idx - 1] || !isArtistInSlot(block, timeSlots[idx - 1]))
                    ) {
                      const [sh, sm] = block.start.split(":").map(Number);
                      const [eh, em] = block.end.split(":").map(Number);
                      const blocks = Math.floor(((eh * 60 + em) - (sh * 60 + sm)) / 15);
                      const artist = getArtistInfo(block.artist);

                      return (
                        <td
                          key={slot}
                          colSpan={blocks}
                          onClick={() => setModalArtist(artist)}
                          className="p-0 cursor-pointer bg-[#F03228] hover:bg-[#E34234] border border-white rounded-lg transition-all duration-200 hover:scale-[1.03]"
                          style={{ minWidth: 40 * blocks }}
                        >
                          <div className="flex flex-col items-center h-full py-1">
                            {artist.image && (
                              <img
                                src={artist.image}
                                alt={artist.name}
                                className="w-8 h-8 object-cover rounded-full mb-1 border-2 border-white shadow"
                              />
                            )}
                            <span className="font-bold text-white text-[11px] drop-shadow">{artist.name}</span>
                            <span className="text-[9px] text-[#E3B505]">{artist.short}</span>
                          </div>
                        </td>
                      );
                    }

                    const continuing = daySchedule.some(
                      (a) =>
                        a.stage === stage &&
                        isArtistInSlot(a, slot) &&
                        timeSlots[idx - 1] &&
                        isArtistInSlot(a, timeSlots[idx - 1])
                    );

                    if (continuing) return null;
                    return <td key={slot} className="p-1 align-top" />;
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {modalArtist && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-xl p-6 max-w-xs w-full shadow-lg relative">
            <button
              onClick={() => setModalArtist(null)}
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-700"
              aria-label="Close"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
            {modalArtist.image && (
              <img
                src={modalArtist.image}
                alt={modalArtist.name}
                className="w-20 h-20 object-cover rounded-full mx-auto mb-3 border-2 border-gray-200 shadow"
              />
            )}
            <h2 className="text-xl font-bold text-[#247BA0] text-center">{modalArtist.name}</h2>
            <p className="text-[#E3B505] text-center text-sm mb-2">{modalArtist.short}</p>
            <p className="text-gray-700 text-center text-sm mb-3">{modalArtist.description}</p>
            {modalArtist.video && (
              <a
                href={modalArtist.video}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-center px-4 py-2 bg-[#F03228] text-white rounded-lg font-semibold hover:bg-[#d42b22] text-sm"
              >
                Bekijk video
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default MusicPage;
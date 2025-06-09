import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";

function NavBar() {
  const location = useLocation();
  const [currentPath, setCurrentPath] = useState("/Home");

  useEffect(() => {
    setCurrentPath(location.pathname);
  }, [location.pathname]);

  return (
    <div
      id="nav-bar"
      className="fixed bottom-4 left-1/2 -translate-x-1/2 h-18 w-10/12 max-w-xl shadow-2xl rounded-full border border-gray-200 bg-white"
    >
      <div
        id="buttons-container"
        className="flex flex-row justify-evenly items-center h-full"
      >
        <Link
          to="/home"
          className={`flex items-center p-2 transition-all duration-200 border-none ${
            currentPath === "/home"
              ? "p-2 text-[#F03228] rounded-full inset-shadow-xs shadow-sm"
              : "border-none"
          }`}
        >
          <span
            className="material-symbols-outlined"
            style={{ fontSize: "26px" }}
          >
            home
          </span>
        </Link>

        <Link
          to="/music"
          className={`flex items-center p-2 transition-all duration-200 border-none ${
            currentPath === "/music"
              ? "p-2 border border-gray-100 text-[#F03228] rounded-full inset-shadow-xs shadow-sm"
              : "border-none"
          }`}
        >
          <span
            className="material-symbols-outlined"
            style={{ fontSize: "26px" }}
          >
            music_note
          </span>
        </Link>

        <Link
          to="/location"
          className={`flex items-center p-2 transition-all duration-200 border-none ${
            currentPath === "/location"
              ? "p-2 border border-gray-100 text-[#F03228] rounded-full inset-shadow-xs shadow-sm"
              : "border-none"
          }`}
        >
          <span
            className="material-symbols-outlined"
            style={{ fontSize: "26px" }}
          >
            explore
          </span>
        </Link>

        <Link
          to="/more"
          className={`flex items-center p-2 transition-all duration-200 border-none ${
            currentPath === "/more"
              ? "p-2 border border-gray-100 text-[#F03228] rounded-full inset-shadow-xs shadow-sm"
              : "border-none"
          }`}
        >
          <span
            className="material-symbols-outlined"
            style={{ fontSize: "26px" }}
          >
            more_horiz
          </span>
        </Link>
      </div>
    </div>
  );
}

export default NavBar;

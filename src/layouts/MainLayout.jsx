import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import "../App.css";
import HeaderLogo from "../assets/img/uFestivalLogo.png";
import NavBar from "../assets/components/Navbar/Navbar";
import nlFlag from "../assets/icons/nl.png";
import enFlag from "../assets/icons/en.png";

function MainLayout() {
  // Current language state ("nl" or "en")
  const [lang, setLang] = useState("nl");
  // Controls if the language dropdown is open or closed
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Supported languages with labels and flag icons
  const languages = [
    { code: "nl", label: "Nederlands", flag: nlFlag },
    { code: "en", label: "English", flag: enFlag },
  ];

  // Toggle dropdown visibility
  function toggleDropdown() {
    setDropdownOpen((open) => !open);
  }

  // Change language and close dropdown
  function handleLanguageChange(code) {
    setLang(code);
    setDropdownOpen(false);
  }

  return (
    <>
      <header className="flex justify-between items-center px-4 py-2 bg-white shadow-sm border-b border-gray-100 h-14">
        <img src={HeaderLogo} alt="uFestival logo" className="w-12 h-auto" />

        <div className="relative">
          <button
            onClick={toggleDropdown}
            className="flex items-center gap-2 px-2 py-1 rounded-full border border-gray-200 bg-gray-50 hover:bg-gray-100 transition focus:outline-none"
            aria-label="Select language"
          >
            {/* Show current language flag and code */}
            <img
              src={lang === "nl" ? nlFlag : enFlag}
              alt={lang === "nl" ? "Nederlands" : "English"}
              className="w-5 h-5"
            />
            <span className="font-medium text-gray-700 text-sm">
              {lang.toUpperCase()}
            </span>
            <span className="material-symbols-outlined text-gray-400 text-base">
              expand_more
            </span>
          </button>

          {/* Dropdown menu with language options */}
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-100 rounded-xl shadow-lg z-50">
              {languages.map(({ code, label, flag }) => (
                <button
                  key={code}
                  onClick={() => handleLanguageChange(code)}
                  className={`flex items-center w-full px-3 py-2 gap-2 rounded-xl hover:bg-gray-50 transition ${
                    lang === code ? "bg-gray-100" : ""
                  }`}
                >
                  <img src={flag} alt={label} className="w-4 h-4" />
                  <span className="text-gray-700 text-sm">{label}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </header>

      {/* Navigation bar below the header */}
      <NavBar />

      {/* Main content area where nested routes render */}
      <main className="w-11/12 mx-auto pt-6">
        <Outlet context={{ lang }} />
      </main>
    </>
  );
}

export default MainLayout;
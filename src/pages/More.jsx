import { useState } from "react";
import page from "../assets/json/more/page.json";
import { useOutletContext } from "react-router-dom";

// Helper function to render text with line breaks
function renderWithLineBreaks(text) {
  return text.split("\n").map((line, idx) => (
    <span key={idx}>
      {line}
      <br />
    </span>
  ));
}

function MorePage() {
  // Get current language from context, default to "nl"
  const { lang = "nl" } = useOutletContext();

  // Get data for current language from JSON
  const pageData = page[lang];

  // State to track which FAQ question is open (null means none open)
  const [openQuestion, setOpenQuestion] = useState(null);

  // State to track which transport option dropdown is open
  const [openTransport, setOpenTransport] = useState(null);

  // Destructure needed data from pageData
  const {
    faq,
    transportOptions,
    general,
    lockers,
    goldenGlu,
    transportTitle,
    faqTitle,
  } = pageData;

  return (
    <main className="flex flex-col items-center gap-10 pt-10 pb-28 px-2 bg-white min-h-screen">
      {/* General Info Section */}
      <section className="w-full max-w-xl bg-white rounded-xl shadow-lg border border-gray-200 p-6 flex flex-col gap-4">
        <h1 className="text-3xl font-bold text-[#247BA0] mb-2">
          {general.title}
        </h1>
        <h2 className="text-lg text-black">{general.subtitle}</h2>

        <div className="mt-4">
          <h2 className="text-xl font-semibold text-[#247BA0] mb-1">
            {general.addressTitle}
          </h2>
          <p className="text-black">{renderWithLineBreaks(general.address)}</p>
        </div>

        <div className="mt-4">
          <h2 className="text-xl font-semibold text-[#247BA0] mb-1">
            {general.dateTitle}
          </h2>
          <p className="text-black">{general.date}</p>
        </div>
      </section>

      {/* Transport Options Section */}
      <section className="w-full max-w-xl bg-white rounded-xl shadow-lg border border-gray-200 p-6 flex flex-col gap-2">
        <h1 className="text-2xl font-bold text-[#247BA0] mb-2">
          {transportTitle}
        </h1>

        {transportOptions.map((option, idx) => (
          <div key={option.label || option.icon} className="mb-2">
            <div
              className={`rounded-lg overflow-hidden border-l-4 ${
                openTransport === idx
                  ? "border-[#E3B505] bg-[#FFFBEA]"
                  : "border-transparent bg-gray-50"
              }`}
            >
              {/* Button to toggle dropdown open/close */}
              <button
                onClick={() =>
                  setOpenTransport(openTransport === idx ? null : idx)
                }
                className={`w-full flex justify-between items-center px-4 py-3 font-semibold text-left ${
                  openTransport === idx ? "text-[#F03228]" : "text-black"
                }`}
                style={{
                  borderRadius:
                    openTransport === idx ? "0.5rem 0.5rem 0 0" : "0.5rem",
                }}
              >
                <span className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-[#F03228] text-3xl">
                    {option.icon}
                  </span>
                  <span
                    className={`text-lg font-semibold ${
                      openTransport === idx
                        ? "text-[#F03228]"
                        : "text-[#247BA0]"
                    }`}
                  >
                    {option.label}
                  </span>
                </span>
                <span
                  className={`material-symbols-outlined ml-2 ${
                    openTransport === idx
                      ? "rotate-180 text-[#E3B505]"
                      : "text-[#247BA0]"
                  }`}
                >
                  expand_more
                </span>
              </button>

              {/* Dropdown content shown only if this option is open */}
              {openTransport === idx && (
                <div className="px-6 py-3 text-black bg-[#FFFBEA] border-t border-[#E3B505] rounded-b-lg">
                  {/* Special case for OV link */}
                  {option.label === "OV" &&
                  option.content.includes("9292.nl") ? (
                    <>
                      {lang === "nl"
                        ? "Kom je met het openbaar vervoer naar Lief? Plan dan je trip via "
                        : "Coming to Lief by public transport? Plan your trip via "}
                      <a
                        href="https://9292.nl/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#F03228] underline hover:text-[#247BA0]"
                      >
                        9292.nl
                      </a>
                      .
                    </>
                  ) : (
                    renderWithLineBreaks(option.content)
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </section>

      {/* Lockers Section */}
      <section className="w-full max-w-xl bg-white rounded-xl shadow-lg border border-gray-200 p-6 flex flex-row gap-4 items-start">
        <span className="material-symbols-outlined text-[#F03228] text-3xl mt-1">
          lock
        </span>
        <div>
          <h2 className="text-lg font-semibold text-[#247BA0] mb-1">
            {lockers.title}
          </h2>
          <p className="text-black">{renderWithLineBreaks(lockers.desc)}</p>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="w-full max-w-xl bg-white rounded-xl shadow-lg border border-gray-200 p-6 flex flex-col gap-2">
        <h1 className="text-2xl font-bold text-[#247BA0] text-center mb-4">
          {faqTitle}
        </h1>

        {faq.map((item, index) => (
          <div key={index} className="mb-2">
            <div
              className={`rounded-lg overflow-hidden border-l-4 ${
                openQuestion === index
                  ? "border-[#E3B505] bg-[#FFFBEA]"
                  : "border-transparent bg-gray-50"
              }`}
            >
              {/* Button to toggle question open/close */}
              <button
                onClick={() =>
                  setOpenQuestion(openQuestion === index ? null : index)
                }
                className={`w-full flex justify-between items-center px-4 py-3 font-semibold text-left ${
                  openQuestion === index ? "text-[#F03228]" : "text-black"
                }`}
                style={{
                  borderRadius:
                    openQuestion === index ? "0.5rem 0.5rem 0 0" : "0.5rem",
                }}
              >
                {item.question}
                <span
                  className={`material-symbols-outlined ml-2 ${
                    openQuestion === index
                      ? "rotate-180 text-[#E3B505]"
                      : "text-[#247BA0]"
                  }`}
                >
                  expand_more
                </span>
              </button>

              {/* Answer shown only if question is open */}
              {openQuestion === index && (
                <div className="px-6 py-3 text-black bg-[#FFFBEA] border-t border-[#E3B505] rounded-b-lg">
                  {renderWithLineBreaks(item.answer)}
                </div>
              )}
            </div>
          </div>
        ))}
      </section>

      {/* Golden Glu Section */}
      <section className="w-full max-w-xl bg-yellow-50 rounded-xl shadow-lg border border-[#E3B505] p-6 flex flex-row gap-4 items-start">
        <span className="material-symbols-outlined text-[#E3B505] text-3xl mt-1">
          star
        </span>
        <div>
          <h2 className="text-lg font-bold text-[#E3B505] mb-1">
            {goldenGlu.title}
          </h2>
          <p className="text-black">{renderWithLineBreaks(goldenGlu.desc)}</p>
        </div>
      </section>
    </main>
  );
}

export default MorePage;
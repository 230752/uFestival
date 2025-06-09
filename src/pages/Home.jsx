import useClock from "../assets/hooks/Clock";
import HangarImg from "../assets/img/hangar.png";
import { Link, useOutletContext } from "react-router-dom";
import homeText from "../assets/json/home/page.json";

function HomePage() {
  const { date, time } = useClock();
  const { lang = "nl" } = useOutletContext();
  const t = homeText[lang];

  return (
    <div className="min-h-screen bg-white flex flex-col items-center py-8 px-2 pb-26">
      <div className="rounded-xl p-6 shadow-2xl border border-gray-100 flex flex-col items-center max-w-xl w-full bg-white">
        <h1 className="text-4xl font-bold text-[#247BA0] mb-2">{t.welcome}</h1>
        <p className="text-2xl text-black mb-1">{t.festival}</p>
        <p className="text-xl pb-3 text-[#E3B505] font-medium">{date} {time}</p>
        <img
          src={HangarImg}
          alt="hangar"
          className="rounded-xl w-11/12 mx-auto mb-4 shadow-md"
        />
        <div className="flex flex-col gap-4 w-full mt-4">
          <Link
            to="/music"
            className="bg-[#F03228] text-white text-xl font-semibold py-3 rounded-xl shadow-lg text-center transition-transform hover:scale-105 hover:bg-[#d42b22] border-2 border-[#F03228]"
            style={{ letterSpacing: "0.03em" }}
          >
            {t.goToSchedule}
          </Link>
          <Link
            to="/location"
            className="bg-[#247BA0] text-white text-xl font-semibold py-3 rounded-xl shadow-lg text-center transition-transform hover:scale-105 hover:bg-[#1e6785] border-2 border-[#247BA0]"
            style={{ letterSpacing: "0.03em" }}
          >
            {t.goToMap}
          </Link>
        </div>
        <div className="mt-6 p-4 rounded-lg bg-yellow-100 border-l-4 border-[#E3B505] text-black w-full flex items-center gap-2">
          <span className="material-symbols-outlined text-[#E3B505] text-2xl">info</span>
          <span className="font-semibold text-[#E3B505]">{t.reminder}</span>
        </div>
      </div>

      <section className="w-full max-w-xl mt-8 flex flex-col gap-4">
        <div className="rounded-xl border border-[#E3B505] bg-[#FFFBEA] p-5 flex flex-col items-start shadow-md">
          <span className="text-[#E3B505] font-semibold mb-1">{t.notificationsTitle}</span>
          <p className="text-black text-base">{t.notificationsText}</p>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
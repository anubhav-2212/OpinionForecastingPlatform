import { BrainCircuit, ChevronRight, Radar } from "lucide-react";
import { Link } from "react-router-dom";

const LandingPageNavBar = () => {
  return (
    <header className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5">
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#1f5c4d] text-white shadow-lg shadow-[#1f5c4d]/20">
          <Radar className="h-5 w-5" />
        </div>
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-[#183229]">Predictify</h2>
          <p className="text-xs uppercase tracking-[0.28em] text-[#6f7c74]">Forecast the world better</p>
        </div>
      </div>

     

      <div className="flex items-center gap-3">
        <Link
          to="/login"
          className="rounded-full border border-[#d6b98e] bg-[#e4d8d2] px-4 py-2 text-sm font-semibold text-[#9b5a34] transition hover:border-[#c98a59] hover:bg-[#fff1df] hover:text-[#7b4323]"
        >
          Login
        </Link>
        <Link
          to="/signin"
          className="inline-flex items-center gap-2 rounded-full border border-[#d6b98e] bg-[#e4d8d2] px-4 py-2 text-sm font-semibold text-white transition hover:border-[#c98a59] hover:bg-[#fff1df] hover:text-[#7b4323]"
        >
          Get Started
          <ChevronRight className="h-4 w-4" />
        </Link>
      </div>
    </header>
  );
};

export default LandingPageNavBar;

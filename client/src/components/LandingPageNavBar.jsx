import { BrainCircuit, ChevronRight, Radar } from "lucide-react";
import { Link } from "react-router-dom";

const LandingPageNavBar = () => {
  return (
    <header className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5">
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-900 text-white shadow-lg shadow-slate-900/20">
          <Radar className="h-5 w-5" />
        </div>
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-slate-900">Predictify</h2>
          <p className="text-xs uppercase tracking-[0.28em] text-slate-500">Forecast the world better</p>
        </div>
      </div>

      <div className="hidden items-center gap-3 rounded-full border border-white/70 bg-white/70 px-4 py-2 text-sm text-slate-600 md:flex">
        <BrainCircuit className="h-4 w-4 text-[#d97706]" />
        AI-assisted market intelligence
      </div>

      <div className="flex items-center gap-3">
        <Link
          to="/login"
          className="rounded-full border border-[#f59e0b] bg-white px-4 py-2 text-sm font-semibold text-[#b45309] transition hover:border-[#d97706] hover:bg-[#fff7ed] hover:text-[#92400e]"
        >
          Login
        </Link>
        <Link
          to="/signin"
          className="inline-flex items-center gap-2 rounded-full bg-[#f59e0b] px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-[#d97706] hover:text-white"
        >
          Get Started
          <ChevronRight className="h-4 w-4" />
        </Link>
      </div>
    </header>
  );
};

export default LandingPageNavBar;

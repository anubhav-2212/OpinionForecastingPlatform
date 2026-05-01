import { BrainCircuit, ChartNoAxesCombined, Sparkles, Target } from "lucide-react";
import { Link } from "react-router-dom";
import LandingPageNavBar from "../components/LandingPageNavBar";

const featureCards = [
  {
    title: "Live conviction markets",
    description: "Track how community stake moves around breaking questions in politics, sports, crypto, products, and culture.",
    icon: ChartNoAxesCombined,
  },
  {
    title: "AI forecast copilot",
    description: "Get draft quality checks, implied probability summaries, and signal briefs for every market.",
    icon: BrainCircuit,
  },
  {
    title: "Decision training loop",
    description: "Compare your calls with outcomes, sharpen your judgment, and learn where your edge really lives.",
    icon: Target,
  },
];

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-[#f7f2e8] text-slate-900">
      <div className="absolute inset-x-0 top-0 -z-10 h-[34rem] bg-[radial-gradient(circle_at_top,_rgba(249,115,22,0.24),_transparent_35%),radial-gradient(circle_at_80%_20%,_rgba(14,165,233,0.18),_transparent_28%),linear-gradient(180deg,_#f7f2e8_0%,_#f8fafc_72%)]" />
      <LandingPageNavBar />

      <main className="mx-auto max-w-7xl px-5 pb-16 pt-10">
        <section className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#e4c89f] bg-white/75 px-4 py-2 text-sm text-[#92400e] shadow-sm">
              <Sparkles className="h-4 w-4" />
              Forecast better with crowd signals and AI assistance
            </div>

            <h1 className="mt-6 max-w-3xl text-5xl font-semibold tracking-tight text-slate-900 sm:text-6xl">
              Opinion forecasting for teams that want sharper decisions, not louder opinions.
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
              Predictify turns questions into tradable conviction. Launch prediction markets, allocate virtual coins,
              read crowd confidence, and use an AI copilot to improve every market before it goes live.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                to="/signin"
                className="rounded-full bg-slate-900 px-6 py-3 text-sm font-medium text-white transition hover:bg-slate-700"
              >
                Launch your first market
              </Link>
              <Link
                to="/login"
                className="rounded-full border border-slate-300 px-6 py-3 text-sm font-medium text-slate-700 transition hover:border-slate-900 hover:text-slate-900"
              >
                Explore the dashboard
              </Link>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              <div className="rounded-3xl border border-white/70 bg-white/80 p-5 shadow-sm">
                <p className="text-3xl font-semibold text-slate-900">72%</p>
                <p className="mt-2 text-sm text-slate-500">Average user engagement on live markets</p>
              </div>
              <div className="rounded-3xl border border-white/70 bg-white/80 p-5 shadow-sm">
                <p className="text-3xl font-semibold text-slate-900">AI</p>
                <p className="mt-2 text-sm text-slate-500">Draft review, market pulse, and clarity scoring</p>
              </div>
              <div className="rounded-3xl border border-white/70 bg-white/80 p-5 shadow-sm">
                <p className="text-3xl font-semibold text-slate-900">1000</p>
                <p className="mt-2 text-sm text-slate-500">Starter coins for every new forecaster</p>
              </div>
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/70 bg-white/75 p-5 shadow-2xl shadow-orange-100">
            <div className="rounded-[1.75rem] bg-slate-900 p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.24em] text-slate-300">AI Market Pulse</p>
                  <h2 className="mt-3 text-2xl font-semibold">Will BTC close above $100k this quarter?</h2>
                </div>
                <div className="rounded-2xl bg-white/10 px-3 py-2 text-right">
                  <p className="text-xs text-slate-300">Implied probability</p>
                  <p className="text-2xl font-semibold">63%</p>
                </div>
              </div>

              <div className="mt-6 space-y-4">
                <div>
                  <div className="mb-2 flex justify-between text-sm text-slate-300">
                    <span>YES conviction</span>
                    <span>630 coins</span>
                  </div>
                  <div className="h-3 rounded-full bg-white/10">
                    <div className="h-3 rounded-full bg-emerald-400" style={{ width: "63%" }} />
                  </div>
                </div>
                <div>
                  <div className="mb-2 flex justify-between text-sm text-slate-300">
                    <span>NO conviction</span>
                    <span>370 coins</span>
                  </div>
                  <div className="h-3 rounded-full bg-white/10">
                    <div className="h-3 rounded-full bg-amber-300" style={{ width: "37%" }} />
                  </div>
                </div>
              </div>

              <div className="mt-6 rounded-3xl border border-white/10 bg-white/5 p-4">
                <p className="text-sm font-medium text-white">Copilot brief</p>
                <p className="mt-2 text-sm leading-6 text-slate-300">
                  Crowd confidence is constructive but not locked. This is the kind of market where new macro or ETF flow
                  data can still move the balance quickly.
                </p>
              </div>
            </div>

            <img className="mt-5 rounded-[1.5rem] shadow-lg" src="/poster1.png" alt="Predictify dashboard preview" />
          </div>
        </section>

        <section className="mt-16 grid gap-5 md:grid-cols-3">
          {featureCards.map(({ title, description, icon: Icon }) => (
            <article key={title} className="rounded-[1.75rem] border border-white/70 bg-white/80 p-6 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#fff3e6] text-[#c2410c]">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="mt-5 text-xl font-semibold text-slate-900">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">{description}</p>
            </article>
          ))}
        </section>
      </main>
    </div>
  );
};

export default LandingPage;

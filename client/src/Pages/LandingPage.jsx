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
    <div className="min-h-screen bg-[#edf6f7] text-[#183229]">
      <div className="absolute inset-x-0 top-0 -z-10 h-[34rem] bg-[radial-gradient(circle_at_top,_rgba(42,157,143,0.24),_transparent_34%),radial-gradient(circle_at_80%_18%,_rgba(231,111,81,0.14),_transparent_28%),linear-gradient(180deg,_#edf6f7_0%,_#dfeef2_72%)]" />
      <LandingPageNavBar />

      <main className="mx-auto max-w-7xl px-5 pb-16 pt-10">
        <section className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#d4c8b8] bg-[#fff9f0]/85 px-4 py-2 text-sm text-[#8d5b36] shadow-sm">
              <Sparkles className="h-4 w-4" />
              Forecast better with crowd signals and AI assistance
            </div>

            <h1 className="mt-6 max-w-3xl text-5xl font-semibold tracking-tight text-[#183229] sm:text-6xl">
              Opinion forecasting for teams that want sharper decisions, not louder opinions.
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-[#56675f]">
              Predictify turns questions into tradable conviction. Launch prediction markets, allocate virtual coins,
              read crowd confidence, and use an AI copilot to improve every market before it goes live.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                to="/signin"
                className="rounded-full bg-[#1f5c4d] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#18483d]"
              >
                Launch your first market
              </Link>
              <Link
                to="/login"
                className="rounded-full border border-[#d6b98e] bg-[#fff8ef] px-6 py-3 text-sm font-medium text-[#8d5b36] transition hover:border-[#c98a59] hover:text-[#7b4323]"
              >
                Explore the dashboard
              </Link>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              <div className="rounded-3xl border border-[#e3d6c6] bg-[#fffaf2]/85 p-5 shadow-sm">
                <p className="text-3xl font-semibold text-[#183229]">72%</p>
                <p className="mt-2 text-sm text-[#6f7c74]">Average user engagement on live markets</p>
              </div>
              <div className="rounded-3xl border border-[#e3d6c6] bg-[#f0f7f3]/90 p-5 shadow-sm">
                <p className="text-3xl font-semibold text-[#183229]">Pulse</p>
                <p className="mt-2 text-sm text-[#6f7c74]">Draft review, market pulse, and clarity scoring</p>
              </div>
              <div className="rounded-3xl border border-[#e3d6c6] bg-[#fff4ea]/90 p-5 shadow-sm">
                <p className="text-3xl font-semibold text-[#183229]">1000</p>
                <p className="mt-2 text-sm text-[#6f7c74]">Starter coins for every new forecaster</p>
              </div>
            </div>
          </div>

          <div className="rounded-[2rem] border border-[#e3d6c6] bg-[#fffaf2]/85 p-5 shadow-2xl shadow-[#ddc5a7]/40">
            <div className="rounded-[1.75rem] bg-[linear-gradient(140deg,_#1f5c4d_0%,_#2a9d8f_42%,_#e76f51_100%)] p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.24em] text-white/75">AI Market Pulse</p>
                  <h2 className="mt-3 text-2xl font-semibold">Will BTC close above $100k this quarter?</h2>
                </div>
                <div className="rounded-2xl bg-white/10 px-3 py-2 text-right">
                  <p className="text-xs text-white/75">Implied probability</p>
                  <p className="text-2xl font-semibold">63%</p>
                </div>
              </div>

              <div className="mt-6 space-y-4">
                <div>
                  <div className="mb-2 flex justify-between text-sm text-white/75">
                    <span>YES conviction</span>
                    <span>630 coins</span>
                  </div>
                  <div className="h-3 rounded-full bg-white/10">
                    <div className="h-3 rounded-full bg-[#f7d27b]" style={{ width: "63%" }} />
                  </div>
                </div>
                <div>
                  <div className="mb-2 flex justify-between text-sm text-white/75">
                    <span>NO conviction</span>
                    <span>370 coins</span>
                  </div>
                  <div className="h-3 rounded-full bg-white/10">
                    <div className="h-3 rounded-full bg-[#ffd6bf]" style={{ width: "37%" }} />
                  </div>
                </div>
              </div>

              <div className="mt-6 rounded-3xl border border-white/10 bg-white/10 p-4">
                <p className="text-sm font-medium text-white">Copilot brief</p>
                <p className="mt-2 text-sm leading-6 text-white/80">
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
            <article key={title} className="rounded-[1.75rem] border border-[#e3d6c6] bg-[#fffaf2]/85 p-6 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#eef7f2] text-[#1f5c4d]">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="mt-5 text-xl font-semibold text-[#183229]">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-[#56675f]">{description}</p>
            </article>
          ))}
        </section>
      </main>
    </div>
  );
};

export default LandingPage;

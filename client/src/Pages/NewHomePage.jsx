import { useMemo, useState } from "react";
import {
  AlarmClock,
  BarChart3,
  BrainCircuit,
  CalendarClock,
  CircleDollarSign,
  LoaderCircle,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingUp,
} from "lucide-react";
import toast from "react-hot-toast";
import NavBar from "../components/NavBar";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";
import usePredictionBoard from "../hooks/usePredictionBoard";
import {
  buildMarketPulse,
  buildPredictionInsight,
  getPredictionProbability,
  reviewForecastDraft,
} from "../utils/forecastCopilot";

const tabs = [
  { id: "live", label: "Live" },
  { id: "upcoming", label: "Upcoming" },
  { id: "closed", label: "Closed" },
  { id: "settled", label: "Settled" },
];

const categories = ["Politics", "Crypto", "Sports", "Tech", "Economy", "Culture"];

const formatDate = (value) =>
  new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));

const getStatusTone = (status) => {
  if (status === "live") return "bg-emerald-100 text-emerald-700";
  if (status === "upcoming") return "bg-sky-100 text-sky-700";
  if (status === "settled") return "bg-violet-100 text-violet-700";
  return "bg-amber-100 text-amber-700";
};

const PredictionCard = ({ prediction, onSubmit, pendingId }) => {
  const [choice, setChoice] = useState("yes");
  const [forecastAmount, setForecastAmount] = useState("");
  const insight = buildPredictionInsight(prediction);
  const yesProbability = getPredictionProbability(prediction);
  const noProbability = 100 - yesProbability;
  const isSubmitting = pendingId === prediction._id;

  const handleSubmit = async (event) => {
    event.preventDefault();
    await onSubmit(prediction._id, { choice, forecastAmount });
    setForecastAmount("");
  };

  return (
    <article className="rounded-[1.75rem] border border-[#e6ddcf] bg-white p-6 shadow-sm">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] ${getStatusTone(prediction.status)}`}>
            {prediction.status}
          </div>
          <h3 className="mt-4 text-xl font-semibold tracking-tight text-slate-900">{prediction.question}</h3>
          <p className="mt-2 text-sm text-slate-500">
            {prediction.category} • Opens {formatDate(prediction.startTime)} • Closes {formatDate(prediction.endTime)}
          </p>
        </div>

        <div className="rounded-3xl border border-[#efe5d5] bg-[#fcfaf6] px-4 py-3 text-right">
          <p className="text-xs uppercase tracking-[0.18em] text-slate-500">AI Confidence</p>
          <p className="mt-1 text-2xl font-semibold text-slate-900">{insight.confidence}</p>
        </div>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="rounded-3xl bg-[#effcf6] p-4">
          <div className="flex items-center justify-between text-sm text-emerald-800">
            <span>YES</span>
            <span>{Math.round(yesProbability)}%</span>
          </div>
          <div className="mt-3 h-3 rounded-full bg-emerald-100">
            <div className="h-3 rounded-full bg-emerald-500" style={{ width: `${yesProbability}%` }} />
          </div>
          <p className="mt-3 text-sm text-emerald-900">{prediction.totalYesStake || 0} coins staked</p>
        </div>

        <div className="rounded-3xl bg-[#fff6e8] p-4">
          <div className="flex items-center justify-between text-sm text-amber-800">
            <span>NO</span>
            <span>{Math.round(noProbability)}%</span>
          </div>
          <div className="mt-3 h-3 rounded-full bg-amber-100">
            <div className="h-3 rounded-full bg-amber-400" style={{ width: `${noProbability}%` }} />
          </div>
          <p className="mt-3 text-sm text-amber-900">{prediction.totalNoStake || 0} coins staked</p>
        </div>
      </div>

      <div className="mt-5 rounded-3xl border border-[#efe5d5] bg-[#fcfaf6] p-4">
        <div className="flex items-center gap-2 text-sm font-medium text-slate-900">
          <BrainCircuit className="h-4 w-4 text-[#d97706]" />
          Copilot brief
        </div>
        <p className="mt-3 text-sm leading-6 text-slate-600">{insight.headline} {insight.detail}</p>
      </div>

      {prediction.status === "live" ? (
        <form className="mt-5 grid gap-3 md:grid-cols-[1fr_140px_160px]" onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-2 rounded-2xl bg-slate-100 p-1">
            <button
              type="button"
              onClick={() => setChoice("yes")}
              className={`rounded-2xl px-4 py-3 text-sm font-medium transition ${choice === "yes" ? "bg-emerald-500 text-white" : "text-slate-600"}`}
            >
              Predict Yes
            </button>
            <button
              type="button"
              onClick={() => setChoice("no")}
              className={`rounded-2xl px-4 py-3 text-sm font-medium transition ${choice === "no" ? "bg-amber-400 text-slate-950" : "text-slate-600"}`}
            >
              Predict No
            </button>
          </div>

          <input
            type="number"
            min="1"
            value={forecastAmount}
            onChange={(event) => setForecastAmount(event.target.value)}
            placeholder="Coins"
            className="rounded-2xl border border-[#ddd2c1] px-4 py-3 outline-none transition focus:border-slate-900"
          />

          <button
            type="submit"
            disabled={isSubmitting}
            className="rounded-2xl bg-slate-900 px-4 py-3 text-sm font-medium text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:bg-slate-300"
          >
            {isSubmitting ? "Submitting..." : "Lock Forecast"}
          </button>
        </form>
      ) : null}
    </article>
  );
};

const NewHomePage = () => {
  const { user } = useAuth();
  const { board, history, loading, refreshBoard } = usePredictionBoard();
  const [activeTab, setActiveTab] = useState("live");
  const [pendingId, setPendingId] = useState("");
  const [creating, setCreating] = useState(false);
  const [draft, setDraft] = useState({
    question: "",
    category: categories[0],
    startTime: "",
    endTime: "",
  });

  const visiblePredictions = board[activeTab] || [];
  const pulse = useMemo(() => buildMarketPulse(board.live), [board.live]);
  const draftReview = useMemo(() => reviewForecastDraft(draft), [draft]);

  const topInsight = useMemo(() => {
    const ranked = [...board.live].sort(
      (left, right) => buildPredictionInsight(right).confidence - buildPredictionInsight(left).confidence
    );
    return ranked[0] || board.upcoming[0] || null;
  }, [board.live, board.upcoming]);

  const handleForecastSubmit = async (predictionId, payload) => {
    try {
      setPendingId(predictionId);
      const response = await api.post(`/userForecast/submit/${predictionId}`, payload);
      toast.success(response?.data?.message || "Forecast submitted");
      await refreshBoard();
    } catch (error) {
      toast.error(error?.response?.data?.message || "Unable to submit forecast");
    } finally {
      setPendingId("");
    }
  };

  const handleCreatePrediction = async (event) => {
    event.preventDefault();

    try {
      setCreating(true);
      const response = await api.post("/prediction/create", draft);
      toast.success(response?.data?.message || "Prediction created");
      setDraft({
        question: "",
        category: categories[0],
        startTime: "",
        endTime: "",
      });
      await refreshBoard();
      setActiveTab("upcoming");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Unable to create prediction");
    } finally {
      setCreating(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f7f2e8] text-slate-900">
      <NavBar />

      <main className="mx-auto max-w-7xl px-5 py-8">
        <section className="grid gap-5 lg:grid-cols-[1.25fr_0.75fr]">
          <div className="rounded-[2rem] border border-[#e6ddcf] bg-[linear-gradient(135deg,_#0f172a_0%,_#1e293b_55%,_#7c2d12_100%)] p-7 text-white shadow-xl shadow-slate-900/10">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm text-slate-100">
              <Sparkles className="h-4 w-4 text-amber-300" />
              AI-enhanced prediction board
            </div>
            <h1 className="mt-5 max-w-3xl text-4xl font-semibold tracking-tight">
              Build sharper markets, read crowd conviction faster, and train better forecasting instincts.
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300">
              Predictify combines virtual markets with a lightweight AI copilot. It spots ambiguity in new market drafts,
              summarizes live conviction, and helps users focus on the markets where information is still moving.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
                <div className="flex items-center gap-2 text-slate-300">
                  <TrendingUp className="h-4 w-4" />
                  Live markets
                </div>
                <p className="mt-3 text-3xl font-semibold text-white">{board.live.length}</p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
                <div className="flex items-center gap-2 text-slate-300">
                  <CircleDollarSign className="h-4 w-4" />
                  Hottest category
                </div>
                <p className="mt-3 text-2xl font-semibold text-white">{pulse.hottestCategory}</p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
                <div className="flex items-center gap-2 text-slate-300">
                  <ShieldCheck className="h-4 w-4" />
                  Average confidence
                </div>
                <p className="mt-3 text-3xl font-semibold text-white">{pulse.averageConfidence}%</p>
              </div>
            </div>
          </div>

          <aside className="rounded-[2rem] border border-[#e6ddcf] bg-white p-6 shadow-sm">
            <div className="flex items-center gap-2 text-sm font-medium text-slate-900">
              <BrainCircuit className="h-4 w-4 text-[#d97706]" />
              AI Market Pulse
            </div>
            <p className="mt-4 text-sm leading-6 text-slate-600">{pulse.summary}</p>

            <div className="mt-5 grid gap-3">
              <div className="rounded-3xl bg-[#f8fafc] p-4">
                <p className="text-xs uppercase tracking-[0.22em] text-slate-500">Contrarian setups</p>
                <p className="mt-2 text-3xl font-semibold text-slate-900">{pulse.contrarianCount}</p>
              </div>
              {topInsight ? (
                <div className="rounded-3xl bg-[#fff7ed] p-4">
                  <p className="text-xs uppercase tracking-[0.22em] text-[#9a3412]">Featured signal</p>
                  <p className="mt-2 text-base font-semibold text-slate-900">{topInsight.question}</p>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{buildPredictionInsight(topInsight).detail}</p>
                </div>
              ) : (
                <div className="rounded-3xl bg-[#fff7ed] p-4 text-sm leading-6 text-slate-600">
                  No active signal yet. Launch a market to start the pulse engine.
                </div>
              )}
            </div>
          </aside>
        </section>

        <section className="mt-6 grid gap-5 xl:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-5">
            <div className="rounded-[2rem] border border-[#e6ddcf] bg-white p-5 shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h2 className="text-2xl font-semibold tracking-tight text-slate-900">Market board</h2>
                  <p className="mt-1 text-sm text-slate-500">Browse live, upcoming, closed, and settled forecasts.</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setActiveTab(tab.id)}
                      className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                        activeTab === tab.id ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {loading ? (
              <div className="flex items-center gap-3 rounded-[2rem] border border-[#e6ddcf] bg-white p-6 text-slate-600 shadow-sm">
                <LoaderCircle className="h-5 w-5 animate-spin" />
                Loading prediction board...
              </div>
            ) : visiblePredictions.length ? (
              visiblePredictions.map((prediction) => (
                <PredictionCard
                  key={prediction._id}
                  prediction={prediction}
                  onSubmit={handleForecastSubmit}
                  pendingId={pendingId}
                />
              ))
            ) : (
              <div className="rounded-[2rem] border border-dashed border-[#d8ceb9] bg-white/70 p-10 text-center shadow-sm">
                <p className="text-lg font-medium text-slate-900">No {activeTab} predictions yet.</p>
                <p className="mt-2 text-sm text-slate-500">Switch tabs or create a new market to fill this board.</p>
              </div>
            )}
          </div>

          <div className="space-y-5">
            <section className="rounded-[2rem] border border-[#e6ddcf] bg-white p-6 shadow-sm">
              <div className="flex items-center gap-2 text-sm font-medium text-slate-900">
                <Target className="h-4 w-4 text-[#0f766e]" />
                Your forecasting loop
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                <div className="rounded-3xl bg-[#f8fafc] p-4">
                  <p className="text-xs uppercase tracking-[0.22em] text-slate-500">Total calls</p>
                  <p className="mt-2 text-3xl font-semibold text-slate-900">{history.length}</p>
                </div>
                <div className="rounded-3xl bg-[#effcf6] p-4">
                  <p className="text-xs uppercase tracking-[0.22em] text-emerald-700">Won</p>
                  <p className="mt-2 text-3xl font-semibold text-slate-900">
                    {history.filter((item) => item.result === "won").length}
                  </p>
                </div>
                <div className="rounded-3xl bg-[#fff7ed] p-4">
                  <p className="text-xs uppercase tracking-[0.22em] text-amber-700">Pending</p>
                  <p className="mt-2 text-3xl font-semibold text-slate-900">
                    {history.filter((item) => !item.result || item.result === "pending").length}
                  </p>
                </div>
              </div>

              <div className="mt-5 space-y-3">
                {history.slice(0, 4).map((item) => (
                  <div key={item._id} className="rounded-3xl border border-[#efe5d5] p-4">
                    <p className="font-medium text-slate-900">{item.forecastId?.question || "Forecast"}</p>
                    <p className="mt-1 text-sm text-slate-500">
                      {item.choice?.toUpperCase()} • {item.forecastAmount} coins • {item.result || "pending"}
                    </p>
                  </div>
                ))}

                {!history.length ? (
                  <div className="rounded-3xl border border-dashed border-[#d8ceb9] p-4 text-sm text-slate-500">
                    Your submitted forecasts will appear here once you start participating.
                  </div>
                ) : null}
              </div>
            </section>

            <section className="rounded-[2rem] border border-[#e6ddcf] bg-white p-6 shadow-sm">
              <div className="flex items-center gap-2 text-sm font-medium text-slate-900">
                <BrainCircuit className="h-4 w-4 text-[#d97706]" />
                Forecast draft copilot
              </div>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                The copilot reviews question clarity, timing, and resolution readiness before a market goes live.
              </p>

              <div className="mt-5 rounded-3xl bg-[#fff7ed] p-4">
                <p className="text-xs uppercase tracking-[0.22em] text-[#9a3412]">Draft score</p>
                <div className="mt-2 flex items-end justify-between gap-4">
                  <div>
                    <p className="text-3xl font-semibold text-slate-900">{draftReview.score}</p>
                    <p className="text-sm text-slate-500">{draftReview.verdict}</p>
                  </div>
                  <BarChart3 className="h-10 w-10 text-[#fb923c]" />
                </div>
              </div>

              <div className="mt-5 space-y-2">
                {draftReview.notes.map((note) => (
                  <p key={note} className="rounded-2xl bg-[#f8fafc] px-4 py-3 text-sm text-slate-600">
                    {note}
                  </p>
                ))}
              </div>

              {user?.role === "admin" ? (
                <form className="mt-6 space-y-3" onSubmit={handleCreatePrediction}>
                  <input
                    type="text"
                    value={draft.question}
                    onChange={(event) => setDraft((current) => ({ ...current, question: event.target.value }))}
                    placeholder="Will OpenAI launch a new flagship model by June 30?"
                    className="w-full rounded-2xl border border-[#ddd2c1] px-4 py-3 outline-none transition focus:border-slate-900"
                  />

                  <select
                    value={draft.category}
                    onChange={(event) => setDraft((current) => ({ ...current, category: event.target.value }))}
                    className="w-full rounded-2xl border border-[#ddd2c1] px-4 py-3 outline-none transition focus:border-slate-900"
                  >
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <label className="space-y-2 text-sm text-slate-600">
                      <span className="inline-flex items-center gap-2">
                        <CalendarClock className="h-4 w-4" />
                        Start time
                      </span>
                      <input
                        type="datetime-local"
                        value={draft.startTime}
                        onChange={(event) => setDraft((current) => ({ ...current, startTime: event.target.value }))}
                        className="w-full rounded-2xl border border-[#ddd2c1] px-4 py-3 outline-none transition focus:border-slate-900"
                      />
                    </label>

                    <label className="space-y-2 text-sm text-slate-600">
                      <span className="inline-flex items-center gap-2">
                        <AlarmClock className="h-4 w-4" />
                        End time
                      </span>
                      <input
                        type="datetime-local"
                        value={draft.endTime}
                        onChange={(event) => setDraft((current) => ({ ...current, endTime: event.target.value }))}
                        className="w-full rounded-2xl border border-[#ddd2c1] px-4 py-3 outline-none transition focus:border-slate-900"
                      />
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={creating}
                    className="w-full rounded-2xl bg-slate-900 px-4 py-3 text-sm font-medium text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:bg-slate-300"
                  >
                    {creating ? "Creating market..." : "Create prediction market"}
                  </button>
                </form>
              ) : (
                <div className="mt-6 rounded-3xl border border-dashed border-[#d8ceb9] p-4 text-sm leading-6 text-slate-500">
                  Admins can launch new forecasts here. Players still get the AI draft review so they can propose cleaner questions.
                </div>
              )}
            </section>
          </div>
        </section>
      </main>
    </div>
  );
};

export default NewHomePage;

import { BrainCircuit, Coins, LogOut, Radar } from "lucide-react";
import useWallet from "../hooks/useWallet";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

const NavBar = () => {
  const { wallet, loading } = useWallet();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    toast.success("Logged out successfully");
  };

  return (
    <nav className="sticky top-0 z-20 border-b border-white/60 bg-[#f7f2e8]/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#0f172a] text-white shadow-lg shadow-slate-900/20">
            <Radar className="h-5 w-5" />
          </div>
          <div>
            <p className="text-lg font-semibold tracking-tight text-slate-900">Predictify</p>
            <p className="text-xs uppercase tracking-[0.28em] text-slate-500">Opinion Forecasting Lab</p>
          </div>
        </div>

        <div className="hidden items-center gap-3 rounded-full border border-slate-200 bg-white/80 px-4 py-2 text-sm text-slate-600 md:flex">
          <BrainCircuit className="h-4 w-4 text-[#d97706]" />
          AI copilot is watching conviction, liquidity, and draft quality in real time.
        </div>

        <div className="flex items-center gap-3">
          <div className="rounded-2xl border border-[#d6c9b4] bg-white px-3 py-2 shadow-sm">
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <Coins className="h-4 w-4 text-[#0f766e]" />
              <span>{loading ? "Loading wallet" : `${wallet} coins`}</span>
            </div>
          </div>

          <div className="hidden rounded-2xl border border-[#d6c9b4] bg-white px-3 py-2 text-right sm:block">
            <p className="text-sm font-medium text-slate-900">{user?.name || "Trader"}</p>
            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">{user?.role || "member"}</p>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="inline-flex items-center gap-2 rounded-2xl bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;

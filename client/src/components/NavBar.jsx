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
    <nav className="sticky top-0 z-20 border-b border-[#d4e4e7] bg-[#edf6f7]/88 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#1f5c4d] text-white shadow-lg shadow-[#1f5c4d]/20">
            <Radar className="h-5 w-5" />
          </div>
          <div>
            <p className="text-lg font-semibold tracking-tight text-[#183229]">Predictify</p>
            <p className="text-xs uppercase tracking-[0.28em] text-[#6f7c74]">Signal Market Studio</p>
          </div>
        </div>

        <div className="hidden items-center gap-3 rounded-full border border-[#d8cdbd] bg-[#fffaf2]/85 px-4 py-2 text-sm text-[#55655d] md:flex">
          <BrainCircuit className="h-4 w-4 text-[#e76f51]" />
          AI copilot is watching conviction, liquidity, and draft quality in real time.
        </div>

        <div className="flex items-center gap-3">
          <div className="rounded-2xl border border-[#d9cbb6] bg-[#fffaf2] px-3 py-2 shadow-sm">
            <div className="flex items-center gap-2 text-sm text-[#55655d]">
              <Coins className="h-4 w-4 text-[#2a9d8f]" />
              <span>{loading ? "Loading wallet" : `${wallet} coins`}</span>
            </div>
          </div>

          <div className="hidden rounded-2xl border border-[#d9cbb6] bg-[#fffaf2] px-3 py-2 text-right sm:block">
            <p className="text-sm font-medium text-[#183229]">{user?.name || "Trader"}</p>
            <p className="text-xs uppercase tracking-[0.2em] text-[#6f7c74]">{user?.role || "member"}</p>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="inline-flex items-center gap-2 rounded-2xl bg-[#e76f51] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#cf5c40]"
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

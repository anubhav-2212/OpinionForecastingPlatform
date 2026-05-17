import { useState } from "react";
import { ArrowLeft, Eye, EyeOff, Radar } from "lucide-react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    role: "player",
  });

  const navigate = useNavigate();
  const { fetchUser } = useAuth();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUser((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);

    try {
      const response = await api.post("/auth/register", user);
      toast.success(response?.data?.message || "Account created");
      await fetchUser();
      navigate("/home");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Signup failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f2e7] px-5 py-10">
      <div className="absolute inset-x-0 top-0 -z-10 h-[28rem] bg-[radial-gradient(circle_at_top,_rgba(231,111,81,0.16),_transparent_35%),linear-gradient(180deg,_#f8f2e7_0%,_#f4ead8_100%)]" />

      <div className="mx-auto max-w-5xl rounded-[2rem] border border-[#e3d6c6] bg-[#fffaf2]/85 p-4 shadow-2xl shadow-[#ddc5a7]/40 backdrop-blur sm:p-6 lg:grid lg:grid-cols-[0.95fr_1.05fr] lg:gap-6">
        <div className="rounded-[1.75rem] bg-[linear-gradient(135deg,_#e76f51_0%,_#f4a261_42%,_#2a9d8f_100%)] p-8 text-white">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10">
            <Radar className="h-5 w-5" />
          </div>
          <h1 className="mt-6 text-4xl font-semibold tracking-tight">Create your forecasting identity.</h1>
          <p className="mt-4 text-sm leading-7 text-white/80">
            Start with 1000 coins, join live markets, and use the copilot to write cleaner, more resolvable questions.
          </p>
        </div>

        <div className="p-4 sm:p-8">
          <Link to="/" className="inline-flex items-center gap-2 text-sm font-medium text-[#56675f] transition hover:text-[#183229]">
            <ArrowLeft className="h-4 w-4" />
            Back to home
          </Link>

          <h2 className="mt-8 text-3xl font-semibold tracking-tight text-[#183229]">Create account</h2>
          <p className="mt-2 text-sm text-[#6f7c74]">
            Already have an account?{" "}
            <Link to="/login" className="font-medium text-[#183229] underline decoration-[#2a9d8f] underline-offset-4">
              Log in
            </Link>
          </p>

          <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
            <input
              name="name"
              type="text"
              value={user.name}
              onChange={handleChange}
              placeholder="Full name"
              className="w-full rounded-2xl border border-[#d9cbb6] bg-[#fffdf8] px-4 py-3 outline-none transition focus:border-[#e76f51]"
            />

            <input
              name="email"
              type="email"
              value={user.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full rounded-2xl border border-[#d9cbb6] bg-[#fffdf8] px-4 py-3 outline-none transition focus:border-[#e76f51]"
            />

            <div className="relative">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                value={user.password}
                onChange={handleChange}
                placeholder="Password"
                className="w-full rounded-2xl border border-[#d9cbb6] bg-[#fffdf8] px-4 py-3 pr-12 outline-none transition focus:border-[#e76f51]"
              />
              <button
                type="button"
                onClick={() => setShowPassword((current) => !current)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#6f7c74]"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>

            <select
              name="role"
              value={user.role}
              onChange={handleChange}
              className="w-full rounded-2xl border border-[#d9cbb6] bg-[#fffdf8] px-4 py-3 outline-none transition focus:border-[#e76f51]"
            >
              <option value="player">Player</option>
              <option value="admin">Admin</option>
            </select>

            <button
              type="submit"
              disabled={submitting}
              className="w-full rounded-2xl bg-[#1f5c4d] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#18483d] disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-500"
            >
              {submitting ? "Creating account..." : "Create account"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;

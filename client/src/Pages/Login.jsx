import { useState } from "react";
import { ArrowLeft, Eye, EyeOff, Radar } from "lucide-react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const { fetchUser } = useAuth();
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUser((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);

    try {
      const response = await api.post("/auth/login", user);
      toast.success(response?.data?.message || "Logged in");
      await fetchUser();
      navigate("/home");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Login failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f7f2e8] px-5 py-10">
      <div className="absolute inset-x-0 top-0 -z-10 h-[28rem] bg-[radial-gradient(circle_at_top,_rgba(249,115,22,0.16),_transparent_35%),linear-gradient(180deg,_#f7f2e8_0%,_#eff6ff_100%)]" />

      <div className="mx-auto max-w-5xl rounded-[2rem] border border-white/60 bg-white/75 p-4 shadow-2xl shadow-orange-100 backdrop-blur sm:p-6 lg:grid lg:grid-cols-[0.95fr_1.05fr] lg:gap-6">
        <div className="rounded-[1.75rem] bg-[linear-gradient(135deg,_#0f172a_0%,_#1d4ed8_100%)] p-8 text-white">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10">
            <Radar className="h-5 w-5" />
          </div>
          <h1 className="mt-6 text-4xl font-semibold tracking-tight">Welcome back to Predictify.</h1>
          <p className="mt-4 text-sm leading-7 text-slate-200">
            Step back into your forecast board, check live conviction, and use the AI copilot to focus on the markets
            where your edge matters most.
          </p>
        </div>

        <div className="p-4 sm:p-8">
          <Link to="/" className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition hover:text-slate-900">
            <ArrowLeft className="h-4 w-4" />
            Back to home
          </Link>

          <h2 className="mt-8 text-3xl font-semibold tracking-tight text-slate-900">Log in</h2>
          <p className="mt-2 text-sm text-slate-500">
            No account yet?{" "}
            <Link to="/signin" className="font-medium text-slate-900 underline decoration-[#fb923c] underline-offset-4">
              Create one
            </Link>
          </p>

          <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
            <input
              name="email"
              type="email"
              value={user.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full rounded-2xl border border-[#ddd2c1] px-4 py-3 outline-none transition focus:border-slate-900"
            />

            <div className="relative">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                value={user.password}
                onChange={handleChange}
                placeholder="Password"
                className="w-full rounded-2xl border border-[#ddd2c1] px-4 py-3 pr-12 outline-none transition focus:border-slate-900"
              />
              <button
                type="button"
                onClick={() => setShowPassword((current) => !current)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full rounded-2xl bg-slate-900 px-4 py-3 text-sm font-medium text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:bg-slate-300"
            >
              {submitting ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;

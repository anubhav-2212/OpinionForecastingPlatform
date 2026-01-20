import React from "react";
const Navbar = () => {

  return (
    <nav className="w-full h-16 flex items-center justify-between px-6 border-b border-gray-200 bg-white">

      {/* LEFT: LOGO */}
      <div className="flex items-center gap-2">
        <h2 className="font-bold text-xl bg-blue-300 rounded-xl overflow-hidden tracking-tight px-4 py-1">
          Predictify
        </h2>
      </div>

      {/* CENTER: NAV LINKS */}
      <div className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-700">
        <button className="hover:text-blue-600 transition">
          Live Predictions
        </button>

        <button className="hover:text-blue-600 transition">
          Future Predictions
        </button>

        <button className="hover:text-blue-600 transition">
          Analytics
        </button>

        <button className="hover:text-blue-600 transition">
          Dashboards
        </button>

        <button className="hover:text-blue-600 transition">
          Results
        </button>

        <button className="hover:text-blue-600 transition">
          Prediction History
        </button>
      </div>

      {/* RIGHT: WALLET + PROFILE */}
      <div className="flex items-center gap-4">

        {/* Wallet */}
        <div className="flex items-center gap-2 bg-gray-100 px-3 py-1.5 rounded-lg">
          <span className="text-xs text-gray-500">Wallet</span>
          <span className="text-sm font-semibold text-gray-900">
            1,250
          </span>
        </div>

        {/* Profile */}
        <div className="w-9 h-9 rounded-full bg-blue-500 text-white flex items-center justify-center font-semibold cursor-pointer">
          A
        </div>
      </div>

    </nav>
  );
};

export default Navbar;

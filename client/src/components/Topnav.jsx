import React from "react"
import { Plus, LogOut } from "lucide-react"

export default function TopNav({ credits = 0 }) {
  return (
    <header className="w-full h-16 bg-white shadow-sm flex items-center px-8 py-6">
      
      {/* LEFT: BRAND */}
      <h1 className="font-bold text-xl tracking-tight
                     bg-linear-to-b from-neutral-700 to-blue-500
                     bg-clip-text text-transparent">
        Predictify
      </h1>

      {/* RIGHT ACTIONS */}
      <div className="ml-auto flex items-center gap-4">
        
        {/* Buy Credits */}
        <button className="flex items-center gap-2 px-4 py-2 rounded-lg
                            bg-linear-to-b from-neutral-100 to-blue-100
                           transition">
          <Plus size={18} />
          Buy Credits
        </button>

        {/* Wallet */}
        <div className="px-4 py-2 rounded-lg bg-gray-100 font-medium">
          💰 {credits} Credits
        </div>

        {/* Logout */}
        <button className="flex items-center gap-2 px-4 py-2 rounded-lg
                           border hover:bg-gray-100 transition">
          <LogOut size={18} />
          Logout
        </button>
      </div>

    </header>
  )
}

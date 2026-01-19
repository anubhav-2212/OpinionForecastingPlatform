import React, { useContext } from "react"
import { SidebarContext } from "../Context/SidebarContext"
export default function SidebarItem({ icon, text, active }) {
  const { expanded } = useContext(SidebarContext)

  return (
    <li
      className={`
        relative flex items-center gap-3 px-3 py-2 my-1 rounded-md cursor-pointer
        transition-colors group
        ${active ? "bg-indigo-100 text-indigo-700" : "hover:bg-gray-100 text-gray-700"}
      `}
    >
      {icon}

      <span
        className={`transition-all overflow-hidden ${
          expanded ? "w-40" : "w-0"
        }`}
      >
        {text}
      </span>

      {/* Tooltip when collapsed */}
      {!expanded && (
        <div className="absolute left-full ml-4 px-2 py-1 text-sm rounded bg-indigo-100 text-indigo-700
                        opacity-0 group-hover:opacity-100 transition">
          {text}
        </div>
      )}
    </li>
  )
}

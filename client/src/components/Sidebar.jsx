import React, { useState} from "react"
import { SidebarContext } from "../Context/SidebarContext"
import { ChevronRight,ChevronLeft } from "lucide-react"
export default function Sidebar({ children }) {
  const [expanded, setExpanded] = useState(true)

  return (
    <aside
      className={`h-full transition-all overflow-hidden ${
        expanded ? "w-64" : "w-20"
      }`}
    >
      <nav className="h-full flex flex-col bg-white border-r border-gray-200">
        
 
        <div 
        className={`flex items-center p-4 transition-all ${
         expanded ? "justify-between" : "justify-center"}`}>
        
        <button
            onClick={() => setExpanded(e => !e)}
            className="p-2 rounded-lg hover:bg-gray-100"
          >
            {expanded ? <ChevronLeft /> : <ChevronRight />}
          </button>
        </div>
     <div className="flex-1 overflow-y-auto">
        <SidebarContext.Provider value={{ expanded }}>
          <ul className="flex-1 px-3">{children}</ul>
        </SidebarContext.Provider>
        </div>

        
        <div className="border-t p-3 flex items-center gap-3 border-gray-200">
          <img
            className="w-10 h-10 rounded-md"
            src="https://ui-avatars.com/api/?name=User"
          />

          <div className={`transition-all overflow-hidden ${expanded ? "w-40" : "w-0"}`}>
            <p className="font-medium">Anubhav</p>
            <p className="text-xs text-gray-500">Pro User</p>
          </div>
        </div>

      </nav>
    </aside>
  )
}

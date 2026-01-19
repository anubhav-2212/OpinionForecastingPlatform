import React from "react"
import Sidebar from "../components/Sidebar"
import SidebarItem from "../components/SidebarItem"
import TopNav from "../components/Topnav"

import {
  BarChart,
  Flame,
  Plus,
  TrendingUp,
  Award,
  Settings
} from "lucide-react"


const HomePage = () => {
  return (
    <div className="h-screen flex flex-col">
      

      <TopNav credits={120} />


      <div className="flex flex-1">
        
        <Sidebar>
          <SidebarItem icon={<BarChart />} text="Dashboard" active />
          <SidebarItem icon={<Flame />} text="Live Predictions" />
          <SidebarItem icon={<Plus />} text="Create Prediction" />
          <SidebarItem icon={<TrendingUp />} text="Analytics" />
          <SidebarItem icon={<Award />} text="Leaderboard" />
          <SidebarItem icon={<Settings />} text="Settings" />
        </Sidebar>

        <main className="flex-1 bg-gray-50">
          <div className="p-8">
          <h1 className="text-2xl font-semibold">
            Dashboard
          </h1>
          </div>
        </main>

      </div>
    </div>
  )
}

export default HomePage

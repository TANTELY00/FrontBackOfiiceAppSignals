import React from 'react'
import { NavLink } from 'react-router-dom'
import {
  Home,
  Users,
  Wrench,
  Shield,
  Bell
} from 'lucide-react'

const Sidebar: React.FC = () => {
  return (
    <aside className="bg-[#1c434e] text-white w-64 min-h-screen p-4 flex flex-col">
      {/* Logo / Titre */}
      <div className="text-2xl font-bold ml-[-6px] mb-7 flex items-center justify-center relative">
        <img
          src="/images/heylogo.png"
          alt="Illustration utilisateur"
          className="border-none w-30 h-15 object-cover mt-[-10px]"
        />
      </div>

      {/* Menu avec icônes */}
      <nav className="mt-6 flex flex-col space-y-3">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex items-center space-x-2 px-3 py-2 rounded hover:bg-indigo-700 ${
              isActive ? 'bg-indigo-700' : ''
            }`
          }
        >
          <Home size={18} />
          <span>Dashboard</span>
        </NavLink>

        <NavLink
          to="/users"
          className={({ isActive }) =>
            `flex items-center space-x-2 px-3 py-2 rounded hover:bg-indigo-700 ${
              isActive ? 'bg-indigo-700' : ''
            }`
          }
        >
          <Users size={18} />
          <span>Utilisateurs</span>
        </NavLink>

        <NavLink
          to="/technicians"
          className={({ isActive }) =>
            `flex items-center space-x-2 px-3 py-2 rounded hover:bg-indigo-700 ${
              isActive ? 'bg-indigo-700' : ''
            }`
          }
        >
          <Wrench size={18} />
          <span>Techniciens</span>
        </NavLink>

        <NavLink
          to="/admins"
          className={({ isActive }) =>
            `flex items-center space-x-2 px-3 py-2 rounded hover:bg-indigo-700 ${
              isActive ? 'bg-indigo-700' : ''
            }`
          }
        >
          <Shield size={18} />
          <span>Admins</span>
        </NavLink>

        <NavLink
          to="/notifications"
          className={({ isActive }) =>
            `flex items-center space-x-2 px-3 py-2 rounded hover:bg-indigo-700 ${
              isActive ? 'bg-indigo-700' : ''
            }`
          }
        >
          <Bell size={18} />
          <span>Notifications</span>
        </NavLink>
      </nav>
    </aside>
  )
}

export default Sidebar

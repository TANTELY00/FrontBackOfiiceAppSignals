// src/components/Sidebar.tsx
import React from 'react'
import { NavLink } from 'react-router-dom'

const Sidebar: React.FC = () => {
  return (
    <aside className="bg-[#1c434e] text-white w-64 min-h-screen p-4 flex flex-col">
      {/* Logo / Titre */}
      <div className="text-2xl font-bold ml-[-6px] mb-7 flex items-center justify-center relative">
         <img
              src="/images/heylogo.png"
              alt="Illustration utilisateur"
              className="border-none w-30 h-15 object-cover mt-[-10px] "
            />
      </div>

      {/* Menu avec marge en haut */}
      <nav className="mt-6 flex flex-col space-y-3">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `block px-3 py-2 rounded hover:bg-indigo-700 ${
              isActive ? 'bg-indigo-700' : ''
            }`
          }
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/users"
          className={({ isActive }) =>
            `block px-3 py-2 rounded hover:bg-indigo-700 ${
              isActive ? 'bg-indigo-700' : ''
            }`
          }
        >
          Utilisateurs
        </NavLink>

        <NavLink
          to="/technicians"
          className={({ isActive }) =>
            `block px-3 py-2 rounded hover:bg-indigo-700 ${
              isActive ? 'bg-indigo-700' : ''
            }`
          }
        >
          Techniciens
        </NavLink>

        <NavLink
          to="/admins"
          className={({ isActive }) =>
            `block px-3 py-2 rounded hover:bg-indigo-700 ${
              isActive ? 'bg-indigo-700' : ''
            }`
          }
        >
          Admins
        </NavLink>

        <NavLink
          to="/notifications"
          className={({ isActive }) =>
            `block px-3 py-2 rounded hover:bg-indigo-700 ${
              isActive ? 'bg-indigo-700' : ''
            }`
          }
        >
          Notifications
        </NavLink>
      </nav>
    </aside>
  )
}

export default Sidebar

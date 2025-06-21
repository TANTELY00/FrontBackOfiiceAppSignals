import React from 'react'
import { useLocation } from 'react-router-dom'

const Header: React.FC = () => {
  const location = useLocation()

  const pageTitles: { [key: string]: string } = {
    '/': 'Tableau de bord',
    '/users': 'Gestion des Utilisateurs',
    '/technicians': 'Gestion des Techniciens',
    '/admins': 'Gestion des Admins',
    '/notifications': 'Centre de Notifications',
  }

  const dynamicTitle = () => {
    if (location.pathname.startsWith('/notifications/')) {
      return 'Détail Notification'
    }
    return pageTitles[location.pathname] || 'Admin Intelligent'
  }

  return (
    <header className="bg-[#1c434e] text-white p-4">
      <h1 className="text-lg font-semibold mt-1">{dynamicTitle()}</h1>
    </header>
  )
}

export default Header

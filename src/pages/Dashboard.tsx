import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import React from 'react'

const Dashboard = () => {
  // Données statiques
  const users = [
    { id: 1, nom: 'Rabe', prenom: 'John' },
    { id: 2, nom: 'Rakoto', prenom: 'Mina' },
    { id: 3, nom: 'Ando', prenom: 'Hery' },
  ]

  const technicians = [
    { id: 1, nom: 'Andry', prenom: 'Lala', status: true },
    { id: 2, nom: 'Hery', prenom: 'Neny', status: false },
    { id: 3, nom: 'Mina', prenom: 'Tiana', status: true },
  ]

  const admins = [
    { id: 1, nom: 'Rasoa', prenom: 'Tiana' },
    { id: 2, nom: 'Solo', prenom: 'Mamy' },
  ]

  const notifications = [
    { id: 1, message: 'Incident réseau', quartier: 'Ankatso' },
    { id: 2, message: 'Problème serveur', quartier: 'Tsimbazaza' },
    { id: 3, message: 'Incident électrique', quartier: 'Analakely' },
    { id: 4, message: 'Réseau coupé', quartier: 'Mahamasina' },
    { id: 5, message: 'Interruption internet', quartier: 'Ankatso' },
    { id: 6, message: 'Maintenance fibre', quartier: 'Analakely' },
  ]

  // Stats calculées
  const totalUsers = users.length
  const totalAdmins = admins.length
  const techAvailable = technicians.filter(t => t.status).length
  const techOccupied = technicians.filter(t => !t.status).length
  const totalNotifications = notifications.length

  // Incidents par quartier
  const incidentsParQuartier = [
    { quartier: 'Ankatso', incidents: notifications.filter(n => n.quartier === 'Ankatso').length },
    { quartier: 'Tsimbazaza', incidents: notifications.filter(n => n.quartier === 'Tsimbazaza').length },
    { quartier: 'Analakely', incidents: notifications.filter(n => n.quartier === 'Analakely').length },
    { quartier: 'Mahamasina', incidents: notifications.filter(n => n.quartier === 'Mahamasina').length },
  ]

  return (
    <div className="p-8 space-y-8">

      {/* Cards stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Utilisateurs */}
        <div className="bg-white rounded shadow p-6 text-center">
          <h2 className="text-lg font-semibold mb-2">Utilisateurs</h2>
          <p className="text-2xl font-bold">{totalUsers}</p>
        </div>

        {/* Techniciens */}
        <div className="bg-white rounded shadow p-6 text-center">
          <h2 className="text-lg font-semibold mb-2">Techniciens</h2>
          <div className="flex justify-around items-center">
            <div>
              <p className="text-green-600 text-sm">Disponibles</p>
              <p className="text-2xl font-bold text-green-600">{techAvailable}</p>
            </div>
            <div className="border-l h-12"></div>
            <div>
              <p className="text-red-600 text-sm">Occupés</p>
              <p className="text-2xl font-bold text-red-600">{techOccupied}</p>
            </div>
          </div>
        </div>

        {/* Admins */}
        <div className="bg-white rounded shadow p-6 text-center">
          <h2 className="text-lg font-semibold mb-2">Admins</h2>
          <p className="text-2xl font-bold">{totalAdmins}</p>
        </div>

        {/* Notifications */}
        <div className="bg-white rounded shadow p-6 text-center">
          <h2 className="text-lg font-semibold mb-2">Notifications</h2>
          <p className="text-2xl font-bold text-indigo-600">{totalNotifications}</p>
        </div>
      </div>

      {/* Courbe incidents */}
      <div className="bg-white rounded shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Incidents par Quartier à Antananarivo</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={incidentsParQuartier}>
            <XAxis dataKey="quartier" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="incidents" stroke="#4f46e5" strokeWidth={3} name="Incidents" />
          </LineChart>
        </ResponsiveContainer>
      </div>

    </div>
  )
}

export default Dashboard

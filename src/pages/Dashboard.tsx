const Dashboard = () => {
  // Données statiques
  const users = [
    { id: 1, nom: 'Rabe', prenom: 'John', adresse: 'Antananarivo' },
    { id: 2, nom: 'Rakoto', prenom: 'Mina', adresse: 'Fianarantsoa' },
    { id: 3, nom: 'Ando', prenom: 'Hery', adresse: 'Toamasina' },
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
    { id: 1, message: 'Incident réseau signalé' },
    { id: 2, message: 'Demande d’assistance technicien' },
    { id: 3, message: 'Nouvel utilisateur ajouté' },
  ]

  // Calcul des stats
  const totalUsers = users.length
  const totalAdmins = admins.length
  const techAvailable = technicians.filter(t => t.status).length
  const techOccupied = technicians.filter(t => !t.status).length
  const totalNotifications = notifications.length

  return (
    <div className="p-8 space-y-8">

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Utilisateurs */}
        <div className="bg-white rounded shadow p-6 text-center">
          <h2 className="text-lg font-semibold mb-2">Utilisateurs</h2>
          <p className="text-2xl font-bold">{totalUsers}</p>
        </div>

        {/* Techniciens */}
        <div className="bg-white rounded shadow p-6 text-center">
          <h2 className="text-xl font-semibold mb-4">Techniciens</h2>
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
    </div>
  )
}

export default Dashboard

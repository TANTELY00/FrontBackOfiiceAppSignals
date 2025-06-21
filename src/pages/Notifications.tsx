import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

interface User {
  id: number
  nom: string
  prenom: string
  adresse: string
  telephone: string
}

interface Notification {
  id: number
  userId: number
  message: string
  date: string
}

const Notifications = () => {
  const navigate = useNavigate()

  const [users] = useState<User[]>([
    { id: 1, nom: 'Rabe', prenom: 'John', adresse: 'Antananarivo', telephone: '0341234567' },
    { id: 2, nom: 'Rakoto', prenom: 'Mina', adresse: 'Fianarantsoa', telephone: '0337654321' },
  ])

  const [notifications, setNotifications] = useState<Notification[]>([
    { id: 1, userId: 1, message: 'Incident réseau signalé', date: '2025-06-20' },
    { id: 2, userId: 2, message: 'Demande d\'assistance logicielle', date: '2025-06-21' },
  ])

  const [searchTerm, setSearchTerm] = useState('')

  const filteredNotifications = notifications.filter(notification => {
    const user = users.find(u => u.id === notification.userId)
    const search = searchTerm.toLowerCase()
    return (
      notification.message.toLowerCase().includes(search) ||
      (user && (`${user.nom} ${user.prenom}`).toLowerCase().includes(search))
    )
  })

  const handleDelete = (id: number, e?: React.MouseEvent) => {
    e?.stopPropagation() // empêche la propagation du clic sur la ligne
    if (confirm('Confirmer la suppression de cette notification ?')) {
      setNotifications(notifications.filter(n => n.id !== id))
    }
  }

  return (
    <div className="p-8 bg-white rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Liste des notifications</h2>

      <input
        type="text"
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        placeholder="Rechercher notifications ou utilisateurs..."
        className="w-full border p-2 rounded mb-4"
      />

      <table className="w-full border text-left">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">Message</th>
            <th className="p-2 border">Date</th>
            <th className="p-2 border">Utilisateur</th>
            <th className="p-2 border">Adresse</th>
            <th className="p-2 border">Téléphone</th>
            <th className="p-2 border text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredNotifications.map(notification => {
            const user = users.find(u => u.id === notification.userId)
            return (
              <tr
                key={notification.id}
                className="hover:bg-gray-50 cursor-pointer"
                onClick={() => navigate(`/notifications/${notification.id}`)}
              >
                <td className="p-2 border">{notification.message}</td>
                <td className="p-2 border">{notification.date}</td>
                <td className="p-2 border">{user ? `${user.nom} ${user.prenom}` : 'Utilisateur inconnu'}</td>
                <td className="p-2 border">{user ? user.adresse : '-'}</td>
                <td className="p-2 border">{user ? user.telephone : '-'}</td>
                <td className="p-2 border text-center">
                  <button
                    onClick={(e) => handleDelete(notification.id, e)}
                    className="bg-red-500 hover:bg-red-600 text-white py-1 px-2 rounded text-sm"
                  >
                    Supprimer
                  </button>
                </td>
              </tr>
            )
          })}
          {filteredNotifications.length === 0 && (
            <tr>
              <td colSpan={6} className="p-4 text-center text-gray-500">Aucune notification trouvée.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Notifications

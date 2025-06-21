import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

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

interface Technician {
  id: number
  nom: string
  prenom: string
  status: boolean
}

const NotificationDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  const [users] = useState<User[]>([
    { id: 1, nom: 'Rabe', prenom: 'John', adresse: 'Antananarivo', telephone: '0341234567' },
    { id: 2, nom: 'Rakoto', prenom: 'Mina', adresse: 'Fianarantsoa', telephone: '0337654321' },
  ])

  const [notifications, setNotifications] = useState<Notification[]>([
    { id: 1, userId: 1, message: 'Incident réseau signalé', date: '2025-06-20' },
    { id: 2, userId: 2, message: 'Demande d\'assistance logicielle', date: '2025-06-21' },
  ])

  const [technicians] = useState<Technician[]>([
    { id: 1, nom: 'Rabe', prenom: 'John', status: true },
    { id: 2, nom: 'Rakoto', prenom: 'Mina', status: false },
    { id: 3, nom: 'Ando', prenom: 'Lova', status: true },
  ])

  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [selectedTechs, setSelectedTechs] = useState<number[]>([])

  const notification = notifications.find(n => n.id === Number(id))
  if (!notification) return <div className="p-8">Notification introuvable.</div>

  const user = users.find(u => u.id === notification.userId)
  const availableTechnicians = technicians.filter(t => t.status)

  const handleTechToggle = (techId: number) => {
    setSelectedTechs(prev =>
      prev.includes(techId)
        ? prev.filter(id => id !== techId)
        : [...prev, techId]
    )
  }

  const handleDelete = () => {
    if (window.confirm('Confirmer la suppression de cette notification ?')) {
      setNotifications(notifications.filter(n => n.id !== notification.id))
      navigate('/notifications')
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    alert(`Réponse envoyée.\nTechniciens assignés : ${selectedTechs.join(', ')}`)
    setSelectedTechs([])
    setDropdownOpen(false)
  }

  return (
    <div className="p-8 bg-white rounded shadow max-w-4xl mx-auto space-y-6">
      <button
        onClick={() => navigate(-1)}
        className="text-indigo-600 hover:underline"
      >
        ← Retour aux notifications
      </button>

      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Détail de la notification</h2>
        <button
          onClick={handleDelete}
          className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
        >
          Supprimer
        </button>
      </div>

      <div className="border p-4 rounded bg-gray-50">
        <p><strong>Message :</strong> {notification.message}</p>
        <p><strong>Date :</strong> {notification.date}</p>
      </div>

      <div className="border p-4 rounded bg-gray-50">
        <h3 className="font-semibold mb-2">Informations utilisateur</h3>
        {user ? (
          <ul className="list-disc list-inside">
            <li>Nom complet : {user.nom} {user.prenom}</li>
            <li>Adresse : {user.adresse}</li>
            <li>Téléphone : {user.telephone}</li>
          </ul>
        ) : (
          <p>Utilisateur inconnu</p>
        )}
      </div>

      <div className="border p-4 rounded bg-gray-50">
        <h3 className="font-semibold mb-2">Techniciens disponibles</h3>
        <div className="relative">
          <button
            type="button"
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="w-full border p-2 rounded flex justify-between items-center"
          >
            Sélectionner les techniciens
            <span className="ml-2">▼</span>
          </button>

          {dropdownOpen && (
            <div className="absolute z-10 mt-2 w-full border rounded bg-white shadow p-2 space-y-1 max-h-60 overflow-y-auto">
              {availableTechnicians.map(t => (
                <label key={t.id} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={selectedTechs.includes(t.id)}
                    onChange={() => handleTechToggle(t.id)}
                    className="form-checkbox"
                  />
                  <span>{t.nom} {t.prenom}</span>
                </label>
              ))}
            </div>
          )}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="border p-4 rounded bg-gray-50 space-y-4">
        <h3 className="font-semibold">Répondre à l'utilisateur</h3>
        <textarea
          placeholder="Votre message de réponse..."
          rows={4}
          className="w-full border p-2 rounded"
          required
        />
        <button
          type="submit"
          className="bg-indigo-600 text-white p-2 rounded hover:bg-indigo-700"
        >
          Envoyer la réponse
        </button>
      </form>
    </div>
  )
}

export default NotificationDetail

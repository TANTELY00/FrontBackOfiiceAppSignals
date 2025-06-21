import React, { useState, useEffect } from 'react'
import api from '../api' // assure-toi que ce chemin est correct

interface User {
  _id: string
  nom: string
  prenom: string
  adresse: string
}

const Technicien = () => {
  const [users, setUsers] = useState<User[]>([])
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    adresse: ''
  })
  const [searchTerm, setSearchTerm] = useState('')
  const [editingId, setEditingId] = useState<string | null>(null)

  // Charge les utilisateurs depuis backend
  const fetchUsers = async () => {
    try {
      const response = await api.get('/utilisateurs')
      setUsers(response.data)
    } catch (error) {
      console.error('Erreur de chargement utilisateurs', error)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  // Met à jour formData au changement des inputs
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  // Ajout ou modification selon editingId
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (editingId) {
        await api.patch(`/utilisateurs/${editingId}`, formData)
        setEditingId(null)
      } else {
        await api.post('/utilisateurs', formData)
      }
      setFormData({ nom: '', prenom: '', adresse: '' })
      fetchUsers()
    } catch (error) {
      console.error('Erreur enregistrement utilisateur', error)
    }
  }

  // Suppression utilisateur via API
  const handleDelete = async (id: string) => {
    if (confirm('Confirmer la suppression ?')) {
      try {
        await api.delete(`/utilisateurs/${id}`)
        setUsers(prevUsers => prevUsers.filter(user => user._id !== id))
        console.log(`Utilisateur ${id} supprimé.`)
      } catch (error) {
        console.error('Erreur suppression', error)
      }
    }
  }

  // Prépare formulaire pour édition
  const handleEdit = (user: User) => {
    setFormData({
      nom: user.nom,
      prenom: user.prenom,
      adresse: user.adresse
    })
    setEditingId(user._id)
  }

  // Filtre la liste selon recherche
  const filteredUsers = users.filter(user =>
    `${user.nom} ${user.prenom}`.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
      {/* Formulaire ajout/modification */}
      <div className="md:col-span-1 bg-white rounded shadow p-6">
        <h2 className="text-xl font-semibold mb-4">
          {editingId ? 'Modifier' : 'Ajouter'} un utilisateur
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="nom"
            value={formData.nom}
            onChange={handleChange}
            placeholder="Nom"
            className="w-full border p-2 rounded"
            required
          />
          <input
            type="text"
            name="prenom"
            value={formData.prenom}
            onChange={handleChange}
            placeholder="Prénom"
            className="w-full border p-2 rounded"
            required
          />
          <input
            type="text"
            name="adresse"
            value={formData.adresse}
            onChange={handleChange}
            placeholder="Adresse"
            className="w-full border p-2 rounded"
            required
          />
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white p-2 rounded hover:bg-indigo-700"
          >
            {editingId ? 'Enregistrer les modifications' : 'Ajouter'}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={() => {
                setFormData({ nom: '', prenom: '', adresse: '' })
                setEditingId(null)
              }}
              className="w-full bg-gray-400 text-white p-2 rounded hover:bg-gray-500"
            >
              Annuler
            </button>
          )}
        </form>
      </div>

      {/* Liste des utilisateurs */}
      <div className="md:col-span-2 bg-white rounded shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Liste des utilisateurs</h2>

        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Rechercher par nom ou prénom..."
          className="w-full border p-2 rounded mb-4"
        />

        <table className="w-full border text-left">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border">Nom</th>
              <th className="p-2 border">Prénom</th>
              <th className="p-2 border">Adresse</th>
              <th className="p-2 border text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length === 0 && (
              <tr>
                <td colSpan={4} className="p-4 text-center text-gray-500">
                  Aucun utilisateur trouvé.
                </td>
              </tr>
            )}
            {filteredUsers.map(user => (
              <tr key={user._id} className="hover:bg-gray-50">
                <td className="p-2 border">{user.nom}</td>
                <td className="p-2 border">{user.prenom}</td>
                <td className="p-2 border">{user.adresse}</td>
                <td className="p-2 border text-center space-x-2">
                  <button
                    onClick={() => handleEdit(user)}
                    className="bg-yellow-400 hover:bg-yellow-500 text-white py-1 px-2 rounded text-sm"
                  >
                    Modifier
                  </button>
                  <button
                    onClick={() => handleDelete(user._id)}
                    className="bg-red-500 hover:bg-red-600 text-white py-1 px-2 rounded text-sm"
                  >
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Technicien

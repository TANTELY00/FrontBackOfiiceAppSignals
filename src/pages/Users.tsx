import { useState } from 'react'

interface User {
  id: number
  nom: string
  prenom: string
  adresse: string
}

const Users = () => {
  const [users, setUsers] = useState<User[]>([
    { id: 1, nom: 'Rabe', prenom: 'John', adresse: 'Antananarivo' },
    { id: 2, nom: 'Rakoto', prenom: 'Mina', adresse: 'Fianarantsoa' },
    { id: 3, nom: 'Ando', prenom: 'Lova', adresse: 'Toamasina' },
  ])

  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    adresse: ''
  })

  const [searchTerm, setSearchTerm] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newUser = {
      id: users.length + 1,
      ...formData
    }
    setUsers([...users, newUser])
    setFormData({ nom: '', prenom: '', adresse: '' })
  }

  const handleDelete = (id: number) => {
    if (confirm('Confirmer la suppression de cet utilisateur ?')) {
      setUsers(users.filter(user => user.id !== id))
    }
  }

  const handleEdit = (id: number) => {
    const userToEdit = users.find(user => user.id === id)
    if (userToEdit) {
      setFormData({
        nom: userToEdit.nom,
        prenom: userToEdit.prenom,
        adresse: userToEdit.adresse
      })
      setUsers(users.filter(user => user.id !== id))
    }
  }

  const filteredUsers = users.filter(user =>
    `${user.nom} ${user.prenom}`.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
      {/* Formulaire */}
      <div className="md:col-span-1 bg-white rounded shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Ajouter un utilisateur</h2>
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
          <button type="submit" className="w-full bg-indigo-600 text-white p-2 rounded hover:bg-indigo-700">
            Ajouter
          </button>
        </form>
      </div>

      {/* Liste des utilisateurs */}
      <div className="md:col-span-2 bg-white rounded shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Liste des utilisateurs</h2>

        {/* Barre de recherche */}
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Rechercher par nom ou prénom..."
          className="w-full border p-2 rounded mb-4"
        />

        {/* Tableau */}
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
            {filteredUsers.map(user => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="p-2 border">{user.nom}</td>
                <td className="p-2 border">{user.prenom}</td>
                <td className="p-2 border">{user.adresse}</td>
                <td className="p-2 border text-center space-x-2">
                  <button
                    onClick={() => handleEdit(user.id)}
                    className="bg-yellow-400 hover:bg-yellow-500 text-white py-1 px-2 rounded text-sm"
                  >
                    Modifier
                  </button>
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="bg-red-500 hover:bg-red-600 text-white py-1 px-2 rounded text-sm"
                  >
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
            {filteredUsers.length === 0 && (
              <tr>
                <td colSpan={4} className="p-4 text-center text-gray-500">Aucun utilisateur trouvé.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Users

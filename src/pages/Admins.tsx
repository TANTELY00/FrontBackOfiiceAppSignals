import { useState } from 'react'

interface Admin {
  id: number
  nom: string
  prenom: string
  email: string
}

const Admins = () => {
  const [admins, setAdmins] = useState<Admin[]>([
    { id: 1, nom: 'Rabe', prenom: 'John', email: 'john@admin.com' },
    { id: 2, nom: 'Rakoto', prenom: 'Mina', email: 'mina@admin.com' },
  ])

  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: ''
  })

  const [searchTerm, setSearchTerm] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newAdmin = {
      id: admins.length + 1,
      ...formData
    }
    setAdmins([...admins, newAdmin])
    setFormData({ nom: '', prenom: '', email: '' })
  }

  const handleDelete = (id: number) => {
    if (confirm('Confirmer la suppression de cet admin ?')) {
      setAdmins(admins.filter(admin => admin.id !== id))
    }
  }

  const handleEdit = (id: number) => {
    const adminToEdit = admins.find(admin => admin.id === id)
    if (adminToEdit) {
      setFormData({
        nom: adminToEdit.nom,
        prenom: adminToEdit.prenom,
        email: adminToEdit.email
      })
      setAdmins(admins.filter(admin => admin.id !== id))
    }
  }

  const filteredAdmins = admins.filter(admin =>
    `${admin.nom} ${admin.prenom}`.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
      {/* Formulaire */}
      <div className="md:col-span-1 bg-white rounded shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Ajouter un admin</h2>
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
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full border p-2 rounded"
            required
          />
          <button type="submit" className="w-full bg-indigo-600 text-white p-2 rounded hover:bg-indigo-700">
            Ajouter
          </button>
        </form>
      </div>

      {/* Liste des admins */}
      <div className="md:col-span-2 bg-white rounded shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Liste des admins</h2>

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
              <th className="p-2 border">Email</th>
              <th className="p-2 border text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredAdmins.map(admin => (
              <tr key={admin.id} className="hover:bg-gray-50">
                <td className="p-2 border">{admin.nom}</td>
                <td className="p-2 border">{admin.prenom}</td>
                <td className="p-2 border">{admin.email}</td>
                <td className="p-2 border text-center space-x-2">
                  <button
                    onClick={() => handleEdit(admin.id)}
                    className="bg-yellow-400 hover:bg-yellow-500 text-white py-1 px-2 rounded text-sm"
                  >
                    Modifier
                  </button>
                  <button
                    onClick={() => handleDelete(admin.id)}
                    className="bg-red-500 hover:bg-red-600 text-white py-1 px-2 rounded text-sm"
                  >
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
            {filteredAdmins.length === 0 && (
              <tr>
                <td colSpan={4} className="p-4 text-center text-gray-500">Aucun admin trouvé.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Admins

import { useState } from 'react'

interface Technician {
  id: number
  nom: string
  prenom: string
  adresse: string
  status: boolean
}

const Technicians = () => {
  const [technicians, setTechnicians] = useState<Technician[]>([
    { id: 1, nom: 'Rabe', prenom: 'John', adresse: 'Antananarivo', status: true },
    { id: 2, nom: 'Rakoto', prenom: 'Mina', adresse: 'Fianarantsoa', status: false },
    { id: 3, nom: 'Ando', prenom: 'Lova', adresse: 'Toamasina', status: true },
  ])

  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    adresse: '',
    status: false
  })

  const [searchTerm, setSearchTerm] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newTechnician = {
      id: technicians.length + 1,
      ...formData
    }
    setTechnicians([...technicians, newTechnician])
    setFormData({ nom: '', prenom: '', adresse: '', status: false })
  }

  const handleDelete = (id: number) => {
    if (confirm('Confirmer la suppression de ce technicien ?')) {
      setTechnicians(technicians.filter(tech => tech.id !== id))
    }
  }

  const handleEdit = (id: number) => {
    const techToEdit = technicians.find(tech => tech.id === id)
    if (techToEdit) {
      setFormData({
        nom: techToEdit.nom,
        prenom: techToEdit.prenom,
        adresse: techToEdit.adresse,
        status: techToEdit.status
      })
      setTechnicians(technicians.filter(tech => tech.id !== id))
    }
  }

  const filteredTechnicians = technicians.filter(tech =>
    `${tech.nom} ${tech.prenom}`.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
      {/* Formulaire */}
      <div className="md:col-span-1 bg-white rounded shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Ajouter un technicien</h2>
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
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="status"
              checked={formData.status}
              onChange={handleChange}
              className="border"
            />
            <span>Disponible</span>
          </label>
          <button type="submit" className="w-full bg-indigo-600 text-white p-2 rounded hover:bg-indigo-700">
            Ajouter
          </button>
        </form>
      </div>

      {/* Liste des techniciens */}
      <div className="md:col-span-2 bg-white rounded shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Liste des techniciens</h2>

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
              <th className="p-2 border">Statut</th>
              <th className="p-2 border text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredTechnicians.map(tech => (
              <tr key={tech.id} className="hover:bg-gray-50">
                <td className="p-2 border">{tech.nom}</td>
                <td className="p-2 border">{tech.prenom}</td>
                <td className="p-2 border">{tech.adresse}</td>
                <td className="p-2 border">
                  {tech.status ? (
                    <span className="text-green-600 font-semibold">Disponible</span>
                  ) : (
                    <span className="text-red-500 font-semibold">Occupé</span>
                  )}
                </td>
                <td className="p-2 border text-center space-x-2">
                  <button
                    onClick={() => handleEdit(tech.id)}
                    className="bg-yellow-400 hover:bg-yellow-500 text-white py-1 px-2 rounded text-sm"
                  >
                    Modifier
                  </button>
                  <button
                    onClick={() => handleDelete(tech.id)}
                    className="bg-red-500 hover:bg-red-600 text-white py-1 px-2 rounded text-sm"
                  >
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
            {filteredTechnicians.length === 0 && (
              <tr>
                <td colSpan={5} className="p-4 text-center text-gray-500">Aucun technicien trouvé.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Technicians

'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { FaCalendarAlt, FaEdit, FaTrash, FaPlus, FaEye } from 'react-icons/fa'
import axios from 'axios'

interface Workshop {
  id: number
  title: string
  instructor: string
  price: string
  imageUrl: string
  description: string
  lastUpdated: string
  duration: string
  highlights: string[]
}

export default function ManageWorkshops() {
  const [workshops, setWorkshops] = useState<Workshop[]>([])
  const [editingWorkshop, setEditingWorkshop] = useState<Workshop | null>(null)
  const router = useRouter()

  useEffect(() => {
    fetchWorkshops()
  }, [])

  const fetchWorkshops = async () => {
    try {
      const response = await axios.get<Workshop[]>('src/api/workshops')
      setWorkshops(response.data)
    } catch (error) {
      console.error('Error fetching workshops:', error)
    }
  }

  const handleEditWorkshop = (workshop: Workshop) => {
    setEditingWorkshop({ ...workshop })
  }

  const handleUpdateWorkshop = async () => {
    if (!editingWorkshop) return

    try {
      if (editingWorkshop.id) {
        await axios.put(`/api/workshops?id=${editingWorkshop.id}`, editingWorkshop)
      } else {
        await axios.post('/api/workshops', editingWorkshop)
      }
      setEditingWorkshop(null)
      fetchWorkshops()
    } catch (error) {
      console.error('Error saving workshop:', error)
    }
  }

  const handleDeleteWorkshop = async (id: number) => {
    try {
      await axios.delete(`/api/workshops?id=${id}`)
      fetchWorkshops()
    } catch (error) {
      console.error('Error deleting workshop:', error)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setEditingWorkshop(prev => prev ? { ...prev, [name]: value } : null)
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setEditingWorkshop(prev => prev ? { ...prev, imageUrl: reader.result as string } : null)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleHighlightChange = (index: number, value: string) => {
    setEditingWorkshop(prev => {
      if (!prev) return null
      const newHighlights = [...prev.highlights]
      newHighlights[index] = value
      return { ...prev, highlights: newHighlights }
    })
  }

  const handleAddHighlight = () => {
    setEditingWorkshop(prev => {
      if (!prev) return null
      return { ...prev, highlights: [...prev.highlights, ''] }
    })
  }

  const handleAddWorkshop = () => {
    setEditingWorkshop({
      id: 0,
      title: '',
      instructor: '',
      price: '',
      imageUrl: '',
      description: '',
      lastUpdated: new Date().toISOString(),
      duration: '',
      highlights: ['']
    })
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
    <h1 className="text-3xl font-bold mb-8">Manage Workshops</h1>
    <button
      onClick={handleAddWorkshop}
      className="mb-6 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-300"
    >
      <FaPlus className="inline mr-2" /> Add New Workshop
    </button>
    
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {workshops.map(workshop => (
        <div key={workshop.id} className="bg-white rounded-lg shadow-md p-6">
          <img src={workshop.imageUrl} alt={workshop.title} className="w-full h-48 object-cover rounded-md mb-4" />
          <h2 className="text-xl font-semibold mb-2">{workshop.title}</h2>
          <p className="text-gray-600 mb-2">{workshop.instructor}</p>
          <p className="text-gray-800 mb-2">{workshop.price}</p>
          <div className="flex justify-between mt-4">
            <button
              onClick={() => handleEditWorkshop(workshop)}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
            >
              <FaEdit className="inline mr-2" /> Edit
            </button>
            <button
              onClick={() => router.push(`/workshops/${workshop.id}`)}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-300"
            >
              <FaEye className="inline mr-2" /> View Details
            </button>
            <button
              onClick={() => handleDeleteWorkshop(workshop.id)}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-300"
            >
              <FaTrash className="inline mr-2" /> Delete
            </button>
          </div>
        </div>
      ))}
    </div>
    {editingWorkshop && (
      <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" id="my-modal">
        <div className="relative top-20 mx-auto p-5 border w-full max-w-xl shadow-lg rounded-md bg-white">
          <h3 className="text-lg font-semibold mb-4">
            {editingWorkshop.id ? 'Edit Workshop' : 'Add New Workshop'}
          </h3>
          <form onSubmit={(e) => { e.preventDefault(); handleUpdateWorkshop(); }}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
                Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={editingWorkshop.title}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            {/* More form fields go here */}
            <div className="flex justify-end mt-4">
              <button
                type="button"
                onClick={() => setEditingWorkshop(null)}
                className="mr-4 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition duration-300"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    )}
  </div>
)
}
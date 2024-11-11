'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FaCalendarAlt, FaEdit, FaTrash, FaPlus, FaEye } from 'react-icons/fa';
import axios from 'axios';

export default function ManageInternships() {
  const [internships, setInternships] = useState([]);
  const [editingInternship, setEditingInternship] = useState(null);
  const router = useRouter();

  useEffect(() => {
    fetchInternships();
  }, []);

  const fetchInternships = async () => {
    try {
      const response = await axios.get('/api/internships');
      setInternships(response.data);
    } catch (error) {
      console.error('Error fetching internships:', error);
    }
  };

  const handleEditInternship = (internship) => {
    setEditingInternship({ ...internship });
  };

  const handleUpdateInternship = async () => {
    if (!editingInternship) return;

    try {
      if (editingInternship.id) {
        await axios.put(`/api/internships?id=${editingInternship.id}`, editingInternship);
      } else {
        await axios.post('/api/internships', editingInternship);
      }
      setEditingInternship(null);
      fetchInternships();
    } catch (error) {
      console.error('Error saving internship:', error);
    }
  };

  const handleDeleteInternship = async (id) => {
    try {
      await axios.delete(`/api/internships?id=${id}`);
      fetchInternships();
    } catch (error) {
      console.error('Error deleting internship:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditingInternship((prev) => (prev ? { ...prev, [name]: value } : null));
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditingInternship((prev) => (prev ? { ...prev, imageUrl: reader.result } : null));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddInternship = () => {
    setEditingInternship({
      id: 0,
      title: '',
      company: '',
      stipend: '',
      imageUrl: '',
      description: '',
      lastUpdated: new Date().toISOString(),
      duration: '',
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-8">Manage Internships</h1>
      <button
        onClick={handleAddInternship}
        className="mb-6 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-300"
      >
        <FaPlus className="inline mr-2" /> Add New Internship
      </button>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {internships.map((internship) => (
          <div key={internship.id} className="bg-white rounded-lg shadow-md p-6">
            <img src={internship.imageUrl} alt={internship.title} className="w-full h-48 object-cover rounded-md mb-4" />
            <h2 className="text-xl font-semibold mb-2">{internship.title}</h2>
            <p className="text-gray-600 mb-2">{internship.company}</p>
            <p className="text-gray-800 mb-2">{internship.stipend}</p>
            <div className="flex justify-between mt-4">
              <button
                onClick={() => handleEditInternship(internship)}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
              >
                <FaEdit className="inline mr-2" /> Edit
              </button>
              <button
                onClick={() => router.push(`/internships/${internship.id}`)}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-300"
              >
                <FaEye className="inline mr-2" /> View Details
              </button>
              <button
                onClick={() => handleDeleteInternship(internship.id)}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-300"
              >
                <FaTrash className="inline mr-2" /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      {editingInternship && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" id="my-modal">
          <div className="relative top-20 mx-auto p-5 border w-full max-w-xl shadow-lg rounded-md bg-white">
            <h3 className="text-lg font-semibold mb-4">
              {editingInternship.id ? 'Edit Internship' : 'Add New Internship'}
            </h3>
            <form onSubmit={(e) => { e.preventDefault(); handleUpdateInternship(); }}>
              <div className="mb-4">
                <label className="block text-sm font-semibold mb-2">Title</label>
                <input
                  type="text"
                  name="title"
                  value={editingInternship.title}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md"
                  placeholder="Internship Title"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-semibold mb-2">Company</label>
                <input
                  type="text"
                  name="company"
                  value={editingInternship.company}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md"
                  placeholder="Company Name"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-semibold mb-2">Stipend</label>
                <input
                  type="text"
                  name="stipend"
                  value={editingInternship.stipend}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md"
                  placeholder="Stipend Amount"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-semibold mb-2">Duration</label>
                <input
                  type="text"
                  name="duration"
                  value={editingInternship.duration}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md"
                  placeholder="Duration"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-semibold mb-2">Description</label>
                <textarea
                  name="description"
                  value={editingInternship.description}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md"
                  placeholder="Internship Description"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-semibold mb-2">Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full p-2 border rounded-md"
                />
              </div>
              <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                {editingInternship.id ? 'Update Internship' : 'Add Internship'}
              </button>
              <button
                type="button"
                onClick={() => setEditingInternship(null)}
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded ml-4"
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

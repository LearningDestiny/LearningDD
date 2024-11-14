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
    setEditingInternship({ ...editingInternship, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditingInternship({ ...editingInternship, imageUrl: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleHighlightChange = (index, value) => {
    const newHighlights = [...editingInternship.highlights];
    newHighlights[index] = value;
    setEditingInternship({ ...editingInternship, highlights: newHighlights });
  };

  const handleAddHighlight = () => {
    setEditingInternship({
      ...editingInternship,
      highlights: [...(editingInternship.highlights || []), '']
    });
  };

  const handleAddInternship = () => {
    setEditingInternship({
      title: '',
      company: '',
      stipend: '',
      duration: '',
      description: '',
      summaryDescription: '',
      imageUrl: '',
      highlights: [''],
      location: '',
      organizer: ''
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
        {internships.map(internship => (
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
                onClick={() => router.push(`/internship/${internship.id}`)}
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
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={editingInternship.title}
                  onChange={handleInputChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="company">
                  Company
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={editingInternship.company}
                  onChange={handleInputChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="stipend">
                  Stipend
                </label>
                <input
                  type="text"
                  id="stipend"
                  name="stipend"
                  value={editingInternship.stipend}
                  onChange={handleInputChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="duration">
                  Duration
                </label>
                <input
                  type="text"
                  id="duration"
                  name="duration"
                  value={editingInternship.duration}
                  onChange={handleInputChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={editingInternship.description}
                  onChange={handleInputChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  rows="3"
                ></textarea>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="summaryDescription">
                  Summary Description
                </label>
                <textarea
                  id="summaryDescription"
                  name="summaryDescription"
                  value={editingInternship.summaryDescription}
                  onChange={handleInputChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  rows="2"
                ></textarea>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image">
                  Image
                </label>
                <input
                  type="file"
                  id="image"
                  name="image"
                  onChange={handleImageChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  accept="image/*"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Highlights
                </label>
                {editingInternship.highlights && editingInternship.highlights.map((highlight, index) => (
                  <div key={index} className="flex items-center mb-2">
                    <FaCalendarAlt className="mr-2 text-blue-500" />
                    <input
                      type="text"
                      value={highlight}
                      onChange={(e) => handleHighlightChange(index, e.target.value)}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                  </div>
                ))}
                <button
                  type="button"
                  onClick={handleAddHighlight}
                  className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
                >
                  <FaPlus className="inline mr-2" /> Add Highlight
                </button>
              </div>
              <div className="flex items-center justify-between">
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  {editingInternship.id ? 'Update Internship' : 'Add Internship'}
                </button>
                <button
                  type="button"
                  onClick={() => setEditingInternship(null)}
                  className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
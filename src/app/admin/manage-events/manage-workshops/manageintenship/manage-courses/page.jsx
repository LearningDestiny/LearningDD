'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FaPlayCircle, FaEdit, FaTrash, FaPlus, FaEye } from 'react-icons/fa';

export default function ManageCourses() {
  const [courses, setCourses] = useState([]);
  const [editingCourse, setEditingCourse] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/courses');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setCourses(data);
    } catch (error) {
      setError('Failed to load courses. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditCourse = (course) => {
    setEditingCourse({ ...course });
  };

  const handleUpdateCourse = async () => {
    try {
      if (editingCourse) {
        const url = editingCourse.id
          ? `/api/courses?id=${editingCourse.id}`
          : '/api/courses';
        const method = editingCourse.id ? 'PUT' : 'POST';

        const response = await fetch(url, {
          method,
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(editingCourse),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        setEditingCourse(null);
        fetchCourses();
      }
    } catch (error) {
      setError('Failed to save course. Please try again.');
    }
  };

  const handleDeleteCourse = async (id) => {
    try {
      const response = await fetch(`/api/courses?id=${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      fetchCourses();
    } catch (error) {
      setError('Failed to delete course. Please try again.');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditingCourse((prev) => (prev ? { ...prev, [name]: value } : null));
  };

  const handleHighlightChange = (index, value) => {
    setEditingCourse((prev) => {
      if (!prev) return null;
      const newHighlights = [...prev.highlights];
      newHighlights[index] = value;
      return { ...prev, highlights: newHighlights };
    });
  };

  const handleAddHighlight = () => {
    setEditingCourse((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        highlights: [...prev.highlights, ''],
      };
    });
  };

  const handleAddCourse = () => {
    setEditingCourse({
      id: '',
      title: '',
      instructor: '',
      rating: 0,
      ratingCount: 0,
      price: '',
      imageUrl: '',
      lastUpdated: new Date().toISOString().split('T')[0],
      duration: '',
      lectureCount: 0,
      description: '',
      highlights: [''],
    });
  };

  if (isLoading) {
    return <div className="text-center py-10">Loading courses...</div>;
  }

  if (error) {
    return <div className="text-center py-10 text-red-500">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-8">Manage Courses</h1>
      <button
        onClick={handleAddCourse}
        className="mb-6 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-300"
      >
        <FaPlus className="inline mr-2" /> Add New Course
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div key={course.id} className="bg-white rounded-lg shadow-md p-6">
            <img
              src={course.imageUrl}
              alt={course.title}
              className="w-full h-48 object-cover rounded-md mb-4"
            />
            <h2 className="text-xl font-semibold mb-2">{course.title}</h2>
            <p className="text-gray-600 mb-2">{course.instructor}</p>
            <p className="text-gray-800 mb-2">{course.price}</p>
            <div className="flex justify-between mt-4">
              <button
                onClick={() => handleEditCourse(course)}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
              >
                <FaEdit className="inline mr-2" /> Edit
              </button>
              <button
                onClick={() => router.push(`/course/${course.id}`)}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-300"
              >
                <FaEye className="inline mr-2" /> View Details
              </button>
              <button
                onClick={() => handleDeleteCourse(course.id)}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-300"
              >
                <FaTrash className="inline mr-2" /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {editingCourse && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
          <div className="relative top-20 mx-auto p-5 border w-full max-w-xl shadow-lg rounded-md bg-white">
            <h3 className="text-lg font-semibold mb-4">
              {editingCourse.id ? 'Edit Course' : 'Add New Course'}
            </h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleUpdateCourse();
              }}
            >
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={editingCourse.title}
                  onChange={handleInputChange}
                  className="shadow border rounded w-full py-2 px-3"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Instructor
                </label>
                <input
                  type="text"
                  name="instructor"
                  value={editingCourse.instructor}
                  onChange={handleInputChange}
                  className="shadow border rounded w-full py-2 px-3"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Price
                </label>
                <input
                  type="text"
                  name="price"
                  value={editingCourse.price}
                  onChange={handleInputChange}
                  className="shadow border rounded w-full py-2 px-3"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Description
                </label>
                <textarea
                  name="description"
                  value={editingCourse.description}
                  onChange={handleInputChange}
                  className="shadow border rounded w-full py-2 px-3"
                  rows="4"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setEditingCourse(null)}
                  className="bg-gray-400 text-white px-4 py-2 rounded mr-2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-green-500 text-white px-4 py-2 rounded"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

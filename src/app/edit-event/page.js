'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import axios from 'axios';

const EditEvent = () => {
  const [eventData, setEventData] = useState(null);
  const router = useRouter();
  const params = useSearchParams();
  const eventId = params.get('id');

  useEffect(() => {
    if (eventId) fetchEventData();
  }, [eventId]);

  const fetchEventData = async () => {
    try {
      const response = await axios.get(`/api/events?id=${eventId}`);
      setEventData(response.data);
    } catch (error) {
      console.error('Error fetching event data:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEventData({ ...eventData, [name]: value });
  };

  const handleUpdateEvent = async () => {
    try {
      await axios.put(`/api/events?id=${eventId}`, eventData);
      router.push('/admin/manage-events'); // Redirect to events management page
    } catch (error) {
      console.error('Error updating event:', error);
    }
  };

  if (!eventData) {
    return <p>Loading..</p>;
  }

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <h2 className="text-3xl font-bold mb-6">Edit Event</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleUpdateEvent();
        }}
        className="space-y-4"
      >
        <div>
          <label className="block font-bold mb-1">Title</label>
          <input
            type="text"
            name="title"
            value={eventData.title}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded"
          />
        </div>
        
        {/* Additional Input Fields for Description, Date, Location, Price */}
        <div>
          <label className="block font-bold mb-1">Description</label>
          <textarea
            name="description"
            value={eventData.description}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded"
          />
        </div>

        {/* Handle Event Highlights */}
        <div>
          <label className="block font-bold mb-1">Highlights</label>
          {eventData.highlights.map((highlight, index) => (
            <input
              key={index}
              type="text"
              value={highlight}
              onChange={(e) => {
                const newHighlights = [...eventData.highlights];
                newHighlights[index] = e.target.value;
                setEventData({ ...eventData, highlights: newHighlights });
              }}
              className="w-full mb-2 px-4 py-2 border rounded"
            />
          ))}
        </div>

        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Update Event
        </button>
      </form>
    </div>
  );
};

export default EditEvent;

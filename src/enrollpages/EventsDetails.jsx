'use client';

import React, { useState, useEffect } from 'react';
import { events } from '../../src/Data';
import { FaCalendarAlt, FaMapMarkerAlt, FaClock, FaStar } from 'react-icons/fa';
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";

const EventDetails = ({ id }) => {
  const [event, setEvent] = useState(null);

  useEffect(() => {
    const eventId = Number(id);
    const foundEvent = events.find((e) => e.id === eventId);
    if (foundEvent) setEvent(foundEvent);
    else console.error(`Event with id ${eventId} not found`);
  }, [id]);

  if (!event) {
    return <div className="text-center text-white text-2xl mt-10">Loading event details...</div>;
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-900 via-indigo-900 to-gray-900 text-gray-100">
      <div className="container mx-auto py-12 px-6 flex-grow">
        {/* Event Header */}
        <div className="flex flex-col  items-center md:items-start md:justify-start text-center md:text-left border-b border-gray-700 pb-8 space-y-8 md:space-y-0">
          <div className="md:w-1/3 w-full flex justify-center md:justify-start">
            <img
              src={event.imageUrl}
              alt={event.title}
              className="rounded-lg shadow-lg object-cover"
              style={{  width: '100%', maxWidth: '450px' }}
            />
          </div>
          <div className="md:ml-8 w-full md:w-2/3 text-center md:text-left">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-white">{event.title}</h2>
            <p className="mb-4 text-base md:text-lg text-gray-300">{event.description}</p>
            <div className="flex items-center  md:justify-start mb-2 text-gray-300">
              <FaCalendarAlt className="mr-2" />
              <p>{event.date}</p>
            </div>
            <div className="flex   md:justify-start mb-2 text-gray-300">
              <FaMapMarkerAlt className="mr-2" />
              <p>{event.location}</p>
            </div>
            <div className="flex  md:justify-start mb-2 text-gray-300">
              <FaClock className="mr-2" />
              <p>{event.duration}</p>
            </div>
            <p className="text-lg text-gray-300"><strong>Organizer:</strong> {event.organizer}</p>
            {event.rating && (
              <div className="flex items-center  md:justify-start mt-2">
                <div className="flex ">
                  {[...Array(5)].map((_, index) => (
                    <FaStar key={index} className={index < Math.floor(event.rating) ? "text-yellow-400" : "text-gray-400"} />
                  ))}
                </div>
                <span className="ml-2 text-gray-300">{event.rating} ({event.ratingCount} ratings)</span>
              </div>
            )}
            <p className="font-bold mt-6 text-2xl md:text-3xl text-indigo-400">{event.price}</p>
            <button
              className="mt-6 py-3 px-8 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition duration-300 shadow-lg transform hover:scale-105"
              onClick={() => {/* Implement registration logic */}}
            >
              Register Now
            </button>
          </div>
        </div>

        {/* Event Highlights */}
        <div className="mt-12">
          <h3 className="text-3xl font-bold mb-6 text-indigo-300">Event Highlights</h3>
          <ul className="list-disc list-inside text-lg ml-8 text-gray-300 border-l-4 border-dotted border-indigo-500 pl-4">
            {event.highlights.map((highlight, index) => (
              <li key={index} className="mb-2">{highlight}</li>
            ))}
          </ul>
        </div>

        {/* Event Agenda */}
        <div className="mt-12">
          <h3 className="text-3xl font-bold mb-6 text-indigo-300">Event Agenda</h3>
          <div className="space-y-8">
            {event.agenda.map((session, index) => (
              <div key={index} className="p-6 bg-gray-800 rounded-lg shadow-lg border border-indigo-600">
                <h4 className="text-2xl font-bold mb-4 text-white">{session.time}</h4>
                <p className="text-xl font-semibold mb-3 text-indigo-200">{session.session}</p>
                <p className="text-lg text-gray-300"><em>Speaker: {session.speaker}</em></p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default EventDetails;

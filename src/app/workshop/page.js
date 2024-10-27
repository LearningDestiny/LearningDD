'use client';

import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { FaCalendarAlt } from 'react-icons/fa';
import { Header } from '@/components/landing-page';
import PaymentHandlerButton from '@/components/PaymentHandlerButton';


const workshops = [
  {
    id: 1,
    title: 'Full Stack Web Development Workshop',
    instructor: 'Jane Doe',
    price: '999 Rs',
    imageUrl: '/WebDevPoster.png',
    description: 'A workshop to enhance your Website Development Skills.',
    lastUpdated: 'Last updated: September 2024',
    duration: '3 hours',
  },
  {
    id: 2,
    title: 'Data Analysis with Python Workshop',
    instructor: 'John Smith',
    price: '999 Rs',
    imageUrl: '/DataAnalysisPoster.png',
    description: 'Learn the fundamentals of Data Analysis with Python in this hands-on workshop.',
    lastUpdated: 'Last updated: August 2024',
    duration: '4 hours',
  },
  {
    id: 3,
    title: 'Digital Marketing Bootcamp',
    instructor: 'Emily Johnson',
    price: '999 Rs',
    imageUrl: '/placeholder.svg?height=200&width=200',
    description: 'An intensive workshop covering the latest digital marketing strategies.',
    lastUpdated: 'Last updated: July 2024',
    duration: '5 hours',
  },
];

const WorkshopCard = ({ workshop, isHovered, onHover, onLeave }) => {
  const router = useRouter();

  const cardStyles = {
    position: 'relative',
    width: '100%',
    paddingTop: '70%',
    borderRadius: '8px',
    overflow: 'hidden',
    transition: 'transform 0.3s ease-in-out',
    cursor: 'pointer',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
    border: '2px solid #3b82f6',
  };

  const imageStyles = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  };

  const hoveredCardOverlay = {
    position: 'absolute',
    inset: 0,
    padding: '16px',
    backgroundColor: '#ffffff',
    opacity: 1,
    zIndex: 10,
    transition: 'opacity 0.3s ease-in-out',
    borderRadius: '8px',
  };

  const priceValue = parseFloat(workshop.price.replace(/[^0-9.-]+/g, ''));

  const handleMoreInfo = () => {
    router.push(`/workshops/${workshop.id}`);
  };

  return (
    <div
      style={cardStyles}
      onMouseEnter={() => onHover(workshop.id)}
      onMouseLeave={() => onLeave(null)}
      className="transform transition duration-300 hover:scale-105"
    >
      <img src={workshop.imageUrl} alt={workshop.title} style={imageStyles} />
      <div style={{ position: 'absolute', bottom: 0, left: 0, padding: '16px', background: 'rgba(0, 0, 0, 0.8)', width: '100%' }}>
        <h4 className="font-semibold text-sm text-white">{workshop.title}</h4>
        <p className="text-xs text-gray-300">{workshop.instructor}</p>
        <p className="font-bold text-sm text-white mt-1">{workshop.price}</p>
      </div>
      {isHovered && (
        <div style={hoveredCardOverlay}>
          <h4 className="font-semibold text-sm">{workshop.title}</h4>
          <p className="text-xs mt-1">{workshop.lastUpdated}</p>

          <PaymentHandlerButton finalAmt={priceValue} />
          <button
            onClick={handleMoreInfo}
            className="mt-2 w-full bg-blue-500 hover:bg-blue-600 text-white text-xs font-bold py-2 px-4 rounded"
          >
            More Info
          </button>
        </div>
      )}
    </div>
  );
};

const Workshop = () => {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get('search')?.toLowerCase() || '';
  const [hoveredWorkshop, setHoveredWorkshop] = useState(null);

  const filteredWorkshops = workshops.filter(workshop =>
    workshop.title.toLowerCase().includes(searchQuery) ||
    workshop.description.toLowerCase().includes(searchQuery)
  );

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-900 to-gray-900 text-black-100">
      <Header />

      {/* All Workshops Section */}
      <section>
        <h2 className="text-4xl font-bold mb-8 text-center text-white">All Workshops</h2>
        {filteredWorkshops.length > 0 ? (
          <div className="md:grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {filteredWorkshops.map(workshop => (
              <WorkshopCard
                key={workshop.id}
                workshop={workshop}
                isHovered={hoveredWorkshop === workshop.id}
                onHover={setHoveredWorkshop}
                onLeave={() => setHoveredWorkshop(null)}
              />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No workshops found matching your search.</p>
        )}
      </section>

      {/* Mobile View for Workshops */}
   
    </div>
  );
};

export default Workshop;
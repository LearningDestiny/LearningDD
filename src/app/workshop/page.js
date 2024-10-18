
'use client';
import React, { useState, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import { FaPlayCircle } from 'react-icons/fa';
import { Header } from '@/components/landing-page'; // Importing the Header component
import PaymentHandlerButton from '@/components/PaymentHandlerButton'; // Importing the payment button
import { useSearchParams } from 'next/navigation'; // Using next/navigation


const workshops = [
  {
    id: 1,
    title: 'Full Stack Web Development Workshop',
    instructor: 'Jane Doe',
    price: '999 Rs',
    imageUrl: '/WebDevPoster.png', // Replace with your image URL
    description: 'A workshop to enhance your Website Development Skills.',
    lastUpdated: 'Last updated: September 2024',
    duration: '3 hours',
    lectureCount: 5,
    highlights: ['Interactive sessions', 'Expert feedback', 'Networking opportunities'],
  },
  {
    id: 2,
    title: 'Data Analysis with Python Workshop',
    instructor: 'John Smith',
    price: '999 Rs',
    imageUrl: 'DataAnalysisPoster.png', // Replace with your image URL
    description: 'Learn the fundamentals of Data Analysis with Python in this hands-on workshop.',
    lastUpdated: 'Last updated: August 2024',
    duration: '4 hours',
    lectureCount: 6,
    highlights: ['Practical exercises', 'Portfolio building', 'Q&A session'],
  },
  {
    id: 3,
    title: 'Digital Marketing Bootcamp',
    instructor: 'Emily Johnson',
    price: '999 Rs',
    imageUrl: 'https://via.placeholder.com/200', // Replace with your image URL
    description: 'An intensive workshop covering the latest digital marketing strategies.',
    lastUpdated: 'Last updated: July 2024',
    duration: '5 hours',
    lectureCount: 8,
    highlights: ['Hands-on projects', 'Real-world case studies', 'Certification'],
  },
];

// Component to handle the workshop filtering logic
const FilteredWorkshops = ({ searchQuery, onHover, onLeave, hoveredWorkshop }) => {
  // Filter workshops based on the search query
  const filteredWorkshops = workshops.filter(
    (workshop) =>
      workshop.title.toLowerCase().includes(searchQuery) ||
      workshop.description.toLowerCase().includes(searchQuery)
  );

  const priceValue = (price) => {
    if (price === 'Free') {
      return 0;
    } else {
      const priceFloat = parseFloat(price.replace(/[^0-9.-]+/g, '').replace(',', ''));
      return priceFloat;
    }
  };

  const cardStyles = {
    position: 'relative',
    width: '100%',
    paddingTop: '75%', // Aspect ratio for square
    borderRadius: '8px',
    overflow: 'hidden',
    transition: 'transform 0.3s ease-in-out',
    cursor: 'pointer',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)', // Light shadow for card
    border: '2px solid #3b82f6', // Light blue border
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
    backgroundColor: '#fff', // White background for overlay
    opacity: 1,
    zIndex: 10,
    borderRadius: '8px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  };

  const hiddenOverlay = {
    opacity: 0,
    transition: 'opacity 0.3s ease-in-out',
    zIndex: -1,
  };

  if (filteredWorkshops.length === 0) {
    return <p className="text-center text-gray-500">No workshops found matching your search.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      {filteredWorkshops.map((workshop) => (
        <div
          key={workshop.id}
          style={cardStyles}
          onMouseEnter={() => onHover(workshop.id)}
          onMouseLeave={() => onLeave(null)}
        >
          <img src={workshop.imageUrl} alt={workshop.title} style={imageStyles} />
          <div style={{ position: 'absolute', bottom: 0, left: 0, padding: '16px', background: 'rgba(0, 0, 0, 0.8)', width: '100%' }}>
            <h4 className="font-semibold text-sm text-white">{workshop.title}</h4>
            <p className="text-xs text-gray-300">{workshop.instructor}</p>
            <p className="font-bold text-sm text-white mt-1">{workshop.price}</p>
          </div>
          <div style={hoveredWorkshop === workshop.id ? hoveredCardOverlay : hiddenOverlay}>
            <h4 className="font-semibold text-sm">{workshop.title}</h4>
            <p className="text-xs mt-1">{workshop.lastUpdated}</p>
            <p className="text-xs mt-2">
              {workshop.duration} total hours · {workshop.lectureCount} lectures · All Levels
            </p>
            <p className="text-xs mt-2">{workshop.description}</p>
            <ul className="text-xs mt-2">
              {workshop.highlights.map((highlight, index) => (
                <li key={index} className="flex items-center mt-0">
                  <FaPlayCircle className="mr-1 text-blue-500" /> {highlight}
                </li>
              ))}
            </ul>
            {/* Payment Button Integration */}
            <PaymentHandlerButton finalAmt={priceValue(workshop.price)} />
          </div>
        </div>
      ))}
    </div>
  );
};

const Workshop = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get('search')?.toLowerCase() || '';
  const [hoveredWorkshop, setHoveredWorkshop] = useState(null);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-900 to-gray-900">
      <Header /> {/* Adding the Header component */}

      <div className="container mx-auto py-8 px-4 md:px-8" style={{ backgroundColor: 'transparent', color: '#000', marginTop: '2rem' }}>
        {/* All Workshops Section */}
        <section>
          <h2 className="text-4xl font-bold mb-8 text-center text-white">All Workshops</h2>

          <Suspense fallback={<div>Loading workshops...</div>}>
            <FilteredWorkshops
              searchQuery={searchQuery}
              onHover={setHoveredWorkshop}
              onLeave={setHoveredWorkshop}
              hoveredWorkshop={hoveredWorkshop}
            />
          </Suspense>
        </section>
      </div>
    </div>
  );
};

export default Workshop;

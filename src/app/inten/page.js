'use client'

import React, { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Header } from '../../components/landing-page'
import Link from 'next/link'
import { FaInfoCircle } from 'react-icons/fa'
import axios from 'axios'

const InternshipCard = ({ internship, isHovered, onHover, onLeave, onMoreInfo }) => {
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

  return (
    <div
      style={cardStyles}
      onMouseEnter={() => onHover(internship.id)}
      onMouseLeave={() => onLeave(null)}
      className="transform transition duration-300 hover:scale-105"
    >
      <img src={internship.imageUrl} alt={internship.title} style={imageStyles} />
      <div style={{ position: 'absolute', bottom: 0, left: 0, padding: '16px', background: 'rgba(0, 0, 0, 0.8)', width: '100%' }}>
        <h4 className="font-semibold text-sm text-white">{internship.title}</h4>
        <p className="text-xs text-gray-300">{internship.company}</p>
        <p className="font-bold text-sm text-white mt-1">{internship.stipend}</p>
      </div>
      {isHovered && (
        <div style={hoveredCardOverlay}>
          <h4 className="font-semibold text-sm">{internship.title}</h4>
          <p className="text-xs mt-1">{internship.company}</p>
          <p className="text-xs mt-2">{internship.duration}</p>
          <p className="text-xs mt-2">{internship.description}</p>

          <div className="flex flex-col mt-4 space-y-2">
            <Link href={`/InternshipApplication`} passHref>
              <button className="bg-blue-500 text-white w-full px-4 py-2 rounded-md text-sm flex items-center justify-center">
                <FaInfoCircle className="mr-2" /> Apply Now
              </button>
            </Link>
            <button
              onClick={() => onMoreInfo(internship.id)}
              className="bg-green-500 text-white w-full px-4 py-2 rounded-md text-sm flex items-center justify-center"
            >
              <FaInfoCircle className="mr-2" /> More Info
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const Internship = () => {
  const [internships, setInternships] = useState([]);
  const [hoveredInternship, setHoveredInternship] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useSearchParams();
  const router = useRouter();
  const searchParams = new URLSearchParams(location.toString());
  const searchQuery = searchParams.get('search')?.toLowerCase() || '';

  useEffect(() => {
    const fetchInternships = async () => {
      try {
        const response = await axios.get('/api/internship');
        setInternships(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching internships:', err);
        setError('Failed to load internships. Please try again later.');
        setLoading(false);
      }
    };

    fetchInternships();
  }, []);

  const filteredInternships = internships.filter((internship) =>
    internship.title.toLowerCase().includes(searchQuery) ||
    internship.description.toLowerCase().includes(searchQuery)
  );

  const handleMoreInfo = (internshipId) => {
    router.push(`/internship/${internshipId}`);
  };

  if (loading) {
    return <div>Loading internships...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-900 to-gray-900 text-black-100">
      <Header />

      {/* All Internships Section */}
      <section>
        <h2 className="text-4xl font-bold mb-8 text-center text-white">All Internships</h2>
        {filteredInternships.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 md:gap-8">
            {filteredInternships.map((internship) => (
              <InternshipCard
                key={internship.id}
                internship={internship}
                isHovered={hoveredInternship === internship.id}
                onHover={setHoveredInternship}
                onLeave={() => setHoveredInternship(null)}
                onMoreInfo={handleMoreInfo}
              />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No internships found matching your search.</p>
        )}
      </section>
    </div>
  );
};

export default Internship;

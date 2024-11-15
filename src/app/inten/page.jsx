'use client'

import React, { useState, useEffect } from "react"
import { FaBriefcase } from "react-icons/fa"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"

const Internships = () => {
  const [internships, setInternships] = useState([])
  const [hoveredPopularInternship, setHoveredPopularInternship] = useState(null)
  const [hoveredAllInternship, setHoveredAllInternship] = useState(null)
  const searchParams = useSearchParams()
  const router = useRouter()
  const searchQuery = searchParams.get("search")?.toLowerCase() || ""

  useEffect(() => {
    fetchInternships()
  }, [])

  const fetchInternships = async () => {
    try {
      const response = await fetch('/api/internships')
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data = await response.json()
      setInternships(data)
    } catch (error) {
      console.error("Failed to fetch internships:", error)
    }
  }

  const popularInternships = internships.slice(0, 2)

  const cardStyles = {
    position: "relative",
    width: "100%",
    paddingTop: "70%",
    borderRadius: "8px",
    overflow: "hidden",
    transition: "transform 0.3s ease-in-out",
    cursor: "pointer",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
    border: "2px solid #3b82f6",
    margin: "8px"
  }

  const imageStyles = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
  }

  const hoveredCardOverlay = {
    position: "absolute",
    inset: 0,
    padding: "16px",
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    opacity: 1,
    zIndex: 10,
    transition: "opacity 0.3s ease-in-out",
    borderRadius: "8px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  }

  const handleMoreInfoClick = (internshipId) => {
    router.push(`/internship/${internshipId}`)
  }

  const InternshipCard = ({ internship, isHovered, setHovered, isPopular }) => (
    <div
      key={internship.id}
      style={isPopular ? cardStyles : { ...cardStyles, minWidth: "250px" }}
      onMouseEnter={() => setHovered(internship.id)}
      onMouseLeave={() => setHovered(null)}
      className="transform transition duration-300 hover:scale-105"
    >
      <img src={internship.imageUrl} alt={internship.title} style={imageStyles} />
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          padding: "8px",
          background: "rgba(0, 0, 0, 0.8)",
          width: "100%",
          color: "white",
        }}
      >
        <h4 className="font-semibold text-sm">{internship.title}</h4>
        <p className="text-xs text-gray-300">{internship.company}</p>
        <p className="font-bold text-sm mt-1">{internship.stipend}</p>
      </div>
      {isHovered === internship.id && (
        <div style={hoveredCardOverlay}>
          <h4 className="font-semibold text-sm">{internship.title}</h4>
          <p className="text-xs mt-2">{internship.company} · {internship.duration}</p>
          <p className="text-xs mt-2">{internship.description}</p>
          <ul className="text-xs mt-2">
            {internship.highlights.map((highlight, index) => (
              <li key={index} className="flex items-center mt-0">
                <FaBriefcase className="mr-1 text-blue-500" /> {highlight}
              </li>
            ))}
          </ul>
          <Link href={`/internship-application?id=${internship.id}`} passHref>
            <button className="mt-2 w-full bg-blue-500 text-white py-2 rounded lg:py-2 sm:py-2">
              Apply Now
            </button>
          </Link>
          <button
            onClick={() => handleMoreInfoClick(internship.id)}
            className="mt-2 w-full bg-green-500 text-white py-2 rounded lg:py-2 sm:py-2"
          >
            More Info
          </button>
        </div>
      )}
    </div>
  )

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-900 to-gray-900 text-black-100 px-4">
      {/* Popular Internships Section */}
      <section className="mb-12">
        <h2 className="text-4xl font-bold mb-8 text-center text-white">Popular Internships</h2>
        <div className="md:grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {popularInternships.map((internship) => (
            <InternshipCard
              key={internship.id}
              internship={internship}
              isHovered={hoveredPopularInternship}
              setHovered={setHoveredPopularInternship}
              isPopular={true}
            />
          ))}
        </div>
      </section>

      {/* All Internships Section */}
      <section>
        <h2 className="text-4xl font-bold mb-8 text-center text-white">All Internships</h2>
        {internships.length > 0 ? (
          <div className="md:grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {internships.map((internship) => (
              <InternshipCard
                key={internship.id}
                internship={internship}
                isHovered={hoveredAllInternship}
                setHovered={setHoveredAllInternship}
                isPopular={false}
              />
            ))}
          </div>
        ) : (
          <p className="text-center text-white">No internships available</p>
        )}
      </section>
    </div>
  )
}

export default Internships
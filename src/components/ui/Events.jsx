"use client"

import React, { useState } from "react"
import { FaCalendarAlt } from "react-icons/fa"
import { useRouter, useSearchParams } from "next/navigation"
import PaymentHandlerButton from "@/components/PaymentHandlerButton"
import { events } from "@/Data" 
import EventDetails from "@/enrollpages/EventsDetails"

const Events = () => {
  const location = useSearchParams()
  const router = useRouter()
  const searchParams = new URLSearchParams(location.toString())
  const searchQuery = searchParams.get("search")?.toLowerCase() || ""

  const [hoveredPopularEvent, setHoveredPopularEvent] = useState(null)
  const [hoveredAllEvent, setHoveredAllEvent] = useState(null)

  const popularEvents = events.slice(0, 2)

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
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    opacity: 1,
    zIndex: 10,
    transition: "opacity 0.3s ease-in-out",
    borderRadius: "8px",
  }

  const price = (price) => {
    if (price === "Free") {
      return 1
    } else {
      const priceFloat = parseFloat(
        price.replace(/[^0-9.-]+/g, "").replace(",", "")
      )
      return priceFloat
    }
  }

  const handleMoreInfoClick = (eventId) => {
    router.push(`/event/${eventId}`)
  }

  const EventCard = ({ event, isHovered, setHovered, isPopular }) => (
    <div
      key={event.id}
      style={isPopular ? cardStyles : { ...cardStyles, minWidth: "250px" }}
      onMouseEnter={() => setHovered(event.id)}
      onMouseLeave={() => setHovered(null)}
      className="transform transition duration-300 hover:scale-105"
    >
      <img src={event.imageUrl} alt={event.title} style={imageStyles} />
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          padding: "16px",
          background: "rgba(0, 0, 0, 0.8)",
          width: "100%",
        }}
      >
        <h4 className="font-semibold text-sm text-white">{event.title}</h4>
        <p className="text-xs text-gray-300">{event.date}</p>
        <p className="font-bold text-sm text-white mt-1">{event.price}</p>
      </div>
      {isHovered === event.id && (
        <div style={hoveredCardOverlay}>
          <h4 className="font-semibold text-sm">{event.title}</h4>
          <p className="text-xs mt-1">{event.location}</p>
          <p className="text-xs mt-2">{event.date} · {event.duration}</p>
          <p className="text-xs mt-2">{event.description}</p>
          <ul className="text-xs mt-2">
            {event.highlights.map((highlight, index) => (
              <li key={index} className="flex items-center mt-0">
                <FaCalendarAlt className="mr-1 text-blue-500" /> {highlight}
              </li>
            ))}
          </ul>
          <PaymentHandlerButton finalAmt={price(event.price)} />
          <button
            onClick={() => handleMoreInfoClick(event.id)}
            className="mt-2 w-full bg-blue-500 text-white py-2 rounded"
          >
            MoreInfo
          </button>
        </div>
      )}
    </div>
  )

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-900 to-gray-900 text-black-100">
      {/* Popular Events Section */}
      <section className="mb-12">
        <h2 className="text-4xl font-bold mb-8 text-center text-white">Popular Events</h2>
        <div className="md:grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {popularEvents.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              isHovered={hoveredPopularEvent}
              setHovered={setHoveredPopularEvent}
              isPopular={true}
            />
          ))}
        </div>
      </section>

      {/* All Events Section */}
      <section>
        <h2 className="text-4xl font-bold mb-8 text-center text-white">All Events</h2>
        {events.length > 0 ? (
          <div className=" md:grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {events.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                isHovered={hoveredAllEvent}
                setHovered={setHoveredAllEvent}
                isPopular={true}
              />
            ))}
          </div>
        ) : (
          <p className="text-center text-white">No events available</p>
        )}
      </section>
    </div>
  )
}

export default Events

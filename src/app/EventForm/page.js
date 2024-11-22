'use client';

import React, { useState } from "react";

const EventForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    number: "",
    qualification: "",
    stream: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/googleSheetss", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (result.success) {
        alert("Form submitted successfully!");
        setFormData({
          name: "",
          number: "",
          qualification: "",
          stream: "",
        });
      } else {
        alert(`Failed to submit form: ${result.message}`);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-6 py-4 w-full max-w-sm"
      >
        <h2 className="text-xl font-bold mb-4 text-gray-800 text-center">
          Event Registration
        </h2>
        <div className="mb-3">
          <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="name">
            Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            value={formData.name}
            onChange={handleChange}
            className="shadow border rounded w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter your name"
          />
        </div>
        <div className="mb-3">
          <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="number">
            Phone Number
          </label>
          <input
            type="tel"
            name="number"
            id="number"
            value={formData.number}
            onChange={handleChange}
            className="shadow border rounded w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter your phone number"
          />
        </div>
        <div className="mb-3">
          <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="qualification">
            Qualification
          </label>
          <input
            type="text"
            name="qualification"
            id="qualification"
            value={formData.qualification}
            onChange={handleChange}
            className="shadow border rounded w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter your qualification"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="stream">
            Stream
          </label>
          <input
            type="text"
            name="stream"
            id="stream"
            value={formData.stream}
            onChange={handleChange}
            className="shadow border rounded w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter your stream"
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default EventForm;

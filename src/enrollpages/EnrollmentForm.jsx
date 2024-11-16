'use client';

import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import PaymentHandlerButton from '../components/PaymentHandlerButton';

// Popup Component
const Popup = ({ message, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-4 rounded-lg shadow-lg text-center">
        <p className="text-black mb-4">{message}</p>
        <button
          onClick={onClose}
          className="py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition duration-300"
        >
          Close
        </button>
      </div>
    </div>
  );
};

const EnrollmentForm = ({ course, onClose }) => {
  const [name, setName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [stream, setStream] = useState('');
  const [qualification, setQualification] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !contactNumber || !stream || !qualification) {
      setPopupMessage('Please fill out all the fields before enrolling.');
      setShowPopup(true);
      return;
    }

    const formData = { name, contactNumber, stream, qualification };
    console.log('FormData before sending:', formData); // Debug log for formData

    try {
      const res = await fetch('/api/googleSheets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const result = await res.json();
      if (result.success) {
        setIsSubmitted(true);
        setShowPayment(true); // Enable payment button after successful submission
      } else {
        setPopupMessage('Error saving data. Please try again.');
        setShowPopup(true);
      }
    } catch (error) {
      console.error('Error submitting data:', error);
      setPopupMessage('Error saving data. Please try again.');
      setShowPopup(true);
    }
  };

  const priceFloat = parseFloat(course.price.replace(/[^0-9.-]+/g, '').replace(',', ''));

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 z-50 p-4 overflow-auto">
      <div className="bg-gray-800 text-black p-6 rounded-lg shadow-lg w-full max-w-md max-h-screen overflow-y-auto">
        {isSubmitted ? (
          <div className="flex flex-col items-center">
            <FontAwesomeIcon icon={faCheckCircle} className="text-green-500 text-4xl mb-4" />
            <h2 className="text-2xl font-bold">Thank you for enrolling!</h2>
          </div>
        ) : (
          <>
            <h2 className="text-2xl font-bold mb-4">Enroll in {course.title}</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-lg font-medium mb-2" htmlFor="name">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg border-gray-300"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-lg font-medium mb-2" htmlFor="contactNumber">
                  Contact Number
                </label>
                <input
                  type="tel"
                  id="contactNumber"
                  value={contactNumber}
                  onChange={(e) => setContactNumber(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg border-gray-300"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-lg font-medium mb-2" htmlFor="stream">
                  Stream/Branch of Study
                </label>
                <input
                  type="text"
                  id="stream"
                  value={stream}
                  onChange={(e) => setStream(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg border-gray-300"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-lg font-medium mb-2" htmlFor="qualification">
                  Qualification
                </label>
                <input
                  type="text"
                  id="qualification"
                  value={qualification}
                  onChange={(e) => setQualification(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg border-gray-300"
                  required
                />
              </div>

              <button
                type="submit"
                className="py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition duration-300"
              >
                Submit
              </button>
            </form>

            <button onClick={onClose} className="mt-4 text-blue-600 hover:text-red-900">
              Close
            </button>
          </>
        )}

        {/* Render PaymentHandlerButton after form submission */}
        {showPayment && (
          <div className="mt-4">
            <PaymentHandlerButton finalAmt={priceFloat} fullName={name} contact={contactNumber} />
          </div>
        )}
      </div>

      {showPopup && <Popup message={popupMessage} onClose={() => setShowPopup(false)} />}
    </div>
  );
};

export default EnrollmentForm;

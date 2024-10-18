import React, { useState } from 'react';
import { auth, firestore } from '../firebase'; // Import Auth and Firestore instances
import { collection, addDoc } from 'firebase/firestore'; // Import necessary Firestore functions
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Import Font Awesome Icon Component
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'; // Import Check Circle Icon for success message
import { useTheme } from '../App';
import PaymentHandlerButton from '@/components/PaymentHandlerButton';

const EnrollmentForm = ({ course, onClose }) => {
  // const { isDarkMode } = useTheme();
  const [name, setName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [stream, setStream] = useState('');
  const [qualification, setQualification] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false); // State to handle form submission
  const [showPopup, setShowPopup] = useState(false); // State to show or hide the popup
  const [popupMessage, setPopupMessage] = useState(''); // Message for the popup

  // Inline Popup Component
  const Popup = ({ message, onClose }) => {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
        <div className={`bg-white text-gray-800 p-6 rounded-lg shadow-lg w-full max-w-sm`}>
          <h2 className="text-xl font-bold mb-4">Notification</h2>
          <p className="mb-4">{message}</p>
          <button
            onClick={onClose}
            className={`py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition duration-300`}
          >
            Close
          </button>
        </div>
      </div>
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // // Check if user is authenticated
    // if (!auth.currentUser) {
    //   setPopupMessage('You must be logged in to enroll.');
    //   setShowPopup(true);
    //   return;
    // }

    // Check if all fields are filled before proceeding
    if (!name || !contactNumber || !stream || !qualification) {
      setPopupMessage('Please fill out all the fields before enrolling.');
      setShowPopup(true);
      return;
    }
    console.log(name,contactNumber,stream,qualification)
    // const enrollmentData = {
    //   name,
    //   contactNumber,
    //   stream,
    //   qualification,
    //   courseTitle: course.title,
    //   userId: auth.currentUser.uid, // Store the user ID
    //   timestamp: new Date(), // Store the timestamp when the form is submitted
    // };

    // try {
    //   // Store data in Firebase Firestore
    //   await addDoc(collection(firestore, 'enrollments'), enrollmentData);
      
    //   // Show success message
    //   setIsSubmitted(true);

    //   // Optional: Close the form after a delay (2 seconds)
    //   setTimeout(() => {
    //     onClose();
    //   }, 2000);
    // } catch (error) {
    //   console.error("Error adding document: ", error.message);
    //   setPopupMessage(`An error occurred while submitting the form: ${error.message}`);
    //   setShowPopup(true);
    // }


  };

  let priceString = course.price;
let priceFloat = parseFloat(priceString.replace(/[^0-9.-]+/g, '').replace(',', ''));
console.log(priceFloat); // Output: 6999


  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className={`bg-gray-900 text-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md`}>
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
                  className={`w-full px-3 py-2 border rounded-lg bg-black border-gray-300`}
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
                  className={`w-full px-3 py-2 border rounded-lg bg-black border-gray-300`}
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
                  className={`w-full px-3 py-2 border rounded-lg bg-black border-gray-300`}
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
                  className={`w-full px-3 py-2 border rounded-lg bg-black border-gray-300`}
                  required
                />
              </div>
              
              {/* <button
                type="submit"
                className={`py-3 px-6 bg-gray-800 hover:bg-gray-900 text-white rounded-lg transition duration-300`}
              >
                Enroll Now
              </button> */}
              {console.log(parseFloat(course.price))}
                 <PaymentHandlerButton
                        finalAmt={priceFloat}
                        fullName={name}
                        email={contactNumber}
                        contact={contactNumber}
                      />
            </form>

            <button
              onClick={onClose}
              className={`mt-4 text-gray-600 hover:text-gray-900`}
            >
              Close
            </button>
          </>
        )}
      </div>

      {/* Render the Popup component */}
      {showPopup && (
        <Popup
          message={popupMessage}
          onClose={() => setShowPopup(false)}
        />
      )}
    </div>
  );
};

export default EnrollmentForm; 

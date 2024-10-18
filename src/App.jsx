import React, { useState, createContext, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import CourseDetails from './enrollpages/CourseDetails';
import ScrollToTop from './components/ScrollToTop';
import Events from './components/ui/Events';
import policy from './components/ui/policy';
import Terms from './components/ui/Terms';
import shipping from './components/ui/shipping';


import Inten from './components/ui/Inten';



// Create a context for the theme
const ThemeContext = createContext();

// Custom hook to use the theme context
export const useTheme = () => useContext(ThemeContext);

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  const toggleTheme = () => {
    setIsDarkMode(prevMode => !prevMode);
  };

  return (
    <Router>
      <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
        <div className={`App ${isDarkMode ? 'bg-gray-900 text-gray-200' : 'bg-white text-black'}`}>
          <Navbar />
          <ScrollToTop />
          <Routes>
            
             {/* Fixed PrivacyPolicy route */}
            <Route path="/events" element={<Events />} />  {/* Events route added */}
            <Route path="/work" element={<Work />} />  {/* Workshops route added */}
            <Route path="/inten" element={<Inten />} />  {/* Internships route added */}
            <Route path="/enroll/:courseId" element={<CourseDetails />} />
            <Route path="/cour/:courseId" element={<CourseDetails />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/shipping" element={<shipping />} />
          </Routes>
          <ToastContainer position="top-right" autoClose={3000} />
        </div>
      </ThemeContext.Provider>
    </Router>
  );
};

export default App;

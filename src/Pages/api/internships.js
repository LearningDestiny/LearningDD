import fs from 'fs';
import path from 'path';

// Define the path for internships.json file
const filePath = path.resolve('./src/data/internships.json');

// Helper function to get internships data
const getInternships = () => {
  try {
    const fileData = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(fileData); // Parse JSON data
  } catch (error) {
    console.error('Error reading internships.json:', error);
    return []; // Return an empty array if the file is unreadable or missing
  }
};

// Helper function to save internships data
const saveInternships = (data) => {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
  } catch (error) {
    console.error('Error writing to internships.json:', error);
  }
};

// API handler for different HTTP methods
export default function handler(req, res) {
  // Handle GET request to fetch internships
  if (req.method === 'GET') {
    const internships = getInternships();
    return res.status(200).json(internships);
  }

  // Handle POST request to create a new internship
  if (req.method === 'POST') {
    const newInternship = req.body;
    const internships = getInternships();
    newInternship.id = Date.now(); // Simple unique ID based on timestamp
    internships.push(newInternship);
    saveInternships(internships);
    return res.status(201).json(newInternship);
  }

  // Handle PUT request to update an existing internship by ID
  if (req.method === 'PUT') {
    const { id } = req.query;
    const updatedInternship = req.body;
    let internships = getInternships();
    const internshipIndex = internships.findIndex((intern) => intern.id === parseInt(id));

    if (internshipIndex !== -1) {
      internships[internshipIndex] = { ...internships[internshipIndex], ...updatedInternship };
      saveInternships(internships);
      return res.status(200).json(internships[internshipIndex]);
    } else {
      return res.status(404).json({ message: 'Internship not found' });
    }
  }

  // Handle DELETE request to delete an internship by ID
  if (req.method === 'DELETE') {
    const { id } = req.query;
    let internships = getInternships();
    const updatedInternships = internships.filter((intern) => intern.id !== parseInt(id));

    if (updatedInternships.length !== internships.length) {
      saveInternships(updatedInternships);
      return res.status(200).json({ message: 'Internship deleted successfully' });
    } else {
      return res.status(404).json({ message: 'Internship not found' });
    }
  }

  // If HTTP method is not supported, return 405 Method Not Allowed
  res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
  return res.status(405).json({ message: `Method ${req.method} not allowed` });
}

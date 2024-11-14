import fs from 'fs';
import path from 'path';

const filePath = path.resolve('./src/data/internships.json');

const getInternships = () => {
  try {
    const fileData = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(fileData);
  } catch (error) {
    console.error('Error reading internships.json:', error);
    return [];
  }
};

const saveInternships = (data) => {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
  } catch (error) {
    console.error('Error writing to internships.json:', error);
  }
};

export default function handler(req, res) {
  if (req.method === 'GET') {
    const internships = getInternships();
    return res.status(200).json(internships);
  } else if (req.method === 'POST') {
    const newInternship = { id: Date.now(), ...req.body };
    const internships = getInternships();
    internships.push(newInternship);
    saveInternships(internships);
    return res.status(201).json(newInternship);
  } else if (req.method === 'PUT') {
    const { id } = req.query;
    const updatedInternship = req.body;
    let internships = getInternships();
    internships = internships.map((internship) => (internship.id === parseInt(id) ? updatedInternship : internship));
    saveInternships(internships);
    return res.status(200).json(updatedInternship);
  } else if (req.method === 'DELETE') {
    const { id } = req.query;
    let internships = getInternships();
    internships = internships.filter((internship) => internship.id !== parseInt(id));
    saveInternships(internships);
    return res.status(204).end();
  } else {
    res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

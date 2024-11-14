import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'data', 'internships.json');

async function getInternships() {
  try {
    const data = await fs.readFile(dataFilePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading internships data:', error);
    return [];
  }
}

async function saveInternships(internships) {
  try {
    await fs.writeFile(dataFilePath, JSON.stringify(internships, null, 2), 'utf8');
  } catch (error) {
    console.error('Error writing internships data:', error);
  }
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  const internships = await getInternships();

  if (id) {
    const internship = internships.find(i => i.id === id);
    return internship 
      ? NextResponse.json(internship)
      : NextResponse.json({ message: 'Internship not found' }, { status: 404 });
  }

  return NextResponse.json(internships);
}

export async function POST(request) {
  const newInternship = await request.json();
  const internships = await getInternships();

  newInternship.id = Date.now().toString();
  internships.push(newInternship);

  await saveInternships(internships);
  return NextResponse.json(newInternship, { status: 201 });
}

export async function PUT(request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  const updatedInternship = await request.json();

  if (!id) {
    return NextResponse.json({ message: 'Internship ID is required for updating' }, { status: 400 });
  }

  const internships = await getInternships();
  const index = internships.findIndex(internship => internship.id === id);

  if (index !== -1) {
    internships[index] = { ...internships[index], ...updatedInternship };
    await saveInternships(internships);
    return NextResponse.json(internships[index]);
  } else {
    return NextResponse.json({ message: 'Internship not found' }, { status: 404 });
  }
}

export async function DELETE(request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json({ message: 'Internship ID is required for deletion' }, { status: 400 });
  }

  let internships = await getInternships();
  const initialLength = internships.length;
  internships = internships.filter(internship => internship.id !== id);

  if (internships.length !== initialLength) {
    await saveInternships(internships);
    return NextResponse.json({ message: 'Internship deleted successfully' });
  } else {
    return NextResponse.json({ message: 'Internship not found' }, { status: 404 });
  }
}

// Initialize the data file if it doesn't exist
async function initializeDataFile() {
  try {
    await fs.access(dataFilePath);
  } catch (error) {
    const initialData = [
      {
        id: '1',
        title: 'Software Engineering Intern',
        company: 'Tech Co',
        duration: '3 months',
        stipend: '$1000/month',
        description: 'Join our team to work on cutting-edge projects.',
        imageUrl: 'https://example.com/software-engineering-intern.jpg',
        highlights: ['Modern tech stack', 'Mentorship program', 'Flexible hours']
      },
      {
        id: '2',
        title: 'Data Science Intern',
        company: 'Data Corp',
        duration: '4 months',
        stipend: '$1200/month',
        description: 'Apply machine learning to solve real-world problems.',
        imageUrl: 'https://example.com/data-science-intern.jpg',
        highlights: ['AI/ML projects', 'Big Data analysis', 'Collaborative environment']
      }
    ];
    await saveInternships(initialData);
  }
}

initializeDataFile();

console.log('Internships API route file loaded and initialized.');
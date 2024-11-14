// Import necessary modules
import { NextRequest, NextResponse } from 'next/server';

// In-memory store for internships
let internships = [
  {
    id: '1',
    title: 'Software Internship',
    company: 'Learning Destiny',
    stipend: '5000Rs/month',
    imageUrl: '/SDIntern.png',
    description: 'Join our team to work on exciting software projects and enhance your skills.',
    lastUpdated: 'Last updated: September 2024',
    duration: '3 months',
  },
  {
    id: '2',
    title: 'Graphic Design Internship',
    company: 'Learning Destiny',
    stipend: '4000Rs/month',
    imageUrl: '/GraphicIntern.png',
    description: 'Work with our design team to create engaging visuals for various projects.',
    lastUpdated: 'Last updated: July 2024',
    duration: '4 months',
  }
];

// GET request handler for fetching all or a single internship by ID
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (id) {
    const internship = internships.find(i => i.id === id);
    return internship 
      ? NextResponse.json(internship)
      : NextResponse.json({ message: 'Internship not found' }, { status: 404 });
  }

  return NextResponse.json(internships);
}

// POST request handler for adding a new internship
export async function POST(request: NextRequest) {
  const newInternship = await request.json();
  newInternship.id = Date.now().toString();
  internships.push(newInternship);
  return NextResponse.json(newInternship, { status: 201 });
}

// PUT request handler for updating an existing internship
export async function PUT(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  const updatedInternship = await request.json();

  if (!id) {
    return NextResponse.json({ message: 'Internship ID is required for updating' }, { status: 400 });
  }

  const index = internships.findIndex(internship => internship.id === id);
  if (index !== -1) {
    internships[index] = { ...internships[index], ...updatedInternship };
    return NextResponse.json(internships[index]);
  } else {
    return NextResponse.json({ message: 'Internship not found' }, { status: 404 });
  }
}

// DELETE request handler for deleting an internship
export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json({ message: 'Internship ID is required for deletion' }, { status: 400 });
  }

  const initialLength = internships.length;
  internships = internships.filter(internship => internship.id !== id);

  if (internships.length !== initialLength) {
    return NextResponse.json({ message: 'Internship deleted successfully' });
  } else {
    return NextResponse.json({ message: 'Internship not found' }, { status: 404 });
  }
}

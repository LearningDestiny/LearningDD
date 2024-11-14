import { NextRequest, NextResponse } from 'next/server';

// In-memory store for internships
let internships = [
  {
    id: '1',
    title: 'Software Engineering Intern',
    company: 'Tech Co',
    imageUrl: '/placeholder.svg?height=300&width=400',
    stipend: '$1000/month',
    duration: '3 months',
    description: 'Join our team to work on cutting-edge projects.',
    highlights: ['Learn modern tech stack', 'Mentorship program', 'Flexible hours']
  },
  {
    id: '2',
    title: 'Data Science Intern',
    company: 'Data Corp',
    imageUrl: '/placeholder.svg?height=300&width=400',
    stipend: '$1200/month',
    duration: '4 months',
    description: 'Apply machine learning to solve real-world problems.',
    highlights: ['Work with big data', 'Develop ML models', 'Collaborate with data engineers']
  }
];

// GET: Fetch internship(s)
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

// POST: Add a new internship
export async function POST(request: NextRequest) {
  const newInternship = await request.json();
  newInternship.id = Date.now().toString();
  internships.push(newInternship);
  return NextResponse.json(newInternship, { status: 201 });
}

// PUT: Update an existing internship
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

// DELETE: Remove an internship
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

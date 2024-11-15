import { NextRequest, NextResponse } from 'next/server';

// In-memory store for internships
let internships = [
  {
    id: '1',
    title: 'Software Development Intern',
    company: 'Tech Solutions Inc.',
    stipend: '$1000/month',
    duration: '3 months',
    description: 'Join our team to work on cutting-edge web applications.',
    summaryDescription: 'Exciting opportunity in web development',
    imageUrl: '/placeholder.svg?height=300&width=400',
    highlights: ['React', 'Node.js', 'Agile development'],
    location: 'San Francisco, CA',
    organizer: 'Tech Solutions HR'
  },
  {
    id: '2',
    title: 'Data Science Intern',
    company: 'Data Insights Co.',
    stipend: '$1200/month',
    duration: '4 months',
    description: 'Apply machine learning to solve real-world business problems.',
    summaryDescription: 'Data science internship with focus on ML',
    imageUrl: '/placeholder.svg?height=300&width=400',
    highlights: ['Python', 'Machine Learning', 'Data Visualization'],
    location: 'New York, NY',
    organizer: 'Data Insights Recruiting'
  }
];

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

export async function POST(request: NextRequest) {
  const newInternship = await request.json();
  newInternship.id = Date.now().toString();
  internships.push(newInternship);
  return NextResponse.json(newInternship, { status: 201 });
}

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
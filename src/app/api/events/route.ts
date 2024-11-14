import { NextResponse } from 'next/server';

// In-memory store for events
let events = [
  {
    id: '1',
    title: 'Web Development Workshop',
    date: '2024-03-15',
    duration: '2 hours',
    price: 'Free',
    description: 'Learn the basics of web development in this hands-on workshop.',
    imageUrl: '/placeholder.svg?height=300&width=400',
    highlights: ['HTML', 'CSS', 'JavaScript basics']
  },
  {
    id: '2',
    title: 'Data Science Conference',
    date: '2024-04-20',
    duration: '1 day',
    price: '$99',
    description: 'Explore the latest trends in data science and machine learning.',
    imageUrl: '/placeholder.svg?height=300&width=400',
    highlights: ['AI/ML', 'Big Data', 'Data Visualization']
  }
];

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (id) {
    const event = events.find(e => e.id === id);
    return event 
      ? NextResponse.json(event)
      : NextResponse.json({ message: 'Event not found' }, { status: 404 });
  }

  return NextResponse.json(events);
}

export async function POST(request: { json: () => any; }) {
  const newEvent = await request.json();
  newEvent.id = Date.now().toString();
  events.push(newEvent);
  return NextResponse.json(newEvent, { status: 201 });
}

export async function PUT(request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  const updatedEvent = await request.json();

  if (!id) {
    return NextResponse.json({ message: 'Event ID is required for updating' }, { status: 400 });
  }

  const index = events.findIndex(event => event.id === id);
  if (index !== -1) {
    events[index] = { ...events[index], ...updatedEvent };
    return NextResponse.json(events[index]);
  } else {
    return NextResponse.json({ message: 'Event not found' }, { status: 404 });
  }
}

export async function DELETE(request: { url: string | URL; }) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json({ message: 'Event ID is required for deletion' }, { status: 400 });
  }

  const initialLength = events.length;
  events = events.filter(event => event.id !== id);

  if (events.length !== initialLength) {
    return NextResponse.json({ message: 'Event deleted successfully' });
  } else {
    return NextResponse.json({ message: 'Event not found' }, { status: 404 });
  }
}
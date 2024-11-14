import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'data', 'events.json');

async function getEvents() {
  try {
    const data = await fs.readFile(dataFilePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading events data:', error);
    return [];
  }
}

async function saveEvents(events) {
  try {
    await fs.writeFile(dataFilePath, JSON.stringify(events, null, 2), 'utf8');
  } catch (error) {
    console.error('Error writing events data:', error);
  }
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  const events = await getEvents();

  if (id) {
    const event = events.find(e => e.id === id);
    return event 
      ? NextResponse.json(event)
      : NextResponse.json({ message: 'Event not found' }, { status: 404 });
  }

  return NextResponse.json(events);
}

export async function POST(request) {
  const newEvent = await request.json();
  const events = await getEvents();

  newEvent.id = Date.now().toString();
  events.push(newEvent);

  await saveEvents(events);
  return NextResponse.json(newEvent, { status: 201 });
}

export async function PUT(request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  const updatedEvent = await request.json();

  if (!id) {
    return NextResponse.json({ message: 'Event ID is required for updating' }, { status: 400 });
  }

  const events = await getEvents();
  const index = events.findIndex(event => event.id === id);

  if (index !== -1) {
    events[index] = { ...events[index], ...updatedEvent };
    await saveEvents(events);
    return NextResponse.json(events[index]);
  } else {
    return NextResponse.json({ message: 'Event not found' }, { status: 404 });
  }
}

export async function DELETE(request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json({ message: 'Event ID is required for deletion' }, { status: 400 });
  }

  let events = await getEvents();
  const initialLength = events.length;
  events = events.filter(event => event.id !== id);

  if (events.length !== initialLength) {
    await saveEvents(events);
    return NextResponse.json({ message: 'Event deleted successfully' });
  } else {
    return NextResponse.json({ message: 'Event not found' }, { status: 404 });
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
        title: 'Web Development Workshop',
        date: '2024-03-15',
        duration: '2 hours',
        price: 'Free',
        description: 'Learn the basics of web development in this hands-on workshop.',
        imageUrl: 'https://www.rrce.org/blog/wp-content/uploads/2022/11/Artifical-Intelligence.-Machine-Learning-at-RRCE.png',
        highlights: ['HTML', 'CSS', 'JavaScript basics']
      },
      {
        id: '2',
        title: 'Data Science Conference',
        date: '2024-04-20',
        duration: '1 day',
        price: 'Rs99',
        description: 'Explore the latest trends in data science and machine learning.',
        imageUrl: 'https://media.geeksforgeeks.org/wp-content/uploads/20231205165904/web-development-image.webp',
        highlights: ['AI/ML', 'Big Data', 'Data Visualization']
      }
    ];
    await saveEvents(initialData);
  }
}

initializeDataFile();

console.log('Events API route file loaded and initialized.');
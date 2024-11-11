import fs from 'fs/promises';
import path from 'path';

const eventsFilePath = path.join(process.cwd(), 'src', 'pages', 'api', 'events.json');

// Function to read events data from the JSON file
async function readEventsFile() {
  try {
    const data = await fs.readFile(eventsFilePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading events file:', error);
    throw new Error('Error reading events data');
  }
}

// Function to write events data to the JSON file
async function writeEventsFile(events) {
  try {
    await fs.writeFile(eventsFilePath, JSON.stringify(events, null, 2));
  } catch (error) {
    console.error('Error writing events file:', error);
    throw new Error('Error writing events data');
  }
}

export default async function handler(req, res) {
  const { method, query: { id }, body } = req;
  console.log(`Request received: Method - ${method}, ID - ${id}, Body - `, body);

  try {
    switch (method) {
      case 'GET': { // Fetch all events
        const events = await readEventsFile();
        res.status(200).json(events);
        break;
      }

      case 'POST': { // Create a new event
        const newEvent = { ...body, id: Date.now().toString() }; // Use timestamp as ID
        const events = await readEventsFile();
        events.push(newEvent);
        await writeEventsFile(events);
        res.status(201).json(newEvent);
        break;
      }

      case 'PUT': { // Update an existing event by ID
        if (!id) {
          res.status(400).json({ message: 'Event ID is required for updating' });
          return;
        }

        const updatedEvent = body;
        const events = await readEventsFile();
        const index = events.findIndex(event => event.id === id.toString());

        if (index !== -1) {
          events[index] = { ...events[index], ...updatedEvent };
          await writeEventsFile(events);
          res.status(200).json(events[index]);
        } else {
          res.status(404).json({ message: 'Event not found' });
        }
        break;
      }

      case 'DELETE': { // Delete an event by ID
        if (!id) {
          res.status(400).json({ message: 'Event ID is required for deletion' });
          return;
        }

        const events = await readEventsFile();
        const filteredEvents = events.filter(event => event.id !== id.toString());

        if (events.length !== filteredEvents.length) {
          await writeEventsFile(filteredEvents);
          res.status(200).json({ message: 'Event deleted successfully' });
        } else {
          res.status(404).json({ message: 'Event not found' });
        }
        break;
      }

      default: {
        res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
        res.status(405).end(`Method ${method} Not Allowed`);
        break;
      }
    }
  } catch (error) {
    console.error('Error handling request:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

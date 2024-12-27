import { fetchEvents } from '@/lib/api/events';
import EventsList from '@/components/EventsList';

export default async function Home() {
  // Fetch initial events without filters
  const initialEvents = await fetchEvents();

  return (
    <main className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-gray-200">
          Featured Events
        </h1>
        <EventsList initialEvents={initialEvents} />
      </div>
    </main>
  );
}
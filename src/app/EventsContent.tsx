'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { fetchEvents, type Event } from '@/lib/api/events';
import EventCard from '@/components/EventCard';
import EventsFilter from '@/components/EventsFilter';

export default function EventsContent() {
  const searchParams = useSearchParams();
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getEvents = async () => {
      setIsLoading(true);
      try {
        const province = searchParams.get('province') || '';
        const category = searchParams.get('category') || '';
        const data = await fetchEvents({ province, category });
        setEvents(data);
      } catch (error) {
        console.error('Failed to fetch events:', error);
      } finally {
        setIsLoading(false);
      }
    };

    getEvents();
  }, [searchParams]);

  return (
    <div>
      <EventsFilter 
        initialProvince={searchParams.get('province') || ''}
        initialCategory={searchParams.get('category') || ''}
      />
      
      {isLoading ? (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
        </div>
      ) : events.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event) => (
            <EventCard
              key={event.EventID}
              title={event.EventName}
              date={event.EventDate}
              time={event.EventTime}
              venue={event.VenueName}
              location={`${event.VenueCity}, ${event.VenueProvince}`}
              price={`${event.TicketStatus?.Standard?.Currency || 'R'}${event.TicketStatus?.Standard?.Price || 'TBA'}`}
              category={event.EventCategory}
              imageUrl={event.Assets?.EventThumbnail?.URL || '/api/placeholder/400/270'}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500">
          No events found
        </div>
      )}
    </div>
  );
}
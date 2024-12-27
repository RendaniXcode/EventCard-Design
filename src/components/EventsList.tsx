'use client';

import { useState } from 'react';
import { Event, fetchEvents } from '@/lib/api/events';
import EventsFilter from './EventsFilter';
import EventCard from './EventCard';

interface EventsListProps {
  initialEvents: Event[];
}

export default function EventsList({ initialEvents }: EventsListProps) {
  const [events, setEvents] = useState<Event[]>(initialEvents);
  const [isLoading, setIsLoading] = useState(false);

  const handleCategoryClick = async (category: string) => {
    setIsLoading(true);
    try {
      const filteredEvents = await fetchEvents({ category });
      setEvents(filteredEvents);
    } catch (error) {
      console.error('Error fetching filtered events:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <EventsFilter 
        onEventsUpdate={setEvents}
        onLoadingChange={setIsLoading}
      />
      
      {isLoading ? (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event) => (
            <EventCard
              key={event.EventID}
              title={event.EventName}
              date={event.EventDate}
              time={event.EventTime}
              venue={event.VenueName}
              location={`${event.VenueCity}, ${event.VenueProvince}`}
              price={`R${event.TicketStatus?.Standard?.Price || '400'}`}
              category={event.EventCategory}
              imageUrl={event.Assets?.EventThumbnail?.URL || '/api/placeholder/400/270'}
              onCategoryClick={handleCategoryClick}
            />
          ))}
        </div>
      )}
    </div>
  );
}
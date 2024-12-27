'use client';

import { useState, useCallback } from 'react';
import { Event, EventFilter } from '@/lib/api/events';
import EventCard from './EventCard';
import EventsFilter from './EventsFilter';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';

interface EventsContainerProps {
  initialEvents: Event[];
}

export default function EventsContainer({ initialEvents }: EventsContainerProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  const [events, setEvents] = useState<Event[]>(initialEvents);
  const [loading, setLoading] = useState(false);

  const updateFilters = useCallback((filter: EventFilter) => {
    const params = new URLSearchParams(searchParams);
    if (filter.province) {
      params.set('province', filter.province);
    } else {
      params.delete('province');
    }
    if (filter.category) {
      params.set('category', filter.category);
    } else {
      params.delete('category');
    }
    
    router.push(`${pathname}?${params.toString()}`);
  }, [pathname, router, searchParams]);

  if (loading) {
    return <div className="text-center py-8 text-gray-500">Loading events...</div>;
  }

  return (
    <div>
      <EventsFilter
        onFilterChange={updateFilters}
        initialProvince={searchParams.get('province') || ''}
        initialCategory={searchParams.get('category') || ''}
      />
      
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
    </div>
  );
}
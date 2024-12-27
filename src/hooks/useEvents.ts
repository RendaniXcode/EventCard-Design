'use client';

import { useState, useCallback, useEffect } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { Event, EventFilter, fetchEvents } from '@/lib/api/events';

export function useEvents(initialEvents: Event[]) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  const [events, setEvents] = useState<Event[]>(initialEvents);
  const [isLoading, setIsLoading] = useState(false);

  const updateFilters = useCallback(async (filter: EventFilter) => {
    const params = new URLSearchParams(searchParams.toString());
    
    // Update URL params
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

    // Update URL without reload
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  }, [pathname, router, searchParams]);

  // Effect to fetch events when URL params change
  useEffect(() => {
    const fetchFilteredEvents = async () => {
      const province = searchParams.get('province') || '';
      const category = searchParams.get('category') || '';
      
      if (province || category) {
        setIsLoading(true);
        try {
          const newEvents = await fetchEvents({ province, category });
          setEvents(newEvents);
        } catch (error) {
          console.error('Failed to fetch events:', error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchFilteredEvents();
  }, [searchParams]);

  return {
    events,
    isPending: isLoading,
    updateFilters,
  };
}
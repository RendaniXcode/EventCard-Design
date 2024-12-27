'use client';

import { useState, useCallback } from 'react';
import { fetchEvents, Event } from '@/lib/api/events';
import { DEFAULT_PROVINCES, DEFAULT_CATEGORIES } from '@/lib/constants';

interface EventsFilterProps {
  onEventsUpdate: (events: Event[]) => void;
  onLoadingChange: (isLoading: boolean) => void;
}

export default function EventsFilter({
  onEventsUpdate,
  onLoadingChange
}: EventsFilterProps) {
  const [province, setProvince] = useState('');
  const [category, setCategory] = useState('');

  const handleFilterChange = useCallback(async (newProvince: string, newCategory: string) => {
    onLoadingChange(true);
    try {
      const filteredEvents = await fetchEvents({
        province: newProvince,
        category: newCategory
      });
      onEventsUpdate(filteredEvents);
    } catch (error) {
      console.error('Error fetching filtered events:', error);
    } finally {
      onLoadingChange(false);
    }
  }, [onEventsUpdate, onLoadingChange]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
      <select 
        className="p-2 rounded-lg border border-gray-300"
        value={province}
        onChange={(e) => {
          setProvince(e.target.value);
          handleFilterChange(e.target.value, category);
        }}
      >
        <option value="">All Provinces</option>
        {DEFAULT_PROVINCES.map((prov) => (
          <option key={prov} value={prov}>
            {prov}
          </option>
        ))}
      </select>

      <select 
        className="p-2 rounded-lg border border-gray-300"
        value={category}
        onChange={(e) => {
          setCategory(e.target.value);
          handleFilterChange(province, e.target.value);
        }}
      >
        <option value="">All Categories</option>
        {DEFAULT_CATEGORIES.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>
    </div>
  );
}
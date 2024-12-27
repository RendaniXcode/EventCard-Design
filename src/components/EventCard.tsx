'use client';

import React from 'react';
import { MapPin, Calendar, Clock } from 'lucide-react';

interface EventCardProps {
  title: string;
  date: string;
  time: string;
  venue: string;
  location: string;
  price: string;
  category: string;
  imageUrl: string;
  onCategoryClick?: (category: string) => void;
}

const EventCard = ({ 
  title,
  date,
  time,
  venue,
  location,
  price,
  category = '',
  imageUrl,
  onCategoryClick
}: EventCardProps) => {
  // Extract main category (before the hyphen) with null check
  const mainCategory = category?.split('-')?.[0]?.trim() || category || '';
  
  const handleCategoryClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onCategoryClick) {
      onCategoryClick(mainCategory);
    }
  };
  
  return (
    <div className="w-full max-w-sm bg-white rounded-xl overflow-hidden shadow-lg">
      {/* Event Image and Category */}
      <div className="relative">
        <img 
          src={imageUrl} 
          alt={title}
          className="w-full h-[270px] object-cover bg-gray-100"
        />
        {mainCategory && (
          <div className="absolute top-4 left-4">
            <button 
              onClick={handleCategoryClick}
              className="px-3 py-1 bg-gray-700 text-white text-xs font-medium rounded-full
                        hover:bg-gray-800 active:bg-gray-900 transition-all duration-200 
                        cursor-pointer transform hover:scale-105 active:scale-95
                        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              {mainCategory}
            </button>
          </div>
        )}
      </div>

      {/* Event Details */}
      <div className="p-5 pb-4">
        {/* Title */}
        <h2 className="text-lg font-bold text-gray-900 mb-4 truncate" title={title}>
          {title}
        </h2>
        
        {/* Date and Time */}
        <div className="space-y-2.5">
          <div className="flex items-center text-gray-600 gap-3">
            <Calendar className="w-5 h-5 text-gray-400 flex-shrink-0" />
            <span className="text-sm">{date}</span>
          </div>
          
          <div className="flex items-center text-gray-600 gap-3">
            <Clock className="w-5 h-5 text-gray-400 flex-shrink-0" />
            <span className="text-sm">{time}</span>
          </div>
          
          <div className="flex items-start justify-between text-gray-600">
            <div className="flex gap-3">
              <MapPin className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
              <div>
                <div className="text-sm">{venue}</div>
                <div className="text-sm text-gray-500">{location}</div>
              </div>
            </div>
            <span className="px-3 py-0.5 border border-red-500 text-red-500 rounded-full text-xs">
              {price}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
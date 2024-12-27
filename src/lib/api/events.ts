import { type } from "os";

// Types for event data
export interface Event {
  EventID: string;
  EventName: string;
  EventDate: string;
  EventTime: string;
  EventCategory: string;
  VenueName: string;
  VenueProvince: string;
  VenueCity: string;
  Assets?: {
    EventThumbnail?: {
      URL: string;
    };
  };
  TicketStatus?: {
    Standard?: {
      Price: number;
      Currency: string;
    };
  };
}

export interface EventFilter {
  province?: string;
  category?: string;
}

// Constants
const API_URL = process.env.NEXT_PUBLIC_APPSYNC_API_URL;
const API_KEY = process.env.NEXT_PUBLIC_APPSYNC_API_KEY;

// GraphQL Query
export const EVENTS_QUERY = `
  query ListEvents($filter: TableEventheroEventsdbFilterInput) {
    listEventheroEventsdbs(filter: $filter, limit: 20) {
      items {
        EventID
        EventName
        EventDate
        EventTime
        EventCategory
        VenueName
        VenueProvince
        VenueCity
        Assets {
          EventThumbnail {
            URL
          }
        }
        TicketStatus {
          Standard {
            Price
            Currency
          }
        }
      }
    }
  }
`;

// API function
export async function fetchEvents(filter?: EventFilter): Promise<Event[]> {
  if (!API_URL || !API_KEY) {
    throw new Error('API configuration is missing');
  }

  const graphqlFilter = {};
  
  if (filter?.province) {
    graphqlFilter['VenueProvince'] = { eq: filter.province };
  }
  
  if (filter?.category) {
    graphqlFilter['EventCategory'] = { beginsWith: filter.category };
  }

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY,
      },
      body: JSON.stringify({
        query: EVENTS_QUERY,
        variables: {
          filter: Object.keys(graphqlFilter).length > 0 ? graphqlFilter : null,
        },
      }),
      next: { revalidate: 3600 }, // Cache for 1 hour
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();

    if (result.errors) {
      throw new Error(result.errors[0].message);
    }

    return result.data.listEventheroEventsdbs.items;
  } catch (error) {
    console.error('Error fetching events:', error);
    throw error;
  }
}
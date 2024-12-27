export const DEFAULT_PROVINCES = [
  'Gauteng',
  'Western Cape',
  'KwaZulu-Natal',
  'Eastern Cape',
  'Free State',
  'Limpopo',
  'Mpumalanga',
  'North West',
  'Northern Cape'
] as const;

export const DEFAULT_CATEGORIES = [
  'Music Festivals & Concerts',
  'Sports Events',
  'Cultural Festivals',
  'Business Events',
  'Entertainment'
] as const;

export type Province = typeof DEFAULT_PROVINCES[number];
export type Category = typeof DEFAULT_CATEGORIES[number];
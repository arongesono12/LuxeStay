
export interface Hotel {
  id: string;
  name: string;
  rating: number;
  pricePerNight: string;
  description: string;
  address: string;
  image: string;
  distance?: string;
  googleMapsUrl?: string;
  reviewSnippets?: string[];
}

export interface User {
  id: string;
  email: string;
  name: string;
}

export interface Coordinates {
  lat: number;
  lng: number;
}

export enum AppScreen {
  LOGIN = 'LOGIN',
  SIGNUP = 'SIGNUP',
  HOME = 'HOME',
  DETAILS = 'DETAILS',
}

export interface SearchFilters {
  minPrice: number;
  maxPrice: number;
  minRating: number;
}

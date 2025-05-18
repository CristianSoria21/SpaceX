export interface Launch {
  id: string;
  name: string;
  date_utc: string;
  success: boolean;
  rocket: string;
  launchpad: string;
  details?: string;
  links: {
    patch: { small: string; large: string };
    webcast?: string;
  };
}

export interface Rocket {
  id: string;
  name: string;
}

export interface Launchpad {
  id: string;
  name: string;
  locality: string;
  region: string;
  latitude: number;
  longitude: number;
}

export interface Filters {
  search?: string;
  year?: string;
  success?: string;
  rocket?: string;
}

export type CountryCode = 'KR' | 'JP';
export type SportType = 'baseball' | 'football';
export type VenueType = SportType;
export type LeagueCode = 'KBO' | 'KLEAGUE1' | 'KLEAGUE2' | 'NPB' | 'J1' | 'J2';

export type League = {
  code: LeagueCode;
  name: string;
  country: CountryCode;
  imageUrl: string;
  officialUrl: string;
};

export type Team = {
  id: string;
  name: string;
  shortName: string;
  sport: SportType;
  logoUrl?: string;
};

export type Stadium = {
  id: string;
  name: string;
  city: string;
  country: CountryCode;
  venueType: VenueType;
  lat: number;
  lng: number;
};

export type Game = {
  id: string;
  date: string;
  time: string;
  league: LeagueCode;
  sport: SportType;
  homeTeam: Team;
  awayTeam: Team;
  stadium: Stadium;
};

export interface User {
  id: string;
  email: string;
  name: string;
  position?: string;
  isAdmin: boolean;
  teamId?: string;
  createdAt: string;
}

export interface Team {
  id: string;
  name: string;
  color: string;
  createdBy: string;
  createdAt: string;
}

export interface Player {
  id: string;
  userId: string;
  teamId: string;
  position: string;
  joinedAt: string;
}

export interface Match {
  id: string;
  homeTeamId: string;
  awayTeamId: string;
  date: string;
  time: string;
  location: string;
  googleMapsLink?: string;
  status: 'upcoming' | 'completed' | 'cancelled';
  homeScore?: number;
  awayScore?: number;
  createdBy: string;
  createdAt: string;
}

export interface VotingCategory {
  id: string;
  name: string;
  description?: string;
  isActive: boolean;
  createdBy: string;
  createdAt: string;
}

export interface Vote {
  id: string;
  matchId: string;
  categoryId: string;
  voterId: string;
  nomineeId: string;
  createdAt: string;
}

export interface MatchParticipant {
  id: string;
  matchId: string;
  playerId: string;
  teamId: string;
  participated: boolean;
}
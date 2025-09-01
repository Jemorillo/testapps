export type Player = {
  id: string;
  nickname: string;
  name: string;
  avatarUri?: string;
  wins: number;
  losses: number;
  draws: number;
  goals: number;
};

export type Team = {
  id: string;
  name: string;
  color: string; // hex
  playerIds: string[];
};

export type VoteCategory = {
  id: string;
  title: string; // e.g., Mejor Defensa
  isOpen: boolean;
};

export type Vote = {
  id: string;
  matchId: string;
  categoryId: string;
  voterId: string;
  nomineePlayerId: string;
  createdAt: number;
};

export type Match = {
  id: string;
  dateISO: string; // ISO date
  place: string;
  pricePerPlayer: number;
  teamA: Team;
  teamB: Team;
  played: boolean;
  goals: { playerId: string; minute?: number }[]; // recorded by admin
  voteCategoryIds: string[]; // created by admin
};
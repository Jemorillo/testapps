import AsyncStorage from '@react-native-async-storage/async-storage';
import { Match, Player, Vote, VoteCategory } from './types';

const KEY = 'weekly-match-state-v1';

export type AppState = {
  players: Player[];
  matches: Match[];
  votes: Vote[];
  voteCategories: VoteCategory[];
  adminMode: boolean;
};

export const initialState: AppState = {
  players: [],
  matches: [],
  votes: [],
  voteCategories: [],
  adminMode: true, // default true so you can test admin features
};

export async function loadState(): Promise<AppState | null> {
  try {
    const raw = await AsyncStorage.getItem(KEY);
    return raw ? JSON.parse(raw) as AppState : null;
  } catch {
    return null;
  }
}

export async function saveState(state: AppState) {
  await AsyncStorage.setItem(KEY, JSON.stringify(state));
}
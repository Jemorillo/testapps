import React, { createContext, useContext, useEffect, useReducer } from 'react';
import { AppState, initialState, loadState, saveState } from '@/lib/storage';
import { Match, Player, Vote, VoteCategory } from '@/lib/types';

type Action =
  | { type: 'LOAD'; payload: AppState }
  | { type: 'ADD_PLAYER'; payload: Player }
  | { type: 'UPDATE_PLAYER'; payload: Player }
  | { type: 'DELETE_PLAYER'; payload: string }
  | { type: 'ADD_MATCH'; payload: Match }
  | { type: 'UPDATE_MATCH'; payload: Match }
  | { type: 'ADD_CATEGORY'; payload: VoteCategory }
  | { type: 'TOGGLE_ADMIN' }
  | { type: 'ADD_VOTE'; payload: Vote };

function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'LOAD':
      return action.payload;
    case 'TOGGLE_ADMIN':
      return { ...state, adminMode: !state.adminMode };
    case 'ADD_PLAYER':
      return { ...state, players: [...state.players, action.payload] };
    case 'UPDATE_PLAYER':
      return {
        ...state,
        players: state.players.map(p => p.id === action.payload.id ? action.payload : p),
      };
    case 'DELETE_PLAYER':
      return { ...state, players: state.players.filter(p => p.id != action.payload) };
    case 'ADD_MATCH':
      return { ...state, matches: [...state.matches, action.payload] };
    case 'UPDATE_MATCH':
      return { ...state, matches: state.matches.map(m => m.id === action.payload.id ? action.payload : m) };
    case 'ADD_CATEGORY':
      return { ...state, voteCategories: [...state.voteCategories, action.payload] };
    case 'ADD_VOTE':
      return { ...state, votes: [...state.votes, action.payload] };
    default:
      return state;
  }
}

const StoreContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<Action>;
}>({ state: initialState, dispatch: () => {} });

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    loadState().then((s) => {
      if (s) dispatch({ type: 'LOAD', payload: s });
    });
  }, []);

  useEffect(() => {
    saveState(state);
  }, [state]);

  return <StoreContext.Provider value={{ state, dispatch }}>{children}</StoreContext.Provider>;
}

export function useStore() {
  return useContext(StoreContext);
}
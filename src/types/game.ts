export type GamePhase = 'SELECT_MODE' | 'CREATE_GAME' | 'JOIN_GAME' | 'GAME_CREATED' | 'TRANSITION' | 'GUESSING' | 'GAME_OVER';

export interface Guess {
  id: number;
  guess: number[];
  wellPlaced: number;
  misplaced: number;
}


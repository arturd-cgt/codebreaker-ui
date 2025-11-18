export type GamePhase = 'SETUP' | 'TRANSITION' | 'GUESSING' | 'GAME_OVER';

export interface Guess {
  id: number;
  guess: number[];
  wellPlaced: number;
  misplaced: number;
}


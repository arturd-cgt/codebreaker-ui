// Request Types
export interface CreateGameRequest {
  secretCode: number[]; // [1-9, 1-9, 1-9, 1-9]
  maxAttempts?: number; // Optional, 1-100, default: 10
}

export interface GuessRequest {
  guess: number[]; // [1-9, 1-9, 1-9, 1-9]
}

// Response Types
export interface CreateGameResponse {
  gameId: string;
  maxAttempts: number;
}

export interface JoinGameResponse {
  gameId: string;
  maxAttempts: number;
  attemptsMade: number;
  isOver: boolean;
  isVictory: boolean;
}

export interface GuessResponse {
  guessId: number;
  guess: number[];
  wellPlaced: number; // 0-4
  misplaced: number; // 0-4
  attemptsLeft: number;
  isOver: boolean;
  isVictory: boolean;
}

export interface GameStateResponse {
  gameId: string;
  maxAttempts: number;
  attemptsMade: number;
  isOver: boolean;
  isVictory: boolean;
}

export interface HealthCheckResponse {
  status: string;
}

// Error Response
export interface ErrorResponse {
  detail: string;
}


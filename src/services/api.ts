import axios, { AxiosInstance, AxiosError } from 'axios';
import {
  CreateGameRequest,
  CreateGameResponse,
  JoinGameResponse,
  GuessRequest,
  GuessResponse,
  GameStateResponse,
  HealthCheckResponse,
  ErrorResponse,
} from '@/types/api';

const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:8000';

class CodebreakerAPI {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Add response interceptor for error handling
    this.client.interceptors.response.use(
      (response) => response,
      (error: AxiosError<ErrorResponse>) => {
        if (error.response) {
          const errorMessage = error.response.data?.detail || error.message || 'An error occurred';
          return Promise.reject(new Error(errorMessage));
        }
        return Promise.reject(error);
      }
    );
  }

  async healthCheck(): Promise<HealthCheckResponse> {
    const response = await this.client.get<HealthCheckResponse>('/health');
    return response.data;
  }

  async createGame(data: CreateGameRequest): Promise<CreateGameResponse> {
    const response = await this.client.post<CreateGameResponse>('/games', data);
    return response.data;
  }

  async joinGame(gameId: string): Promise<JoinGameResponse> {
    const response = await this.client.post<JoinGameResponse>(`/games/${gameId}/join`);
    return response.data;
  }

  async submitGuess(gameId: string, data: GuessRequest): Promise<GuessResponse> {
    const response = await this.client.post<GuessResponse>(`/games/${gameId}/guess`, data);
    return response.data;
  }

  async getGameState(gameId: string): Promise<GameStateResponse> {
    const response = await this.client.get<GameStateResponse>(`/games/${gameId}`);
    return response.data;
  }
}

export const api = new CodebreakerAPI();


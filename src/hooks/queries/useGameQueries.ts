import { useQuery } from "@tanstack/react-query";
import { api } from "@/services/api";
import { GameStateResponse, HealthCheckResponse } from "@/types/api";

// Query keys
export const gameKeys = {
  all: ["games"] as const,
  detail: (gameId: string) => [...gameKeys.all, gameId] as const,
  state: (gameId: string) => [...gameKeys.detail(gameId), "state"] as const,
  health: ["health"] as const
};

// Health check query
export const useHealthCheck = () => {
  return useQuery<HealthCheckResponse, Error>({
    queryKey: gameKeys.health,
    queryFn: () => api.healthCheck(),
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1
  });
};

// Get game state query
export const useGameState = (
  gameId: string | null,
  enabled: boolean = true
) => {
  return useQuery<GameStateResponse, Error>({
    queryKey: gameKeys.state(gameId || ""),
    queryFn: () => api.getGameState(gameId!),
    enabled: enabled && !!gameId,
    staleTime: 0, // Always fetch fresh data
    refetchInterval: (query) => {
      // Poll every 2 seconds if game is not over
      const data = query.state.data;
      return data && !data.isOver ? 2000 : false;
    }
  });
};

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/services/api";
import { CreateGameRequest, GuessRequest } from "@/types/api";
import { gameKeys } from "../queries/useGameQueries";

// Create game mutation
export const useCreateGame = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateGameRequest) => api.createGame(data),
    onSuccess: (response) => {
      // Invalidate and refetch game state
      queryClient.invalidateQueries({
        queryKey: gameKeys.detail(response.gameId)
      });
    }
  });
};

// Join game mutation
export const useJoinGame = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (gameId: string) => api.joinGame(gameId),
    onSuccess: (response) => {
      // Invalidate and refetch game state
      queryClient.invalidateQueries({
        queryKey: gameKeys.detail(response.gameId)
      });
    }
  });
};

// Submit guess mutation
export const useSubmitGuess = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ gameId, guess }: { gameId: string; guess: number[] }) =>
      api.submitGuess(gameId, { guess }),
    onSuccess: (response, variables) => {
      // Invalidate and refetch game state
      queryClient.invalidateQueries({
        queryKey: gameKeys.detail(variables.gameId)
      });
      // Update game state cache with new data
      queryClient.setQueryData<typeof response>(
        gameKeys.state(variables.gameId),
        (oldData) => {
          if (!oldData) return undefined;
          return {
            ...oldData,
            attemptsMade: oldData.attemptsMade + 1,
            isOver: response.isOver,
            isVictory: response.isVictory
          };
        }
      );
    }
  });
};

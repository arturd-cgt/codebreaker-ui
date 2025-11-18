import React from 'react';
import { useRouter } from 'expo-router';
import JoinGameScreen from '@/screens/JoinGameScreen';
import { useJoinGame } from '@/hooks/mutations/useGameMutations';

export default function JoinScreen() {
  const router = useRouter();
  const joinGameMutation = useJoinGame();

  const handleJoinGame = async (gameId: string) => {
    try {
      const response = await joinGameMutation.mutateAsync(gameId);
      // Navigate to game screen
      if (response.isOver) {
        router.push(`/games/${response.gameId}/over`);
      } else {
        router.push(`/games/${response.gameId}`);
      }
    } catch (error) {
      // Error is handled globally by React Query
      console.error('Failed to join game:', error);
    }
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <JoinGameScreen
      onJoinGame={handleJoinGame}
      onBack={handleBack}
      isLoading={joinGameMutation.isPending}
    />
  );
}


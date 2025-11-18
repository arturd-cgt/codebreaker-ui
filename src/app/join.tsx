import React from 'react';
import { useRouter } from 'expo-router';
import JoinGameScreen from '@/screens/JoinGameScreen';
import { useJoinGame } from '@/hooks/mutations/useGameMutations';
import { Alert } from 'react-native';

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
      const errorMessage = error instanceof Error ? error.message : 'Failed to join game';
      Alert.alert('Error', errorMessage);
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


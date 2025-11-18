import React from 'react';
import { useRouter } from 'expo-router';
import SetupScreen from '@/screens/SetupScreen';
import { useCreateGame } from '@/hooks/mutations/useGameMutations';
import { useGameContext } from '@/contexts/GameContext';
import { Alert } from 'react-native';

export default function CreateScreen() {
  const router = useRouter();
  const createGameMutation = useCreateGame();
  const { setSecretCode } = useGameContext();

  const handleCodeSet = async (code: number[]) => {
    try {
      const response = await createGameMutation.mutateAsync({
        secretCode: code,
        maxAttempts: 10,
      });
      
      // Store secret code in context (not in URL)
      setSecretCode(response.gameId, code);
      
      // Navigate to game created screen without secret code in URL
      router.push(`/games/${response.gameId}/created`);
    } catch (error) {
      console.error('Failed to create game:', error);
      Alert.alert('Error', 'Failed to create game. Please try again.');
    }
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <SetupScreen
      onCodeSet={handleCodeSet}
      onBack={handleBack}
      isLoading={createGameMutation.isPending}
    />
  );
}


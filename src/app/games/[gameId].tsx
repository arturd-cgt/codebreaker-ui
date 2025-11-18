import React, { useEffect, useState } from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Alert } from 'react-native';
import GuessingScreen from '@/screens/GuessingScreen';
import { useSubmitGuess, useJoinGame } from '@/hooks/mutations/useGameMutations';
import { useGameState as useGameStateQuery } from '@/hooks/queries/useGameQueries';
import { Guess } from '@/types/game';
import { MAX_ATTEMPTS } from '@/constants/game';

export default function GameScreen() {
  const { gameId } = useLocalSearchParams<{ gameId: string }>();
  const router = useRouter();
  const [guesses, setGuesses] = useState<Guess[]>([]);
  const [hasJoined, setHasJoined] = useState(false);
  
  const submitGuessMutation = useSubmitGuess();
  const joinGameMutation = useJoinGame();
  const { data: gameState, isLoading: isLoadingGameState } = useGameStateQuery(
    gameId || null,
    !!gameId && hasJoined
  );

  // Auto-join game if accessed via deep link
  useEffect(() => {
    const joinGameIfNeeded = async () => {
      if (!gameId || hasJoined) return;
      
      try {
        // Join the game (no storage check needed)
        await joinGameMutation.mutateAsync(gameId);
        setHasJoined(true);
      } catch (error) {
        console.error('Failed to join game:', error);
        // If join fails, still try to proceed (maybe already joined or game doesn't exist)
        setHasJoined(true);
      }
    };

    joinGameIfNeeded();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameId]);

  // Redirect to game over if game is finished
  useEffect(() => {
    if (gameState?.isOver && gameId && hasJoined) {
      // Navigate without secret code in URL
      router.replace(`/games/${gameId}/over`);
    }
  }, [gameState?.isOver, gameId, router, hasJoined]);

  const handleSubmitGuess = async (guess: number[]) => {
    if (!gameId) return;

    try {
      const response = await submitGuessMutation.mutateAsync({
        gameId,
        guess,
      });

      // Convert API response to local Guess type
      const newGuess: Guess = {
        id: response.guessId,
        guess: response.guess,
        wellPlaced: response.wellPlaced,
        misplaced: response.misplaced,
      };

      setGuesses((prev) => [...prev, newGuess]);

      // If game is over, navigate to game over screen
      if (response.isOver) {
        // Navigate without secret code in URL
        router.replace(`/games/${gameId}/over`);
      }
    } catch (error) {
      console.error('Failed to submit guess:', error);
      Alert.alert('Error', 'Failed to submit guess. Please try again.');
    }
  };

  if (!gameId) {
    return null;
  }

  const maxAttempts = gameState?.maxAttempts ?? MAX_ATTEMPTS;
  const isLoading = submitGuessMutation.isPending || isLoadingGameState;

  return (
    <GuessingScreen
      guesses={guesses}
      maxAttempts={maxAttempts}
      onSubmitGuess={handleSubmitGuess}
      isLoading={isLoading}
    />
  );
}


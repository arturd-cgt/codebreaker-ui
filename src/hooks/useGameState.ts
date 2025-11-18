import { useState, useEffect } from 'react';
import { GamePhase, Guess } from '@/types/game';
import { useCreateGame, useSubmitGuess } from './mutations/useGameMutations';
import { useGameState as useGameStateQuery } from './queries/useGameQueries';

export const useGameState = () => {
  const [gamePhase, setGamePhase] = useState<GamePhase>('SETUP');
  const [gameId, setGameId] = useState<string | null>(null);
  const [secretCode, setSecretCode] = useState<number[]>([]);
  const [guesses, setGuesses] = useState<Guess[]>([]);

  const createGameMutation = useCreateGame();
  const submitGuessMutation = useSubmitGuess();
  const { data: gameState, isLoading: isLoadingGameState } = useGameStateQuery(
    gameId,
    !!gameId && gamePhase !== 'SETUP'
  );

  // Update game phase based on API state
  useEffect(() => {
    if (gameState?.isOver) {
      setGamePhase('GAME_OVER');
    } else if (gameId && gamePhase === 'TRANSITION') {
      setGamePhase('GUESSING');
    }
  }, [gameState, gameId, gamePhase]);

  const handleCodeSet = async (code: number[]) => {
    setSecretCode(code);
    try {
      const response = await createGameMutation.mutateAsync({
        secretCode: code,
        maxAttempts: 10,
      });
      setGameId(response.gameId);
      setGamePhase('TRANSITION');
      setGuesses([]);
    } catch (error) {
      console.error('Failed to create game:', error);
      // Reset on error
      setSecretCode([]);
    }
  };

  const handleStartGuessing = () => {
    setGamePhase('GUESSING');
  };

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

      // Game phase will be updated by useEffect when gameState changes
    } catch (error) {
      console.error('Failed to submit guess:', error);
    }
  };

  const handlePlayAgain = () => {
    setGamePhase('SETUP');
    setGameId(null);
    setSecretCode([]);
    setGuesses([]);
  };

  const isVictory = gameState?.isVictory ?? guesses[guesses.length - 1]?.wellPlaced === 4;
  const isLoading = createGameMutation.isPending || submitGuessMutation.isPending || isLoadingGameState;

  return {
    gamePhase,
    gameId,
    secretCode,
    guesses,
    isVictory,
    isLoading,
    handleCodeSet,
    handleStartGuessing,
    handleSubmitGuess,
    handlePlayAgain,
  };
};


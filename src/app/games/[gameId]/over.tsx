import React from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import GameOverScreen from '@/screens/GameOverScreen';
import { useGameState as useGameStateQuery } from '@/hooks/queries/useGameQueries';
import { useGameContext } from '@/contexts/GameContext';

export default function GameOverRoute() {
  const { gameId } = useLocalSearchParams<{ gameId: string }>();
  const router = useRouter();
  const { getSecretCode } = useGameContext();
  
  const { data: gameState } = useGameStateQuery(gameId || null, !!gameId);

  // Get secret code from context (not from URL)
  const secretCode = gameId ? getSecretCode(gameId) || [] : [];

  const handlePlayAgain = () => {
    router.replace('/');
  };

  if (!gameId) {
    return null;
  }

  const isVictory = gameState?.isVictory ?? false;

  return (
    <GameOverScreen
      isVictory={isVictory}
      secretCode={secretCode}
      onPlayAgain={handlePlayAgain}
    />
  );
}


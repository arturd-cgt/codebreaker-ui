import React from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import GameCreatedScreen from "@/screens/GameCreatedScreen";

export default function GameCreatedRoute() {
  const { gameId } = useLocalSearchParams<{ gameId: string }>();
  const router = useRouter();

  const handleStartGuessing = () => {
    if (gameId) {
      // Navigate to game screen without secret code in URL
      router.replace(`/games/${gameId}`);
    }
  };

  if (!gameId) {
    return null;
  }

  return (
    <GameCreatedScreen gameId={gameId} onStartGuessing={handleStartGuessing} />
  );
}

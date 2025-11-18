import { useState } from 'react';
import { GamePhase, Guess } from '@/types/game';
import { checkGuess } from '@/utils/gameLogic';
import { MAX_ATTEMPTS } from '@/constants/game';

export const useGameState = () => {
  const [gamePhase, setGamePhase] = useState<GamePhase>('SETUP');
  const [secretCode, setSecretCode] = useState<number[]>([]);
  const [guesses, setGuesses] = useState<Guess[]>([]);

  const handleCodeSet = (code: number[]) => {
    setSecretCode(code);
    setGamePhase('TRANSITION');
  };

  const handleStartGuessing = () => {
    setGamePhase('GUESSING');
  };

  const handleSubmitGuess = (guess: number[]) => {
    const result = checkGuess(guess, secretCode);
    const newGuess: Guess = {
      id: guesses.length + 1,
      guess,
      ...result,
    };
    const newGuesses = [...guesses, newGuess];
    setGuesses(newGuesses);

    if (result.wellPlaced === 4 || newGuesses.length === MAX_ATTEMPTS) {
      setGamePhase('GAME_OVER');
    }
  };

  const handlePlayAgain = () => {
    setGamePhase('SETUP');
    setSecretCode([]);
    setGuesses([]);
  };

  const isVictory = guesses[guesses.length - 1]?.wellPlaced === 4;

  return {
    gamePhase,
    secretCode,
    guesses,
    isVictory,
    handleCodeSet,
    handleStartGuessing,
    handleSubmitGuess,
    handlePlayAgain,
  };
};


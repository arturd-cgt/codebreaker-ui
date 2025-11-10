import React, { useState } from 'react';
import { StyleSheet, View, SafeAreaView } from 'react-native';
import SetupScreen from './screens/SetupScreen';
import TransitionScreen from './screens/TransitionScreen';
import GuessingScreen from './screens/GuessingScreen';
import GameOverScreen from './screens/GameOverScreen';
import { checkGuess } from './utils/gameLogic';

type GamePhase = 'SETUP' | 'TRANSITION' | 'GUESSING' | 'GAME_OVER';

interface Guess {
  id: number;
  guess: number[];
  wellPlaced: number;
  misplaced: number;
}

const MAX_ATTEMPTS = 10;

export default function App() {
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

  const renderScreen = () => {
    switch (gamePhase) {
      case 'SETUP':
        return <SetupScreen onCodeSet={handleCodeSet} />;
      case 'TRANSITION':
        return <TransitionScreen onStartGuessing={handleStartGuessing} />;
      case 'GUESSING':
        return (
          <GuessingScreen
            guesses={guesses}
            maxAttempts={MAX_ATTEMPTS}
            onSubmitGuess={handleSubmitGuess}
          />
        );
      case 'GAME_OVER':
        const isVictory = guesses[guesses.length - 1]?.wellPlaced === 4;
        return (
          <GameOverScreen
            isVictory={isVictory}
            secretCode={secretCode}
            onPlayAgain={handlePlayAgain}
          />
        );
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>{renderScreen()}</View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f9fc',
  },
  content: {
    flex: 1,
  },
});

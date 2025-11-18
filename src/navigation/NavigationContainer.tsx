import React from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import SetupScreen from '@/screens/SetupScreen';
import TransitionScreen from '@/screens/TransitionScreen';
import GuessingScreen from '@/screens/GuessingScreen';
import GameOverScreen from '@/screens/GameOverScreen';
import { useGameState } from '@/hooks/useGameState';
import { MAX_ATTEMPTS } from '@/constants/game';

export const NavigationContainer = () => {
  const {
    gamePhase,
    secretCode,
    guesses,
    isVictory,
    handleCodeSet,
    handleStartGuessing,
    handleSubmitGuess,
    handlePlayAgain,
  } = useGameState();

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

  return <SafeAreaView style={styles.container}>
    <View style={styles.content}>{renderScreen()}</View>
  </SafeAreaView>

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


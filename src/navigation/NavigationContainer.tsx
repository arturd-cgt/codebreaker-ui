import React from 'react';
import { SafeAreaView, StyleSheet, View, ActivityIndicator, Text } from 'react-native';
import SetupScreen from '@/screens/SetupScreen';
import TransitionScreen from '@/screens/TransitionScreen';
import GuessingScreen from '@/screens/GuessingScreen';
import GameOverScreen from '@/screens/GameOverScreen';
import { useGameState } from '@/hooks/useGameState';
import { useGameState as useGameStateQuery } from '@/hooks/queries/useGameQueries';
import { MAX_ATTEMPTS } from '@/constants/game';

export const NavigationContainer = () => {
  const {
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
  } = useGameState();

  const { data: gameState } = useGameStateQuery(gameId, !!gameId && gamePhase !== 'SETUP');
  const maxAttempts = gameState?.maxAttempts ?? MAX_ATTEMPTS;

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
            maxAttempts={maxAttempts}
            onSubmitGuess={handleSubmitGuess}
            isLoading={isLoading}
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

  if (isLoading && gamePhase === 'SETUP') {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#3498db" />
          <Text style={styles.loadingText}>Creating game...</Text>
        </View>
      </SafeAreaView>
    );
  }

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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#666',
  },
});


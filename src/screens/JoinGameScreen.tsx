import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, Alert } from 'react-native';

interface JoinGameScreenProps {
  onJoinGame: (gameId: string) => void;
  isLoading?: boolean;
  onBack: () => void;
}

const JoinGameScreen: React.FC<JoinGameScreenProps> = ({
  onJoinGame,
  isLoading = false,
  onBack,
}) => {
  const [gameId, setGameId] = useState('');

  const handleJoin = () => {
    const trimmedGameId = gameId.trim();
    if (!trimmedGameId) {
      Alert.alert('Error', 'Please enter a game ID');
      return;
    }
    onJoinGame(trimmedGameId);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Join Game</Text>
      <Text style={styles.instructions}>
        Enter the game ID to join an existing game
      </Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter Game ID"
          value={gameId}
          onChangeText={setGameId}
          autoCapitalize="none"
          autoCorrect={false}
          editable={!isLoading}
          placeholderTextColor="#999"
        />
      </View>

      <View style={styles.buttonContainer}>
        <Pressable
          style={({ pressed }) => [
            styles.backButton,
            pressed && styles.pressedButton,
          ]}
          onPress={onBack}
          disabled={isLoading}
        >
          <Text style={styles.backButtonText}>Back</Text>
        </Pressable>

        <Pressable
          style={({ pressed }) => [
            styles.joinButton,
            (!gameId.trim() || isLoading) && styles.disabledButton,
            pressed && !isLoading && gameId.trim() && styles.pressedButton,
          ]}
          onPress={handleJoin}
          disabled={!gameId.trim() || isLoading}
        >
          <Text style={styles.joinButtonText}>
            {isLoading ? 'Joining...' : 'Join Game'}
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f7f9fc',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  instructions: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 40,
    paddingHorizontal: 20,
  },
  inputContainer: {
    width: '100%',
    maxWidth: 400,
    marginBottom: 30,
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#ddd',
    borderRadius: 12,
    padding: 16,
    fontSize: 18,
    textAlign: 'center',
    color: '#333',
  },
  buttonContainer: {
    width: '100%',
    maxWidth: 400,
    flexDirection: 'row',
    gap: 12,
  },
  backButton: {
    flex: 1,
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
    backgroundColor: '#95a5a6',
    alignItems: 'center',
  },
  joinButton: {
    flex: 2,
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
    backgroundColor: '#2ecc71',
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#bdc3c7',
    opacity: 0.6,
  },
  pressedButton: {
    opacity: 0.8,
    transform: [{ scale: 0.98 }],
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  joinButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default JoinGameScreen;


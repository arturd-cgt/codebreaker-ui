import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";

interface SelectModeScreenProps {
  onCreateGame: () => void;
  onJoinGame: () => void;
}

const SelectModeScreen: React.FC<SelectModeScreenProps> = ({
  onCreateGame,
  onJoinGame
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Codebreaker</Text>
      <Text style={styles.subtitle}>Choose an option to start</Text>

      <View style={styles.buttonContainer}>
        <Pressable
          style={({ pressed }) => [
            styles.button,
            styles.createButton,
            pressed && styles.pressedButton
          ]}
          onPress={onCreateGame}
        >
          <Text style={styles.buttonText}>Create Game</Text>
          <Text style={styles.buttonSubtext}>Set a secret code</Text>
        </Pressable>

        <Pressable
          style={({ pressed }) => [
            styles.button,
            styles.joinButton,
            pressed && styles.pressedButton
          ]}
          onPress={onJoinGame}
        >
          <Text style={styles.buttonText}>Join Game</Text>
          <Text style={styles.buttonSubtext}>Enter a game ID</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f7f9fc",
    padding: 20
  },
  title: {
    fontSize: 42,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
    textAlign: "center"
  },
  subtitle: {
    fontSize: 18,
    color: "#666",
    marginBottom: 60,
    textAlign: "center"
  },
  buttonContainer: {
    width: "100%",
    maxWidth: 400,
    gap: 20
  },
  button: {
    paddingVertical: 24,
    paddingHorizontal: 32,
    borderRadius: 16,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3
  },
  createButton: {
    backgroundColor: "#3498db"
  },
  joinButton: {
    backgroundColor: "#2ecc71"
  },
  pressedButton: {
    opacity: 0.8,
    transform: [{ scale: 0.98 }]
  },
  buttonText: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 4
  },
  buttonSubtext: {
    color: "#fff",
    fontSize: 14,
    opacity: 0.9
  }
});

export default SelectModeScreen;

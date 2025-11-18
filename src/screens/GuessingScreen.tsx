import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import GuessInput from "@/components/GuessInput";
import GuessHistory from "@/components/GuessHistory";

interface Guess {
  id: number;
  guess: number[];
  wellPlaced: number;
  misplaced: number;
}

interface GuessingScreenProps {
  guesses: Guess[];
  maxAttempts: number;
  onSubmitGuess: (guess: number[]) => void;
  isLoading?: boolean;
}

const GuessingScreen: React.FC<GuessingScreenProps> = ({
  guesses,
  maxAttempts,
  onSubmitGuess,
  isLoading = false,
}) => {
  const [currentGuess, setCurrentGuess] = React.useState<(number | null)[]>([
    null,
    null,
    null,
    null,
  ]);

  const attemptsLeft = maxAttempts - guesses.length;
  const isGuessComplete = currentGuess.every((digit) => digit !== null);
  const isDisabled = !isGuessComplete || isLoading;

  const handleSubmit = () => {
    if (isGuessComplete && !isLoading) {
      onSubmitGuess(currentGuess as number[]);
      setCurrentGuess([null, null, null, null]);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.historyContainer}>
        <GuessHistory guesses={guesses} />
      </View>
      <View style={styles.bottomContainer}>
        <View style={styles.inputContainer}>
          <GuessInput code={currentGuess} onCodeChange={setCurrentGuess} />
          <Pressable
            style={({ pressed }) => [
              styles.submitButton,
              isDisabled && styles.disabledButton,
              pressed && !isDisabled && styles.pressedButton,
            ]}
            onPress={handleSubmit}
            disabled={isDisabled}
            role="button"
          >
            <Text style={styles.buttonText}>
              {isLoading ? 'Submitting...' : 'Submit Guess'}
            </Text>
          </Pressable>
        </View>
        <Text style={styles.attemptsText}>Attempts left: {attemptsLeft}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: "#f7f9fc",
  },
  historyContainer: {
    flex: 1,
  },
  bottomContainer: {
    flex: 1,
    justifyContent: "space-around",
  },
  inputContainer: {
    alignItems: "center",
  },
  attemptsText: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    color: "#555",
    paddingVertical: 15,
  },
  submitButton: {
    marginTop: 20,
    backgroundColor: "#3498db",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  disabledButton: {
    backgroundColor: "#bdc3c7",
  },
  pressedButton: {
    backgroundColor: "#2980b9",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default GuessingScreen;

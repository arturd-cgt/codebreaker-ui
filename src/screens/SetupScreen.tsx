import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import GuessInput from "@/components/GuessInput";

interface SetupScreenProps {
  onCodeSet: (code: number[]) => void;
  onBack: () => void;
  isLoading?: boolean;
}

const SetupScreen: React.FC<SetupScreenProps> = ({ 
  onCodeSet, 
  onBack,
  isLoading = false,
}) => {
  const [code, setCode] = React.useState<(number | null)[]>([
    null,
    null,
    null,
    null,
  ]);

  const isCodeComplete = code.every((digit) => digit !== null);
  const isDisabled = !isCodeComplete || isLoading;

  const handleSetCode = () => {
    if (isCodeComplete && !isLoading) {
      onCodeSet(code as number[]);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Codemaker: Set Your Secret Code</Text>
      <Text style={styles.instructions}>
        Player 2, look away! Enter a 4-digit code using numbers 1-9.
      </Text>
      <GuessInput code={code} onCodeChange={setCode} />
      
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
            styles.submitButton,
            isDisabled && styles.disabledButton,
            pressed && !isDisabled && styles.pressedButton,
          ]}
          onPress={handleSetCode}
          disabled={isDisabled}
        >
          <Text style={styles.submitButtonText}>
            {isLoading ? 'Creating...' : 'Set Secret Code'}
          </Text>
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
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 15,
    textAlign: "center",
  },
  instructions: {
    fontSize: 18,
    color: "#666",
    textAlign: "center",
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  buttonContainer: {
    width: '100%',
    maxWidth: 400,
    flexDirection: 'row',
    gap: 12,
    marginTop: 20,
  },
  backButton: {
    flex: 1,
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
    backgroundColor: '#95a5a6',
    alignItems: 'center',
  },
  submitButton: {
    flex: 2,
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
    backgroundColor: '#3498db',
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
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SetupScreen;

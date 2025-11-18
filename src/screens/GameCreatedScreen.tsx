import React, { useState } from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Alert,
  Platform
} from "react-native";
import * as Clipboard from "expo-clipboard";

interface GameCreatedScreenProps {
  gameId: string;
  onStartGuessing: () => void;
}

const GameCreatedScreen: React.FC<GameCreatedScreenProps> = ({
  gameId,
  onStartGuessing
}) => {
  const [copied, setCopied] = useState(false);

  const getShareUrl = () => {
    if (Platform.OS === "web" && typeof window !== "undefined") {
      // For web, use the current origin
      return `${window.location.origin}/games/${gameId}`;
    }
    // For native, use the custom scheme
    return `codebreaker://games/${gameId}`;
  };

  const handleCopyGameId = async () => {
    try {
      const shareUrl = getShareUrl();

      await Clipboard.setStringAsync(shareUrl);
      setCopied(true);
      Alert.alert("Success", "Game ID and link copied to clipboard!");

      // Reset copied state after 2 seconds
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      Alert.alert("Error", "Failed to copy game ID");
      console.error("Failed to copy to clipboard:", error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Game Created!</Text>
        <Text style={styles.subtitle}>Share this Game ID with your friend</Text>

        <View style={styles.gameIdContainer}>
          <Text style={styles.gameIdLabel}>Game ID</Text>
          <View style={styles.gameIdBox}>
            <Text style={styles.gameIdText}>{gameId}</Text>
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <Pressable
            style={({ pressed }) => [
              styles.button,
              styles.copyButton,
              copied && styles.copiedButton,
              pressed && styles.pressedButton
            ]}
            onPress={handleCopyGameId}
          >
            <Text style={styles.buttonText}>
              {copied ? "✓ Copied!" : "Copy Game ID"}
            </Text>
          </Pressable>

          <Pressable
            style={({ pressed }) => [
              styles.button,
              styles.startButton,
              pressed && styles.pressedButton
            ]}
            onPress={onStartGuessing}
          >
            <Text style={styles.buttonText}>Start Guessing</Text>
          </Pressable>
        </View>
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
  content: {
    width: "100%",
    maxWidth: 400,
    alignItems: "center"
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
    textAlign: "center"
  },
  subtitle: {
    fontSize: 18,
    color: "#666",
    marginBottom: 40,
    textAlign: "center"
  },
  gameIdContainer: {
    width: "100%",
    marginBottom: 40,
    alignItems: "center"
  },
  gameIdLabel: {
    fontSize: 16,
    color: "#666",
    marginBottom: 12,
    fontWeight: "600"
  },
  gameIdBox: {
    backgroundColor: "#fff",
    borderWidth: 2,
    borderColor: "#3498db",
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 24,
    width: "100%",
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
  gameIdText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#3498db",
    letterSpacing: 2
  },
  buttonContainer: {
    width: "100%",
    gap: 16
  },
  button: {
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
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
  copyButton: {
    backgroundColor: "#95a5a6"
  },
  copiedButton: {
    backgroundColor: "#2ecc71"
  },
  startButton: {
    backgroundColor: "#3498db"
  },
  pressedButton: {
    opacity: 0.8,
    transform: [{ scale: 0.98 }]
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold"
  }
});

export default GameCreatedScreen;

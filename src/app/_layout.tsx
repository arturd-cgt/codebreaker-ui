import { Stack } from 'expo-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SafeAreaView, StyleSheet, Alert } from 'react-native';
import { GameProvider } from '@/contexts/GameContext';

// Create a query client with global error handlers
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      onError: (error: unknown) => {
        const errorMessage = error instanceof Error 
          ? error.message 
          : 'An error occurred while fetching data';
        Alert.alert('Error', errorMessage);
      },
      retry: 1,
    },
    mutations: {
      onError: (error: unknown) => {
        const errorMessage = error instanceof Error 
          ? error.message 
          : 'An error occurred';
        Alert.alert('Error', errorMessage);
      },
      retry: false,
    },
  },
});

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <GameProvider>
        <SafeAreaView style={styles.container}>
          <Stack
            screenOptions={{
              headerShown: false,
              contentStyle: { backgroundColor: '#f7f9fc' },
            }}
          />
        </SafeAreaView>
      </GameProvider>
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f9fc',
  },
});


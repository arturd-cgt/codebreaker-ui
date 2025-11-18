import React from 'react';
import { useRouter } from 'expo-router';
import SelectModeScreen from '@/screens/SelectModeScreen';

export default function Index() {
  const router = useRouter();

  return (
    <SelectModeScreen
      onCreateGame={() => router.push('/create')}
      onJoinGame={() => router.push('/join')}
    />
  );
}


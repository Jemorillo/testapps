import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { StoreProvider } from '@/context/store';

export default function RootLayout() {
  return (
    <StoreProvider>
      <StatusBar style="auto" />
      <Stack screenOptions={{ headerShown: false }} />
    </StoreProvider>
  );
}
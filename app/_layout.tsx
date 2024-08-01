import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { Stack } from 'expo-router';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="index" options={{ title: 'Index' }} />
      <Stack.Screen name="(auth)" options={{ title: '(auth)' }} />
      <Stack.Screen name="(tabs)" options={{ title: '(tabs)' }} />
      <Stack.Screen name="weather" options={{ title: 'Weather' }} />
      <Stack.Screen
        name="disaster-predictions"
        options={{ title: 'Disaster-Predictions' }}
      />
      <Stack.Screen name="sos" options={{ title: 'Sos' }} />
    </Stack>
  );
}

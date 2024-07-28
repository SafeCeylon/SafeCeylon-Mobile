import { DarkTheme, DefaultTheme } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { useColorScheme } from '@/hooks/useColorScheme';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
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
        theme: colorScheme === 'dark' ? DarkTheme : DefaultTheme,
      }}
    >
      <Stack.Screen name="index" options={{ title: 'Home' }} />
      <Stack.Screen name="signIn" options={{ title: 'Sign In' }} />
      <Stack.Screen name="signUp" options={{ title: 'Sign Up' }} />
      <Stack.Screen name="forgotPw" options={{ title: 'Forgot Password' }} />
      <Stack.Screen name="emailVerify" options={{ title: 'Email Verification' }} />
      <Stack.Screen name="resetPw" options={{ title: 'Reset Password' }} />
      <Stack.Screen name="dashboard" options={{ title: 'Dashboard' }} />
      <Stack.Screen name="profile" options={{ title: 'Profile' }} />\
      <Stack.Screen name="notifications" options={{ title: 'Notifications' }} />
      <Stack.Screen name="map" options={{ title: 'Map' }} />
      <Stack.Screen name="weather" options={{ title: 'Weather' }} />
      <Stack.Screen name="disaster-predictions" options={{ title: 'Disaster-Predictions' }} />
    </Stack>
  );
}

import { Stack } from 'expo-router';

const HomeLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="weather" options={{ headerShown: false }} />
      <Stack.Screen name="sos" options={{ headerShown: false }} />
      <Stack.Screen name="disasters" options={{ headerShown: false }} />
      <Stack.Screen
        name="disaster-predictions"
        options={{ headerShown: false }}
      />
    </Stack>
  );
};

export default HomeLayout;

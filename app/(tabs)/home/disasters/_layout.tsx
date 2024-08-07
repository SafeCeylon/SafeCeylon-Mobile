import { Stack } from 'expo-router';

const DisastersLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="donations" options={{ headerShown: false }} />
    </Stack>
  );
};

export default DisastersLayout;

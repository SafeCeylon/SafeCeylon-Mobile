import { Stack } from 'expo-router';

const DisasterPredictionLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="index" options={{ headerShown: false }} />
    </Stack>
  );
};

export default DisasterPredictionLayout;

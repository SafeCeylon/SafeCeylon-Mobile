import { Stack } from 'expo-router';

const DisastersLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="monetarydono" options={{ headerShown: false }} />
      <Stack.Screen name="suppliesdono" options={{ headerShown: false }} />
    </Stack>
  );
};

export default DisastersLayout;

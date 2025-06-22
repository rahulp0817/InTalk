import { AuthContext } from '@/context/AuthContext';
import { Redirect, Stack } from 'expo-router';
import { useContext } from 'react';
import 'react-native-reanimated';

export const unstable_settings = {
  initialRouteName: '(tabs)', //anchor
}

export default function ProtectedLayout() {
  const authState = useContext(AuthContext);

  if (!authState.isReady) {
    return null;
  }

  if (!authState.isLoggedIn) {
    return <Redirect href="/(auth)/sign-in" />;
  }

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}

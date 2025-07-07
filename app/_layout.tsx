import { useColorScheme } from '@/hooks/useColorScheme';
import { useAuthStore } from '@/store/AuthStore';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { SplashScreen, Stack } from 'expo-router';
import React from 'react';
import 'react-native-reanimated';
import "../global.css";


SplashScreen.hideAsync();


export default function RootLayout() {
    const { isLoggedIn, hasCompletedOnboarding } = useAuthStore();
    const colorScheme = useColorScheme();
    const [loaded] = useFonts({
        SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    });

    if (!loaded) {
        return null;
    }

    return (
        <React.Fragment>
           {/* <StatusBar style="light" backgroundColor="#121212" /> */}
            <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
                <Stack>
                    <Stack.Protected guard={isLoggedIn}>
                        <Stack.Screen name="(tabs)" options={{ headerShown: false, animation: "none" }} />
                        <Stack.Screen name="+not-found" />
                    </Stack.Protected>
                    <Stack.Protected guard={!isLoggedIn && hasCompletedOnboarding}>
                        <Stack.Screen name="(auth)" options={{ headerShown: false, animation: "none" }} />
                    </Stack.Protected>
                    <Stack.Protected guard={!hasCompletedOnboarding}>
                        <Stack.Screen name="(onboarding)" options={{ headerShown: false, animation: "none" }} />
                    </Stack.Protected>
                </Stack>
            </ThemeProvider>
        </React.Fragment>
    );
}

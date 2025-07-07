import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";

const OnboardingLayout = () => {
  return (
    <>
      <Stack>
        <Stack.Screen
          name="onboarding-screen"
          options={{
            headerShown: true,
          }}
        />
        <Stack.Screen
          name="final-screen"
          options={{
            presentation: 'fullScreenModal',    
            animation: 'slide_from_bottom',
            headerShown: true,
          }}
        />
      </Stack>
      <StatusBar style="auto" />
    </>
  );
};

export default OnboardingLayout;

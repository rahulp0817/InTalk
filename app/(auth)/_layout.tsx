import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";

const AuthLayout = () => {
  return (
    <>
      <Stack>
        <Stack.Screen
          name="sign-in"
          options={{
            presentation: 'fullScreenModal',    
            animation: 'slide_from_bottom',
            headerShown: true,
          }}
        />
        <Stack.Screen
          name="sign-up"
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

export default AuthLayout;

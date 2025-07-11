import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";

const AuthLayout = () => {
  return (
    <>
      <Stack>
        <Stack.Screen
          name="auth-screen"
          options={{
            headerShown: false,
            animation: 'none'
          }}
        />
        <Stack.Screen
          name="sign-in"
          options={{
            headerShown: false,
            animation: 'none'
          }}
        />
        <Stack.Screen
          name="sign-up"
          options={{
            presentation: 'fullScreenModal',    
            animation: 'slide_from_bottom',
            headerShown: false,
          }}
        />
      </Stack>
      <StatusBar style="auto" />
    </>
  );
};

export default AuthLayout;

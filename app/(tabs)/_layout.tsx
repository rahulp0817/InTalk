import { HapticTab } from "@/components/HapticTab";
import { IconSymbol } from "@/components/ui/IconSymbol";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Tabs } from "expo-router";
import React from "react";
import { Platform } from "react-native";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  return (
    <Tabs
      screenOptions={{
        lazy: true,
        headerShown: false,
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600",
        },
        tabBarStyle: Platform.select({
          ios: {
            position: "absolute",
          },
          default: {},
        }),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Chats",
          lazy: true,
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="message" color={color} />
          ), 
        }}
      />
      <Tabs.Screen
        name="group"
        options={{
          title: "Group",
          lazy: true,
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="person.2" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="calls"
        options={{
          title: "Calls",
          lazy: true,
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="phone" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

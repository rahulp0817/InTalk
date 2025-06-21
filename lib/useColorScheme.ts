import { useColorScheme as useNativewindColorScheme } from "nativewind";
import * as SecureStore from "expo-secure-store";
import { STORAGE_KEYS } from "@/constants/storageKeys";

export function useColorScheme() {
  const {
    colorScheme,
    setColorScheme: setColorSchemeNative,
    toggleColorScheme,
  } = useNativewindColorScheme();
  const setColorScheme = (theme: any) => {
    setColorSchemeNative(theme);
    SecureStore.setItemAsync(STORAGE_KEYS.APP.THEME_MODE, theme);
  };
  return {
    colorScheme: colorScheme ?? "light",
    isDarkColorScheme: colorScheme === "dark",
    setColorScheme,
    toggleColorScheme,
  };
}

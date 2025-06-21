import { STORAGE_KEYS } from "@/constants/storageKeys";
import { getLocales } from "expo-localization";
import * as SecureStore from "expo-secure-store";
import i18next from "i18next";

export const LANGUAGES = {
  ENGLISH: "en",
  ARABIC: "ar",
};

export const LANGUAGE_DETECTOR = {
  type: "languageDetector",
  async: true,
  detect: async (callback: (lang: string) => void) => {
    try {
      // Check stored language first
      const storedLanguage = await SecureStore.getItemAsync(STORAGE_KEYS.APP.LANGUAGE);
      if (storedLanguage) {
        return callback(storedLanguage);
      }

      // Fallback to device language
      const { languageCode } = getLocales()[0];
      callback(languageCode ?? "");
    } catch (error) {
      console.error("Error detecting language", error);
      callback("en"); // Default to English
    }
  },
  init: () => {},
  cacheUserLanguage: async (language: string) => {
    try {
      await SecureStore.setItemAsync(STORAGE_KEYS.APP.LANGUAGE, language);
    } catch (error) {
      console.error("Error caching user language", error);
    }
  },
};


export const LanguageHelper = new Proxy(
  {},
  {
    get: (target, prop: any) => {
      if (prop === "changeLanguage") {
        return (lang: any) => i18next.changeLanguage(lang);
      }
      return i18next.t(prop);
    },
  }
) as any;
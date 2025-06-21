import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import { LANGUAGE_DETECTOR } from "@/utils/language";
import resources from "./resources";

i18n
  .use(LANGUAGE_DETECTOR as any)
  .use(initReactI18next)
  .init({
    compatibilityJSON: "v4",
    resources,
    react: {
      useSuspense: false,
    },
    interpolation: {
      escapeValue: false, // React already escapes values
    },
  });

export default i18n;

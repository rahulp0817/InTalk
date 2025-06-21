export const STORAGE_KEYS = {
  // Authentication related keys
  AUTH: {
    ACCESS_TOKEN: "access_token",
    USER_ID: "user_id",
    USER: "user",
    IS_LOGGED_IN: "is_logged_in",
  },

  // App-wide persistent storage keys
  APP: {
    FIRST_TIME_LAUNCH: "first_time_launch",
    THEME_MODE: "theme_mode",
    LANGUAGE: "app_language",
    DEFAULT_TAB: "default_tab",
  },

  // User preferences
  USER_PREFERENCES: {
    NOTIFICATIONS_ENABLED: "notifications_enabled",
    BIOMETRIC_LOGIN: "biometric_login_enabled",
  },
};

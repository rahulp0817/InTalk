// src/config/environments.ts
export type Environment = "development" | "production";

export interface EnvironmentConfig {
  name: Environment;
  apiBaseUrl: string;
  logLevel: "debug" | "info" | "warn" | "error";
  enableAnalytics: boolean;
  enableLogging: boolean;
  GOOGLE_MAPS_API_KEY: string;
  realmSchemaVersion: number;
  IOS_CLIENT_ID: string;
  ANDROID_CLIENT_ID: string;
}

export const environments: Record<Environment, EnvironmentConfig> = {
  development: {
    name: "development",
    apiBaseUrl: "",
    logLevel: "debug",
    enableAnalytics: false,
    enableLogging: true,
    GOOGLE_MAPS_API_KEY: "AIzaSyC0XnUeUCaf1XLYaVZyMusLa5kJgia6Zjw",
    realmSchemaVersion: 13,
    IOS_CLIENT_ID: "373108203712-uafj99kj247ng9uhh4gv1f28hbkj5jt3.apps.googleusercontent.com",
    ANDROID_CLIENT_ID: "373108203712-813cirr3l4n8fenh4vegu2p5e87n2lmr.apps.googleusercontent.com"
  },
  production: {
    name: "production",
    apiBaseUrl: "",
    logLevel: "error",
    enableAnalytics: true,
    enableLogging: false,
    GOOGLE_MAPS_API_KEY: "AIzaSyC0XnUeUCaf1XLYaVZyMusLa5kJgia6Zjw",
    realmSchemaVersion: 4,
    IOS_CLIENT_ID: "373108203712-uafj99kj247ng9uhh4gv1f28hbkj5jt3.apps.googleusercontent.com",
    ANDROID_CLIENT_ID: "373108203712-813cirr3l4n8fenh4vegu2p5e87n2lmr.apps.googleusercontent.com"
  },
};

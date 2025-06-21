export type Environment = "development" | "production";

export interface EnvironmentConfig {
  name: Environment;
  apiBaseUrl: string;
  logLevel: "debug" | "info" | "warn" | "error";
  enableAnalytics: boolean;
  enableLogging: boolean;
}

export const environments: Record<Environment, EnvironmentConfig> = {
  development: {
    name: "development",
    apiBaseUrl: "",
    logLevel: "debug",
    enableAnalytics: false,
    enableLogging: true,
  },
  production: {
    name: "production",
    apiBaseUrl: "",
    logLevel: "error",
    enableAnalytics: true,
    enableLogging: false,
  },
};

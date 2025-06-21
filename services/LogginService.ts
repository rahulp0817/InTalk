import * as FileSystem from "expo-file-system";
import { environmentService } from "./EnvironmentService";

export class LoggerService {
  private static instance: LoggerService;
  private logFilePath: string;
  private maxLogFileSize: number; // 5MB

  private constructor() {
    this.logFilePath = `${FileSystem.documentDirectory}app.log`;
    this.maxLogFileSize = 5 * 1024 * 1024; // 5MB
  }

  public static getInstance(): LoggerService {
    if (!this.instance) {
      this.instance = new LoggerService();
    }
    return this.instance;
  }

  private async rotateLogFileIfNeeded(): Promise<void> {
    try {
      const fileInfo = await FileSystem.getInfoAsync(this.logFilePath);

      if (fileInfo.exists && fileInfo.size > this.maxLogFileSize) {
        const backupPath = `${this.logFilePath}.old`;
        await FileSystem.moveAsync({
          from: this.logFilePath,
          to: backupPath,
        });
      }
    } catch (error) {
      console.error("Error rotating log file:", error);
    }
  }

  private async writeToFile(message: string): Promise<void> {
    try {
      await this.rotateLogFileIfNeeded();

      // Use writeAsStringAsync with an append flag
      const existingContent = await this.readLogFile();
      await FileSystem.writeAsStringAsync(
        this.logFilePath,
        existingContent + message + "\n",
        { encoding: FileSystem.EncodingType.UTF8 }
      );
    } catch (error) {
      console.error("Error writing to log file:", error);
    }
  }

  private shouldLog(level: "debug" | "info" | "warn" | "error"): boolean {
    const config = environmentService.getConfig();

    if (!config.enableLogging) return false;

    const logLevels = {
      debug: ["debug", "info", "warn", "error"],
      info: ["info", "warn", "error"],
      warn: ["warn", "error"],
      error: ["error"],
    };

    return logLevels[level].includes(config.logLevel);
  }

  public debug(message: string, ...args: any[]): void {
    if (this.shouldLog("debug")) {
      const logMessage = this.formatLogMessage("DEBUG", message, args);
      this.writeToFile(logMessage);
    }
  }

  public info(message: string, ...args: any[]): void {
    if (this.shouldLog("info")) {
      const logMessage = this.formatLogMessage("INFO", message, args);
      console.info(logMessage);
      this.writeToFile(logMessage);
    }
  }

  public warn(message: string, ...args: any[]): void {
    if (this.shouldLog("warn")) {
      const logMessage = this.formatLogMessage("WARN", message, args);
      console.warn(logMessage);
      this.writeToFile(logMessage);
    }
  }

  public error(message: string, ...args: any[]): void {
    const logMessage = this.formatLogMessage("ERROR", message, args);
    // console.error(logMessage);
    this.writeToFile(logMessage);
  }

  private formatLogMessage(
    level: string,
    message: string,
    args: any[]
  ): string {
    const timestamp = new Date().toISOString();
    const environment = environmentService.getCurrentEnvironment();
    const formattedArgs = args
      .map((arg) => (typeof arg === "object" ? JSON.stringify(arg) : arg))
      .join(" ");

    return `[${timestamp}] [${environment}] [${level}] ${message} ${formattedArgs}`;
  }

  // Method to read log file contents
  public async readLogFile(): Promise<string> {
    try {
      // Check if file exists before reading
      const fileInfo = await FileSystem.getInfoAsync(this.logFilePath);
      if (!fileInfo.exists) {
        return "";
      }
      return await FileSystem.readAsStringAsync(this.logFilePath);
    } catch (error) {
      console.error("Error reading log file:", error);
      return "";
    }
  }

  // Optional method to clear log file
  public async clearLogFile(): Promise<void> {
    try {
      await FileSystem.writeAsStringAsync(this.logFilePath, "", {
        encoding: FileSystem.EncodingType.UTF8,
      });
    } catch (error) {
      console.error("Error clearing log file:", error);
    }
  }
}
export const LogError = (title:string,error: string) => {
  logger.error(title, error);
};
export const logger = LoggerService.getInstance();

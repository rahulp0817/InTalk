import Constants from 'expo-constants';
import { Environment, environments, EnvironmentConfig } from '../config/environments';

export class EnvironmentService {
  private static instance: EnvironmentService;
  private currentEnvironment: EnvironmentConfig;

  private constructor() {
    this.currentEnvironment = this.initializeEnvironment();
  }

  public static getInstance(): EnvironmentService {
    if (!this.instance) {
      this.instance = new EnvironmentService();
    }
    return this.instance;
  }

  private initializeEnvironment(): EnvironmentConfig {
    const releaseChannel = Constants.expoConfig?.extra?.releaseChannel ?? 'development';
    
    switch (releaseChannel) {
      case 'production':
        return environments['production'];
      default:
        return environments['development'];
    }
  }

  public getConfig(): EnvironmentConfig {
    return this.currentEnvironment;
  }

  public getCurrentEnvironment(): Environment {
    return this.currentEnvironment.name;
  }
}

export const environmentService = EnvironmentService.getInstance();
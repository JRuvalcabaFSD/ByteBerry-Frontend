import type { IConfig, NodeEnv } from '../interfaces';

/**
 * Singleton configuration class that manages application environment variables and settings.
 *
 * This class provides a centralized way to access and validate environment configuration
 * such as API URLs, node environment, and environment-specific flags. It implements the
 * singleton pattern to ensure a single source of truth for configuration throughout the application.
 *
 * @example
 * ```typescript
 * const config = Config.getConfig();
 * console.log(config.bffUrl); // Access the BFF URL
 * console.log(config.isDevelopment); // Check if running in development mode
 * ```
 *
 * @throws {Error} When required environment variables are missing or invalid
 */

export class Config implements IConfig {
  private static instance: Config | null = null;

  public readonly bffUrl: string;
  public readonly nodeEnv: NodeEnv;
  public readonly isDevelopment: boolean;
  public readonly isProduction: boolean;
  public readonly isTest: boolean;

  /**
   * Creates an instance of Config.
   * @memberof Config
   */
  private constructor() {
    this.bffUrl = this.validateUrl(import.meta.env.VITE_BFF_URL, 'VITE_BFF_URL');
    this.nodeEnv = this.validateNodeEnv(import.meta.env.VITE_NODE_ENV || 'development');
    this.isDevelopment = this.nodeEnv === 'development';
    this.isProduction = this.nodeEnv === 'production';
    this.isTest = this.nodeEnv === 'test';
  }

  /**
   * Retrieves the singleton instance of the {@link Config} class.
   * If the instance does not exist, it creates a new one.
   *
   * @returns {Config} The singleton instance of the configuration.
   */

  public static getConfig(): Config {
    if (!this.instance) this.instance = new Config();
    return this.instance;
  }

  /**
   * Validates that the provided value is a valid URL string.
   * Throws an error if the value is undefined or not a valid URL.
   *
   * @param value - The string to validate as a URL.
   * @param name - The name of the environment variable being validated, used in error messages.
   * @returns The validated URL string.
   * @throws {Error} If the value is missing or not a valid URL.
   */

  private validateUrl(value: string | undefined, name: string): string {
    if (!value) throw new Error(`Missing required environment variable: ${name}`);
    try {
      new URL(value);
      return value;
    } catch {
      throw new Error(`Invalid URL for ${name}: ${value}`);
    }
  }

  /**
   * Validates that the provided value is a valid Node environment.
   *
   * @param value - The environment string to validate.
   * @returns The validated environment as a `NodeEnv` type.
   * @throws {Error} If the provided value is not one of 'development', 'production', or 'test'.
   */

  private validateNodeEnv(value: string): NodeEnv {
    const validEnvs: NodeEnv[] = ['development', 'production', 'test'];

    if (!validEnvs.includes(value as NodeEnv)) {
      throw new Error(`Invalid NODE_ENV: ${value}. Must be one of: ${validEnvs.join(', ')}`);
    }

    return value as NodeEnv;
  }

  /**
   * Resets the singleton instance of the `Config` class to `null`.
   * This method is typically used to clear the current configuration,
   * allowing it to be re-initialized or reloaded.
   */

  public static reset(): void {
    Config.instance = null;
  }
}

/**
 * The global configuration object for the application.
 *
 * This constant retrieves the configuration settings using the `Config.getConfig()` method.
 * It provides access to environment-specific variables and settings required throughout the frontend.
 *
 * @see Config.getConfig
 */

export const config = Config.getConfig();

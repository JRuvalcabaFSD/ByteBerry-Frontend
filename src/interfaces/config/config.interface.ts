/**
 * Represents the possible Node.js environment modes for the application.
 *
 * @description This type defines the three standard environment configurations:
 * - `development`: Used during local development with debug features enabled
 * - `production`: Used in live/deployed environments with optimizations enabled
 * - `test`: Used when running automated tests or test suites
 */

export type NodeEnv = 'development' | 'production' | 'test';

/**
 * Configuration interface for the application environment settings.
 *
 * This interface defines the structure for application configuration
 * including environment-specific URLs and environment state flags.
 *
 * @interface IConfig
 * @property {string} bffUrl - The Backend for Frontend (BFF) service URL endpoint
 * @property {NodeEnv} nodeEnv - The current Node.js environment type
 * @property {boolean} isDevelopment - Flag indicating if running in development environment
 * @property {boolean} isProduction - Flag indicating if running in production environment
 * @property {boolean} isTest - Flag indicating if running in test environment
 */

export interface IConfig {
  readonly bffUrl: string;
  readonly nodeEnv: NodeEnv;
  readonly isDevelopment: boolean;
  readonly isProduction: boolean;
  readonly isTest: boolean;
}

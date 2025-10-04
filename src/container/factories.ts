import { GetHealthUseCase } from '../application';
import { config } from '../config';
import { BffClient } from '../infrastructure';
import type { IBffClient, IConfig, IContainer, IGetHealthUseCase } from '../interfaces';
import { TOKENS } from './tokens';

/**
 * Creates and returns the application configuration object.
 *
 * @returns {IConfig} The configuration object for the application.
 */
export function createConfig(): IConfig {
  return config;
}

/**
 * Creates and returns an instance of `IBffClient` using the provided dependency injection container.
 *
 * @param c - The dependency injection container used to resolve required dependencies.
 * @returns An instance of `IBffClient` initialized with the resolved configuration.
 */

export function createBffClient(c: IContainer): IBffClient {
  return new BffClient(c.resolve(TOKENS.Config));
}

/**
 * Factory function to create an instance of `IGetHealthUseCase`.
 *
 * @param c - The dependency injection container used to resolve required dependencies.
 * @returns An instance of `IGetHealthUseCase` initialized with a `BffClient`.
 */

export function createHetHealthUseCase(c: IContainer): IGetHealthUseCase {
  return new GetHealthUseCase(c.resolve(TOKENS.BffClient));
}

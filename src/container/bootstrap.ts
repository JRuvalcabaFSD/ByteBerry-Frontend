import type { IContainer } from '../interfaces';
import { Container } from './container';
import { createBffClient, createConfig, createHetHealthUseCase } from './factories';
import { TOKENS } from './tokens';

/**
 * Initializes and configures the application's dependency injection container.
 *
 * Registers core services and use cases with their respective tokens, including configuration,
 * BFF client, and health check use case. Returns the fully configured container instance.
 *
 * @returns {IContainer} The initialized and configured dependency injection container.
 */

export function bootstrapContainer(): IContainer {
  const container = new Container();

  container.register(TOKENS.Config, createConfig);
  container.register(TOKENS.BffClient, createBffClient);
  container.register(TOKENS.GetHealthUseCase, createHetHealthUseCase);

  return container;
}

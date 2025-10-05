/**
 * A constant object containing unique symbols used as dependency injection tokens
 * throughout the application. Each property represents a specific service or configuration
 * that can be injected, ensuring type safety and avoiding naming collisions.
 *
 * @property {symbol} Config - Token for application configuration dependencies.
 * @property {symbol} BffClient - Token for the Backend-for-Frontend client service.
 * @property {symbol} GetHealthUseCase - Token for the use case handling health checks.
 */

export const TOKENS = {
  Config: Symbol.for('Config'),
  BffClient: Symbol.for('BffClient'),
  GetHealthUseCase: Symbol.for('GetHealthUseCase'),
} as const;

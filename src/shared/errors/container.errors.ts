/**
 * Error type thrown by the dependency injection container when a resolution or
 * binding operation fails.
 *
 * Typical causes include:
 * - Attempting to resolve an unregistered or unbound token.
 * - Cyclical or invalid dependency graphs.
 * - Misconfiguration during container setup.
 *
 * The included token property identifies the symbol (registration key) whose
 * resolution triggered the failure, enabling more actionable diagnostics and
 * logging.
 *
 * @remarks
 * Because this extends the built-in Error, it preserves the stack trace and
 * can be safely rethrown or wrapped. Use the token for targeted fallback or
 * recovery logic.
 *
 * @example
 * try {
 *   container.resolve(USER_REPOSITORY);
 * } catch (e) {
 *   if (e instanceof ContainerError) {
 *     logger.error(`Failed to resolve token: ${e.token.toString()}`, e);
 *   }
 * }
 *
 * @param message A human-readable description of the failure context.
 * @param token The symbol token whose resolution or registration caused the error.
 *
 * @public
 */

export class ContainerError extends Error {
  /**
   * Creates an instance of ContainerError.
   * @param {string} message
   * @param {symbol} token
   * @memberof ContainerError
   */

  constructor(
    message: string,
    public readonly token: symbol
  ) {
    super(message);
    this.name = this.constructor.name;
    Object.setPrototypeOf(this, ContainerError.prototype);
  }
}

/**
 * Error thrown when a requested service is not found in the dependency injection container.
 *
 * This error is typically thrown during service resolution when the container
 * cannot locate a service registered with the specified token.
 *
 * @example
 * ```typescript
 * const token = Symbol('MyService');
 * throw new ServiceNotFoundError(token);
 * ```
 */

export class ServiceNotFoundError extends ContainerError {
  /**
   * Creates an instance of ServiceNotFoundError.
   * @param {symbol} token
   * @memberof ServiceNotFoundError
   */

  constructor(token: symbol) {
    super(`Service not found in container: ${String(token)}`, token);
    this.name = this.constructor.name;
    Object.setPrototypeOf(this, ServiceNotFoundError.prototype);
  }
}

/**
 * Error thrown when attempting to register a service in the dependency injection container
 * under a token that is already associated with another service.
 *
 * This helps prevent accidental overwrites that could lead to hard-to-debug runtime issues.
 *
 * @remarks
 * If you intended to replace an existing service, ensure the container provides
 * an explicit API for overriding registrations rather than re-registering.
 *
 * Note: The prototype assignment in the constructor appears to reference a different
 * error type (`ServiceNotFoundError`), which may be unintentional.
 *
 * @example
 * ```ts
 * const token = Symbol('UserRepository');
 * container.register(token, new UserRepository());
 * // Later in the code:
 * container.register(token, new AlternateUserRepository()); // Throws ServiceAlreadyRegisteredError
 * ```
 *
 * @see ContainerError
 * @public
 */

export class ServiceAlreadyRegisteredError extends ContainerError {
  /**
   * Creates an instance of ServiceAlreadyRegisteredError.
   * @param {symbol} token
   * @memberof ServiceAlreadyRegisteredError
   */

  constructor(token: symbol) {
    super(`Service already registered in container: ${String(token)}`, token);
    this.name = this.constructor.name;
    Object.setPrototypeOf(this, ServiceNotFoundError.prototype);
  }
}

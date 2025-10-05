import type { IContainer, ServiceRegistration } from '../interfaces';
import { ServiceAlreadyRegisteredError, ServiceNotFoundError } from '../shared';

/**
 * Dependency Injection Container for managing service registrations and resolutions.
 *
 * The `Container` class implements the `IContainer` interface and provides methods to register and resolve services.
 * It supports both transient and singleton lifecycles:
 * - Transient: A new instance is created each time the service is resolved.
 * - Singleton: The same instance is returned for every resolution after the first.
 *
 * @example
 * ```typescript
 * const container = new Container();
 * container.register(MyServiceToken, (c) => new MyService());
 * const service = container.resolve(MyServiceToken);
 * ```
 *
 * @remarks
 * - Attempting to register a service with a token that is already registered will throw a `ServiceAlreadyRegisteredError`.
 * - Attempting to resolve a service that has not been registered will throw a `ServiceNotFoundError`.
 */

export class Container implements IContainer {
  private readonly service = new Map<symbol, ServiceRegistration>();

  /**
   * Registers a service with the container.
   *
   * @template T The type of the service being registered.
   * @param {symbol} token The unique symbol token to associate with the service.
   * @param {(container: IContainer) => T} factory A factory function that creates an instance of the service.
   * @throws {ServiceAlreadyRegisteredError} If a service is already registered with the given token.
   * @example
   * ```typescript
   * const token = Symbol('MyService');
   * container.register(token, (c) => new MyService());
   * ```
   * @memberof Container
   */

  public register<T>(token: symbol, factory: (container: IContainer) => T): void {
    if (this.service.has(token)) throw new ServiceAlreadyRegisteredError(token);
    this.service.set(token, { factory, lifecycle: 'transient' });
  }

  /**
   * Registers a singleton service with the container.
   *
   * @template T The type of the service being registered.
   * @throws {ServiceAlreadyRegisteredError} If a service is already registered with the given token.
   * @example
   * ```typescript
   * const token = Symbol('MyService');
   * container.registerSingleton(token, (c) => new MyService());
   * ```
   * @param {symbol} token
   * @param {(container: IContainer) => T} factory
   * @memberof Container
   */

  public registerSingleton<T>(token: symbol, factory: (container: IContainer) => T): void {
    if (this.service.has(token)) throw new ServiceAlreadyRegisteredError(token);
    this.service.set(token, { factory, lifecycle: 'singleton' });
  }

  /**
   * Resolves a service from the container.
   *
   * @template T The type of the service being resolved.
   * @param {symbol} token The unique symbol token associated with the service.
   * @return {*}  {T} The resolved service instance.
   * @throws {ServiceNotFoundError} If no service is registered with the given token.
   * @example
   * ```typescript
   * const token = Symbol('MyService');
   * const service = container.resolve<MyService>(token);
   * ```
   * @memberof Container
   */

  public resolve<T>(token: symbol): T {
    const registration = this.service.get(token);

    if (!registration) throw new ServiceNotFoundError(token);
    if (registration.lifecycle === 'singleton') {
      if (!registration.instance) {
        registration.instance = registration.factory(this);
      }
      return registration.instance as T;
    }
    return registration.factory(this) as T;
  }
}

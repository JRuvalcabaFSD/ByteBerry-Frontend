/**
 * Defines the lifetime management strategy for a registered dependency within the container.
 *
 * Supported values:
 * - 'transient': A new instance is created every time the dependency is resolved.
 * - 'singleton': A single shared instance is created once and reused for all resolutions.
 *
 * Use this type to specify how services should be instantiated and cached by the container.
 *
 * Example:
 * const registration = {
 *   token: ServiceClass,
 *   useClass: ServiceClass,
 *   lifecycle: 'singleton' as LifecycleType
 * };
 */
export type LifecycleType = 'transient' | 'singleton';

/**
 * Represents a service registration within a dependency injection container.
 *
 * @template T The type of the service instance.
 * @property factory A function that creates an instance of the service, given the container.
 * @property lifecycle The lifecycle type that determines how the service instance is managed (e.g., singleton, transient).
 * @property [instance] An optional cached instance of the service, used for singleton lifecycles.
 */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface ServiceRegistration<T = any> {
  factory: (container: IContainer) => T;
  lifecycle: LifecycleType;
  instance?: T;
}

/**
 * Represents a dependency injection container interface for registering and resolving dependencies.
 *
 * @interface IContainer
 */

export interface IContainer {
  register<T>(token: symbol, factory: (container: IContainer) => T): void;
  registerSingleton<T>(token: symbol, factory: (container: IContainer) => T): void;
  resolve<T>(token: symbol): T;
}

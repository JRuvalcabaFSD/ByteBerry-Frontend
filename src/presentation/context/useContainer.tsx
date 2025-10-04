import { useContext } from 'react';
import type { IContainer } from '../../interfaces';
import { ContainerContext } from './ContainerContext';

/**
 * Custom React hook to access the dependency injection container context.
 *
 * @returns {IContainer} The current container instance from the context.
 * @throws {Error} If the hook is used outside of a `ContainerProvider`.
 *
 * @example
 * const container = useContainer();
 * const myService = container.resolve(MyService);
 */

export function useContainer(): IContainer {
  const context = useContext(ContainerContext);

  if (!context) throw new Error('useContainer must be used within ContainerProvider');

  return context;
}

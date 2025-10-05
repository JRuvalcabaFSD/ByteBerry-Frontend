import type { ReactNode } from 'react';
import type { IContainer } from '../../interfaces';
import { ContainerContext } from './ContainerContext';

/**
 * Props for the ContainerProvider component.
 *
 * @property container - An instance of `IContainer` that provides dependency injection or shared services to child components.
 * @property children - The React node(s) that will be rendered within the provider context.
 */

export interface ContainerProviderProps {
  container: IContainer;
  children: ReactNode;
}

/**
 * Provides a dependency injection container to the React component tree via context.
 *
 * @param props.container - The dependency injection container instance to be provided.
 * @param props.children - The child components that will have access to the container context.
 * @returns A React context provider that supplies the container to its descendants.
 */

export function ContainerProvider({ container, children }: ContainerProviderProps) {
  return <ContainerContext.Provider value={container}>{children}</ContainerContext.Provider>;
}

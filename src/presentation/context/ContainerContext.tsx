import { createContext } from 'react';
import type { IContainer } from '../../interfaces';

/**
 * React context for providing dependency injection container throughout the application.
 *
 * This context holds an instance of the IoC container that manages application dependencies
 * and services. Components can consume this context to access registered services without
 * direct instantiation.
 *
 * @example
 * ```tsx
 * const container = useContext(ContainerContext);
 * const userService = container?.get<IUserService>('UserService');
 * ```
 *
 * @see IContainer
 */

export const ContainerContext = createContext<IContainer | null>(null);

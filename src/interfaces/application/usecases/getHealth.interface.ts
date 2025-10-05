import type { IHealthResponse } from '../..';

/**
 * Interface for the use case responsible for retrieving the application's health status.
 *
 * @remarks
 * Implementations of this interface should provide logic to check and return the current health state of the application.
 *
 * @method execute
 * Executes the health check use case.
 * @returns A promise that resolves to an {@link IHealthResponse} containing the application's health information.
 */

export interface IGetHealthUseCase {
  /**
   * Executes the health check use case.
   *
   * @return {*}  {Promise<IHealthResponse>} A promise that resolves to an {@link IHealthResponse} containing the application's health information.
   * @memberof IGetHealthUseCase
   */

  execute(): Promise<IHealthResponse>;
}

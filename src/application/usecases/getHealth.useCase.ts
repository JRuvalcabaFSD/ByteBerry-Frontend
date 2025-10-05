import type { IBffClient, IGetHealthUseCase, IHealthResponse } from '../../interfaces';

/**
 * Use case for retrieving the health status of the application.
 *
 * This class implements the `IGetHealthUseCase` interface and is responsible for
 * invoking the BFF client to fetch the current health status.
 *
 * @remarks
 * The health status is typically used for monitoring and readiness checks.
 *
 * @example
 * const useCase = new GetHealthUseCase(bffClient);
 * const health = await useCase.execute();
 *
 * @public
 */

export class GetHealthUseCase implements IGetHealthUseCase {
  /**
   * Creates an instance of GetHealthUseCase.
   * @param {IBffClient} bffClient
   * @memberof GetHealthUseCase
   */

  constructor(private readonly bffClient: IBffClient) {}

  /**
   * Executes the health check use case by invoking the BFF client's fetchHealth method.
   *
   * @returns A promise that resolves to an {@link IHealthResponse} containing the health status.
   */

  public async execute(): Promise<IHealthResponse> {
    return await this.bffClient.fetchHealth();
  }
}

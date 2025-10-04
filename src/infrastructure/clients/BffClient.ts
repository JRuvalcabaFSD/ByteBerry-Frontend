import type { IBffClient, IConfig, IHealthResponse } from '../../interfaces';
import { FetchError } from '../../shared';

/**
 * Client for interacting with the Backend For Frontend (BFF) service.
 *
 * @implements {IBffClient}
 *
 * @remarks
 * This class provides methods to communicate with the BFF API, such as checking the health status.
 *
 * @example
 * ```typescript
 * const client = new BffClient({ bffUrl: 'https://api.example.com' });
 * const health = await client.fetchHealth();
 * ```
 *
 * @param config - Configuration object containing the BFF base URL.
 */

export class BffClient implements IBffClient {
  private readonly baseUrl: string;

  /**
   * Creates an instance of BffClient.
   * @param {IConfig} config
   * @memberof BffClient
   */

  constructor(config: IConfig) {
    this.baseUrl = config.bffUrl;
  }

  /**
   * Fetches the health status from the BFF service.
   *
   * @return {*}  {Promise<IHealthResponse>} A promise that resolves to the health response.
   * @memberof BffClient
   */

  public async fetchHealth(): Promise<IHealthResponse> {
    const url = `${this.baseUrl}/health`;

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new FetchError(`Failed to fetch health: ${response.statusText}`, response.status, url);
      }

      const data = await response.json();
      return data as IHealthResponse;
    } catch (error) {
      if (error instanceof FetchError) {
        throw error;
      }

      throw new FetchError(`Network error while fetching health: ${error instanceof Error ? error.message : 'Unknown error'}`, undefined, url);
    }
  }
}

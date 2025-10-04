/**
 * Represents the health status response of a service.
 *
 * @property status - The current health status of the service. Can be either 'healthy' or 'unhealthy'.
 * @property service - The name or identifier of the service being reported.
 * @property version - The version of the service.
 * @property timestamp - The ISO timestamp indicating when the health status was reported.
 * @property [uptime] - (Optional) The uptime duration of the service, typically formatted as a string.
 */

export interface IHealthResponse {
  status: 'healthy' | 'unhealthy';
  service: string;
  version: string;
  timestamp: string;
  uptime?: string;
}

/**
 * Interface representing a client for communicating with the Backend For Frontend (BFF) service.
 *
 * @remarks
 * This interface defines methods for interacting with the BFF, such as health checks.
 *
 * @interface
 */

export interface IBffClient {
  /**
   * Fetches the health status of the BFF service.
   *
   * @return {*}  {Promise<IHealthResponse>} A promise that resolves to an IHealthResponse object containing the health status of the BFF service.
   * @memberof IBffClient
   */

  fetchHealth(): Promise<IHealthResponse>;
}

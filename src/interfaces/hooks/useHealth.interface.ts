import type { IHealthResponse } from '../infrastructure/clients/bffClient.interface';

/**
 * Represents the result of a health status hook.
 *
 * @property {IHealthResponse | null} date - The health response data or null if not available.
 * @property {boolean} loading - Indicates whether the health status is currently being loaded.
 * @property {Error | null} error - The error encountered during fetching, or null if no error occurred.
 * @property {() => Promise<void>} refetch - Function to manually refetch the health status.
 */

export interface IUseHealthStatusResult {
  data: IHealthResponse | null;
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

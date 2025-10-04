import { useCallback, useEffect, useState } from 'react';
import type { IGetHealthUseCase, IHealthResponse, IUseHealthStatusResult } from '../../interfaces';
import { useContainer } from '../context/useContainer';
import { TOKENS } from '../../container';

/**
 * Custom hook for managing health status data with automatic fetching and refresh capabilities.
 *
 * @param autoFetch - Whether to automatically start in loading state. Defaults to true.
 * @param refreshInterval - Interval in milliseconds for automatic refresh. Set to 0 to disable. Defaults to 0.
 *
 * @returns An object containing:
 * - `data`: The health response data or null if not yet fetched
 * - `loading`: Boolean indicating if a request is in progress
 * - `error`: Any error that occurred during fetching, or null
 * - `refetch`: Function to manually trigger a new health status fetch
 *
 * @example
 * ```typescript
 * // Basic usage with auto-fetch
 * const { data, loading, error } = useHealthStatus();
 *
 * // With manual refresh every 30 seconds
 * const { data, loading, error, refetch } = useHealthStatus(true, 30000);
 *
 * // Manual fetch only
 * const { data, loading, error, refetch } = useHealthStatus(false);
 * ```
 */

export function useHealthStatus(autoFetch = true, refreshInterval = 0): IUseHealthStatusResult {
  const container = useContainer();
  const [data, setData] = useState<IHealthResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(autoFetch);
  const [error, setError] = useState<Error | null>(null);

  const fetchHealth = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const useCase = container.resolve<IGetHealthUseCase>(TOKENS.GetHealthUseCase);
      const response = await useCase.execute();
      setData(response);
    } catch (error) {
      setError(error instanceof Error ? error : new Error('Unknown error'));
    } finally {
      setLoading(false);
    }
  }, [container]);

  useEffect(() => {
    if (refreshInterval > 0) {
      const intervalId = setInterval(() => {
        fetchHealth();
      }, refreshInterval);

      return () => clearInterval(intervalId);
    }
  }, [refreshInterval, fetchHealth]);

  return { data, loading, error, refetch: fetchHealth };
}

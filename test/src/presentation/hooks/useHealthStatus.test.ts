import { describe, expect, beforeEach, vi } from 'vitest';
import type { IGetHealthUseCase, IHealthResponse } from '../../../../src/interfaces';
import { createTestContainer, renderHook, waitFor } from '../../../test-utils';
import { TOKENS } from '../../../../src/container';
import React from 'react';
import { ContainerProvider, useHealthStatus } from '../../../../src/presentation';

describe('useHealthStatus Hook', () => {
  const mockHealthResponse: IHealthResponse = {
    status: 'healthy',
    service: 'bff',
    version: '1.0.0',
    timestamp: '2025-01-01T00:00:00Z',
    uptime: 3600,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should fetch health data on mount when autofetch is true', async () => {
    const mockExecute = vi.fn().mockResolvedValue(mockHealthResponse);
    const mockUseCase: IGetHealthUseCase = {
      execute: mockExecute,
    };

    const container = createTestContainer();
    container.register(TOKENS.GetHealthUseCase, () => mockUseCase);

    const wrapper = ({ children }: { children: React.ReactNode }) => React.createElement(ContainerProvider, { children, container });

    const { result } = renderHook(() => useHealthStatus(true, 0), { wrapper });

    expect(result.current.loading).toBeTruthy();
    expect(result.current.data).toBeNull();

    await waitFor(() => {
      expect(result.current.loading).toBeFalsy();
    });

    expect(mockExecute).toHaveBeenCalledOnce();
    expect(result.current.data).toEqual(mockHealthResponse);
    expect(result.current.error).toBeNull();
  });
  it('should not fetch on mount when autofetch is false', () => {
    const mockExecute = vi.fn();
    const mockUseCase: IGetHealthUseCase = {
      execute: mockExecute,
    };

    const container = createTestContainer();
    container.register(TOKENS.GetHealthUseCase, () => mockUseCase);

    const wrapper = ({ children }: { children: React.ReactNode }) => React.createElement(ContainerProvider, { children, container });

    const { result } = renderHook(() => useHealthStatus(false, 0), { wrapper });

    expect(result.current.loading).toBeFalsy();
    expect(result.current.data).toBeNull();
    expect(mockExecute).not.toHaveBeenCalled();
  });
  it('should handle errors during fetch', async () => {
    const mockError = new Error('Network error');
    const mockExecute = vi.fn().mockRejectedValue(mockError);
    const mockUseCase: IGetHealthUseCase = {
      execute: mockExecute,
    };

    const container = createTestContainer();
    container.register(TOKENS.GetHealthUseCase, () => mockUseCase);
    const wrapper = ({ children }: { children: React.ReactNode }) => React.createElement(ContainerProvider, { children, container });
    const { result } = renderHook(() => useHealthStatus(true, 0), { wrapper });

    await waitFor(() => {
      expect(result.current.loading).toBeFalsy();
    });

    expect(result.current.error).toEqual(mockError);
    expect(result.current.data).toBeNull();
  });
});

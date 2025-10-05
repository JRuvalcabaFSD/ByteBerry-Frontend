import { describe, beforeEach, it, vi, expect } from 'vitest';
import type { IGetHealthUseCase, IHealthResponse } from '../../../../src/interfaces';
import { createTestContainer, render, screen, waitFor } from '../../../test-utils';
import { TOKENS } from '../../../../src/container';
import { HealthDashboard } from '../../../../src/presentation';

describe('HealthDashboard Component', () => {
  const mockHealthResponse: IHealthResponse = {
    status: 'healthy',
    service: 'bff',
    version: '1.0.0',
    timestamp: '2025-01-01T12:00:00Z',
    uptime: 3600,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render loading state initially', () => {
    const mockExecute = vi.fn().mockImplementation(() => new Promise(() => {}));
    const mockUsecase: IGetHealthUseCase = { execute: mockExecute };
    const container = createTestContainer();
    container.register(TOKENS.GetHealthUseCase, () => mockUsecase);

    render(<HealthDashboard />, { testContainer: container });

    expect(screen.getByText('Loading health status...')).toBeInTheDocument();
  });
  it('should render health data when fetched successfully', async () => {
    const mockExecute = vi.fn().mockResolvedValue(mockHealthResponse);
    const mockUsecase: IGetHealthUseCase = { execute: mockExecute };
    const container = createTestContainer();
    container.register(TOKENS.GetHealthUseCase, () => mockUsecase);

    render(<HealthDashboard />, { testContainer: container });

    await waitFor(() => {
      expect(screen.getByText('System HealthStatus')).toBeInTheDocument();
    });

    expect(screen.getByText('healthy')).toBeInTheDocument();
    expect(screen.getByText('bff')).toBeInTheDocument();
    expect(screen.getByText('1.0.0')).toBeInTheDocument();
  });
  it('should render error state when fetch fails', async () => {
    const mockError = new Error('Network error');
    const mockExecute = vi.fn().mockRejectedValue(mockError);
    const mockUseCase: IGetHealthUseCase = { execute: mockExecute };

    const container = createTestContainer();
    container.register(TOKENS.GetHealthUseCase, () => mockUseCase);

    render(<HealthDashboard />, { testContainer: container });

    await waitFor(() => {
      expect(screen.getByText('Failed to fetch health status')).toBeInTheDocument();
    });

    expect(screen.getByText('Network error')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /try again/i })).toBeInTheDocument();
  });
});

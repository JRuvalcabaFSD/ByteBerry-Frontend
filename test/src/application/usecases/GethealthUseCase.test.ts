import { GetHealthUseCase } from '../../../../src/application';
import type { IBffClient, IHealthResponse } from '../../../../src/interfaces';

describe('GetHealthUseCase', () => {
  const mockHealthResponse: IHealthResponse = {
    status: 'healthy',
    service: 'bff',
    version: '1.0.0',
    timestamp: '2025-01-01T00:00:00Z',
    uptime: 3600,
  };

  it('should execute and return health response from BffClient', async () => {
    const mockBffClient: IBffClient = {
      fetchHealth: vi.fn().mockResolvedValue(mockHealthResponse),
    };

    const useCase = new GetHealthUseCase(mockBffClient);
    const result = await useCase.execute();

    expect(mockBffClient.fetchHealth).toHaveBeenCalledOnce();
    expect(result).toEqual(mockHealthResponse);
  });
  it('should propagate errors from BffClient', async () => {
    const mockError = new Error('Network error');
    const mockBffClient: IBffClient = {
      fetchHealth: vi.fn().mockRejectedValue(mockError),
    };

    const useCase = new GetHealthUseCase(mockBffClient);

    await expect(useCase.execute()).rejects.toThrow('Network error');
  });
});

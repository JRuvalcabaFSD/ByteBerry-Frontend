import { describe } from 'vitest';
import { BffClient } from '../../../../src/infrastructure';
import type { IConfig } from '../../../../src/interfaces';
import { FetchError } from '../../../../src/shared';

describe('BffClient', () => {
  let client: BffClient;

  const mockConfig: IConfig = {
    bffUrl: 'http://localhost:4002',
    nodeEnv: 'test',
    isDevelopment: false,
    isProduction: false,
    isTest: true,
  };

  beforeEach(() => {
    client = new BffClient(mockConfig);
    global.fetch = vi.fn();
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it('should fetch health successfully', async () => {
    const mockResponse = {
      status: 'healthy',
      service: 'bff',
      version: '1.0.0',
      timestamp: '2025-01-01T00:00:00Z',
    };

    (global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({ ok: true, json: async () => mockResponse });

    const result = await client.fetchHealth();

    expect(result).toEqual(mockResponse);
  });
  it('should throw FetchError on HTTP error', async () => {
    (global.fetch as ReturnType<typeof vi.fn>).mockResolvedValue({ ok: false, status: 500, statusText: 'Internal Server Error' });

    await expect(client.fetchHealth()).rejects.toThrow(FetchError);
  });
});

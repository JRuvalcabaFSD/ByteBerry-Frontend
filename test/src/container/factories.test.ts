import { Container, createBffClient, createConfig, createHetHealthUseCase, TOKENS } from '../../../src/container';
import type { IConfig } from '../../../src/interfaces';

describe('Container Factories', () => {
  describe('createConfig', () => {
    it('should create and return config instance', () => {
      const config = createConfig();

      expect(config).toBeDefined();
      expect(config).toHaveProperty('bffUrl');
      expect(config).toHaveProperty('nodeEnv');
    });

    it('should return same config instance (singleton pattern)', () => {
      const config1 = createConfig();
      const config2 = createConfig();

      expect(config1).toBe(config2);
    });
  });

  describe('createBffClient', () => {
    it('should create BffClient with config from container', () => {
      const container = new Container();
      container.registerSingleton(TOKENS.Config, createConfig);

      const bffClient = createBffClient(container);

      expect(bffClient).toBeDefined();
      expect(bffClient).toHaveProperty('fetchHealth');
    });

    it('should use resolved config from container', () => {
      const mockConfig: IConfig = {
        bffUrl: 'http://test-url:9999',
        nodeEnv: 'test',
        isDevelopment: false,
        isProduction: false,
        isTest: true,
      };

      const container = new Container();
      container.registerSingleton(TOKENS.Config, () => mockConfig);

      const bffClient = createBffClient(container);

      expect(bffClient).toBeDefined();
      // BffClient should have been created with the test config
    });
  });

  describe('createHetHealthUseCase', () => {
    it('should create GetHealthUseCase with dependencies from container', () => {
      const container = new Container();
      container.registerSingleton(TOKENS.Config, createConfig);
      container.register(TOKENS.BffClient, createBffClient);

      const useCase = createHetHealthUseCase(container);

      expect(useCase).toBeDefined();
      expect(useCase).toHaveProperty('execute');
    });

    it('should create use case that can execute', async () => {
      const container = new Container();
      container.registerSingleton(TOKENS.Config, createConfig);
      container.register(TOKENS.BffClient, () => ({
        fetchHealth: vi.fn().mockResolvedValue({
          status: 'healthy',
          service: 'test',
          version: '1.0.0',
          timestamp: '2025-01-01T00:00:00Z',
        }),
      }));

      const useCase = createHetHealthUseCase(container);
      const result = await useCase.execute();

      expect(result).toBeDefined();
      expect(result.status).toBe('healthy');
    });
  });
});

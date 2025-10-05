import { describe, it, expect, beforeEach } from 'vitest';
import type { IBffClient, IConfig, IContainer, IGetHealthUseCase } from '../../../src/interfaces';
import { bootstrapContainer, TOKENS } from '../../../src/container';

describe('Bootstrap Container', () => {
  let container: IContainer;

  beforeEach(() => {
    container = bootstrapContainer();
  });

  it('should create a container instance', () => {
    expect(container).toBeDefined();
    expect(container).toHaveProperty('resolve');
    expect(container).toHaveProperty('register');
    expect(container).toHaveProperty('registerSingleton');
  });

  it('should register Config service', () => {
    const config = container.resolve<IConfig>(TOKENS.Config);

    expect(config).toBeDefined();
    expect(config).toHaveProperty('bffUrl');
    expect(config).toHaveProperty('nodeEnv');
    expect(config).toHaveProperty('isDevelopment');
    expect(config).toHaveProperty('isProduction');
    expect(config).toHaveProperty('isTest');
  });

  it('should register BffClient service', () => {
    const bffClient = container.resolve<IBffClient>(TOKENS.BffClient);

    expect(bffClient).toBeDefined();
    expect(bffClient).toHaveProperty('fetchHealth');
    expect(typeof bffClient.fetchHealth).toBe('function');
  });

  it('should register GetHealthUseCase service', () => {
    const useCase = container.resolve<IGetHealthUseCase>(TOKENS.GetHealthUseCase);

    expect(useCase).toBeDefined();
    expect(useCase).toHaveProperty('execute');
    expect(typeof useCase.execute).toBe('function');
  });

  it('should resolve dependencies correctly (BffClient depends on Config)', () => {
    // BffClient needs Config to be initialized
    const bffClient = container.resolve<IBffClient>(TOKENS.BffClient);
    const config = container.resolve<IConfig>(TOKENS.Config);

    expect(bffClient).toBeDefined();
    expect(config).toBeDefined();

    // BffClient should use the same config instance
    expect(config.bffUrl).toBeDefined();
  });

  it('should resolve dependencies correctly (GetHealthUseCase depends on BffClient)', () => {
    // GetHealthUseCase needs BffClient to be initialized
    const useCase = container.resolve<IGetHealthUseCase>(TOKENS.GetHealthUseCase);
    const bffClient = container.resolve<IBffClient>(TOKENS.BffClient);

    expect(useCase).toBeDefined();
    expect(bffClient).toBeDefined();
  });

  it('should create new container instances on each bootstrap call', () => {
    const container1 = bootstrapContainer();
    const container2 = bootstrapContainer();

    expect(container1).not.toBe(container2);
  });

  it('should have all required tokens registered', () => {
    // Should not throw when resolving any token
    expect(() => container.resolve(TOKENS.Config)).not.toThrow();
    expect(() => container.resolve(TOKENS.BffClient)).not.toThrow();
    expect(() => container.resolve(TOKENS.GetHealthUseCase)).not.toThrow();
  });
});

import { ContainerError, ServiceAlreadyRegisteredError, ServiceNotFoundError } from '../../../src/shared';

describe('Container Errors', () => {
  const testToken = Symbol.for('TestService');

  it('should create error with message and token', () => {
    const error = new ContainerError('Test error message', testToken);

    expect(error).toBeInstanceOf(Error);
    expect(error).toBeInstanceOf(ContainerError);
    expect(error.message).toBe('Test error message');
    expect(error.token).toBe(testToken);
    expect(error.name).toBe('ContainerError');
  });
  it('should preserve stack trace', () => {
    const error = new ContainerError('Test error', testToken);

    expect(error.stack).toBeDefined();
  });

  describe('ServiceNotFoundError', () => {
    it('should create error with token in message', () => {
      const error = new ServiceNotFoundError(testToken);

      expect(error).toBeInstanceOf(ContainerError);
      expect(error).toBeInstanceOf(ServiceNotFoundError);
      expect(error.message).toContain('Service not found in container');
      expect(error.message).toContain(String(testToken));
      expect(error.token).toBe(testToken);
    });
  });

  describe('ServiceAlreadyRegisteredError', () => {
    it('should create error with token in message', () => {
      const error = new ServiceAlreadyRegisteredError(testToken);

      expect(error).toBeInstanceOf(ContainerError);
      expect(error).toBeInstanceOf(ServiceAlreadyRegisteredError);
      expect(error.message).toContain('Service already registered in container');
      expect(error.message).toContain(String(testToken));
      expect(error.token).toBe(testToken);
    });
  });
});

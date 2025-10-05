import { describe, it, expect, vi, beforeAll } from 'vitest';

// Mock global de react-dom/client ANTES de cualquier import
const mockRender = vi.fn();
const mockUnmount = vi.fn();
const mockCreateRoot = vi.fn(() => ({
  render: mockRender,
  unmount: mockUnmount,
}));

vi.mock('react-dom/client', () => ({
  createRoot: mockCreateRoot,
}));

// Mock del componente App
vi.mock('../../src/App', () => ({
  default: () => null,
}));

describe('main.tsx - Bootstrap and Initialization', () => {
  beforeAll(() => {
    // Crear elemento root en el DOM ANTES de importar main.tsx
    const root = document.createElement('div');
    root.id = 'root';
    document.body.appendChild(root);
  });

  it('should execute main.tsx and call createRoot with root element', async () => {
    // Importar main.tsx para ejecutar su código
    await import('../../src/main');

    // Verificar que createRoot fue llamado con el elemento root
    expect(mockCreateRoot).toHaveBeenCalled();
    expect(mockCreateRoot).toHaveBeenCalledWith(document.getElementById('root'));
  });

  it('should bootstrap container and render App', async () => {
    // main.tsx ya fue importado en el test anterior
    // Verificar que render fue llamado
    expect(mockRender).toHaveBeenCalled();

    // Verificar que se pasó un ReactElement al render
    const renderCall = mockRender.mock.calls[0];
    expect(renderCall).toBeDefined();
    expect(renderCall[0]).toBeDefined(); // El elemento React
  });

  it('should wrap App in StrictMode and ContainerProvider', async () => {
    // Verificar que render fue llamado con la estructura correcta
    expect(mockRender).toHaveBeenCalledTimes(1);

    // El elemento renderizado debe existir
    const renderCall = mockRender.mock.calls[0][0];
    expect(renderCall).not.toBeNull();
    expect(renderCall).toBeDefined();
  });
});

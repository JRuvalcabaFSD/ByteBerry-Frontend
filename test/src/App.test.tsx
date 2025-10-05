import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { ContainerProvider } from '../../src/presentation';
import { createTestContainer } from '../test-utils';
import { TOKENS } from '../../src/container';
import type { IGetHealthUseCase } from '../../src/interfaces';
import App from '../../src/App';

describe('App Component', () => {
  it('should render Home page by default', () => {
    const container = createTestContainer();

    // Renderizar el componente App directamente (ya tiene BrowserRouter interno)
    render(
      <ContainerProvider container={container}>
        <App />
      </ContainerProvider>
    );

    expect(screen.getByText('ByteBerry Frontend')).toBeInTheDocument();
    expect(screen.getByText('Sistema de Gestión de Gastos')).toBeInTheDocument();
  });

  it('should render HealthDashboard when navigating to /health-ui', async () => {
    const mockExecute = vi.fn().mockImplementation(
      () => new Promise(() => {}) // Never resolves - loading state
    );
    const mockUseCase: IGetHealthUseCase = { execute: mockExecute };

    const container = createTestContainer();
    container.register(TOKENS.GetHealthUseCase, () => mockUseCase);

    // Configurar la ruta inicial
    window.history.pushState({}, 'Test page', '/health-ui');

    render(
      <ContainerProvider container={container}>
        <App />
      </ContainerProvider>
    );

    await waitFor(() => {
      expect(screen.getByText('Loading health status...')).toBeInTheDocument();
    });
  });

  it('should redirect to home for unknown routes', async () => {
    const container = createTestContainer();

    // Configurar ruta desconocida
    window.history.pushState({}, 'Test page', '/unknown-route');

    render(
      <ContainerProvider container={container}>
        <App />
      </ContainerProvider>
    );

    await waitFor(() => {
      expect(screen.getByText('ByteBerry Frontend')).toBeInTheDocument();
    });
  });
});

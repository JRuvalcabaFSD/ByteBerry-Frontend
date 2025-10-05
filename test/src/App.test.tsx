import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ContainerProvider } from '../../src/presentation';
import { createTestContainer } from '../test-utils';
import { TOKENS } from '../../src/container';
import type { IGetHealthUseCase } from '../../src/interfaces';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Home, HealthDashboard } from '../../src/presentation';

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/health-ui" element={<HealthDashboard />} />
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>
);

describe('App Component', () => {
  it('should render Home page by default', () => {
    const container = createTestContainer();

    render(
      <ContainerProvider container={container}>
        <MemoryRouter initialEntries={['/']}>
          <AppRoutes />
        </MemoryRouter>
      </ContainerProvider>
    );

    expect(screen.getByText('ByteBerry Frontend')).toBeInTheDocument();
    expect(screen.getByText('Sistema de Gestión de Gastos')).toBeInTheDocument();
  });

  it('should render HealthDashboard when navigating to /health-ui', () => {
    const mockExecute = vi.fn().mockImplementation(
      () => new Promise(() => {}) // Never resolves - loading state
    );
    const mockUseCase: IGetHealthUseCase = { execute: mockExecute };

    const container = createTestContainer();
    container.register(TOKENS.GetHealthUseCase, () => mockUseCase);

    render(
      <ContainerProvider container={container}>
        <MemoryRouter initialEntries={['/health-ui']}>
          <AppRoutes />
        </MemoryRouter>
      </ContainerProvider>
    );

    // Should show loading state initially
    expect(screen.getByText('Loading health status...')).toBeInTheDocument();
  });

  it('should redirect to home for unknown routes', () => {
    const container = createTestContainer();

    render(
      <ContainerProvider container={container}>
        <MemoryRouter initialEntries={['/unknown-route']}>
          <AppRoutes />
        </MemoryRouter>
      </ContainerProvider>
    );

    expect(screen.getByText('ByteBerry Frontend')).toBeInTheDocument();
  });
});

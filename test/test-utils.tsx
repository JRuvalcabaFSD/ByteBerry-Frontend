import { render as rtlRender, type RenderOptions } from '@testing-library/react';
import { Container, TOKENS } from '../src/container';
import type { IContainer } from '../src/interfaces';
import type { ReactElement } from 'react';
import type React from 'react';
import { ContainerProvider } from '../src/presentation';
import { BrowserRouter } from 'react-router-dom';

export function createTestContainer(): IContainer {
  const container = new Container();

  container.registerSingleton(TOKENS.Config, () => ({
    bffUrl: 'http://localhost:4002',
    nodeEnv: 'test' as const,
    isDevelopment: false,
    isProduction: false,
    isTest: true,
  }));

  return container;
}

interface CustomRenderOptions extends Omit<RenderOptions, 'wrapper'> {
  testContainer?: IContainer;
  initialRoute?: string;
}

export function renderWithProviders(
  ui: ReactElement,
  { testContainer = createTestContainer(), initialRoute = '/', ...renderOptions }: CustomRenderOptions = {}
) {
  if (initialRoute !== '/') {
    window.history.pushState({}, 'Test page', initialRoute);
  }

  function Wrapper({ children }: { children: React.ReactNode }) {
    return (
      <ContainerProvider container={testContainer}>
        <BrowserRouter>{children}</BrowserRouter>
      </ContainerProvider>
    );
  }

  return {
    testContainer,
    ...rtlRender(ui, { wrapper: Wrapper, ...renderOptions }),
  };
}

// eslint-disable-next-line react-refresh/only-export-components
export * from '@testing-library/react';
export { renderWithProviders as render };

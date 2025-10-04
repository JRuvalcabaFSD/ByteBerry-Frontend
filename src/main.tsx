import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ContainerProvider } from './presentation';
import { bootstrapContainer } from './container';
import './index.css';

const container = bootstrapContainer();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ContainerProvider container={container}>
      <div>
        <h1>ByteBerry Frontend</h1>
        <p>Sistema de Gestión de Gastos</p>
      </div>
    </ContainerProvider>
  </StrictMode>
);

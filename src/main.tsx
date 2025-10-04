import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ContainerProvider } from './presentation';
import { bootstrapContainer } from './container';
import './index.css';
import App from './App';

const container = bootstrapContainer();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ContainerProvider container={container}>
      <App />
    </ContainerProvider>
  </StrictMode>
);

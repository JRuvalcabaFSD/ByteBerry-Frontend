import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <div>
      <h1>ByteBerry Frontend</h1>
      <p>Sistema de Gestión de Gastos</p>
    </div>
  </StrictMode>
);

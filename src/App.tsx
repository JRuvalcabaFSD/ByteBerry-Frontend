import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { HealthDashboard, Home } from './presentation';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/health-ui" element={<HealthDashboard />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

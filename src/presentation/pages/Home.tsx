import { Link } from 'react-router-dom';
import './Home.css';

export function Home() {
  return (
    <div className="home-page">
      <div className="home-content">
        <header className="home-header">
          <h1>ByteBerry Frontend</h1>
          <p className="subtitle">Sistema de Gestión de Gastos</p>
        </header>

        <nav className="home-nav">
          <Link to="/health-ui" className="nav-card">
            <div className="card-icon">🏥</div>
            <h3>Health Dashboard</h3>
            <p>Monitor system health status</p>
            <span className="card-arrow"></span>
          </Link>

          <div className="nav-card disabled">
            <div className="card-icon">💰</div>
            <h2>Expenses</h2>
            <p>Manage your expenses</p>
            <span className="card-badge">Coming Soon</span>
          </div>

          <div className="nav-card disabled">
            <div className="card-icon">👤</div>
            <h3>Profile</h3>
            <p>View and edit your profile</p>
            <span className="card-badge">Coming Soon</span>
          </div>
        </nav>
        <footer className="home-footer">
          <p>
            <small>Powered by React + Vite | Clean Architecture + Di Container</small>
          </p>
        </footer>
      </div>
    </div>
  );
}

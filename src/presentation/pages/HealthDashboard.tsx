import { Link } from 'react-router-dom';
import { useHealthStatus } from '../hooks/useHealthStatus';
import './HealthDashboard.css';

export function HealthDashboard() {
  const { data, loading, error, refetch } = useHealthStatus(true, 30000);
  if (loading && !data) return <LoadingState />;
  if (error) return <ErrorState error={error} refetch={refetch} />;
  if (!data) return <NoDataState refetch={refetch} />;
  return (
    <div className="health-dashboard">
      <div className="dashboard-container">
        <Link to="/" className="back-link">
          ← Back to Home
        </Link>

        <div className="health-card">
          <header className="health-header">
            <h1>System HealthStatus</h1>
            <div className={`status-badge ${data.status}`}>
              <span className="status-indicador">{data.status}</span>
            </div>
          </header>

          <div className="health-info">
            <InfoRow label="Service" value={data.service} />
            <InfoRow label="Service" value={data.version} />
            <InfoRow label="Timestamp" value={formatDate(data.timestamp)} />
            {data.uptime !== undefined && <InfoRow label="Uptime" value={formatUptime(data.uptime)} />}
          </div>

          <footer className="health-footer">
            <button onClick={() => refetch()} disabled={loading}>
              {loading ? '🔄 Refreshing...' : '🔄 Refresh'}
            </button>
            <p className="auto-refresh-info">
              <small>Auto-refresh every 30 seconds</small>
            </p>
          </footer>
        </div>
      </div>
    </div>
  );
}

function LoadingState() {
  return (
    <div className="health-dashboard">
      <div className="dashboard-container">
        <div className="health-card">
          <div className="loading-state">
            <div className="spinner" />
            <p>Loading health status...</p>
          </div>
        </div>
      </div>
    </div>
  );
}

interface ErrorStateProps {
  error: Error;
  refetch: () => void;
}

function ErrorState({ error, refetch }: ErrorStateProps) {
  return (
    <div className="health-dashboard">
      <div className="dashboard-container">
        <Link to="/" className="back-link">
          ← Back to Home
        </Link>

        <div className="health-card error-card">
          <div className="error-state">
            <div className="error-icon">⚠️</div>
            <h2>Failed to fetch health status</h2>
            <p className="error-message">{error.message}</p>
            <button onClick={refetch} className="retry-button">
              Try Again
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

interface NoDataStateProps {
  refetch: () => void;
}

function NoDataState({ refetch }: NoDataStateProps) {
  return (
    <div className="health-dashboard">
      <div className="dashboard-container">
        <Link to="/" className="back-link">
          ← Back to Home
        </Link>
        <div className="health-card">
          <div className="no-data-state">
            <p>No health data available</p>
            <button onClick={refetch} className="fetch-button">
              Fetch Status
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

interface InfoRowProps {
  label: string;
  value: string;
}

function InfoRow({ label, value }: InfoRowProps) {
  return (
    <div className="info-row">
      <span className="info-label">{label}</span>
      <span className="info-label">{value}</span>
    </div>
  );
}

function formatDate(isoString: string): string {
  const date = new Date(isoString);
  return date.toLocaleString('ex-mx', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
}

function formatUptime(ms: number): string {
  const seconds = Math.floor(ms / 1000);

  const days = Math.floor(seconds / 86400);
  const hours = Math.floor((seconds % 86400) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);

  const parts: string[] = [];
  if (days > 0) parts.push(`${days}d`);
  if (hours > 0) parts.push(`${hours}h`);
  if (minutes > 0) parts.push(`${minutes}m`);
  if (secs > 0 || parts.length === 0) parts.push(`${secs}s`);

  return parts.join(' ');
}

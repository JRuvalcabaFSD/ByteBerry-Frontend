import type { IHealthResponse } from '../../interfaces';

/**
 * Props for the HealthStatus component.
 *
 * @interface HealthStatusProps
 * @property {IHealthResponse} data - The health response data containing status information
 * @property {string} className - CSS class name(s) to apply to the component for styling
 */

interface HealthStatusProps {
  data: IHealthResponse;
  className: string;
}

/**
 * Renders the health status of a service.
 *
 * @param data - An object containing the service name and its health status.
 * @param className - Optional additional CSS class names to apply to the root element.
 *
 * @remarks
 * The component displays the service name and its current status.
 * The status is visually styled based on whether it is 'healthy' or not.
 */

export function HealthStatusProps({ data, className = '' }: HealthStatusProps) {
  const statusClass = data.status === 'healthy' ? 'status-healthy' : 'status-unhealthy';

  return (
    <div className={`health-status ${statusClass} ${className}`}>
      <div className="status-indicator">{data.service}</div>
      <div className="status-content">
        <strong>
          <span>{data.status}</span>
        </strong>
      </div>
    </div>
  );
}

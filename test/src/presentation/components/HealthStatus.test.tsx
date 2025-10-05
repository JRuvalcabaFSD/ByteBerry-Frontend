import type { IHealthResponse } from '../../../../src/interfaces';
import { HealthStatusProps } from '../../../../src/presentation';
import { render, screen } from '../../../test-utils';

describe('HealthStatus Component', () => {
  const baseHealthData: IHealthResponse = {
    status: 'healthy',
    service: 'test-service',
    version: '1.0.0',
    timestamp: '2025-01-01T00:00:00Z',
  };
  it('should render service name and status', () => {
    render(<HealthStatusProps data={baseHealthData} className="" />);

    expect(screen.getByText('test-service')).toBeInTheDocument();
    expect(screen.getByText('healthy')).toBeInTheDocument();
  });
  it('should apply healthy status class when status is healthy', async () => {
    const { container } = render(<HealthStatusProps data={baseHealthData} className="" />);

    const statusElement = container.querySelector('.health-status');
    expect(statusElement).toHaveClass('status-healthy');
  });
  it('should apply unhealthy status class when status is unhealthy', async () => {
    const unhealthyData: IHealthResponse = {
      ...baseHealthData,
      status: 'unhealthy',
    };

    const { container } = render(<HealthStatusProps data={unhealthyData} className="" />);
    const startupsElement = container.querySelector('.health-status');
    expect(startupsElement).toHaveClass('status-unhealthy');
  });
});

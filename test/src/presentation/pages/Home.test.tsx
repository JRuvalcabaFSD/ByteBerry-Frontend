import { describe, it } from 'vitest';
import { screen } from '@testing-library/react';
import { render } from '../../../test-utils';
import { Home } from '../../../../src/presentation';

describe('Home Component', () => {
  it('should render page title', () => {
    render(<Home />);

    expect(screen.getByText('ByteBerry Frontend')).toBeInTheDocument();
  });
  it('should render Health Dashboard link', () => {
    render(<Home />);

    const link = screen.getByRole('link', { name: /health dashboard/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/health-ui');
  });
});

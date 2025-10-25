import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from '../src/App';

describe('App', () => {
  it('renders ByteBerry heading', () => {
    render(<App />);
    const heading = screen.getByText(/ByteBerry/i);
    expect(heading).toBeInTheDocument();
  });

  it('renders subtitle', () => {
    render(<App />);
    const subtitle = screen.getByText(/Expense Management System/i);
    expect(subtitle).toBeInTheDocument();
  });
});

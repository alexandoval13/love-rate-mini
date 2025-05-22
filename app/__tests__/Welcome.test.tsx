import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Welcome } from '../welcome/welcome';
import { describe, expect, it } from 'vitest';

describe('Welcome', () => {
  it('renders the homepage text', () => {
    render(
      <MemoryRouter>
        <Welcome />
      </MemoryRouter>
    );
    expect(screen.getByText(/love\/rate/i)).toBeInTheDocument();
  });
});

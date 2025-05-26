import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import Hub from '../hub/hub';

describe('Welcome', () => {
  it('renders the homepage text', () => {
    render(
      <MemoryRouter>
        <Hub />
      </MemoryRouter>
    );
    expect(screen.getByText(/love\/rate/i)).toBeInTheDocument();
  });
});

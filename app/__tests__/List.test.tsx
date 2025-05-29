import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import type { ListItem } from '~/components/list';
import List from '~/components/list';

describe('List component', () => {
  const mockData: ListItem[] = [
    { id: 1, label: 'Terminator', date: '1990' },
    { id: 2, label: 'Predator', date: '1989' },
    { id: 3, label: 'Princess Bride', date: '1994' },
    { id: 5, label: 'Rambo', date: '1988' },
  ];

  it('renders a list of items', () => {
    render(<List data={mockData} />);

    // Why does it need to be in regex?
    expect(screen.getByText(/Predator/i)).toBeInTheDocument();
  });

  it('renders all items in the list', () => {
    render(<List data={mockData} />);

    expect(screen.getAllByRole('listitem')).toHaveLength(mockData.length);
  });

  it('handles empty lists', () => {
    render(<List data={[]} />);

    expect(screen.queryByRole('listitem')).toBeNull();
  });
});

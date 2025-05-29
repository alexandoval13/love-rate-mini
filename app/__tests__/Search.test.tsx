import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import Search from '~/components/search/index';

describe('Search component', () => {
  it('renders input with placeholder', () => {
    const placeholder = 'Search movies...';

    render(
      <Search
        ariaLabel="Search movies"
        placeholder={placeholder}
        handleSearch={vi.fn()}
        handleResults={vi.fn()}
      />
    );

    expect(screen.getByPlaceholderText(placeholder)).toBeInTheDocument();
  });

  it('renders input with aria-label', () => {
    const ariaLabel = 'Search movies';

    render(
      <Search
        ariaLabel={ariaLabel}
        placeholder="Search movies..."
        handleSearch={vi.fn()}
        handleResults={vi.fn()}
      />
    );

    expect(screen.getByLabelText(ariaLabel)).toBeInTheDocument();
  });

  it('triggers handleSearch and handleResults after delay when typing', async () => {
    const mockSearch = vi.fn().mockResolvedValue([{ id: 1, title: 'Movie A' }]);
    const mockResults = vi.fn();

    render(
      <Search
        handleSearch={mockSearch}
        handleResults={mockResults}
        timeoutDelay={200} // shorten for test speed
      />
    );

    fireEvent.change(screen.getByRole('textbox'), {
      target: { value: 'Batman' },
    });

    await waitFor(() => {
      expect(mockSearch).toHaveBeenCalledWith('Batman');
    });
    await waitFor(() => {
      expect(mockResults).toHaveBeenCalled();
    });
  });

  it('returns empty result set when input is cleared and does not call search', async () => {
    const mockSearch = vi.fn();
    const mockResults = vi.fn();

    render(<Search handleSearch={mockSearch} handleResults={mockResults} />);

    fireEvent.change(screen.getByRole('textbox'), { target: { value: '' } });

    await waitFor(() => {
      expect(mockResults).toHaveBeenCalledWith([]);
    });
    expect(mockSearch).not.toHaveBeenCalled();
  });
});

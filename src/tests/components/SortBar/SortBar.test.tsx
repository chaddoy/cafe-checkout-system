import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { SortBar } from '../../../components/SortBar';
import type { SortOption } from '../../../components/SortBar/types';
import type { Product } from '../../../types';

const sortOptions: SortOption[] = [
  { label: 'Name', value: 'name' },
  { label: 'Price', value: 'price' },
];

describe('SortBar', () => {
  it('renders product count and options', () => {
    render(
      <SortBar
        products={[{ id: 1 } as Product]}
        sortOptions={sortOptions}
        sortBy={null}
        setSortBy={vi.fn()}
      />,
    );

    expect(screen.getByText('1 products')).toBeInTheDocument();
    expect(screen.getByLabelText(/Sort by/)).toBeInTheDocument();
  });

  it('invokes setSortBy on selection and reset', async () => {
    const setSortBy = vi.fn();
    render(
      <SortBar
        products={[]}
        sortOptions={sortOptions}
        sortBy="price"
        setSortBy={setSortBy}
      />,
    );

    const select = screen.getByLabelText(/Sort by/);
    await userEvent.selectOptions(select, 'name');
    expect(setSortBy).toHaveBeenCalledWith('name');

    const resetButton = screen.getByRole('button', { name: /Reset/i });
    await userEvent.click(resetButton);
    expect(setSortBy).toHaveBeenCalledWith(null);
  });
});

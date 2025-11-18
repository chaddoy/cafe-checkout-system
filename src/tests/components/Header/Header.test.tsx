import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import Header from '../../../components/Header/Header';
import { Provider } from 'react-redux';
import { store } from '../../../store';
import { setSearchQuery } from '../../../store/slices/product.slice';
import type { ComponentProps } from 'react';

const renderHeader = (props?: Partial<ComponentProps<typeof Header>>) => {
  const defaultProps = {
    searchQuery: '',
    handleSearchChange: vi.fn(),
  };

  return render(
    <Provider store={store}>
      <Header {...defaultProps} {...props} />
    </Provider>,
  );
};

describe('Header', () => {
  it('calls handleSearchChange when typing in the search input', async () => {
    const handleSearchChange = vi.fn();
    renderHeader({ handleSearchChange });

    const input = screen.getByPlaceholderText(/search/i);
    await userEvent.type(input, 'Latte');

    expect(handleSearchChange).toHaveBeenCalled();
  });

  it('dispatches clear action when clear button is clicked', async () => {
    const handleSearchChange = vi.fn();
    const dispatchSpy = vi.spyOn(store, 'dispatch');

    renderHeader({ searchQuery: 'Latte', handleSearchChange });

    const clearButton = screen.getByRole('button', { name: /clear/i });
    await userEvent.click(clearButton);

    expect(dispatchSpy).toHaveBeenCalledWith(setSearchQuery(''));

    dispatchSpy.mockRestore();
  });
});

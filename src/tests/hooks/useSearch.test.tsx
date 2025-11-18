import { act, renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import useSearch from '../../hooks/useSearch';
import { Provider } from 'react-redux';
import { store } from '../../store';
import type { Product } from '../../types';
import { setSearchQuery } from '../../store/slices/product.slice';
import type { ReactNode, ChangeEvent } from 'react';

const wrapper = ({ children }: { children: ReactNode }) => (
  <Provider store={store}>{children}</Provider>
);

const products: Product[] = [
  { id: 1, name: 'Latte', price: 4, category: 'Beverage', photo: 'latte.jpg' },
  { id: 2, name: 'Croissant', price: 3.5, category: 'Pastry', photo: 'c.jpg' },
];

describe('useSearch', () => {
  it('filters products using fuzzy search', () => {
    const { result } = renderHook(
      () =>
        useSearch({
          dedupedProducts: products,
          searchQuery: 'latte',
        }),
      { wrapper },
    );

    expect(result.current.searchedProducts).toHaveLength(1);
    expect(result.current.searchedProducts[0].name).toBe('Latte');
  });

  it('dispatches setSearchQuery when handleSearchChange fires', () => {
    const dispatchSpy = vi.spyOn(store, 'dispatch');

    const { result } = renderHook(
      () =>
        useSearch({
          dedupedProducts: products,
          searchQuery: '',
        }),
      { wrapper },
    );

    act(() => {
      result.current.handleSearchChange({
        target: { value: 'espresso' },
      } as ChangeEvent<HTMLInputElement>);
    });

    expect(dispatchSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        type: setSearchQuery.type,
        payload: 'espresso',
      }),
    );

    dispatchSpy.mockRestore();
  });
});

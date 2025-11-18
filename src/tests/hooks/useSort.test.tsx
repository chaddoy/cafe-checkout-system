import { act, renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import useSort from '../../hooks/useSort';
import { Provider } from 'react-redux';
import { store } from '../../store';
import type { Product } from '../../types';
import { setSortBy } from '../../store/slices/product.slice';
import type { ReactNode } from 'react';

const wrapper = ({ children }: { children: ReactNode }) => (
  <Provider store={store}>{children}</Provider>
);

const products: Product[] = [
  { id: 1, name: 'Latte', price: 4, category: 'Beverage', photo: 'latte.jpg' },
  { id: 2, name: 'Americano', price: 3, category: 'Beverage', photo: 'a.jpg' },
];

describe('useSort', () => {
  it('sorts products by price', () => {
    const { result } = renderHook(
      () =>
        useSort({
          searchedProducts: products,
          sortBy: 'price',
        }),
      { wrapper },
    );

    expect(result.current.sortedProducts[0].price).toBe(3);
  });

  it('dispatches setSortBy from handleSortChange', () => {
    const dispatchSpy = vi.spyOn(store, 'dispatch');

    const { result } = renderHook(
      () =>
        useSort({
          searchedProducts: products,
          sortBy: null,
        }),
      { wrapper },
    );

    act(() => {
      result.current.handleSortChange('name');
    });

    expect(dispatchSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        type: setSortBy.type,
        payload: 'name',
      }),
    );

    dispatchSpy.mockRestore();
  });
});

import { describe, expect, it } from 'vitest';
import productReducer, {
  fetchProductsThunk,
  setProducts,
  setLoading,
  setError,
  setSearchQuery,
  setSortBy,
  productSlice,
} from '../../../store/slices/product.slice';
import type { Product } from '../../../types';

const initialState = productSlice.getInitialState();

const sampleProducts: Product[] = [
  { id: 1, name: 'Latte', price: 4, category: 'Beverage', photo: 'latte.jpg' },
];

describe('product slice', () => {
  it('returns initial state', () => {
    expect(productReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('handles basic reducers', () => {
    const withProducts = productReducer(initialState, setProducts(sampleProducts));
    expect(withProducts.items).toEqual(sampleProducts);

    const loading = productReducer(initialState, setLoading(true));
    expect(loading.loading).toBe(true);

    const withError = productReducer(initialState, setError('oops'));
    expect(withError.error).toBe('oops');

    const withQuery = productReducer(initialState, setSearchQuery('latte'));
    expect(withQuery.searchQuery).toBe('latte');

    const withSort = productReducer(initialState, setSortBy('price'));
    expect(withSort.sortBy).toBe('price');
  });

  it('handles fetch pending', () => {
    const state = productReducer(initialState, { type: fetchProductsThunk.pending.type });
    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('handles fetch fulfilled', () => {
    const state = productReducer(initialState, {
      type: fetchProductsThunk.fulfilled.type,
      payload: sampleProducts,
    });
    expect(state.loading).toBe(false);
    expect(state.items).toEqual(sampleProducts);
  });

  it('handles fetch rejected', () => {
    const state = productReducer(initialState, {
      type: fetchProductsThunk.rejected.type,
      error: { message: 'failed' },
    });
    expect(state.loading).toBe(false);
    expect(state.error).toBe('failed');
  });
});


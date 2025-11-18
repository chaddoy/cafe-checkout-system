import { describe, expect, it } from 'vitest';
import { store } from '../../store';
import { setSearchQuery } from '../../store/slices/product.slice';
import { addToCart, clearCart } from '../../store/slices/cart.slice';

describe('store', () => {
  it('initializes product and cart slices', () => {
    const state = store.getState();
    expect(state).toHaveProperty('product');
    expect(state).toHaveProperty('cart');
  });

  it('handles product actions', () => {
    store.dispatch(setSearchQuery('chai'));
    expect(store.getState().product.searchQuery).toBe('chai');

    store.dispatch(setSearchQuery(''));
  });

  it('handles cart actions', () => {
    const product = {
      id: 1,
      name: 'Latte',
      price: 4,
      category: 'Beverage',
      photo: 'latte.jpg',
    };

    store.dispatch(clearCart());
    store.dispatch(addToCart({ product, size: 'Medium' }));

    expect(store.getState().cart.items).toHaveLength(1);

    store.dispatch(clearCart());
    expect(store.getState().cart.items).toHaveLength(0);
  });
});


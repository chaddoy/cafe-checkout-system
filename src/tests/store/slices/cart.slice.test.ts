import { describe, expect, it, vi } from 'vitest';
import cartReducer, {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  checkoutCart,
  cartSlice,
} from '../../../store/slices/cart.slice';
import type { Product } from '../../../types';

const initialState = cartSlice.getInitialState();

const drink: Product = {
  id: 1,
  name: 'Latte',
  price: 4,
  category: 'Beverage',
  photo: 'latte.jpg',
};

describe('cart slice', () => {
  it('returns initial state', () => {
    expect(cartReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('adds and increments cart items', () => {
    const firstState = cartReducer(initialState, addToCart({ product: drink, size: 'Medium' }));
    expect(firstState.items).toHaveLength(1);
    expect(firstState.subtotal).toBeGreaterThan(0);

    const secondState = cartReducer(firstState, addToCart({ product: drink, size: 'Medium' }));
    expect(secondState.items[0].quantity).toBe(2);
  });

  it('updates quantity and removes items', () => {
    const withItem = cartReducer(initialState, addToCart({ product: drink, size: 'Medium' }));
    const itemId = withItem.items[0].id;

    const updated = cartReducer(withItem, updateQuantity({ id: itemId, quantity: 3 }));
    expect(updated.items[0].quantity).toBe(3);

    const removed = cartReducer(updated, removeFromCart(itemId));
    expect(removed.items).toHaveLength(0);
  });

  it('clears cart', () => {
    const withItems = cartReducer(initialState, addToCart({ product: drink, size: 'Medium' }));
    const cleared = cartReducer(withItems, clearCart());
    expect(cleared.items).toHaveLength(0);
    expect(cleared.subtotal).toBe(0);
  });

  it('generates receipt on checkout', () => {
    vi.setSystemTime(new Date('2025-01-01T00:00:00Z'));
    const withItems = cartReducer(initialState, addToCart({ product: drink, size: 'Medium' }));
    const checkedOut = cartReducer(withItems, checkoutCart());
    expect(checkedOut.lastReceipt).not.toBeNull();
    expect(checkedOut.items).toHaveLength(0);
    vi.useRealTimers();
  });
});


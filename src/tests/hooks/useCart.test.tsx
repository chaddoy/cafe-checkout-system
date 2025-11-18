import { act, renderHook } from '@testing-library/react';
import { describe, expect, it, beforeEach, vi } from 'vitest';
import useCart from '../../hooks/useCart';
import { Provider } from 'react-redux';
import { store } from '../../store';
import {
  addToCart,
  clearCart,
  updateQuantity,
  removeFromCart,
  checkoutCart,
} from '../../store/slices/cart.slice';
import type { Product } from '../../types';
import type { ReactNode } from 'react';

const wrapper = ({ children }: { children: ReactNode }) => (
  <Provider store={store}>{children}</Provider>
);

const latte: Product = {
  id: 1,
  name: 'Latte',
  price: 4,
  category: 'Beverage',
  photo: 'latte.jpg',
};

describe('useCart', () => {
  beforeEach(() => {
    store.dispatch(clearCart());
  });

  it('exposes cart state', () => {
    store.dispatch(addToCart({ product: latte, size: 'Medium' }));

    const { result } = renderHook(() => useCart(), { wrapper });

    expect(result.current.cartItems).toHaveLength(1);
    expect(result.current.subtotal).toBeGreaterThan(0);
    expect(result.current.serviceChargeRate).toBeGreaterThan(0);
  });

  it('dispatches actions from handlers', () => {
    store.dispatch(addToCart({ product: latte, size: 'Medium' }));
    const itemId = '1-Medium';

    const dispatchSpy = vi.spyOn(store, 'dispatch');
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.handleQuantityUpdate(itemId, 3);
    });

    expect(dispatchSpy).toHaveBeenCalledWith(
      updateQuantity({ id: itemId, quantity: 3 }),
    );

    act(() => {
      result.current.handleRemoveItem(itemId);
    });
    expect(dispatchSpy).toHaveBeenCalledWith(removeFromCart(itemId));

    act(() => {
      result.current.handleCheckout();
    });
    expect(dispatchSpy).toHaveBeenCalledWith(checkoutCart());

    dispatchSpy.mockRestore();
  });
});

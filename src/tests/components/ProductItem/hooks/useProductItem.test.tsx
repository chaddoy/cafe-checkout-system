import { act, renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { Provider } from 'react-redux';
import { store } from '../../../../store';
import useProductItem from '../../../../components/ProductItem/hooks/useProductItem';
import * as productsUtils from '../../../../utils/products';
import { addToCart } from '../../../../store/slices/cart.slice';
import type { Product } from '../../../../types';
import type { ReactNode } from 'react';

const wrapper = ({ children }: { children: ReactNode }) => (
  <Provider store={store}>{children}</Provider>
);

const drinkProduct: Product = {
  id: 1,
  name: 'Iced Latte',
  price: 4,
  category: 'Beverage',
  photo: 'latte.jpg',
};

const pastryProduct: Product = {
  id: 2,
  name: 'Croissant',
  price: 3.5,
  category: 'Pastry',
  photo: 'croissant.jpg',
};

describe('useProductItem', () => {
  it('calculates drink price and dispatches addToCart with size', () => {
    const getSizedPriceSpy = vi
      .spyOn(productsUtils, 'getSizedPrice')
      .mockReturnValue(4.5);

    const dispatchSpy = vi.spyOn(store, 'dispatch');

    const { result } = renderHook(() => useProductItem(drinkProduct), {
      wrapper,
    });

    expect(result.current.displayPrice).toBe(4.5);

    act(() => {
      result.current.setSelectedSize('Large');
    });

    act(() => {
      result.current.handleAddToCart();
    });

    expect(dispatchSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        type: addToCart.type,
        payload: expect.objectContaining({
          product: drinkProduct,
          size: 'Large',
        }),
      }),
    );
    expect(getSizedPriceSpy).toHaveBeenCalledWith(drinkProduct, 'Large');

    dispatchSpy.mockRestore();
    getSizedPriceSpy.mockRestore();
  });

  it('keeps base price and omits size for non-drinks', () => {
    const getSizedPriceSpy = vi.spyOn(productsUtils, 'getSizedPrice');

    const dispatchSpy = vi.spyOn(store, 'dispatch');
    const { result } = renderHook(() => useProductItem(pastryProduct), {
      wrapper,
    });

    expect(result.current.displayPrice).toBe(pastryProduct.price);
    expect(getSizedPriceSpy).not.toHaveBeenCalled();

    act(() => {
      result.current.handleAddToCart();
    });

    expect(dispatchSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        type: addToCart.type,
        payload: expect.objectContaining({
          product: pastryProduct,
          size: null,
        }),
      }),
    );

    dispatchSpy.mockRestore();
    getSizedPriceSpy.mockRestore();
  });
});

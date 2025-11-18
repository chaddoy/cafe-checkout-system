import { describe, expect, it } from 'vitest';
import type { CartItem, Product } from '../../types';
import type { CartState } from '../../store/slices/types';
import { computeUnitPrice, updateTotals } from '../../utils/cart';

const mockDrink: Product = {
  id: 1,
  name: 'Latte',
  price: 4,
  category: 'Beverage',
  photo: 'latte.jpg',
};

const mockPastry: Product = {
  id: 2,
  name: 'Croissant',
  price: 3.5,
  category: 'Pastry',
  photo: 'croissant.jpg',
};

describe('cart utils', () => {
  it('applies drink size adjustments when computing unit price', () => {
    expect(computeUnitPrice(mockDrink, 'Large')).toBe(4.5);
    expect(computeUnitPrice(mockDrink, 'Small')).toBe(3.5);
  });

  it('keeps original price for non-beverages regardless of size', () => {
    expect(computeUnitPrice(mockPastry, 'Large')).toBe(3.5);
    expect(computeUnitPrice(mockPastry, null)).toBe(3.5);
  });

  it('recalculates subtotal, service charge, and total', () => {
    const items: CartItem[] = [
      {
        id: 'item-1',
        productId: 1,
        name: 'Latte',
        category: 'Beverage',
        size: 'Medium',
        quantity: 2,
        unitPrice: 4,
        photo: 'latte.jpg',
      },
      {
        id: 'item-2',
        productId: 2,
        name: 'Croissant',
        category: 'Pastry',
        size: null,
        quantity: 1,
        unitPrice: 3.5,
        photo: 'croissant.jpg',
      },
    ];

    const state: CartState = {
      items,
      subtotal: 0,
      serviceCharge: 0,
      total: 0,
      lastReceipt: null,
    };

    updateTotals(state);

    expect(state.subtotal).toBe(11.5);
    expect(state.serviceCharge).toBeCloseTo(1.15);
    expect(state.total).toBeCloseTo(12.65);
  });
});


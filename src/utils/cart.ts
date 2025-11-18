import type { DrinkSize, Product } from '../types';
import { DEFAULT_DRINK_SIZE, DRINK_SIZE_PRICE_MAP } from './products';
import type { CartItem } from '../types';
import type { CartState } from '../store/slices/types';

export const buildCartItemId = (productId: number, size: DrinkSize | null) =>
  `${productId}-${size ?? 'standard'}`;

export const computeUnitPrice = (product: Product, size: DrinkSize | null) => {
  if (product.category.toLowerCase() !== 'beverage') {
    return product.price;
  }
  const selectedSize = size ?? DEFAULT_DRINK_SIZE;
  const adjustment = DRINK_SIZE_PRICE_MAP[selectedSize] ?? 0;
  return Number((product.price + adjustment).toFixed(2));
};

export const recalcSubtotal = (items: CartItem[]) =>
  items.reduce((total, item) => total + item.unitPrice * item.quantity, 0);

export const SERVICE_CHARGE_RATE = 0.1;

export const updateTotals = (state: CartState) => {
  const subtotal = recalcSubtotal(state.items);
  const serviceCharge = Number((subtotal * SERVICE_CHARGE_RATE).toFixed(2));
  const total = Number((subtotal + serviceCharge).toFixed(2));

  state.subtotal = subtotal;
  state.serviceCharge = serviceCharge;
  state.total = total;
};

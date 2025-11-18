import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { DrinkSize, Product } from '../../types';
import { DEFAULT_DRINK_SIZE } from '../../utils/products';
import { buildCartItemId, computeUnitPrice, updateTotals } from '../../utils/cart';
import type { CartState } from './types';

const initialState: CartState = {
  items: [],
  subtotal: 0,
  serviceCharge: 0,
  total: 0,
  lastReceipt: null,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (
      state,
      action: PayloadAction<{ product: Product; size?: DrinkSize | null }>,
    ) => {
      const { product, size = null } = action.payload;
      const cartItemId = buildCartItemId(product.id, size);
      const existingItem = state.items.find((item) => item.id === cartItemId);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        const unitPrice = computeUnitPrice(product, size);
        state.items.push({
          id: cartItemId,
          productId: product.id,
          name: product.name,
          category: product.category,
          size: product.category.toLowerCase() === 'beverage' ? size ?? DEFAULT_DRINK_SIZE : null,
          quantity: 1,
          unitPrice,
          photo: product.photo,
        });
      }
      updateTotals(state);
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      updateTotals(state);
    },
    updateQuantity: (
      state,
      action: PayloadAction<{ id: string; quantity: number }>,
    ) => {
      const { id, quantity } = action.payload;
      const item = state.items.find((cartItem) => cartItem.id === id);
      if (!item) return;
      if (quantity <= 0) {
        state.items = state.items.filter((cartItem) => cartItem.id !== id);
      } else {
        item.quantity = quantity;
      }
      updateTotals(state);
    },
    clearCart: (state) => {
      state.items = [];
      updateTotals(state);
    },
    checkoutCart: (state) => {
      if (!state.items.length) {
        return;
      }

      const timestamp = new Date().toISOString();

      state.lastReceipt = {
        id: `receipt-${timestamp}`,
        timestamp,
        items: state.items.map((item) => ({ ...item })),
        subtotal: state.subtotal,
        serviceCharge: state.serviceCharge,
        total: state.total,
      };

      state.items = [];
      state.subtotal = 0;
      state.serviceCharge = 0;
      state.total = 0;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  checkoutCart,
} = cartSlice.actions;

export default cartSlice.reducer;


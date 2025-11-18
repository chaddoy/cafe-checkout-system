import type { CartItem, Product, Receipt, SortBy } from '../../types';

export interface ProductState {
  items: Product[];
  loading: boolean;
  error: string | Error | null;
  searchQuery: string;
  sortBy: SortBy;
}

export interface CartState {
  items: CartItem[];
  subtotal: number;
  serviceCharge: number;
  total: number;
  lastReceipt: Receipt | null;
}

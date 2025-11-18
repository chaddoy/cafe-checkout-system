export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  photo: string;
}

export type SortKey = 'name' | 'price' | 'category';
export type SortBy = SortKey | null;

export type DrinkSize = 'Small' | 'Medium' | 'Large';

export interface CartItem {
  id: string;
  productId: number;
  name: string;
  category: string;
  size: DrinkSize | null;
  quantity: number;
  unitPrice: number;
  photo: string;
}

export interface Receipt {
  id: string;
  timestamp: string;
  items: CartItem[];
  subtotal: number;
  serviceCharge: number;
  total: number;
}

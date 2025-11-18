import type { CartItem, Receipt } from '../../types';

export type CartSummaryProps = {
  items: CartItem[];
  subtotal: number;
  serviceCharge: number;
  total: number;
  serviceChargeRate: number;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
  onCheckout: () => void;
  receipt: Receipt | null;
};
